<template>
  <div ref="pointsWaves" ></div>
</template>
<script>
import THREE from 'three'

let material = new THREE.ParticleCanvasMaterial({
  color: 0x368BD5,
  program: function (context) {
    context.beginPath()
    context.arc(0, 0, 1, 0, 2 * Math.PI, true)
    context.fill()
  }
})

let scene = null
let camera = null
let renderer = null
// cube:null,
const SEPARATION = 100
const AMOUNTX = 50
const AMOUNTY = 50
let particles = []
let particle = null
let count = 0
let mouseX = 0
let mouseY = 0
let requestAnimationFrameId = null
export default {
  name: 'pointsWaves',
  methods: {
    init () {
      scene = new THREE.Scene()
      // scene.background = new THREE.Color(0xffffff)
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
      camera.position.z = 1000
      

      let i = 0
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[ i++ ] = new THREE.Particle(material)
          particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2)
          particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2)
          scene.add(particle)
        }
      }

      renderer = new THREE.CanvasRenderer()
      renderer.setClearColor(new THREE.Color(0x111948))
      renderer.setSize(window.innerWidth, window.innerHeight)
      this.$refs.pointsWaves.appendChild(renderer.domElement)

      document.addEventListener('mousemove', this.onDocumentMouseMove, false)
      // document.addEventListener( 'touchstart', onDocumentTouchStart, false );
      // document.addEventListener( 'touchmove', onDocumentTouchMove, false );
      window.addEventListener('resize', this.onWindowResize, false)
      this.animate()
    },
    onDocumentMouseMove (event) {
      let windowHalfX = window.innerWidth / 2
      let windowHalfY = window.innerHeight / 2

      mouseX = event.clientX - windowHalfX
      mouseY = event.clientY - windowHalfY
    },
    // onDocumentTouchStart(event) {
    //   let windowHalfX = window.innerWidth / 2
    //   let windowHalfY = window.innerHeight / 2

    //   if ( event.touches.length === 1 ) {
    //     event.preventDefault();
    //     mouseX = event.touches[ 0 ].pageX - windowHalfX;
    //     mouseY = event.touches[ 0 ].pageY - windowHalfY;
    //   }
    // },
    // onDocumentTouchMove(event) {
    //   let windowHalfX = window.innerWidth / 2
    //   let windowHalfY = window.innerHeight / 2

    //   if ( event.touches.length === 1 ) {
    //     event.preventDefault();
    //     mouseX = event.touches[ 0 ].pageX - windowHalfX;
    //     mouseY = event.touches[ 0 ].pageY - windowHalfY;
    //   }
    // },
    onWindowResize () {
      // let windowHalfX = window.innerWidth / 2
      // let windowHalfY = window.innerHeight / 2
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate () {
      requestAnimationFrameId = requestAnimationFrame(this.animate)
      this.render()
    },
    render () {
      camera.position.x += (mouseX - camera.position.x) * 0.05
      // camera.position.y += ( - mouseY - camera.position.y ) * .05;
      camera.position.y = 364
      camera.lookAt(scene.position)

      let i = 0
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[ i++ ]
          particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50)
          particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2
        }
      }
  
      renderer.render(scene, camera)
      count += 0.1
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    document.removeEventListener('mousemove', onDocumentMouseMove, false)
    window.removeEventListener('resize', onWindowResize, false)
    cancelAnimationFrame(requestAnimationFrameId)
  }
}
</script>
