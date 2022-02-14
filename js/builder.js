import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//let burger = ['bread_top', 'bread_bottom'];

//RENDER
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('builder-canvas'),
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFFF);

//CAMERA
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 100)
camera.position.set(0,0,10);

//LIGHT
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//MODELOS
var ingredients = [];

const loader = new GLTFLoader();
loader.load( '/assets/models/Bread_Top.glb', function (gltf) {
	ingredients[0] = gltf.scene;
    ingredients[0].position.y = -1;
    scene.add(gltf.scene);
});

//ORBIT CONTROL
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = true;//set to false later

//ANIMATION LOOP
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();



//const container = document.getElementById('burger-container');
var bread_bottom;
function updateBurger(){
    for (var i = 0; i < ingredients.length; i++){
        ingredients[i].position.y = -i * 0.25 - 1;
    }
}

//ADD INGREDIENTS TO ARRAY
document.getElementById('burger-button').addEventListener('click', function(){
    loader.load( '/assets/models/Meat.glb', function (gltf) {
        ingredients.push(gltf.scene);
        scene.add(gltf.scene);
        updateBurger()
    });
});
document.getElementById('cheese-button').addEventListener('click', function(){
    loader.load( '/assets/models/Cheese.glb', function (gltf) {
        ingredients.push(gltf.scene);
        scene.add(gltf.scene);
        updateBurger()
    });
});
document.getElementById('lettuce-button').addEventListener('click', function(){
    loader.load( '/assets/models/Lettuce.glb', function (gltf) {
        ingredients.push(gltf.scene);
        scene.add(gltf.scene);
        updateBurger()
    });
});
document.getElementById('tomatos-button').addEventListener('click', function(){
    loader.load( '/assets/models/Tomatos.glb', function (gltf) {
        ingredients.push(gltf.scene);
        scene.add(gltf.scene);
        updateBurger()
    });
});

//RESTART
document.getElementById('restart').addEventListener('click', function(){
    burger = ['bread_top'];
    updateBurger();
})


// ******** ORDER ********
//POP UPS
const errorModal = document.getElementById('error-modal');
const thanksModal = document.getElementById('thanks-modal');
//OPEN POP UPS
document.getElementById('order').addEventListener('click', function(){
    ingredients.length > 1 ? thanksModal.classList.add('active') : errorModal.classList.add('active');
});
//CLOSE POP UPS
document.getElementById('close-thanks').addEventListener('click',function(){
    thanksModal.classList.remove('active');
})
document.getElementById('close-error').addEventListener('click',function(){
    errorModal.classList.toggle('active');
})
document.getElementById('back-error').addEventListener('click',function(){
    errorModal.classList.remove('active');
})
//look, i prefered the onClick function on html, but the module dont let me do that, so patience