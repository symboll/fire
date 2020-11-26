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

class CubePoint {
  constructor (x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
}
class Controls {
  constructor (scene, mesh) {
    this.scene = scene
    this.mesh = mesh
  }
  clone () {
    let clonedGeometry = this.mesh.children[0].geometry.clone()
    let materials = [
      new THREE.MeshLambertMaterial({ opacity: 0.6, color: 0xff44ff, transparent: true }),
      new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
    ]
    let mesh2 = THREE.SceneUtils.createMultiMaterialObject(clonedGeometry, materials)
    mesh2.children.forEach(e => {
      e.castShadow = true
    })

    mesh2.translateX(5)
    mesh2.translateZ(5)
    mesh2.name = 'clone'
    this.scene.remove(this.scene.getObjectByName('clone'))
    this.scene.add(mesh2)
  }
}

export default {
  name: 'lesson3',
  data () {
    return {
      scene: null,
      camera: null,
      renderer: null,
      spotLight: null,
      plane: null,
      step: 0,
      mesh: null,
      controlPoints: [],

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
      // this.camera.lookAt(new THREE.Vector3(5,0,0));

      // 渲染器
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setClearColor(new THREE.Color(0xEEEEEE)) // 设置renderer 的背景色
      this.renderer.setSize(window.innerWidth, window.innerHeight) // 设置renderer 的视图大小
      this.renderer.shadowMapEnabled = true // 开启阴影

      // 聚光灯光源
      this.spotLight = new THREE.SpotLight(0xffffff)
      this.spotLight.position.set(-40, 60, 10)
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

      this.$refs.three.appendChild(this.renderer.domElement)

      this.step = 0

      let vertices = [
        new THREE.Vector3(1, 3, 1),
        new THREE.Vector3(1, 3, -1),
        new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 3, -1),
        new THREE.Vector3(-1, 3, 1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(-1, -1, 1)
      ]

      let faces = [
        new THREE.Face3(0, 2, 1),
        new THREE.Face3(2, 3, 1),
        new THREE.Face3(4, 6, 5),
        new THREE.Face3(6, 7, 5),
        new THREE.Face3(4, 5, 1),
        new THREE.Face3(5, 0, 1),
        new THREE.Face3(7, 6, 2),
        new THREE.Face3(6, 3, 2),
        new THREE.Face3(5, 7, 0),
        new THREE.Face3(7, 2, 0),
        new THREE.Face3(1, 3, 4),
        new THREE.Face3(3, 6, 4)
      ]

      let geom = new THREE.Geometry()
      geom.vertices = vertices
      geom.faces = faces
      geom.computeFaceNormals()

      let materials = [
        new THREE.MeshLambertMaterial({ opacity: 0.6, color: 0x44ff44, transparent: true }),
        new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
      ]

      this.mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials)
      this.mesh.children.forEach(e => {
        e.castShadow = true
      })

      this.scene.add(this.mesh)

      this.controlPoints.push(new CubePoint(3, 5, 3))
      this.controlPoints.push(new CubePoint(3, 5, 0))
      this.controlPoints.push(new CubePoint(3, 0, 3))
      this.controlPoints.push(new CubePoint(3, 0, 0))
      this.controlPoints.push(new CubePoint(0, 5, 0))
      this.controlPoints.push(new CubePoint(0, 5, 3))
      this.controlPoints.push(new CubePoint(0, 0, 0))
      this.controlPoints.push(new CubePoint(0, 0, 3))

      this.gui = new dat.GUI()
      this.controls = new Controls(this.scene, this.mesh)
      this.gui.add(this.controls, 'clone')

      for (var i = 0; i < 8; i++) {
        let f1 = this.gui.addFolder('Vertices ' + (i + 1))
        f1.add(this.controlPoints[i], 'x', -10, 10)
        f1.add(this.controlPoints[i], 'y', -10, 10)
        f1.add(this.controlPoints[i], 'z', -10, 10)
      }

      this.renderScene()
    },
    renderScene () {
      this.stats.update()
      let vertices = []
      for (var i = 0; i < 8; i++) {
        vertices.push(new THREE.Vector3(this.controlPoints[i].x, this.controlPoints[i].y, this.controlPoints[i].z))
      }

      this.mesh.children.forEach(e => {
        e.geometry.vertices = vertices
        e.geometry.verticesNeedUpdate = true
        e.geometry.computeFaceNormals()
      })
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
  beforeDestroy () {
    cancelAnimationFrame(this.requestAnimationFrameId)
    this.gui.domElement.remove()
  }
}
</script>
