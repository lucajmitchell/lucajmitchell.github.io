
// ----------------------------

const model = 'tree'

// ----------------------------







// Tutorial/ChatGPT hell


import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Setup

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('model-container').appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 10);


// Scene content

// Ambient light for overall brightness
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Bright but not overpowering
scene.add(ambientLight);

// Directional light for depth and soft shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(10, 20, 10); // Position light above and to the side
directionalLight.castShadow = true;

// Configure shadow properties for softer shadows
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.bias = -0.001;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;

scene.add(directionalLight);

const loader = new GLTFLoader().setPath(`models/${model}/`);
loader.load('scene.gltf', (gltf) => {
    const mesh = gltf.scene;
    mesh.position.set(-1, -2, 0)
    scene.add(mesh);
});


// Utilities

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let mouseX = 0;

window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX - window.innerWidth / 2
});

function animate() {
    requestAnimationFrame(animate);
    scene.rotation.y = mouseX * 0.001
    renderer.render(scene, camera);
}

animate();