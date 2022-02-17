import {OrbitControls} from './OrbitControls.js';
import {GLTFLoader} from './GLTFLoader.js';

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
    canvas: document.getElementById('main-canvas'),
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

loader.load( './assets/models/Home.glb', function (gltf) {
    model = gltf.scene;
    scene.add(gltf.scene);
});

//ORBIT CONTROL
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;



//RENDER
const builder_renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('builder-canvas'),
})
builder_renderer.setPixelRatio(window.devicePixelRatio);
builder_renderer.setSize(window.innerWidth, window.innerHeight);

//SCENE
const builder_scene = new THREE.Scene();
builder_scene.background = new THREE.Color(0xFFFFFF);

//CAMERA
const builder_camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 100)
builder_camera.position.set(0,0,10);

//LIGHT
const builderLight = new THREE.AmbientLight(0xffffff);
builder_scene.add(builderLight);

//MODELOS
var ingredients = [];

loader.load( '/assets/models/Bread_Top.glb', function (gltf) {
	ingredients[0] = gltf.scene;
    ingredients[0].position.y = -0.5;
    builder_scene.add(gltf.scene);
});
loader.load( '/assets/models/Bread_Bottom.glb', function (gltf) {
	ingredients[1] = gltf.scene;
    ingredients[1].position.y = -1.5;
    builder_scene.add(gltf.scene);
});

//ORBIT CONTROL
const builder_controls = new OrbitControls(camera, builder_renderer.domElement);
builder_controls.enablePan = false;



function updateBurger(){
    //i=2 para ignorar os dois pães
    for (var i = 2; i <= ingredients.length; i++){
        //if is the last loop, move the bread
        if (i == ingredients.length){
            ingredients[1].position.y = -i * 0.25 - 0.5;

        //moving all the others ingredients
        } else {
            ingredients[i].position.y = -i * 0.25 - 0.5;
        }
    }
    //if there are to many ingredients move the camera also
    if(ingredients.length >= 6){
        camera.position.z += 1;
    }
}

//ADD INGREDIENTS TO ARRAY
document.getElementById('burger-button').addEventListener('click', function(){
    loader.load( '/assets/models/Meat.glb', function (gltf) {
        ingredients.push(gltf.scene);
        builder_scene.add(gltf.scene);
        updateBurger()
    });
});
document.getElementById('cheese-button').addEventListener('click', function(){
    loader.load( '/assets/models/Cheese.glb', function (gltf) {
        ingredients.push(gltf.scene);
        builder_scene.add(gltf.scene);
        updateBurger()
    });
});
document.getElementById('lettuce-button').addEventListener('click', function(){
    loader.load( '/assets/models/Lettuce.glb', function (gltf) {
        ingredients.push(gltf.scene);
        builder_scene.add(gltf.scene);
        updateBurger()
    });
});
document.getElementById('tomatos-button').addEventListener('click', function(){
    loader.load( '/assets/models/Tomatos.glb', function (gltf) {
        ingredients.push(gltf.scene);
        builder_scene.add(gltf.scene);
        updateBurger()
    });
});

//RESTART
document.getElementById('restart').addEventListener('click', function(){
    for (var i = 2; i <= ingredients.length; i++){
        builder_scene.remove(ingredients[i]); 
    }
    ingredients.splice(2,ingredients.length-2);
    ingredients[0].position.y = -0.5;
    ingredients[1].position.y = -1.5;
})

// ******** ORDER ********
//POP UPS
const errorModal = document.getElementById('error-modal');
const thanksModal = document.getElementById('thanks-modal');

//OPEN POP UPS
document.getElementById('order').addEventListener('click', function(){
    ingredients.length > 2 ? thanksModal.classList.add('active') : errorModal.classList.add('active');
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

//ANIMATION LOOP
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);

    builder_controls.update();
    builder_renderer.render(builder_scene, builder_camera);
}
animate();