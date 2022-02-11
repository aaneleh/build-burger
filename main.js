import './css/style.css'

import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


//STARTING SETUP
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas'),
})

//CAMERA
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(8,4,10); //direita/esquerda, baixo/cima, frente/tras

//LIGHT
const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(5,5,5);
scene.add(ambientLight);


//MEU MODELO
const loader = new GLTFLoader();

loader.load( './assets/models/Hamburger.glb', function ( gltf ) {
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );

//HELPERS
const gridHelper = new THREE.GridHelper(100,10);
scene.add(gridHelper);

//ORBIT CONTROL
const controls = new OrbitControls(camera, renderer.domElement);

//RENDERER
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//ANIMATION LOOP
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();