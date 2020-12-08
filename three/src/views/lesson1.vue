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

let scene = null
let camera = null
let renderer = null
let spotLight = null
let axes = null
let plane = null
let cube = null
let sphere = null
let step = 0
let stats = null
let controls = null
let gui = null
let requestAnimationFrameId = null


export default {
  name: 'lesson1',
  methods: {
    init () {
      this.statsInit()

      // 场景
      scene = new THREE.Scene()

      // 相机
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.x = -30
      camera.position.y = 40
      camera.position.z = 30
      camera.lookAt(scene.position)

      // 渲染器
      renderer = new THREE.WebGLRenderer()
      renderer.setClearColor(new THREE.Color(0xEEEEEE))
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.shadowMapEnabled = true // 开启 允许阴影映射

      // 添加光源
      spotLight = new THREE.SpotLight(0xffffff)
      spotLight.position.set(-40, 60, -10)
      // 开启阴影光源
      spotLight.castShadow = true
      scene.add(spotLight)

      // 坐标对象
      axes = new THREE.AxisHelper(20)
      scene.add(axes)

      let planeGeometry = new THREE.PlaneGeometry(60, 20)
      // let planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
      let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
      plane = new THREE.Mesh(planeGeometry, planeMaterial)
      plane.rotation.x = -0.5 * Math.PI
      plane.position.x = 15
      plane.position.y = 0
      plane.position.z = 0
      plane.receiveShadow = true // 开启阴影
      scene.add(plane)

      let cubeGeometry = new THREE.BoxGeometry(4, 4, 4) // 立方体
      // let cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
      let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
      cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      cube.position.x = -4
      cube.position.y = 3
      cube.position.z = 0
      // 开启阴影
      cube.castShadow = true
      scene.add(cube)

      let sphereGeometry = new THREE.SphereGeometry(4, 20, 20) // 球形
      // let sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
      let sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff })
      sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      sphere.position.x = 20
      sphere.position.y = 4
      sphere.position.z = 2
      // 开启阴影
      sphere.castShadow = true
      scene.add(sphere)

      this.$refs.three.appendChild(renderer.domElement)
      gui = new dat.GUI()
      controls = new Controls()
      gui.add(controls, 'rotationSpeed', 0, 0.5)
      gui.add(controls, 'bouncingSpeed', 0, 0.5)

      this.renderScene()
    },
    renderScene () {
      stats.update()
      cube.rotation.x += controls.rotationSpeed
      cube.rotation.y += controls.rotationSpeed
      cube.rotation.z += controls.rotationSpeed

      step += controls.bouncingSpeed

      sphere.position.x = 20 + (10 * (Math.cos(step)))
      sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)))

      requestAnimationFrameId = requestAnimationFrame(this.renderScene)
      renderer.render(scene, camera)
    },
    statsInit () {
      stats = new Stats()
      stats.setMode(0) // 0: fps, 1: ms
      this.$refs.stats.appendChild(stats.domElement)
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy() {
    cancelAnimationFrame(requestAnimationFrameId)
    gui.domElement.remove()
  }
}
</script>
