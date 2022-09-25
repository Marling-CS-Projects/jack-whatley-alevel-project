// imports:
import * as THREE from "three";
import Stats from "./examples/jsm/libs/stats.module.js";

import { OrbitControls, EffectComposer, RenderPass, UnrealBloomPass, GlitchPass, GLTFLoader, GUI } from "/exports.js";
import { createCube, generateCorridor, generateJunction, RoomScene, Corridor, Junction, degToRad, Enemy, Character, Map, ViewTurn, EnemyTurn } from "/exports.js";
import { THREEx } from "./exports.js";

// consts:
const scene = new THREE.Scene();
const MapView = new THREE.Scene();

const ViewText = document.getElementById("view-output");
const MoveText = document.getElementById("move-output");

let SCENE = MapView;

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );
const MapCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );

let CAMERA = MapCamera;

const renderer = new THREE.WebGLRenderer( { antialias: true } );
//const composer = new EffectComposer( renderer );
//let renderPass = new RenderPass( SCENE, camera );
const stats = new Stats();
let sun = new THREE.SpotLight( 0x87ceeb, 10 );
let sun2 = new THREE.SpotLight( 0x87ceeb, 5 );
const controls = new OrbitControls( camera, renderer.domElement );
let domEvent = new THREEx.DomEvents( MapCamera, renderer.domElement );

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

sun.shadow.bias = -0.00000000000000000001;
sun.shadow.mapSize.width = 2048 * 8;
sun.shadow.mapSize.height = 2048 * 8;

sun2.shadow.bias = -0.00000000000000000001;
sun2.shadow.mapSize.width = 2048 * 8;
sun2.shadow.mapSize.height = 2048 * 8;

scene.add( sun );
MapView.add( sun2 );

// objects

let material1 = new THREE.MeshStandardMaterial({color: 0xff0000});

const moveableCube = createCube([1, 1, 1], material1);

//MapView.add( basicCube );

moveableCube.position.set(0, 1, 0);

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
MapView.add( light );

//scene.add(basicCube);
//scene.add(moveableCube);

let spawnJunction = generateJunction("spawnJunction", [10, 1, 10], 0xffffff, [0, 0, 0]);

let middleUpperCorridor = generateCorridor("middleUpperCorridor", [10, 1, 10 / 3 + 2], 0xff11ff, [-10, 0, 0]);

let topLeftJunction = generateJunction("topLeftJunction", [10, 1, 10], 0xffffff, [-20, 0, 0]);

let middleLeftCorridor = generateCorridor("middleLeftCorridor", [10, 1, 10 / 3 + 2], 0xff11ff, [-20, 0, 10], "z");

let lowerLeftJunction = generateJunction("lowerLeftJunction", [10, 1, 10], 0xffffff, [-20, 0, 20]);

let middleLowerCorridor = generateCorridor("middleLowerCorridor", [10, 1, 10 / 3 + 2], 0xff11ff, [-10, 0, 20]);

let lowerMiddleJunction = generateJunction("lowerMiddleJunction", [10, 1, 10], 0xffffff, [0, 0, 20]);

let middleCorridor = generateCorridor("middleCorridor", [10, 1, 10 / 3 + 2], 0xff11ff, [0, 0, 10], "z");

let longCorridorLeft = generateCorridor("longCorridorLeft", [10, 1, 10 / 3 + 2], 0xff11ff, [10, 0, 0]);

let longCorridorRight = generateCorridor("longCorridorRight", [10, 1, 10 / 3 + 2], 0xff11ff, [20, 0, 0]);

let rightJunction = generateJunction("rightJunction", [10, 1, 10], 0xffffff, [30, 0, 0]);

let material2 = new THREE.MeshStandardMaterial({color: 0xffff00});

// connecting rooms
spawnJunction.connected.push(middleUpperCorridor.name, middleCorridor.name, longCorridorLeft.name);
middleUpperCorridor.connected.push(spawnJunction.name, topLeftJunction.name);
topLeftJunction.connected.push(middleUpperCorridor.name, middleLeftCorridor.name);
middleLeftCorridor.connected.push(topLeftJunction.name, lowerLeftJunction.name);
lowerLeftJunction.connected.push(middleLeftCorridor.name, middleLowerCorridor.name);
middleLowerCorridor.connected.push(lowerLeftJunction.name, lowerMiddleJunction.name);
lowerMiddleJunction.connected.push(middleLowerCorridor.name, middleCorridor.name);
middleCorridor.connected.push(lowerMiddleJunction.name, spawnJunction.name);
longCorridorLeft.connected.push(spawnJunction.name, longCorridorRight.name);
longCorridorRight.connected.push(longCorridorLeft.name, rightJunction.name);
rightJunction.connected.push(longCorridorRight.name);

let MAP = new Map([], [], [spawnJunction, middleUpperCorridor, topLeftJunction, middleLeftCorridor, lowerLeftJunction, middleLowerCorridor, lowerMiddleJunction, middleCorridor, longCorridorLeft, longCorridorRight, rightJunction], [], []);
let viewTurn = new ViewTurn(true);
let enemyTurn = new EnemyTurn(false);
enemyTurn.initialise();
viewTurn.initialise();
MAP.createMap(MapView);

for (let i = 0; i < MAP.rooms.length; i++) {
    let roomScene = new RoomScene(`${MAP.rooms[i].constructor.name}${i}`, new THREE.Scene, MAP.rooms[i], []);
    MAP.scenes.push(roomScene);

}

for (let i = 0; i < MAP.scenes.length; i++) {
    let room;
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );
    let roomlight = new THREE.SpotLight( 0x87ceeb, 10 );
    roomlight.target.position.set(-10, 0, 10);
    roomlight.position.set(-10, 50, 10);
    
    if (MAP.scenes[i].room instanceof Corridor) {
        room = generateCorridor(MAP.scenes[i].room.name, MAP.scenes[i].room.size, 0xff11ff, [0,0,0], MAP.scenes[i].room.rotation);
        camera.position.set(-5,10,0);
        camera.lookAt(0,1,0);

    }
    if (MAP.scenes[i].room instanceof Junction) {
        room = generateJunction(MAP.scenes[i].room.name, MAP.scenes[i].room.size, 0xffffff, [0,0,0]);
        camera.position.set(-5,15,0);
        camera.lookAt(0,1,0);

    }
    
    room.add(MAP.scenes[i].scene);
    MAP.scenes[i].scene.add(camera);
    MAP.scenes[i].camera.push(camera);
    MAP.scenes[i].scene.add(roomlight);

}

const character = new Character(MAP.map[0], [createCube([1, 5, 1], material2), createCube([1, 5, 1], material2)]);
character.changeRoomMap(MAP.map[0], MapView);
character.changeRoom(MAP.scenes[0].room, MAP.scenes[0].scene);

const enemy = new Enemy(MAP.map[4], [createCube([1, 5, 1], material1), createCube([1, 5, 1], material1)]);
enemy.changeRoomMap(MAP.map[4], MapView);
enemy.changeRoom(MAP.scenes[4].room, MAP.scenes[4].scene);

for (let i = 0; i < MAP.scenes.length; i++) {
    domEvent.addEventListener(MAP.map[i].components[0], "click", (e) => {
        if (viewTurn.turn === false) {
            if (character.room.link.connected[0] === MAP.map[i].link.name) {
                character.changeRoomMap(MAP.map[i], MapView);
                character.changeRoom(MAP.scenes[i].room, MAP.scenes[i].scene);

                console.log(MAP.scenes[i]);

            } else if (character.room.link.connected[1] === MAP.map[i].link.name) {
                character.changeRoomMap(MAP.map[i], MapView);
                character.changeRoom(MAP.scenes[i].room, MAP.scenes[i].scene);

                console.log(MAP.scenes[i]);

            } else if (character.room.link.connected[2] === MAP.map[i].link.name) {
                character.changeRoomMap(MAP.map[i], MapView);
                character.changeRoom(MAP.scenes[i].room, MAP.scenes[i].scene);

                console.log(MAP.scenes[i]);

            } else {
                console.log("no match");

            }
            viewTurn.turn = true;
            enemyTurn.turn = true;

        } else if (viewTurn.turn === true) {
            SCENE = MAP.scenes[i].scene;
            CAMERA = MAP.scenes[i].camera[0];

        }

    });

}

console.log(enemy.room.link.connected);



// other

camera.position.x = -5;
camera.position.y = 5;

MapCamera.position.x = 5;
MapCamera.position.y = 30;
MapCamera.position.z = 10;

camera.lookAt(0,1,0);

MapCamera.lookAt(5,1,10);

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

        "Use the show stats button to see stats.": `${viewTurn.turn}`,
        "Show Stats": function() {

            document.body.appendChild( stats.dom );

        },
        "Free Camera": function() {

            CAMERA = camera;

        },
        "Map Scene": function() {

            SCENE = MapView;
            CAMERA = MapCamera;

        },
        "End View Turn": function() {

            viewTurn.turn = false;
            enemyTurn.turn = false;

        }
    }

    helpFolder.add( settings, "Use the show stats button to see stats." );
    settingFolder.add( settings, "Show Stats" );
    settingFolder.add( settings, "Free Camera" );
    settingFolder.add( settings, "Map Scene" );
    settingFolder.add( settings, "End View Turn" );

    //helpFolder.open();
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

    if (enemyTurn.turn == true) {
        let chance = Math.floor(Math.random() * 10);
        let random = Math.floor(Math.random() * 2);

        if (chance > 6) {
            let room = MAP.map.findIndex((MapRoom) => MapRoom.link.name === enemy.room.link.connected[random])
            enemy.changeRoomMap(MAP.map[room], MapView);
            enemy.changeRoom(MAP.scenes[room].room, MAP.scenes[room].scene);

        }
        
        enemyTurn.turn = false;
    
    }

    if (enemy.room.link.name === character.room.link.name) {
        document.getElementById("view-output").classList.remove("hidden");

    }
    
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