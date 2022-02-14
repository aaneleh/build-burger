import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//STARTING SETUP
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas'),
})

//CAMERA
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 100)
camera.position.set(2,2,5);

//LIGHT
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//MEU MODELO
const loader = new GLTFLoader();

loader.load( '/assets/models/Home.glb', function (gltf) {
	scene.add(gltf.scene);
});

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