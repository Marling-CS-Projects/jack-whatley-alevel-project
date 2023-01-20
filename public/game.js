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

const scanButton = document.getElementById("scan-button");

const tabOne = document.getElementById("tab-1");
const tabTwo = document.getElementById("tab-2");

const tabContOne = document.getElementById("tab-container-1");
const tabContTwo = document.getElementById("tab-container-2");

const mapButton = document.getElementById("map-button"); // return to map view button
const viewButton = document.getElementById("view-button"); // end view turn button

// variables:
let showStats = false;
let moveSpeed = 0.075;
let wKey, aKey, sKey, dKey, shKey;
let freecam = true;

function hover(element, enter, leave){
    element.addEventListener('mouseenter', enter)
    element.addEventListener('mouseleave', leave)
}

// body appends:
//document.body.appendChild( stats.dom );
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

let points = [
    new THREE.Vector3(10,0,80),//top left
    new THREE.Vector3(25,0,50),//top right
    new THREE.Vector3(25,0,-50),//bottom right
    new THREE.Vector3(10,0,-50),//bottom left
    new THREE.Vector3(10,0,50)//back to top left - close square path
]

let mesh = new THREE.Mesh( new THREE.LatheGeometry(points), new THREE.MeshLambertMaterial({color: 0x000000}) )
mesh.position.set(0,5,0);

MapView.add(mesh);

for (let i = 0; i < MAP.scenes.length; i++) {
    domEvent.addEventListener(MAP.map[i].components[0], "click", (e) => {
        if (viewTurn.turn === false) {
            if (character.room.link.connected[0] === MAP.map[i].link.name) {
                character.changeRoomMap(MAP.map[i], MapView);
                character.changeRoom(MAP.scenes[i].room, MAP.scenes[i].scene);

            } else if (character.room.link.connected[1] === MAP.map[i].link.name) {
                character.changeRoomMap(MAP.map[i], MapView);
                character.changeRoom(MAP.scenes[i].room, MAP.scenes[i].scene);

            } else if (character.room.link.connected[2] === MAP.map[i].link.name) {
                character.changeRoomMap(MAP.map[i], MapView);
                character.changeRoom(MAP.scenes[i].room, MAP.scenes[i].scene);

            } else {
                console.log("no match");

            }
            viewTurn.turn = true;
            viewTurn.iterate();
            enemyTurn.turn = true;

        } else if (viewTurn.turn === true) {
            SCENE = MAP.scenes[i].scene;
            CAMERA = MAP.scenes[i].camera[0];

        }

    });

}

// other

camera.position.x = -5;
camera.position.y = 5;

MapCamera.position.x = 0;
MapCamera.position.y = 18;
MapCamera.position.z = 0;

camera.lookAt(0,1,0);

MapCamera.lookAt(0,0,0);

scene.add( new THREE.AxesHelper(1000) );

hover(document.getElementById("turn-counter"), () => {
    document.getElementById("help-box").classList.remove("hidden");
    document.getElementById("help-text").innerHTML = "The scanner is only available every even turn and only works in square rooms";
}, () => {
    document.getElementById("help-box").classList.add("hidden");
    document.getElementById("help-text").innerHTML = "";
});

hover(document.getElementById("score-board"), () => {
    document.getElementById("help-box").classList.remove("hidden");
    document.getElementById("help-text").innerHTML = "Displays the number of turns that have happened since the game started"; 
}, () => {
    document.getElementById("help-box").classList.add("hidden");
    document.getElementById("help-text").innerHTML = "";
});

scanButton.addEventListener("click", () => {
    /// avaible room list:
    /// lowerLeftJunction, lowerMiddleJunction
    /// topLeftJunction, spawnJunction

    if (viewTurn.count % 2 === 0) {
        if (enemy.room.link.name == "lowerLeftJunction") {
            document.getElementById("row-3-1").classList.add("enemy");
            document.getElementById("row-3-3").classList.remove("enemy");
            document.getElementById("row-1-1").classList.remove("enemy");
            document.getElementById("row-1-3").classList.remove("enemy");
        } else if (enemy.room.link.name == "lowerMiddleJunction") {
            document.getElementById("row-3-3").classList.add("enemy");
            document.getElementById("row-3-1").classList.remove("enemy");
            document.getElementById("row-1-1").classList.remove("enemy");
            document.getElementById("row-1-3").classList.remove("enemy");
        } else if (enemy.room.link.name == "topLeftJunction") {
            document.getElementById("row-1-1").classList.add("enemy");
            document.getElementById("row-3-3").classList.remove("enemy");
            document.getElementById("row-3-1").classList.remove("enemy");
            document.getElementById("row-1-3").classList.remove("enemy");
        } else if (enemy.room.link.name == "spawnJunction") {
            document.getElementById("row-1-3").classList.add("enemy");
            document.getElementById("row-3-1").classList.remove("enemy");
            document.getElementById("row-3-3").classList.remove("enemy");
            document.getElementById("row-1-1").classList.remove("enemy");
        } else {
            return;
        }
    } else {
        return;
    }
});

/// tabOne/Two - button, tabContOne/Two - container

tabOne.addEventListener("click", () => {
    if (tabOne.classList.value.includes("tab-button-active")) {
        return;
    } else {
        tabOne.classList.add("tab-button-active");
        tabTwo.classList.remove("tab-button-active");
        tabContOne.classList.remove("tab-container-hidden");
        tabContTwo.classList.add("tab-container-hidden");
    }
});

tabTwo.addEventListener("click", () => {
    if (tabTwo.classList.value.includes("tab-button-active")) {
        return;
    } else {
        tabTwo.classList.add("tab-button-active");
        tabOne.classList.remove("tab-button-active");
        tabContOne.classList.add("tab-container-hidden");
        tabContTwo.classList.remove("tab-container-hidden");
    }
});

viewButton.addEventListener("click", () => {
    viewTurn.turn = false;
    enemyTurn.turn = false;
});

mapButton.addEventListener("click", () => {
    SCENE = MapView;
    CAMERA = MapCamera;
});

document.getElementById("fps-button").addEventListener("click", () => {
    stats.dom.classList.add("stats-class");
    document.body.appendChild( stats.dom );
    showStats = true;
});

document.getElementById("free-button").addEventListener("click", () => {
    CAMERA = camera;
});

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

/*function createPanel() {

    const panel = new GUI( { width: 300 } );
    const settingFolder = panel.addFolder( "Settings" );

    let settings = {

        "Show FPS": function() {

            document.body.appendChild( stats.dom );
            showStats = true;

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

    settingFolder.add( settings, "Show FPS" );
    settingFolder.add( settings, "Free Camera" );
    settingFolder.add( settings, "Map Scene" );
    settingFolder.add( settings, "End View Turn" );

    settingFolder.open();

}*/

window.addEventListener( "resize", onWindowResize() );

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    
    requestAnimationFrame( animate );

    mesh.position.set(character.mesh[0].position.x, 5, character.mesh[0].position.z);
    MapCamera.position.set(character.mesh[0].position.x, 18, character.mesh[0].position.z);

    MapCamera.lookAt(character.mesh[0].position.x, 0, character.mesh[0].position.z);

    document.getElementById("score-count").innerHTML = viewTurn.count;
    document.getElementById("turn-count").innerHTML = viewTurn.count % 2;

    if (viewTurn.turn) {
        document.getElementById("current-turn").innerHTML = "View";
    } else {
        document.getElementById("current-turn").innerHTML = "Move";
    }

    if (enemyTurn.turn == true) {
        let chance = Math.floor(Math.random() * 10);
        let random = Math.floor(Math.random() * 2);

        if (chance > 3) {
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

    if (showStats === true) {
        stats.update();

    }

    renderer.render( SCENE, CAMERA );

}

animate();
/*createPanel();*/