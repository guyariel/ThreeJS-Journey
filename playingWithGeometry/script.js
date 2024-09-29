import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui'

/**
 * GUI
 */
const gui = new GUI({
    title: 'Geometries Controler',
    closeFolders: true
})
gui.close()

//Debug objects
const debugObject = {}
const debugIcosaObject = {}
const debugOctaObject = {}
const debugSphereObject = {}
const debugTorusObject = {}

const canvas = document.querySelector('canvas.webgl');

//Scene
const scene = new THREE.Scene()

//Axes Helpers
const axesHelpers = new THREE.AxesHelper();
//scene.add(axesHelpers)

/**
 * Objects
 */
const numGeometries = 5
const radius = 4

const geometryGroup = new THREE.Group()
scene.add(geometryGroup)

//Box
debugObject.color = 'blue'
const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5, 2, 2, 2)
const boxMaterial = new THREE.MeshBasicMaterial({color : debugObject.color})
boxMaterial.wireframe = true
const box = new THREE.Mesh(boxGeometry, boxMaterial)

box.position.set(Math.cos((1 / numGeometries) * Math.PI * 2) * radius, 0,
 Math.sin((1 / numGeometries) * Math.PI * 2) * radius)

const boxTweaks = gui.addFolder('Box')

boxTweaks
    .add(box, 'visible')
    .name('Box Visibility')

boxTweaks
    .add(boxMaterial, 'wireframe')
    .name('Wireframe')

//Icosahedron
const icoGeometry = new THREE.IcosahedronGeometry(1, 1)
const icoMaterial = new THREE.MeshBasicMaterial({color : debugObject.color})
icoMaterial.wireframe = true
const ico = new THREE.Mesh(icoGeometry, icoMaterial)
ico.position.set(Math.cos((2 / numGeometries) * Math.PI * 2) * radius, 0,
 Math.sin((2 / numGeometries) * Math.PI * 2) * radius)



geometryGroup.add(box, ico)


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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 1
camera.position.z = 10
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
