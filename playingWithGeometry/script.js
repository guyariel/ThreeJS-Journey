import * as THREE from 'three'

const canvas = document.querySelector('canvas.webgl');

//Scene
const scene = new THREE.Scene()

//Objects
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshBasicMaterial({color : 'blue'})
const box = new THREE.Mesh(boxGeometry, boxMaterial)


//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

//Rendering
const renderer = new THREE.WebGLRenderer(
{   
    canvas : canvas
})

