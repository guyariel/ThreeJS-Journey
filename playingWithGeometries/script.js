import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const textures = [
    textureLoader.load('/textures/matcaps/1.png'),
    textureLoader.load('/textures/matcaps/2.png'),
    textureLoader.load('/textures/matcaps/3.png'),
    textureLoader.load('/textures/matcaps/4.png'),
    textureLoader.load('/textures/matcaps/5.png'),
    textureLoader.load('/textures/matcaps/6.png'),
    textureLoader.load('/textures/matcaps/7.png'),
    textureLoader.load('/textures/matcaps/8.png'),
    textureLoader.load('/textures/matcaps/9.png'),
]

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
scene.background = new THREE.Color('grey');
scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001)
scene.add(ambientLight)


/**
 * Objects
 */

const material = new THREE.MeshMatcapMaterial()

const numGeometries = 6
const radius = 4

const geometryGroup = new THREE.Group()
scene.add(geometryGroup)

//Box
debugObject.color = 'blue'
const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5, 2, 2, 2)
const box = new THREE.Mesh(boxGeometry, material)

box.position.set(Math.cos((1 / numGeometries) * Math.PI * 2) * radius, 0,
 Math.sin((1 / numGeometries) * Math.PI * 2) * radius)

const boxTweaks = gui.addFolder('Box')

boxTweaks
    .add(box, 'visible')
    .name('Box Visibility')

    
//Icosahedron
const icoGeometry = new THREE.IcosahedronGeometry(1, 0)
const ico = new THREE.Mesh(icoGeometry, material)

ico.position.set(Math.cos((2 / numGeometries) * Math.PI * 2) * radius, 0,
 Math.sin((2 / numGeometries) * Math.PI * 2) * radius)

const icoTweaks = gui.addFolder('Icosahedron')
icoTweaks
    .add(ico, 'visible')
    .name('Icosahedron Visibility')
 
//Sphere 
const sphereGeometry = new THREE.SphereGeometry(1, 12, 10)
const sphere = new THREE.Mesh(sphereGeometry, material) 

sphere.position.set(Math.cos((3 / numGeometries) * Math.PI * 2) * radius, 0,
 Math.sin((3 / numGeometries) * Math.PI * 2) * radius)

const sphereTweaks = gui.addFolder('Sphere')

sphereTweaks
    .add(sphere, 'visible')
    .name('Visibility')

//Torus
const torusGeometry = new THREE.TorusGeometry(0.7, 0.4, 12, 48)
const torus = new THREE.Mesh(torusGeometry, material) 

torus.position.set(Math.cos((4 / numGeometries) * Math.PI * 2) * radius, 0,
 Math.sin((4 / numGeometries) * Math.PI * 2) * radius)

const torusTweaks = gui.addFolder('Torus')

torusTweaks
    .add(torus, 'visible')
    .name('Visibility')

//Octahedron
const octaGeometry = new THREE.OctahedronGeometry(1,1)
const octa = new THREE.Mesh(octaGeometry, material) 

octa.position.set(Math.cos((5 / numGeometries) * Math.PI * 2) * radius, 0,
 Math.sin((5 / numGeometries) * Math.PI * 2) * radius)


const octaTweaks = gui.addFolder('Octahedron')

octaTweaks
    .add(octa, 'visible')
    .name('Visibility')

//Cone
const coneGeometry = new THREE.ConeGeometry(1, 1, 8)
const cone = new THREE.Mesh(coneGeometry, material) 
 
 cone.position.set(Math.cos((6 / numGeometries) * Math.PI * 2) * radius, 0,
  Math.sin((6 / numGeometries) * Math.PI * 2) * radius)

const coneTweaks = gui.addFolder('Cone')

coneTweaks
    .add(cone, 'visible')
    .name('Visibility')

geometryGroup.add(box, ico, sphere, torus, octa, cone)

geometryGroup.position.y = -5

//Ground
const ground = new THREE.Mesh( 
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.MeshPhongMaterial({color: 0xcbcbcb, depthWrite: false})

)
ground.rotation.x = - Math.PI / 2
ground.position.y = -11
ground.receiveShadow = true
scene.add(ground)


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
const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, 1, 500)
camera.position.set(3, -5, 19)
camera.rotation.x = - Math.PI / 6
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
//renderer.setClearColor('grey')
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Change Texture

const changeTexture = () => {
    const randomTexture = textures[Math.floor(Math.random() * textures.length)];
    randomTexture.colorSpace = THREE.SRGBColorSpace
    material.matcap = randomTexture;
    material.needsUpdate = true; 
};

gui.add({changeTexture}, 'changeTexture').name('Change Texture');

//Animation
const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.y = 0.2 * elapsedTime
    box.rotation.y = 0.2 * elapsedTime
    torus.rotation.y = 0.2 * elapsedTime
    octa.rotation.y = 0.2 * elapsedTime
    ico.rotation.y = 0.2 * elapsedTime
    cone.rotation.y = 0.2 * elapsedTime


    sphere.rotation.x = -0.2 * elapsedTime
    box.rotation.x = -0.2 * elapsedTime
    torus.rotation.x = -0.2 * elapsedTime
    octa.rotation.x = -0.2 * elapsedTime
    ico.rotation.x = -0.2 * elapsedTime
    cone.rotation.x = -0.2 * elapsedTime


    geometryGroup.rotation.y = 0.2 * elapsedTime

    //Update controls
    controls.update()

    //Render
    renderer.render(scene, camera)

    //Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
