import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { css } from '@emotion/react';
import { isMobile } from 'mobile-device-detect';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import fragment from '../shaders/fragment.glsl';
import vertex from '../shaders/vertex.glsl';
import TessellateModifier from '../modifiers/TessellateModifier';
import ExplodeModifier from '../modifiers/ExplodeModifier';

import foreground from '../images/soup-2.jpg';
import background from "../images/background.jpg";

const Background = () => {

	const backgroundStyles = css`
		background-image: url(${background});
		background-size: cover;
		background-position: center;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 1;
	`
	const canvasStyles = css`
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 2;
	`

	const canvas = (
	<>
	 <div css={ backgroundStyles } />
		<canvas css={ canvasStyles } id="canvas-bg" />
	</>
	)

  useEffect(() => {

    const canvas = document.getElementById('canvas-bg');
    let stats, camera, scene, texture, mesh, renderer;

    let theta = 0;

    const mouse = new THREE.Vector2();
    const radius = 500;
		const frustumSize = 100;
		
		let imageNativeWidth, imageNativeHeight;

    const canvasWidth = () => document.body.clientWidth > document.body.clientHeight ? document.body.clientWidth : document.body.clientHeight;
		const canvasHeight = () => document.body.clientHeight > document.body.clientWidth ? document.body.clientHeight : document.body.clientWidth;

		const initWidth = canvasWidth();
		const initHeight = canvasHeight();

		init();
		animate();

		function loadImages(foreground, background, callback) {
			const loader = new THREE.TextureLoader();
			loader.load(foreground, (_texture) => {
				_texture.magFilter = THREE.NearestFilter;
				_texture.minFilter = THREE.NearestFilter;
				imageNativeWidth = _texture.image.width;
				imageNativeHeight = _texture.image.height;
				texture = _texture;
				const _background = new Image();
				_background.src = background;
				_background.onload = () => {
					callback();
				};
			});
		}

		function createMesh() {
			const uniforms = {
				resolution: {
					type: 'v2',
					value: new THREE.Vector2(initWidth, initHeight),
				},
				imageResolution: {
					type: 'v2',
					value: new THREE.Vector2(imageNativeWidth, imageNativeHeight),
				},
				texture: {
					type: 't',
					value: texture,
				}
			};
			const geometry = new THREE.PlaneGeometry(2, 2);
		
			// Tassellate geometry
		
			const tessallateModifier = new TessellateModifier(0.05);
			for (let i = 0; i < 360; i++) {
					tessallateModifier.modify(geometry);
			};
		
			// Make each face independent
			const explodeModifier = new ExplodeModifier();
			explodeModifier.modify(geometry);
		
			return new THREE.Mesh(
				geometry,
				new THREE.RawShaderMaterial({
					uniforms: uniforms,
					vertexShader: vertex,
					fragmentShader: fragment,
				})
			);
		}

		function init() {

			const aspect = initWidth / initHeight;
		
			camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
		
			scene = new THREE.Scene();
		

			loadImages(foreground, background, () => {


				mesh = createMesh();
				scene.add(mesh);

				renderer.setSize(initWidth, initHeight);
		
				document.addEventListener( isMobile ? 'touchmove' : 'mousemove', onMouseEvent, false );
		
				window.addEventListener( 'resize', resizeWindow, false );
		
				resizeWindow();

				setTimeout(function() {
					document.body.classList.add("loaded");
				}, 400);

			});

			stats = new Stats();
			// document.body.appendChild( stats.dom );

			renderer = new THREE.WebGLRenderer({
				antialias: true,
				canvas: canvas,
				alpha: true,
			});

		}

		function resizeWindow() {
		
			const width = canvasWidth();
			const height = canvasHeight();

			const aspect = width / height;
		
			camera.left = - frustumSize * aspect / 2;
			camera.right = frustumSize * aspect / 2;
			camera.top = frustumSize / 2;
			camera.bottom = - frustumSize / 2;
		
			camera.updateProjectionMatrix();
		
			renderer.setSize(width, height);
		
		 	canvas.width = width;
		 	canvas.height = height;
		 	canvas.style.transform = document.body.clientWidth > document.body.clientHeight ? "translateY(-50%)" : "translateX(-50%)";
		 	canvas.style.top = document.body.clientWidth > document.body.clientHeight ? "50%" : "0";
		 	canvas.style.left = document.body.clientWidth > document.body.clientHeight ? "0" : "50%";
		 	mesh.material.uniforms.resolution.value.set(width, height);
		
		}

		function onMouseEvent( event ) {

			const width = canvasWidth();
			const height = canvasHeight();
		
			event.preventDefault();

			const mouseX = isMobile ? event.pageX : event.clientX;
			const mouseY = isMobile ? event.pageY : event.clientY;
		
			const canvas_x = ( mouseX / window.innerWidth ) * 2 - 1;
			const canvas_y = - ( mouseY / window.innerHeight ) * 2 + 1;
			if(document.body.clientWidth > document.body.clientHeight) {
				mouse.x = canvas_x;
				mouse.y = window.innerHeight * canvas_y / height;
			} else {
				mouse.x = window.innerWidth * canvas_x / width;
				mouse.y = canvas_y;
			}
		
			const geometry = mesh.geometry;

			for ( let i = 0, il = geometry.faces.length; i < il; i ++ ) {
				const face = geometry.faces[ i ];
			
				if ( face instanceof THREE.Face3 ) {
				
					const a = geometry.vertices[face.a];
					const b = geometry.vertices[face.b];
					const c = geometry.vertices[face.c];
					const vList = [a, b, c];
				
					if(!a.origXSet) {
		        a.origX = a.x;
		        a.origY = a.y;
						a.distance = Math.random() * (0.3 - 0.1) + 0.1;
						a.travel = Math.random() * (0.3 - 0) + 0;
					}

		      const vect = a;
		      const dx = (a.origX - mouse.x), dy = (vect.origY - mouse.y);
					const dist = Math.sqrt( dx*dx + dy*dy);

		      if(dist < a.distance) {
		        for ( let j = 0, jl = vList.length; j < jl; j ++ ) {
							const v = vList[j];
		          if(!v.origXSet) {
		          	  v.origX = v.x;
		              v.origY = v.y;
		              v.origXSet = true;
		          }
		          const len = Math.sqrt(dx*dx + dy*dy);
		          if(len===0) return;
		          const ndx = dx / len,
		              ndy = dy / len;
		          v.x = v.origX + ndx * a.travel;
		          v.y = v.origY + ndy * a.travel; 
		        };
		      } else {
		        vList.forEach(function(v) {
		          if(v.origXSet) {
		            v.x = v.origX;
		            v.y = v.origY;   
		          }
						});
		      }
				}
			}
			geometry.verticesNeedUpdate = true;
			geometry.normalsNeedUpdate = true;    
		
		}

		function animate() {
		
			requestAnimationFrame( animate );
		
			render();
			stats.update();
		
		}

		function render() {
		
			theta += 0.1;
		
			camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
			camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
			camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
			camera.lookAt( scene.position );
		
			camera.updateMatrixWorld();
		
			renderer.render( scene, camera );

		}

  });
	return canvas;
}

Background.propTypes = {
  foreground: PropTypes.string,
	background: PropTypes.string,
	loaded: PropTypes.func
}

Background.defaultProps = {
  foreground: null,
  background: null,
	loaded: null
}

export default Background