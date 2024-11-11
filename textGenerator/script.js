import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'


//Scene
const scene = new THREE.Scene()

//Canvas
const canvas = document.querySelector('canvas.webgl')

//Textures
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace


//Text Geometry

//Fonts
const fontLoader = new FontLoader()

let text = null

// Array of preloaded texts
const texts = ['Hey lunaa', 
    'Welcome to Three.js', 
    'Creative Coding', 
    'Interactive 3D World']

// Get a random index on page load
const randomIndex = Math.floor(Math.random() * texts.length)


const createText = (textValue) => {

    fontLoader.load('/fonts/helvetiker_regular.typeface.json',
        (font) => {
            const textGeometry = new TextGeometry(
                textValue,
                {
                    font,
                    size: 0.5,
                    depth: 0.2,
                    curveSegments: 5,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 4
                }
            )
            textGeometry.center()

            // Remove old text mesh
            if (text) scene.remove(text)

            const material = new THREE.MeshMatcapMaterial()
            material.matcap = matcapTexture
            text = new THREE.Mesh(textGeometry, material)
            scene.add(text)
        }
    )
}

createText(texts[randomIndex])

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
const camera = new THREE.PerspectiveCamera(120, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 2)
scene.add(camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    //Update controls
    controls.update()
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()