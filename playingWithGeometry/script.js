import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('canvas.webgl');

//Scene
const scene = new THREE.Scene()

//Axes Helpers
const axesHelpers = new THREE.AxesHelper();
//scene.add(axesHelpers)

/**
 * Objects
 */
const numGeometries = 8
const radius = 5

const geometryGroup = new THREE.Group()
scene.add(geometryGroup)

//Box
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color : 'red'})
)
box.position.set(Math.cos((1 / numGeometries) * Math.PI * 2) * radius, 0,
 Math.sin((1 / numGeometries) * Math.PI * 2) * radius)

//Cone
const cone = new THREE.Mesh(
    new THREE.ConeGeometry(1, 1, 3),
    new THREE.MeshBasicMaterial({color : 'blue'})
)
cone.position.set(Math.cos((2 / numGeometries) * Math.PI * 2) * radius, 0,
 Math.sin((2 / numGeometries) * Math.PI * 2) * radius)



geometryGroup.add(box, cone)


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

//Fullscreen renderer
window.addEventListener('dblclick', () => {

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        //if the web browser supports requestFullscreen
        if (canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        // if not let's check webkitRequestFullscreen
        else if (canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else 
    {
        //Same for exit fullscreen
        if (document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if (document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
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
