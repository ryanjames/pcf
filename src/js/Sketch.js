// import { isMobile } from 'mobile-device-detect'
import * as THREE from 'three'
import fragment from '../shaders/fragment.glsl'
import vertex from '../shaders/vertex.glsl'
import TessellateModifier from '../modifiers/TessellateModifier'
import ExplodeModifier from '../modifiers/ExplodeModifier'
import sketchInteraction from './sketchInteraction'
import { isMobile } from 'mobile-device-detect'

export default class Sketch {

  constructor() {
    // Dimensions
    this.canvasWidth = this.canvasDimensions().width
    this.canvasHeight = this.canvasDimensions().height
    this.aspect = this.canvasWidth / this.canvasHeight
    // Mouse
    this.mouse = new THREE.Vector2()
    // Scene
    this.theta = 0
    this.radius = 500
    this.frustumSize = 100
    this.camera = new THREE.OrthographicCamera( this.frustumSize * this.aspect / - 2, this.frustumSize * this.aspect / 2, this.frustumSize / 2, this.frustumSize / - 2, 1, 1000 )
    this.scene = new THREE.Scene()
    this.geometry = new THREE.PlaneGeometry(2, 2)
  }

  canvasDimensions() {
    return {
      width: document.body.clientHeight > document.body.clientWidth ? document.body.clientHeight : document.body.clientWidth,
      height: document.body.clientHeight > document.body.clientWidth ? document.body.clientHeight : document.body.clientWidth
    }
  }

  loadTexture(image, callback) {
    const loader = new THREE.TextureLoader()
    loader.load(image, (texture) => {
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.NearestFilter
      this.imageNativeWidth = texture.image.width
      this.imageNativeHeight = texture.image.height
      this.texture = texture
      callback()
    })
  }

  createMesh(geometry, size, callback) {
    const tessallateModifier = new TessellateModifier(size)
    for (let i = 0; i < 360; i++) {
      tessallateModifier.modify(geometry)
    }
    const explodeModifier = new ExplodeModifier()
    explodeModifier.modify(geometry)

    const uniforms = {
      resolution: {
        type: 'v2', value: new THREE.Vector2(this.canvasWidth, this.canvasHeight),
      },
      imageResolution: {
        type: 'v2', value: new THREE.Vector2(this.imageNativeWidth, this.imageNativeHeight),
      },
      texture: {
        type: 't', value: this.texture,
      }
    }
    this.mesh = new THREE.Mesh(
      this.geometry,
      new THREE.RawShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertex,
        fragmentShader: fragment,
      })
    )

    this.scene.add(this.mesh)

    return callback()
  }

  resizeWindow() {
    this.canvasWidth = this.canvasDimensions().width
    this.canvasHeight = this.canvasDimensions().height

    const aspect = this.canvasWidth / this.canvasHeight
  
    this.camera.left = - this.frustumSize * aspect / 2
    this.camera.right = this.frustumSize * aspect / 2
    this.camera.top = this.frustumSize / 2
    this.camera.bottom = - this.frustumSize / 2
  
    this.camera.updateProjectionMatrix()
  
    this.renderer.setSize(this.canvasWidth, this.canvasHeight)
  
     this.canvas.width = this.canvasWidth
     this.canvas.height = this.canvasHeight 
     this.canvas.style.transform = document.body.clientWidth > document.body.clientHeight ? "translateY(-50%)" : "translateX(-50%)"
     this.canvas.style.top = document.body.clientWidth > document.body.clientHeight ? "50%" : "0"
     this.canvas.style.left = document.body.clientWidth > document.body.clientHeight ? "0" : "50%"
     this.mesh.material.uniforms.resolution.value.set(this.canvasWidth, this.canvasHeight)
  }
  
  render() {
    this.theta += 0.1
    this.camera.position.x = this.radius * Math.sin( THREE.MathUtils.degToRad( this.theta ) )
    this.camera.position.y = this.radius * Math.sin( THREE.MathUtils.degToRad( this.theta ) )
    this.camera.position.z = this.radius * Math.cos( THREE.MathUtils.degToRad( this.theta ) )
    this.camera.lookAt( this.scene.position )
  
    this.camera.updateMatrixWorld()
    this.renderer.render( this.scene, this.camera )
  }

  animate() {
    requestAnimationFrame( this.animate.bind(this) )
    this.render()
  }

  init(canvas, image, faceSize, mouseRadius, setSketchLoaded) {
    this.canvas = canvas
    this.image = image
    this.mouseRadius = mouseRadius 
    this.faceSize = faceSize 
    this.loadTexture(this.image, () => {
			this.createMesh(this.geometry, this.faceSize, () => {
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          canvas: this.canvas,
          alpha: true,
        })
        this.resizeWindow()
        this.animate()

        document.addEventListener( isMobile ? 'touchmove' : 'mousemove', event => {
          sketchInteraction( event, this.mouse, this.canvasWidth, this.canvasHeight, this.mesh, this.mouseRadius)
        }, false )
        window.addEventListener( 'resize', this.resizeWindow.bind(this), false )

        setSketchLoaded(true)

      })
		})
  }

}