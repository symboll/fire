<template>
  <div>
    <div ref="stats"></div>
    <div ref="three"></div>
  </div>
</template>
<script>
import THREE from 'three'
import Stats from 'stats-js'
// import * as dat from 'dat.gui'
import ConvexGeometry from '@/lib/ConvexGeometry'
import '@/lib/ParametricGeometries'
export default {
  name: 'lesson4',
  data () {
    return {
      scene: null,
      camera: null,
      renderer: null,
      spotLight: null,
      ambientLight: null,

      plane: null,
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
      this.camera.position.x = -50
      this.camera.position.y = 40
      this.camera.position.z = 20
      // this.camera.lookAt(this.scene.position);
      this.camera.lookAt(new THREE.Vector3(-10, 0, 0))

      // 渲染器
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0)) // 设置renderer 的背景色
      this.renderer.setSize(window.innerWidth, window.innerHeight) // 设置renderer 的视图大小
      this.renderer.shadowMapEnabled = true // 开启阴影

      // 环境光
      this.ambientLight = new THREE.AmbientLight(0x090909)
      this.scene.add(this.ambientLight)

      // 聚光灯光源
      this.spotLight = new THREE.SpotLight(0xffffff)
      this.spotLight.position.set(-40, 40, 50)
      this.spotLight.castShadow = true
      this.scene.add(this.spotLight)

      // 添加平面plane
      let planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
      let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
      this.plane = new THREE.Mesh(planeGeometry, planeMaterial)
      this.plane.receiveShadow = true // 开启接收阴影
      this.plane.rotation.x = -0.5 * Math.PI
      this.plane.position.x = 0
      this.plane.position.y = 0
      this.plane.position.z = 0
      this.scene.add(this.plane)

      this.addGeometries(this.scene)
      this.$refs.three.appendChild(this.renderer.domElement)

      this.step = 0
      this.renderScene()
    },
    addGeometries (scene) {
      let geoms = []
      geoms.push(new THREE.CylinderGeometry(1, 4, 4))
      // basic cube
      geoms.push(new THREE.BoxGeometry(2, 2, 2))
      // basic spherer
      geoms.push(new THREE.SphereGeometry(2))
      geoms.push(new THREE.IcosahedronGeometry(4))

      let points = [
        new THREE.Vector3(2, 2, 2),
        new THREE.Vector3(2, 2, -2),
        new THREE.Vector3(-2, 2, -2),
        new THREE.Vector3(-2, 2, 2),
        new THREE.Vector3(2, -2, 2),
        new THREE.Vector3(2, -2, -2),
        new THREE.Vector3(-2, -2, -2),
        new THREE.Vector3(-2, -2, 2)
      ]
      geoms.push(new ConvexGeometry(points))

      let pts = []// points array - the path profile points will be stored here
      let detail = 0.1// half-circle detail - how many angle increments will be used to generate points
      let radius = 3 // radius for half_sphere
      for (let angle = 0.0; angle < Math.PI; angle += detail) { // loop from 0.0 radians to PI (0 - 180 degrees)
        pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
      }// angle/radius to x,z
      geoms.push(new THREE.LatheGeometry(pts, 12))

      geoms.push(new THREE.OctahedronGeometry(3))

      geoms.push(new THREE.ParametricGeometry(THREE.ParametricGeometries.mobius3d, 20, 10))
      geoms.push(new THREE.TetrahedronGeometry(3))
      geoms.push(new THREE.TorusGeometry(3, 1, 10, 10))
      geoms.push(new THREE.TorusKnotGeometry(3, 0.5, 50, 20))

      let j = 0
      for (let i = 0; i < geoms.length; i++) {
        // let cubeMaterial = new THREE.MeshLambertMaterial({ wireframe: true, color: Math.random() * 0xffffff })

        let materials = [
          new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff, shading: THREE.FlatShading }),
          new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
        ]

        let mesh = THREE.SceneUtils.createMultiMaterialObject(geoms[i], materials)
        mesh.traverse(function (e) {
          e.castShadow = true
        })

        // var mesh = new THREE.Mesh(geoms[i],materials[i]);
        // mesh.castShadow=true;
        mesh.position.x = -24 + ((i % 4) * 12)
        mesh.position.y = 4
        mesh.position.z = -8 + (j * 12)

        if ((i + 1) % 4 === 0) j++
        scene.add(mesh)
      }
    },
    renderScene () {
      this.stats.update()
      this.requestAnimationFrameId = requestAnimationFrame(this.renderScene)
      this.renderer.render(this.scene, this.camera)
    },
    statsInit () {
      this.stats = new Stats()
      this.stats.setMode(0) // 0: fps, 1: ms
      // this.stats.domElement.style.position = 'absolute'
      // this.stats.domElement.style.left = '0px'
      // this.stats.domElement.style.top = '0px'

      this.$refs.stats.appendChild(this.stats.domElement)
    }
  },
  mounted () {
    this.init()
  },
  destroyed () {
    cancelAnimationFrame(this.requestAnimationFrameId)
    // this.gui.domElement.remove()
    this.scene = null
    this.camera = null
    this.renderer = null
    this.spotLight = null
    this.ambientLight = null

    this.plane = null
    this.step = 0
    this.stats = null
    this.controls = null
  }
}
</script>
