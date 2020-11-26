<template>
  <div>
    <div ref="stats"></div>
    <div ref="three"></div>
  </div>
</template>
<script>
import THREE from 'three'
import Stats from 'stats-js'
import * as dat from 'dat.gui'

class Controls {
  constructor () {
    this.rotationSpeed = 0.02
    this.bouncingSpeed = 0.03
  }
}

export default {
  name: 'lesson1',
  data () {
    return {
      scene: null,
      camera: null,
      renderer: null,
      spotLight: null,
      axes: null,
      plane: null,
      cube: null,
      sphere: null,
      step: 0,

      stats: null,
      controls: null,
      gui: null,
      requestAnimationFrameId: null
    }
  },
  methods: {
    init () {
      this.statsInit()

      // 场景
      this.scene = new THREE.Scene()

      // 相机
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.camera.position.x = -30
      this.camera.position.y = 40
      this.camera.position.z = 30
      this.camera.lookAt(this.scene.position)

      // 渲染器
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setClearColor(new THREE.Color(0xEEEEEE))
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.shadowMapEnabled = true // 开启 允许阴影映射

      // 添加光源
      this.spotLight = new THREE.SpotLight(0xffffff)
      this.spotLight.position.set(-40, 60, -10)
      // 开启阴影光源
      this.spotLight.castShadow = true
      this.scene.add(this.spotLight)

      // 坐标对象
      this.axes = new THREE.AxisHelper(20)
      this.scene.add(this.axes)

      let planeGeometry = new THREE.PlaneGeometry(60, 20)
      // let planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
      let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
      this.plane = new THREE.Mesh(planeGeometry, planeMaterial)
      this.plane.rotation.x = -0.5 * Math.PI
      this.plane.position.x = 15
      this.plane.position.y = 0
      this.plane.position.z = 0
      this.plane.receiveShadow = true // 开启阴影
      this.scene.add(this.plane)

      let cubeGeometry = new THREE.BoxGeometry(4, 4, 4) // 立方体
      // let cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
      let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
      this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      this.cube.position.x = -4
      this.cube.position.y = 3
      this.cube.position.z = 0
      // 开启阴影
      this.cube.castShadow = true
      this.scene.add(this.cube)

      let sphereGeometry = new THREE.SphereGeometry(4, 20, 20) // 球形
      // let sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
      let sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff })
      this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      this.sphere.position.x = 20
      this.sphere.position.y = 4
      this.sphere.position.z = 2
      // 开启阴影
      this.sphere.castShadow = true
      this.scene.add(this.sphere)

      this.$refs.three.appendChild(this.renderer.domElement)

      this.step = 0

      this.controls = new Controls()
      this.gui = new dat.GUI()
      this.gui.add(this.controls, 'rotationSpeed', 0, 0.5)
      this.gui.add(this.controls, 'bouncingSpeed', 0, 0.5)

      this.renderScene()
    },
    renderScene () {
      this.stats.update()
      this.cube.rotation.x += this.controls.rotationSpeed
      this.cube.rotation.y += this.controls.rotationSpeed
      this.cube.rotation.z += this.controls.rotationSpeed

      this.step += this.controls.bouncingSpeed

      this.sphere.position.x = 20 + (10 * (Math.cos(this.step)))
      this.sphere.position.y = 2 + (10 * Math.abs(Math.sin(this.step)))

      this.requestAnimationFrameId = requestAnimationFrame(this.renderScene)
      this.renderer.render(this.scene, this.camera)
    },
    statsInit () {
      this.stats = new Stats()
      this.stats.setMode(0) // 0: fps, 1: ms
      this.$refs.stats.appendChild(this.stats.domElement)
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy() {
    cancelAnimationFrame(this.requestAnimationFrameId)
    this.gui.domElement.remove()
  }
}
</script>
