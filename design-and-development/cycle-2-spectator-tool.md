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

// setting up parts of scene (including lighting)
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

// adding fps counter and renderer to html
document.body.appendChild( stats.dom );
document.body.appendChild( renderer.domElement );

// adding elements created above to scene
scene.add(sun);
scene.add(backgroundLight);
scene.add(backgroundLight2);

scene.add( new THREE.AxesHelper(1000) );

// setting up THREE orbit controls
controls.listenToKeyEvents(window);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 0;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;
controls.target = moveableCube.position;

// setting up function that runs every frame
function animate() {
    requestAnimationFrame( animate );
    
    // setting up directional movement
    if (wKey === true) {
        // need to move both cube and camera
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
    
    // setting up faster movement hotkey
    if (shKey === true) {
        moveSpeed = 0.1;

    } else {
        moveSpeed = 0.05;

    }

    // setting up renderer and fps library
    
    
    stats.update();
    composer.render();

}
```
{% endtab %}

{% tab title="exports.js" %}
```javascript
// easier to have long imports in seperate file 
export { OrbitControls } from "/examples/jsm/controls/OrbitControls.js";
export { GLTFLoader } from "/examples/jsm/loaders/GLTFLoader.js";
export { GUI } from '/examples/jsm/libs/lil-gui.module.min.js'
```
{% endtab %}

{% tab title="keyupdates (part of game.js)" %}
<pre class="language-javascript"><code class="lang-javascript"><strong>// listener for keypress on w a s d shift 
</strong><strong>window.addEventListener("keydown", (e) => {
</strong>    switch(e.keyCode) {
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

// same as above but the opposite
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

// function to resize renderer if window size changes
window.addEventListener( "resize", onWindowResize() );

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}
</code></pre>
{% endtab %}

{% tab title=".gitignore" %}
```
// means node_modules file is ignored to save space
node_modules
```
{% endtab %}
{% endtabs %}

```
Updated File Structure:
|- 📁 Node Modules
|- 📁 Public
    |- 📁 models
        |- boat.glb
    |- 📁 scripts
    |- exports.js
    |- favicon.ico
    |- game.html
    |- game.js
    |- style.css
|- .gitignore
|- index.html
|- package-lock.json
|- package.json
|- readme.md
|- server.js
```

### Challenges

The way the THREE docs were setup was not for a node.js server but instead for just creating a HTML file and directly importing it so when I looked at the docs and tried their solution it didn't work. Therefore I had to follow the same solutions as before in [Cycle 1](cycle-1-migration-to-three.md) where I had to work out where the OrbitControls.js module was posted to by the server and link to that.

![I followed the docs link and it wasn't finding the modules.](<../.gitbook/assets/image (4) (1) (1) (1).png>)

## Testing

For Cycle 2 the elements I needed to test were: is OrbitControls imported correctly, are the OrbitControls working correctly and does the cube move when I press WASD. On top of this it also needs to get faster when I press the Shift key.

### Tests

| Test | Instructions                                            | What I expect                                                 | What happened                                              | Pass/Fail |
| ---- | ------------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- | --------- |
| 1    | Open the game after importing OrbitControls.            | The game scene will show up as the import is correct.         | The game scene displays correctly.                         | Pass      |
| 2    | Click and drag with the mouse around the cube.          | I will be able to rotate the camera around the moveable cube. | I am able to rotate the camera around the cube.            | Pass      |
| 3    | Press the WASD keys and the cube should move on screen. | I will press the keys and the cube will move in x and z axes. | I can move the cube around the screen on the x and z axes. | Pass      |
| 4    | Press the Shift key with a move key and move faster.    | I will be able to go faster when holding the Shift key.       | The cube moves faster when holding the Shift key.          | Pass      |

### Evidence

![Screenshot of the moveable cube in the environment.](<../.gitbook/assets/image (3) (1) (1).png>)
