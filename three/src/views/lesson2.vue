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
  constructor (scene, planeGeometry) {
    this.scene = scene
    this.planeGeometry = planeGeometry
    this.rotationSpeed = 0.02
    this.numberOfObjects = scene.children.length
  }
  removeCube () {
    let allChildren = this.scene.children
    let lastObject = allChildren[allChildren.length - 1]
    if (lastObject instanceof THREE.Mesh) {
      this.scene.remove(lastObject)
      this.numberOfObjects = this.scene.children.length
    }
  }
  addCube () {
    let cubeSize = Math.ceil((Math.random() * 3))
    let cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
    let cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.castShadow = true // 开启阴影
    cube.name = 'cube-' + this.scene.children.length

    cube.position.x = -30 + Math.round((Math.random() * this.planeGeometry.parameters.width))
    cube.position.y = Math.round((Math.random() * 5))
    cube.position.z = -20 + Math.round((Math.random() * this.planeGeometry.parameters.height))
    // add the cube to the scene
    this.scene.add(cube)
    this.numberOfObjects = this.scene.children.length
  }
  outputObjects () {
    console.log(this.scene.children)
  }
}

let scene = null
let camera = null
let renderer = null
let spotLight = null
let ambientLight = null
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
  name: 'lesson2',
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
      renderer.setClearColor(new THREE.Color(0xEEEEEE)) // 设置renderer 的背景色
      renderer.setSize(window.innerWidth, window.innerHeight) // 设置renderer 的视图大小
      renderer.shadowMapEnabled = true // 开启阴影

      // 聚光灯光源
      spotLight = new THREE.SpotLight(0xffffff)
      spotLight.position.set(-40, 60, -10)
      spotLight.castShadow = true
      scene.add(spotLight)

      // 环境光
      ambientLight = new THREE.AmbientLight(0x0c0c0c)
      scene.add(ambientLight)

      // 坐标对象
      axes = new THREE.AxisHelper(20);
      scene.add(axes);

      // 添加平面plane
      let planeGeometry = new THREE.PlaneGeometry(60, 40)
      let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
      plane = new THREE.Mesh(planeGeometry, planeMaterial)
      plane.receiveShadow = true // 开启接收阴影
      plane.rotation.x = -0.5 * Math.PI
      plane.position.x = 0
      plane.position.y = 0
      plane.position.z = 0
      scene.add(plane)

      // 增加雾化
      // scene.fog = new THREE.Fog( 0xffffff, 0.015,100);
      scene.fog = new THREE.FogExp2(0xffffff, 0.015)

      // 设置所有物体的材质
      // scene.overrideMaterial = new THREE.MeshLambertMaterial({color: 0xfffff0})

      // 增加球体
      let sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
      // let sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff})
      let sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff })
      sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      sphere.position.x = 10
      sphere.position.y = 10
      sphere.position.z = 10
      scene.add(sphere)

      this.$refs.three.appendChild(renderer.domElement)

      controls = new Controls(scene, planeGeometry)
      gui = new dat.GUI()
      gui.add(controls, 'rotationSpeed', 0, 0.5)
      gui.add(controls, 'addCube')
      gui.add(controls, 'removeCube')
      gui.add(controls, 'outputObjects')
      gui.add(controls, 'numberOfObjects').listen()

      this.renderScene()
    },
    renderScene () {
      stats.update()
      // scene.traverse  这个方法 还未查 什么功能
      scene.traverse((e) => {
        if (e instanceof THREE.Mesh && e !== plane) {
          e.rotation.x += controls.rotationSpeed
          e.rotation.y += controls.rotationSpeed
          e.rotation.z += controls.rotationSpeed
        }
      })
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
  beforeDestroy () {
    cancelAnimationFrame(requestAnimationFrameId)
    gui.domElement.remove()
  }
}
</script>
