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

//Debug object
const debugObject = {}

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

boxTweaks
    .addColor(debugObject, 'color')
    .onChange(() => {
        boxMaterial.color.set(debugObject.color)
    })
    .name('Color')

debugObject.subdivision = 2
boxTweaks
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() => {
        
        box.geometry.dispose()
        box.geometry = new THREE.BoxGeometry(
            1.5, 1.5, 1.5, 
            debugObject.subdivision, debugObject.subdivision, debugObject.subdivision)

    })
    .name('Subdivision')


//Icosahedron
const icoGeometry = new THREE.IcosahedronGeometry(1, 0)
const icoMaterial = new THREE.MeshBasicMaterial({color : debugObject.color})
icoMaterial.wireframe = true
const ico = new THREE.Mesh(icoGeometry, icoMaterial)

ico.position.set(Math.cos((2 / numGeometries) * Math.PI * 2) * radius, 0,
 Math.sin((2 / numGeometries) * Math.PI * 2) * radius)

const icoTweaks = gui.addFolder('Icosahedron')
icoTweaks
    .add(ico, 'visible')
    .name('Icosahedron Visibility')
 
icoTweaks
    .add(icoMaterial, 'wireframe')
    .name('Wireframe')
 
icoTweaks
    .addColor(debugObject, 'color')
    .onChange(() => {
        icoMaterial.color.set(debugObject.color)
    })
    .name('Color')
 
debugObject.details = 1
icoTweaks
    .add(debugObject, 'details')
    .min(0)
    .max(4)
    .step(1)
    .onFinishChange(() => {     
        ico.geometry.dispose()
        ico.geometry = new THREE.IcosahedronGeometry(1, debugObject.details)
    })
    .name('Subdivision')

//Sphere 
const sphereGeometry = new THREE.SphereGeometry(1, 12, 10)
const sphereMaterial = new THREE.MeshBasicMaterial({color: debugObject.color})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial) 
sphereMaterial.wireframe = true

sphere.position.set(Math.cos((3 / numGeometries) * Math.PI * 2) * radius, 0,
 Math.sin((3 / numGeometries) * Math.PI * 2) * radius)


//Torus
const torusGeometry = new THREE.TorusGeometry(0.7, 0.4, 12, 48)
const torusMaterial = new THREE.MeshBasicMaterial({color: debugObject.color})
const torus = new THREE.Mesh(torusGeometry, torusMaterial) 
torusMaterial.wireframe = true

torus.position.set(Math.cos((4 / numGeometries) * Math.PI * 2) * radius, 0,
 Math.sin((4 / numGeometries) * Math.PI * 2) * radius)


//Octahedron
const octaGeometry = new THREE.OctahedronGeometry(1,1)
const octaMaterial = new THREE.MeshBasicMaterial({color: debugObject.color})
const octa = new THREE.Mesh(octaGeometry, octaMaterial) 
octaMaterial.wireframe = true

octa.position.set(Math.cos((5 / numGeometries) * Math.PI * 2) * radius, 0,
 Math.sin((5 / numGeometries) * Math.PI * 2) * radius)

geometryGroup.add(box, ico, sphere, torus, octa)



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
renderer.setClearColor('grey')
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//Animation

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.y = 0.2 * elapsedTime
    box.rotation.y = 0.2 * elapsedTime
    torus.rotation.y = 0.2 * elapsedTime
    octa.rotation.y = 0.2 * elapsedTime
    ico.rotation.y = 0.2 * elapsedTime

    sphere.rotation.x = -0.2 * elapsedTime
    box.rotation.x = -0.2 * elapsedTime
    torus.rotation.x = -0.2 * elapsedTime
    octa.rotation.x = -0.2 * elapsedTime
    ico.rotation.x = -0.2 * elapsedTime

    geometryGroup.rotation.y = 0.2 * elapsedTime

    //Update controls
    controls.update()

    //Render
    renderer.render(scene, camera)

    //Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
