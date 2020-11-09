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

export default {
  name: 'pointsWaves',
  data () {
    return {
      scene: null,
      camera: null,
      renderer: null,
      // cube:null,
      SEPARATION: 100,
      AMOUNTX: 50,
      AMOUNTY: 50,
      particles: [],
      particle: null,
      count: 0,
      mouseX: 0,
      mouseY: 0,
      requestAnimationFrameId: null
    }
  },
  methods: {
    init () {
      this.scene = new THREE.Scene()
      // this.scene.background = new THREE.Color(0xffffff)
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
      this.camera.position.z = 1000
      

      let i = 0
      for (let ix = 0; ix < this.AMOUNTX; ix++) {
        for (let iy = 0; iy < this.AMOUNTY; iy++) {
          this.particle = this.particles[ i++ ] = new THREE.Particle(material)
          this.particle.position.x = ix * this.SEPARATION - ((this.AMOUNTX * this.SEPARATION) / 2)
          this.particle.position.z = iy * this.SEPARATION - ((this.AMOUNTY * this.SEPARATION) / 2)
          this.scene.add(this.particle)
        }
      }

      this.renderer = new THREE.CanvasRenderer()
      this.renderer.setClearColor(new THREE.Color(0x111948))
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.$refs.pointsWaves.appendChild(this.renderer.domElement)

      document.addEventListener('mousemove', this.onDocumentMouseMove, false)
      // document.addEventListener( 'touchstart', this.onDocumentTouchStart, false );
      // document.addEventListener( 'touchmove', this.onDocumentTouchMove, false );
      window.addEventListener('resize', this.onWindowResize, false)
      this.animate()
    },
    onDocumentMouseMove (event) {
      let windowHalfX = window.innerWidth / 2
      let windowHalfY = window.innerHeight / 2

      this.mouseX = event.clientX - windowHalfX
      this.mouseY = event.clientY - windowHalfY
    },
    // onDocumentTouchStart(event) {
    //   let windowHalfX = window.innerWidth / 2
    //   let windowHalfY = window.innerHeight / 2

    //   if ( event.touches.length === 1 ) {
    //     event.preventDefault();
    //     this.mouseX = event.touches[ 0 ].pageX - windowHalfX;
    //     this.mouseY = event.touches[ 0 ].pageY - windowHalfY;
    //   }
    // },
    // onDocumentTouchMove(event) {
    //   let windowHalfX = window.innerWidth / 2
    //   let windowHalfY = window.innerHeight / 2

    //   if ( event.touches.length === 1 ) {
    //     event.preventDefault();
    //     this.mouseX = event.touches[ 0 ].pageX - windowHalfX;
    //     this.mouseY = event.touches[ 0 ].pageY - windowHalfY;
    //   }
    // },
    onWindowResize () {
      // let windowHalfX = window.innerWidth / 2
      // let windowHalfY = window.innerHeight / 2
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate () {
      this.requestAnimationFrameId = requestAnimationFrame(this.animate)
      this.render()
    },
    render () {
      this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05
      // this.camera.position.y += ( - this.mouseY - this.camera.position.y ) * .05;
      this.camera.position.y = 364
      this.camera.lookAt(this.scene.position)

      let i = 0
      for (let ix = 0; ix < this.AMOUNTX; ix++) {
        for (let iy = 0; iy < this.AMOUNTY; iy++) {
          this.particle = this.particles[ i++ ]
          this.particle.position.y = (Math.sin((ix + this.count) * 0.3) * 50) + (Math.sin((iy + this.count) * 0.5) * 50)
          this.particle.scale.x = this.particle.scale.y = (Math.sin((ix + this.count) * 0.3) + 1) * 2 + (Math.sin((iy + this.count) * 0.5) + 1) * 2
        }
      }
  
      this.renderer.render(this.scene, this.camera)
      this.count += 0.1
    }
  },
  mounted () {
    this.init()
  },
  destroyed () {
    document.removeEventListener('mousemove', this.onDocumentMouseMove, false)
    window.removeEventListener('resize', this.onWindowResize, false)
    cancelAnimationFrame(this.requestAnimationFrameId)
    this.scene = null
    this.camera = null
    this.renderer = null
    this.particles = null
    this.particle = null
  }
}
</script>
