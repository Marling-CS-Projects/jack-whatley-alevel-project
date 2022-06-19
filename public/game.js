import * as THREE from "three";
import Stats from "./examples/jsm/libs/stats.module.js";

import { OrbitControls, EffectComposer, RenderPass, ShaderPass, GlitchPass, GLTFLoader } from "/exports.js";
import { createCube, generateCorridor  } from "/exports.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let moveSpeed = 0.05;

let wKey = false;
let aKey = false;
let sKey = false;
let dKey = false;
let shKey = false;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const composer = new EffectComposer( renderer );
const renderPass = new RenderPass( scene, camera );
composer.addPass( renderPass );

/*(const glitchPass = new GlitchPass();
composer.addPass( glitchPass );*/

const stats = new Stats();
document.body.appendChild( stats.dom );

const sun = new THREE.SpotLight( 0xffffff, 1 );
scene.add(sun);
sun.position.set(-5, 25, 10);
sun.lookAt(0,1,0);
sun.castShadow = true;

sun.shadow.bias = -0.000001;
sun.shadow.mapSize.width = 2048 * 4;
sun.shadow.mapSize.height = 2048 * 4;

const backgroundLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add(backgroundLight);
backgroundLight.castShadow = false;
backgroundLight.position.set(-5, 5, -5);
backgroundLight.lookAt(0,1,0);

const backgroundLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add(backgroundLight2);
backgroundLight2.castShadow = false;
backgroundLight2.position.set(5, 5, -5);
backgroundLight2.lookAt(0,1,0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.listenToKeyEvents(window);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.screenSpacePanning = false;

controls.minDistance = 0;
controls.maxDistance = 500;

controls.maxPolarAngle = Math.PI / 2;

const basicCube = createCube([10, 1, 10], 0xffffff);
basicCube.receiveShadow = true;
basicCube.castShadow = true;
scene.add(basicCube);

const moveableCube = createCube([1, 1, 1], 0xddff00);
moveableCube.receiveShadow = true;
moveableCube.castShadow = true;
scene.add(moveableCube);

const room = generateCorridor([5, 1, 5], 0xffffff, [10, 0, 0]);
scene.add(room);

moveableCube.position.set(0, 1, 0);

controls.target = moveableCube.position;

camera.position.x = -5;
camera.position.y = 5;

camera.lookAt(0,1,0);

scene.add( new THREE.AxesHelper(500) );

window.addEventListener("keydown", (e) => {

    switch(e.keyCode) {
        case (87):
            wKey = true;
            break;
        case (65):
            aKey = true;
            break;
        case (83):
            sKey = true;
            break;
        case (68):
            dKey = true;
            break;
        case (16):
            shKey = true;
            break;

    }

});

window.addEventListener("keyup", (e) => {

    switch(e.keyCode) {
        case (87):
            wKey = false;
            break;
        case (65):
            aKey = false;
            break;
        case (83):
            sKey = false;
            break;
        case (68):
            dKey = false;
            break;
        case (16):
            shKey = false;
            break;

    }

});

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    requestAnimationFrame( animate );
    
    if (wKey === true) {

        moveableCube.position.x += moveSpeed;
        camera.position.x += moveSpeed;

    } if (aKey === true) {

        moveableCube.position.z -= moveSpeed;
        camera.position.z -= moveSpeed;

    } if (sKey === true) {

        moveableCube.position.x -= moveSpeed;
        camera.position.x -= moveSpeed;

    } if (dKey === true) {

        moveableCube.position.z += moveSpeed;
        camera.position.z += moveSpeed;

    } 
    
    if (shKey === true) {

        moveSpeed = 0.1;

    } else {

        moveSpeed = 0.05;

    }

    stats.update();

    composer.render();

}

animate();