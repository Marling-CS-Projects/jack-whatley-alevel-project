// imports:
import * as THREE from "three";
import Stats from "./examples/jsm/libs/stats.module.js";

import { OrbitControls, EffectComposer, RenderPass, UnrealBloomPass, GlitchPass, GLTFLoader, GUI } from "/exports.js";
import { createCube, generateCorridor, Corridor, Junction, degToRad } from "/exports.js";

// consts:
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer( { antialias: false } );
const composer = new EffectComposer( renderer );
const renderPass = new RenderPass( scene, camera );
const stats = new Stats();
const sun = new THREE.SpotLight( 0x87ceeb, 8 );
const backgroundLight = new THREE.DirectionalLight( 0xffffff, 3 );
const backgroundLight2 = new THREE.DirectionalLight( 0xffffff, 3 );
const controls = new OrbitControls(camera, renderer.domElement);

const params = {
    exposure: 1,
    bloomStrength: 5,
    bloomThreshold: 0,
    bloomRadius: 0
};

// variables:
let showStats = false;
let moveSpeed = 0.075;
let wKey, aKey, sKey, dKey, shKey;

// body appends:
document.body.appendChild( stats.dom );
document.body.appendChild( renderer.domElement );

scene.background = new THREE.Color(0x87ceeb);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

composer.addPass( bloomPass );
composer.addPass( renderPass );

/*const glitchPass = new GlitchPass();
composer.addPass( glitchPass );*/

// lighting

scene.add(sun);
sun.position.set(-5, 25, 10);
sun.lookAt(0,1,0);
sun.castShadow = true;

sun.shadow.bias = -0.000000000000001;
sun.shadow.mapSize.width = 2048 * 8;
sun.shadow.mapSize.height = 2048 * 8;

scene.add(backgroundLight);
backgroundLight.castShadow = false;
backgroundLight.position.set(-5, 5, -5);
backgroundLight.lookAt(0,1,0);

scene.add(backgroundLight2);
backgroundLight2.castShadow = false;
backgroundLight2.position.set(5, 5, -5);
backgroundLight2.lookAt(0,1,0);

// objects

const basicCube = createCube([10, 1, 10], 0xfffffff);
const moveableCube = createCube([1, 1, 1], 0xddff00);
const room = generateCorridor([5, 1, 8], 0xffffff, [10, 0, 0], "z");
const room2 = generateCorridor([10, 1, 5], 0xff11ff, [0, 0, 15], "z");
const room3 = generateCorridor([8, 1, 4], 0xff1111, [20, 0, 0], "z");

scene.add(basicCube);

scene.add(moveableCube);

scene.add(room.floor);
scene.add(room.wallLeft);
scene.add(room.wallRight);

scene.add(room2.floor);
scene.add(room2.wallLeft);
scene.add(room2.wallRight);

scene.add(room3.floor);
scene.add(room3.wallLeft);
scene.add(room3.wallRight);

// scene setup 2

moveableCube.position.set(0, 1, 0);

// other

camera.position.x = -5;
camera.position.y = 5;

camera.lookAt(0,1,0);

scene.add( new THREE.AxesHelper(1000) );

// controls
controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.screenSpacePanning = false;

controls.minDistance = 0;
controls.maxDistance = 500;

controls.maxPolarAngle = Math.PI / 2;

controls.target = moveableCube.position;

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

function createPanel() {

    const panel = new GUI( { width: 310 } );

    const helpFolder = panel.addFolder( "Help" );
    const settingFolder = panel.addFolder( "Settings" );

    let settings = {

        "Use the show stats button to see stats.": "SIUUUUUUUUUUUUU",
        "Show Stats": function() {

            document.body.appendChild( stats.dom );

        }

    }

    helpFolder.add( settings, "Use the show stats button to see stats." );
    settingFolder.add( settings, "Show Stats" );

    helpFolder.open();
    settingFolder.open();

}

window.addEventListener( "resize", onWindowResize() );

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

        moveSpeed = 0.2;

    } else {

        moveSpeed = 0.075;

    }

    stats.update();

    composer.render();

}

animate();
//createPanel();