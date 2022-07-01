# CYCLE 2 Spectator Tool

## Design

### Objectives

In Cycle 2 I wanted to create a basic spectator tool and a lit up environment to make sure I could see the map I will create in later cycles. It needs to have a panning camera and also move with the WASD keys to make it easy to use.

* [x] Create two basic cubes, one is the floor and the other will be moveable.
* [x] Import Orbit Controls.
* [x] Apply Orbit Controls to the Cube.
* [x] Add in a movement system using WASD.

### Key Variables

| Variable Name                 | Usage                                                                                   |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| sun                           | The name of the variable that manages the spotlight.                                    |
| controls                      | The name of the variable managing OrbitControls which allows the camera to move around. |
| wkey, akey, skey, dkey, shkey | These variables control whether the keys are pressed down or not (true or false).       |

### Pseudocode

```
import * as THREE from "three"
import OrbitControls from "three"

renderer = new THREE renderer
camera = new THREE camera
sun = new THREE spotlight
controls = new OrbitControls

wkey, akey, skey, dkey, shkey

on wkey, akey, skey, dkey, shkey down(key):
    key = true
    
function animate() {
    if any key == true:
        cube.pos += key.direction
        
    render

}

animate()
```

## Development

### Outcome

I created a moveable cube and also a terrain cube so as to test my spectator tool; this meant I had to import OrbitControls which I had some problems with until I worked out the right import URL and created an exports.js file.&#x20;

Then I had to assign the OrbitControls to the moveable cube and set up the controls update for WASD and SHIFT keys; then I put the position change animate function so that it would update every frame.

I also added the stats module for development so I could see my frames per second and also the connection to the server, to do this I had to add the stats module to the exports.js file. Then I had to attach the stats element to the body.

{% tabs %}
{% tab title="game.js" %}
```javascript
import * as THREE from "three";
import Stats from "./examples/jsm/libs/stats.module.js";

import { OrbitControls, GUI } from "/exports.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer( { antialias: false } );
const stats = new Stats();
const sun = new THREE.SpotLight( 0x87ceeb, 8 );
const backgroundLight = new THREE.DirectionalLight( 0xffffff, 3 );
const backgroundLight2 = new THREE.DirectionalLight( 0xffffff, 3 );
const controls = new OrbitControls(camera, renderer.domElement);

let moveSpeed = 0.05;
let wKey, aKey, sKey, dKey, shKey;

document.body.appendChild( stats.dom );
document.body.appendChild( renderer.domElement );

scene.add(sun);
scene.add(backgroundLight);
scene.add(backgroundLight2);

scene.add( new THREE.AxesHelper(1000) );

controls.listenToKeyEvents(window);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 0;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;
controls.target = moveableCube.position;

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
```
{% endtab %}

{% tab title="exports.js" %}
```javascript
export { OrbitControls } from "/examples/jsm/controls/OrbitControls.js";
export { GLTFLoader } from "/examples/jsm/loaders/GLTFLoader.js";
export { GUI } from '/examples/jsm/libs/lil-gui.module.min.js'
```
{% endtab %}

{% tab title="keyupdates (part of game.js)" %}
```javascript
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

window.addEventListener( "resize", onWindowResize() );

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}
```
{% endtab %}
{% endtabs %}

