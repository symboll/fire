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


let scene = null
let camera = null
let renderer = null
let spotLight = null
// let axes = null
let plane = null
// let cube = null
// let sphere = null
let step = 0
let mesh = null
let controlPoints = []
let stats = null
let controls = null
let gui = null
let requestAnimationFrameId = null

export default {
  name: 'lesson3',
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
      // camera.lookAt(new THREE.Vector3(5,0,0));

      // 渲染器
      renderer = new THREE.WebGLRenderer()
      renderer.setClearColor(new THREE.Color(0xEEEEEE)) // 设置renderer 的背景色
      renderer.setSize(window.innerWidth, window.innerHeight) // 设置renderer 的视图大小
      renderer.shadowMapEnabled = true // 开启阴影

      // 聚光灯光源
      spotLight = new THREE.SpotLight(0xffffff)
      spotLight.position.set(-40, 60, 10)
      spotLight.castShadow = true
      scene.add(spotLight)

      // 添加平面plane
      let planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
      let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
      plane = new THREE.Mesh(planeGeometry, planeMaterial)
      plane.receiveShadow = true // 开启接收阴影
      plane.rotation.x = -0.5 * Math.PI
      plane.position.x = 0
      plane.position.y = 0
      plane.position.z = 0
      scene.add(plane)

      this.$refs.three.appendChild(renderer.domElement)

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

      mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials)
      mesh.children.forEach(e => {
        e.castShadow = true
      })

      scene.add(mesh)

      controlPoints.push(new CubePoint(3, 5, 3))
      controlPoints.push(new CubePoint(3, 5, 0))
      controlPoints.push(new CubePoint(3, 0, 3))
      controlPoints.push(new CubePoint(3, 0, 0))
      controlPoints.push(new CubePoint(0, 5, 0))
      controlPoints.push(new CubePoint(0, 5, 3))
      controlPoints.push(new CubePoint(0, 0, 0))
      controlPoints.push(new CubePoint(0, 0, 3))

      gui = new dat.GUI()
      controls = new Controls(scene, mesh)
      gui.add(controls, 'clone')

      for (var i = 0; i < 8; i++) {
        let f1 = gui.addFolder('Vertices ' + (i + 1))
        f1.add(controlPoints[i], 'x', -10, 10)
        f1.add(controlPoints[i], 'y', -10, 10)
        f1.add(controlPoints[i], 'z', -10, 10)
      }

      this.renderScene()
    },
    renderScene () {
      stats.update()
      let vertices = []
      for (var i = 0; i < 8; i++) {
        vertices.push(new THREE.Vector3(controlPoints[i].x, controlPoints[i].y, controlPoints[i].z))
      }

      mesh.children.forEach(e => {
        e.geometry.vertices = vertices
        e.geometry.verticesNeedUpdate = true
        e.geometry.computeFaceNormals()
      })
      requestAnimationFrameId = requestAnimationFrame(this.renderScene)
      renderer.render(scene, camera)
    },
    statsInit () {
      stats = new Stats()
      stats.setMode(0) // 0: fps, 1: ms
      // stats.domElement.style.position = 'absolute'
      // stats.domElement.style.left = '0px'
      // stats.domElement.style.top = '0px'

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
