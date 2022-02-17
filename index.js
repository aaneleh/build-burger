import './css/style.css';
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//SIDEBAR
const sidebar_buttons = document.getElementsByClassName('toggleSidebar');
for(var i = 0; i < sidebar_buttons.length; i++){
    sidebar_buttons[i].addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    });
}

//STARTING SETUP
const scene = new THREE.Scene();

//RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas'),
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//CAMERA
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 100)
camera.position.set(0,2,5);

//LIGHT
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
scene.background = new THREE.Color(0xFFFFFF);

//MEU MODELO
var model;
const loader = new GLTFLoader();

//https://github.com/aaneleh/build-burger/blob/main/assets/models/Home.glb
//'/assets/models/Home.glb'

loader.load( 'https://github.com/aaneleh/build-burger/blob/main/assets/models/Home.glb', function (gltf) {
    model = ngltf.scene;
    scene.add(gltf.scene);
});

//ORBIT CONTROL
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;

//ANIMATION LOOP
function animate(){
    requestAnimationFrame(animate);
    model.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
}

animate();