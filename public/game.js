// imports:
import * as THREE from "three";
import Stats from "./examples/jsm/libs/stats.module.js";

import { OrbitControls, EffectComposer, RenderPass, UnrealBloomPass, GlitchPass, GLTFLoader, GUI } from "/exports.js";
import { createCube, generateCorridor, generateJunction, Corridor, Junction, degToRad } from "/exports.js";

// consts:
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );
const renderer = new THREE.WebGLRenderer( { antialias: true } );
const composer = new EffectComposer( renderer );
const renderPass = new RenderPass( scene, camera );
const stats = new Stats();
let sun = new THREE.SpotLight( 0x87ceeb, 10 );
const controls = new OrbitControls(camera, renderer.domElement);

const params = {
    exposure: 1,
    bloomStrength: 0.5,
    bloomThreshold: 1,
    bloomRadius: 0
}

// variables:
let showStats = false;
let moveSpeed = 0.075;
let wKey, aKey, sKey, dKey, shKey;
let freecam = true;

// body appends:
document.body.appendChild( stats.dom );
document.body.appendChild( renderer.domElement );

//scene.background = new THREE.Color(0x87ceeb);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.toneMapping = THREE.ReinhardToneMapping;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

composer.addPass( renderPass );
//composer.addPass( bloomPass );

/*const glitchPass = new GlitchPass();
composer.addPass( glitchPass );*/

// lighting

sun.target.position.set(-10, 0, 10);
sun.position.set(-10, 50, 10);
sun.castShadow = true;

sun.shadow.bias = -0.00000000000000000001;
sun.shadow.mapSize.width = 2048 * 8;
sun.shadow.mapSize.height = 2048 * 8;

scene.add( sun );
scene.add( new THREE.SpotLightHelper( sun ) );

// objects

//const basicCube = createCube([10, 1, 10], 0xfffffff);
const moveableCube = createCube([1, 1, 1], 0xddff00);

moveableCube.position.set(0, 1, 0);

sun.target = moveableCube;

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

//scene.add(basicCube);
scene.add(moveableCube);

let testmap = [];

const spawnJunction = generateJunction([10, 1, 10], 0xffffff, [0, 0, 0]);
spawnJunction.add(scene);

const c1 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [10, 0, 0]);
c1.add(scene);

const c2 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [-10, 0, 0]);
c2.add(scene);

const j1 = generateJunction([10, 1, 10], 0xffffff, [-20, 0, 0]);
j1.add(scene);

const c3 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [20, 0, 0]);
c3.add(scene);

const c4 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [0, 0, 10], "z");
c4.add(scene);

const c5 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [-20, 0, 10], "z");
c5.add(scene);

const j2 = generateJunction([10, 1, 10], 0xffffff, [-20, 0, 20]);
j2.add(scene);

const c6 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [-10, 0, 20]);
c6.add(scene);

const j3 = generateJunction([10, 1, 10], 0xffffff, [0, 0, 20]);
j3.add(scene);

const j4 = generateJunction([10, 1, 10], 0xffffff, [30, 0, 0]);
j4.add(scene);

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

controls.enablePan = false;

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

        },
        "Lock Camera": function() {

            camera.position.set(-10, 40, 10);
            camera.lookAt(-10, 0, 10);
            freecam = false;

        },
        "Free Camera": function() {

            camera.position.set(moveableCube.position.x - 5, moveableCube.position.y + 5, moveableCube.position.z);
            camera.lookAt(moveableCube.position);
            freecam = true;

        }

    }

    helpFolder.add( settings, "Use the show stats button to see stats." );
    settingFolder.add( settings, "Show Stats" );
    settingFolder.add( settings, "Lock Camera" );
    settingFolder.add( settings, "Free Camera" );

    helpFolder.close();
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
    
    if (wKey === true && freecam === true) {

        moveableCube.position.x += moveSpeed;
        camera.position.x += moveSpeed;

    } if (aKey === true && freecam === true) {

        moveableCube.position.z -= moveSpeed;
        camera.position.z -= moveSpeed;

    } if (sKey === true && freecam === true) {

        moveableCube.position.x -= moveSpeed;
        camera.position.x -= moveSpeed;

    } if (dKey === true && freecam === true) {

        moveableCube.position.z += moveSpeed;
        camera.position.z += moveSpeed;

    } 
    
    if (shKey === true && freecam === true) {

        moveSpeed = 0.2;

    } else {

        moveSpeed = 0.075;

    }

    if (freecam === false) {

        controls.enableRotate = false;
        controls.enableZoom = false;

    } else if (freecam === true) {

        controls.enableRotate = true;
        controls.enableZoom = true;

    }

    stats.update();

    composer.render();

}

animate();
createPanel();