<template>
  <div>
    <!-- <div ref="stats"></div> -->
    <div ref="retina"></div>
  </div>
</template>
<script>
import THREE from 'three'
// import Stats from 'stats-js'
// import * as dat from 'dat.gui'

// class Controls {
//   constructor () {
//     this.rotationSpeed = 0.02
//     this.bouncingSpeed = 0.03
//   }
// }

export default {
  name: 'lesson5',
  data () {
    return {
      height: 0,
      width: 0,
      scene: null,
      camera: null,
      renderer: null,
      pointLight: null,
      ambientLight: null,

      spotLight: null,
      axes: null,
      plane: null,
      cube: null,
      sphere: null,
      step: 0

      // stats: null,
      // controls: null,
      // gui: null,
      // requestAnimationFrameId: null
    }
  },
  methods: {
    initRender () {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true // 抗锯齿开启
      })
      this.renderer.setSize(this.width, this.height)// 设置渲染器宽度和高度
      this.renderer.setClearColor('#000000', 1.0)// 设置背景颜色
      // this.renderer.setPixelRatio(window.devicePixelRatio)// 设置设备像素比
      // document.getElementById('retina').appendChild(this.renderer.domElement)// 把渲染器放置到页面中
      this.$refs.retina.appendChild(this.renderer.domElement)
    },
    initCamera () {
      let origPoint = new THREE.Vector3(0, 0, 0)// 原点
      this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000)
      this.camera.position.set(200, 400, 600)// 设置相机位置
      this.camera.up.set(0, 1, 0)// 设置相机正方向
      this.camera.lookAt(origPoint)// 设置相机视点
    },
    initLight () {
      // 点光源
      this.pointLight = new THREE.PointLight(0xffffff, 1, 2000)
      this.pointLight.position.set(70, 112, 98)
      // 环境光
      this.ambientLight = new THREE.AmbientLight(0x333333)
    },
    initObject () {
      let geometry = new THREE.BoxGeometry(100, 100, 100)
      let material = new THREE.MeshLambertMaterial({ color: 0xff0000 })
      this.cube = new THREE.Mesh(geometry, material)
      this.cube.position.set(0, 0, 0)
    },
    initScene () {
      this.scene = new THREE.Scene()
      this.scene.add(this.pointLight)
      this.scene.add(this.ambientLight)
      this.scene.add(this.cube)
    },
    render () {
      this.renderer.clear()
      this.renderer.render(this.scene, this.camera)
      this.cube.rotation.x += 0.005
      this.cube.rotation.y += 0.005
      requestAnimationFrame(this.render)
    }
  },
  mounted () {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.initRender() // 创建渲染器
    this.initCamera() // 创建相机
    this.initLight() // 创建光源
    this.initObject() // 创建物体
    this.initScene()// 创建场景
    this.render()// 渲染
  },
  destroyed () {

  }
}
</script>
