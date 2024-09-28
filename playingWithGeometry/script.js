import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('canvas.webgl');

//Scene
const scene = new THREE.Scene()

//Objects
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshBasicMaterial({color : 'blue'})
const box = new THREE.Mesh(boxGeometry, boxMaterial)


scene.add(box)

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Resize Event
window.addEventListener('resize', () => {

    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

//Orbit Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


//Rendering
const renderer = new THREE.WebGLRenderer(
{   
    canvas : canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//Animation
const tick = () => {

    //Update controls
    controls.update()

    //Render
    renderer.render(scene, camera)

    //Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
