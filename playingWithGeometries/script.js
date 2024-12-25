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
scene.background = new THREE.Color(0xa0a0a0);
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
const numGeometries = 6
const radius = 4

const geometryGroup = new THREE.Group()
scene.add(geometryGroup)

//Box
debugObject.color = 'blue'
const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5, 2, 2, 2)
const boxMaterial = new THREE.MeshStandardMaterial({color : debugObject.color})
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

const sphereTweaks = gui.addFolder('Sphere')

sphereTweaks
    .add(sphereMaterial,'wireframe')
    .name('Wireframe')

sphereTweaks
    .add(sphere, 'visible')
    .name('Visibility')

sphereTweaks
    .addColor(debugObject, 'color')
    .onChange(() => {
        sphereMaterial.color.set(debugObject.color)
    })
    .name('Color')

debugObject.widthSegments = 12
debugObject.heightSegments = 10 
sphereTweaks
    .add(debugObject, 'widthSegments')
    .min(3)
    .max(25)
    .step(1)
    .onFinishChange(() => {     
        sphere.geometry.dispose()
        sphere.geometry = new THREE.SphereGeometry(1, debugObject.widthSegments, 10)
    })
    .name('Width Segments')
sphereTweaks
    .add(debugObject, 'heightSegments')
    .min(2)
    .max(20)
    .step(1)
    .onFinishChange(() => {     
        sphere.geometry.dispose()
        sphere.geometry = new THREE.SphereGeometry(1, debugObject.widthSegments, debugObject.heightSegments)
    })
    .name('Height Segments')



//Torus
const torusGeometry = new THREE.TorusGeometry(0.7, 0.4, 12, 48)
const torusMaterial = new THREE.MeshBasicMaterial({color: debugObject.color})
const torus = new THREE.Mesh(torusGeometry, torusMaterial) 
torusMaterial.wireframe = true

torus.position.set(Math.cos((4 / numGeometries) * Math.PI * 2) * radius, 0,
 Math.sin((4 / numGeometries) * Math.PI * 2) * radius)

const torusTweaks = gui.addFolder('Torus')

torusTweaks
    .add(torusMaterial,'wireframe')
    .name('Wireframe')

torusTweaks
    .add(torus, 'visible')
    .name('Visibility')

torusTweaks
    .addColor(debugObject, 'color')
    .onChange(() => {
        torusMaterial.color.set(debugObject.color)
    })
    .name('Color')


//Octahedron
const octaGeometry = new THREE.OctahedronGeometry(1,1)
const octaMaterial = new THREE.MeshBasicMaterial({color: debugObject.color})
const octa = new THREE.Mesh(octaGeometry, octaMaterial) 
octaMaterial.wireframe = true

octa.position.set(Math.cos((5 / numGeometries) * Math.PI * 2) * radius, 0,
 Math.sin((5 / numGeometries) * Math.PI * 2) * radius)


const octaTweaks = gui.addFolder('Octahedron')

octaTweaks
    .add(octaMaterial,'wireframe')
    .name('Wireframe')

octaTweaks
    .add(octa, 'visible')
    .name('Visibility')

octaTweaks
    .addColor(debugObject, 'color')
    .onChange(() => {
        octaMaterial.color.set(debugObject.color)
    })
    .name('Color')


//Cone
 const coneGeometry = new THREE.ConeGeometry(1, 1, 8)
 const coneMaterial = new THREE.MeshBasicMaterial({color: debugObject.color})
 const cone = new THREE.Mesh(coneGeometry, coneMaterial) 
 coneMaterial.wireframe = true
 
 cone.position.set(Math.cos((6 / numGeometries) * Math.PI * 2) * radius, 0,
  Math.sin((6 / numGeometries) * Math.PI * 2) * radius)

const coneTweaks = gui.addFolder('Cone')
coneTweaks
    .add(coneMaterial,'wireframe')
    .name('Wireframe')

coneTweaks
    .add(cone, 'visible')
    .name('Visibility')

coneTweaks
    .addColor(debugObject, 'color')
    .onChange(() => {
        coneMaterial.color.set(debugObject.color)
    })
    .name('Color')

geometryGroup.add(box, ico, sphere, torus, octa, cone)

geometryGroup.position.y = -5

//Ground
const ground = new THREE.Mesh( 
    new THREE.PlaneGeometry(1000, 1000),
    //new THREE.MeshBasicMaterial({color: 'grey'}),
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
