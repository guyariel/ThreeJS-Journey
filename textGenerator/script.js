import * as THREE from 'three'

//Scene
const scene = new THREE.Scene()

//Canvas
const canvas = document.querySelector('canvas.webgl')

//Object
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: 'blue'})
const mesh = new THREE.Mesh(geometry, material)

mesh.position.set(0,0,0)

scene.add(mesh)

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//Camera
const camera = new THREE.PerspectiveCamera(85, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 2)
scene.add(camera)


//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera)