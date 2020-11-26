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

export default {
  name: 'lesson2',
  data () {
    return {
      scene: null,
      camera: null,
      renderer: null,
      spotLight: null,
      ambientLight: null,
      axes: null,
      plane: null,
      sphere: null,
      // cube:null,
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
      this.renderer.setClearColor(new THREE.Color(0xEEEEEE)) // 设置renderer 的背景色
      this.renderer.setSize(window.innerWidth, window.innerHeight) // 设置renderer 的视图大小
      this.renderer.shadowMapEnabled = true // 开启阴影

      // 聚光灯光源
      this.spotLight = new THREE.SpotLight(0xffffff)
      this.spotLight.position.set(-40, 60, -10)
      this.spotLight.castShadow = true
      this.scene.add(this.spotLight)

      // 环境光
      this.ambientLight = new THREE.AmbientLight(0x0c0c0c)
      this.scene.add(this.ambientLight)

      // 坐标对象
      // this.axes = new THREE.AxisHelper(20);
      // this.scene.add(this.axes);

      // 添加平面plane
      let planeGeometry = new THREE.PlaneGeometry(60, 40)
      let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
      this.plane = new THREE.Mesh(planeGeometry, planeMaterial)
      this.plane.receiveShadow = true // 开启接收阴影
      this.plane.rotation.x = -0.5 * Math.PI
      this.plane.position.x = 0
      this.plane.position.y = 0
      this.plane.position.z = 0
      this.scene.add(this.plane)

      // 增加雾化
      // this.scene.fog = new THREE.Fog( 0xffffff, 0.015,100);
      this.scene.fog = new THREE.FogExp2(0xffffff, 0.015)

      // 设置所有物体的材质
      // this.scene.overrideMaterial = new THREE.MeshLambertMaterial({color: 0xfffff0})

      // 增加球体
      let sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
      // let sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff})
      let sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff })
      this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      this.sphere.position.x = 10
      this.sphere.position.y = 10
      this.sphere.position.z = 10
      this.scene.add(this.sphere)

      this.$refs.three.appendChild(this.renderer.domElement)

      this.step = 0

      this.controls = new Controls(this.scene, planeGeometry)
      this.gui = new dat.GUI()
      this.gui.add(this.controls, 'rotationSpeed', 0, 0.5)
      this.gui.add(this.controls, 'addCube')
      this.gui.add(this.controls, 'removeCube')
      this.gui.add(this.controls, 'outputObjects')
      this.gui.add(this.controls, 'numberOfObjects').listen()

      this.renderScene()
    },
    renderScene () {
      this.stats.update()
      // scene.traverse  这个方法 还未查 什么功能
      this.scene.traverse((e) => {
        if (e instanceof THREE.Mesh && e !== this.plane) {
          e.rotation.x += this.controls.rotationSpeed
          e.rotation.y += this.controls.rotationSpeed
          e.rotation.z += this.controls.rotationSpeed
        }
      })
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
  beforeDestroy () {
    cancelAnimationFrame(this.requestAnimationFrameId)
    this.gui.domElement.remove()
  }
}
</script>
