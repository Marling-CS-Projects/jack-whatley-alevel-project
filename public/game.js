// imports:
import * as THREE from "three";
import Stats from "./examples/jsm/libs/stats.module.js";

import { OrbitControls, EffectComposer, RenderPass, UnrealBloomPass, GlitchPass, GLTFLoader, GUI } from "/exports.js";
import { createCube, generateCorridor, generateJunction, Corridor, Junction, degToRad, Enemy, Character, Map } from "/exports.js";
import { THREEx } from "./exports.js";

// consts:
const scene = new THREE.Scene();
const MapView = new THREE.Scene();

let SCENE = scene;

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );
const MapCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );

let CAMERA = camera;

const renderer = new THREE.WebGLRenderer( { antialias: true } );
//const composer = new EffectComposer( renderer );
//let renderPass = new RenderPass( SCENE, camera );
const stats = new Stats();
let sun = new THREE.SpotLight( 0x87ceeb, 10 );
let sun2 = new THREE.SpotLight( 0x87ceeb, 10 );
const controls = new OrbitControls( camera, renderer.domElement );
let domEvent = new THREEx.DomEvents( camera, renderer.domElement );

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

//composer.addPass( renderPass );
//composer.addPass( bloomPass );

/*const glitchPass = new GlitchPass();
composer.addPass( glitchPass );*/

// lighting

sun.target.position.set(-10, 0, 10);
sun.position.set(-10, 50, 10);
sun.castShadow = true;

sun2.target.position.set(-10, 0, 10);
sun2.position.set(-10, 50, 10);
sun2.castShadow = true;

sun.shadow.bias = -0.00000000000000000001;
sun.shadow.mapSize.width = 2048 * 8;
sun.shadow.mapSize.height = 2048 * 8;

sun2.shadow.bias = -0.00000000000000000001;
sun2.shadow.mapSize.width = 2048 * 8;
sun2.shadow.mapSize.height = 2048 * 8;

scene.add( sun );
MapView.add( sun2 );
scene.add( new THREE.SpotLightHelper( sun ) );

// objects

let material1 = new THREE.MeshStandardMaterial({color: 0xddff00});

const moveableCube = createCube([1, 1, 1], material1);

//MapView.add( basicCube );

moveableCube.position.set(0, 1, 0);

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
MapView.add( light );

//scene.add(basicCube);
scene.add(moveableCube);

const spawnJunction = generateJunction([10, 1, 10], 0xffffff, [0, 0, 0]);

const c1 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [10, 0, 0]);

const c2 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [-10, 0, 0]);

const j1 = generateJunction([10, 1, 10], 0xffffff, [-20, 0, 0]);

const c3 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [20, 0, 0]);

const c4 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [0, 0, 10], "z");

const c5 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [-20, 0, 10], "z");

const j2 = generateJunction([10, 1, 10], 0xffffff, [-20, 0, 20]);

const c6 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [-10, 0, 20]);

const j3 = generateJunction([10, 1, 10], 0xffffff, [0, 0, 20]);

const j4 = generateJunction([10, 1, 10], 0xffffff, [30, 0, 0]);

let MAP = new Map([], [], [spawnJunction, c1, c2, c3, c4, c5, c6, j1, j2, j3, j4], []);
console.log(MAP.rooms.length);
MAP.createScene(scene);
MAP.createMap(MapView);
console.log(MAP.map);

console.log(MapView);

domEvent.addEventListener(spawnJunction.components[0], "click", (e) => {

    enemy.changeRoom(spawnJunction, scene);

});

domEvent.addEventListener(j1.components[0], "click", (e) => {

    enemy.changeRoom(j1, scene);

});

domEvent.addEventListener(j2.components[0], "click", (e) => {

    enemy.changeRoom(j2, scene);

});

domEvent.addEventListener(j3.components[0], "click", (e) => {

    enemy.changeRoom(j3, scene);

});

let material2 = new THREE.MeshStandardMaterial({color: 0xffff11});

const enemy = new Enemy(j4, createCube([1, 5, 1], material2));
enemy.setPos(scene);

let material3 = new THREE.MeshStandardMaterial({color: 0xff1111});

const character = new Character(spawnJunction, createCube([1, 5, 1], material3));
character.setPos(scene);

// other

camera.position.x = -5;
camera.position.y = 5;

MapCamera.position.x = 0;
MapCamera.position.y = 30;
MapCamera.position.z = 8;

camera.lookAt(0,1,0);

MapCamera.lookAt(0,1,8);

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

    const panel = new GUI( { width: 300 } );

    const helpFolder = panel.addFolder( "Help" );
    const settingFolder = panel.addFolder( "Settings" );

    let settings = {

        "Use the show stats button to see stats.": "0",
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

        },
        "Map Scene": function() {

            SCENE = MapView;
            CAMERA = MapCamera;

        },
        "Test Scene": function() {

            SCENE = scene;
            CAMERA = camera;

        }

    }

    helpFolder.add( settings, "Use the show stats button to see stats." );
    settingFolder.add( settings, "Show Stats" );
    settingFolder.add( settings, "Lock Camera" );
    settingFolder.add( settings, "Free Camera" );
    settingFolder.add( settings, "Map Scene" );
    settingFolder.add( settings, "Test Scene" );

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

    renderer.render( SCENE, CAMERA );

}

animate();
createPanel();