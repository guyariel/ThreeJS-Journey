import * as THREE from 'three'

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
    width: 800,
    height: 600
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)


//Rendering
const renderer = new THREE.WebGLRenderer(
{   
    canvas : canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
