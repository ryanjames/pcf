import React, { useEffect } from "react";
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import fragment from '../shaders/fragment.glsl';
import vertex from '../shaders/vertex.glsl';
import TessellateModifier from '../modifiers/TessellateModifier';
import ExplodeModifier from '../modifiers/ExplodeModifier';
import food from '../images/food.jpg';

const Background = () => {
	const canvas = (
    <canvas 
      style={{
        backgroundImage: '../images/food.jpg',
      }}
      id="canvas-bg">
    </canvas>
	)

  useEffect(() => {

    const canvas = document.getElementById('canvas-bg');
    let stats, camera, scene, texture, mesh, renderer;

    let theta = 0;

    const mouse = new THREE.Vector2();
    const radius = 500;
    const frustumSize = 100;

    const width = () => document.body.clientWidth > document.body.clientHeight ? document.body.clientWidth : document.body.clientHeight;
    const height = () => document.body.clientHeight > document.body.clientWidth ? document.body.clientHeight : document.body.clientWidth;

		init();
		animate();

		function loadTexture(image, callback) {
			const loader = new THREE.TextureLoader();
			loader.load(image, (_texture) => {
				_texture.magFilter = THREE.NearestFilter;
				_texture.minFilter = THREE.NearestFilter;
				texture = _texture;
				callback();
			});
		}

		function createMesh() {
			const uniforms = {
				resolution: {
					type: 'v2',
					value: new THREE.Vector2(width(), height()),
				},
				imageResolution: {
					type: 'v2',
					value: new THREE.Vector2(2048, 1356),
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
		
			const aspect = width() / height();
		
			camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
		
			scene = new THREE.Scene();
		
			loadTexture(food, () => {
				mesh = createMesh();
				scene.add(mesh);
				resizeWindow();
			});
		
			renderer = new THREE.WebGLRenderer({
				antialias: true,
				canvas: canvas,
				alpha: true,
			});
		
			renderer.setSize(width(), height());
		
			stats = new Stats();
			document.body.appendChild( stats.dom );
		
			document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		
			window.addEventListener( 'resize', resizeWindow, false );
		
		}

		function resizeWindow() {
		
			const aspect = width() / height();
		
			camera.left = - frustumSize * aspect / 2;
			camera.right = frustumSize * aspect / 2;
			camera.top = frustumSize / 2;
			camera.bottom = - frustumSize / 2;
		
			camera.updateProjectionMatrix();
		
			renderer.setSize(width(), height());
		
		 	canvas.width = width();
		 	canvas.height = height();
		 	canvas.style.transform = document.body.clientWidth > document.body.clientHeight ? "translateY(-50%)" : "translateX(-50%)";
		 	canvas.style.top = document.body.clientWidth > document.body.clientHeight ? "50%" : "0";
		 	canvas.style.left = document.body.clientWidth > document.body.clientHeight ? "0" : "50%";
		 	mesh.material.uniforms.resolution.value.set(width(), height());
		
		}

		function onDocumentMouseMove( event ) {
		
			event.preventDefault();
		
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		
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
		        a.origZ = a.z;
		        a.origXSet = true;
		      }
				
		      const vect = a;
		      const dx = (a.origX - mouse.x), dy = (vect.origY - mouse.y);
					const dist = Math.sqrt( dx*dx + dy*dy);
				
		      if(dist < 0.2) {
		        for ( let j = 0, jl = vList.length; j < jl; j ++ ) {
		          const v = vList[j];
		          if(!v.origXSet) {
		          	   v.origX = v.x;
		              v.origY = v.y;
		              v.origZ = v.z;
		              v.origXSet = true;
		          }
		          const len = Math.sqrt(dx*dx + dy*dy);
		          if(len===0) return;
		          const ndx = dx / len,
		              ndy = dy / len;
		          v.x = v.origX + ndx * 0.08;
		          v.y = v.origY + ndy * 0.08; 
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

/*
Background.propTypes = {
  prop: PropTypes.string,
}

Background.defaultProps = {
  prop: ``,
}
*/

export default Background