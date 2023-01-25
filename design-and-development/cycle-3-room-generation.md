# CYCLE 3 Room Generation v1

## Design

### Objectives

In Cycle 3 I wanted to begin making functions and classes that would allow me to easily generate rooms (only corridors at the moment). This meant I had to create a function to create basic cubes and then create a class for corridors that would allow me to generate the floor and two walls.

The class will also be much useful later as it will allow me to control what units (either characters or the enemy) are in the room and their position; it will also allow me to tell the enemy's AI which rooms connect to which (for pathfinding).

* [x] Create a cube generation function.
* [x] Create a basic corridor and junction class for rooms (will be expanded later).
* [x] Create a basic corridor generating function.
* [ ] Make the corridor function work on both axis.
* [x] Organise everything above into separate javascript files, and export them.&#x20;

### Usability Features

* Environment Interaction - The environment should be interactable and where the player can interact should be clear. This means that where the player can move should be made clear through design.

### Key Variables

| Variable Name | Usage                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| basicCube     | The variable storing the test bit of terrain used for testing out the generateCube() function.                                    |
| moveableCube  | The variable for the moveable cube created in [CYCLE 2](cycle-2-spectator-tool.md), now updated with the generateCube() function. |
| room          | The variable used to test the class corridor, it contains both walls and the floor of the room.                                   |

### Pseudocode

```
def generateCube(size, colour) {
    mesh = new THREE mesh(size[0], size[1], size[2])
    material = new THREE material(colour)
    cube = new THREE cube(mesh, material)
    
    return cube
    
}
```

## Development

I started by creating the basic generate cube function which would form the basis for creating all of the basic shapes I would need to start attempting to generate rooms. This meant I had to combine the three things I needed to do to create a cube in one function; first THREE requires a box geometry to be created which controls the size. Then a material to go with it, for now this is just a basic standard material with a colour; these are then combined and returned to create the basic cube. This was also done in a separate javascript file which was then imported to make it so the main game.js file isn't too crowded.

To follow this up I decided to create classes for the corridors and junctions as this will make the method future proof as I will be able to update the class with any new information. To do this I created a separate javascript file and put in both the corridor and junction classes; only with a limited amount in the constructors for now (both walls and the floor) but they can be changed later.

I also created a function to basic function to begin generating a corridor and whilst it is in a separate file at the moment I will try to integrate it later into the corridor class. To create this function I basically combine three generate cube functions but also controlled the position of the walls and floor created by the function. This meant I had to parse into the function size, colour and position as these are necessary to create the basic corridor; I also tried using the function along other axis which aren't just X, however it will be visible in testing why this didn't work.

{% tabs %}
{% tab title="game.js" %}
This shows some of the major changes to the file but not the file in its entirety as it is quite long at this point.

```javascript
import * as THREE from "three";
import Stats from "./examples/jsm/libs/stats.module.js";

import { OrbitControls, EffectComposer, RenderPass, UnrealBloomPass, GlitchPass, GLTFLoader, GUI } from "/exports.js";
import { createCube, generateCorridor, Corridor, Junction, degToRad } from "/exports.js";

// creating scene lighting
const sun = new THREE.SpotLight( 0x87ceeb, 8 );
const backgroundLight = new THREE.DirectionalLight( 0xffffff, 3 );
const backgroundLight2 = new THREE.DirectionalLight( 0xffffff, 3 );

// creating scene geome
const basicCube = createCube([10, 1, 10], 0xfffffff);
const moveableCube = createCube([1, 1, 1], 0xddff00);
const room = generateCorridor([5, 1, 5], 0xffffff, [10, 0, 0]);

// adding elements to scene
scene.add(basicCube);
scene.add(moveableCube);

scene.add(room.floor);
scene.add(room.wallLeft);
scene.add(room.wallRight);

// setting positions
moveableCube.position.set(0, 1, 0);

// testing light shadow
scene.add(sun);
sun.position.set(-5, 25, 10);
sun.lookAt(0,1,0);
sun.castShadow = true;

// controlling detail of shadow
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
```
{% endtab %}

{% tab title="createCube.js" %}
```javascript
import * as THREE from "three";

// function to generate cubes easily
function createCube(size, col) {
    // making geometry, material and mesh
    let mesh = new THREE.BoxGeometry(size[0], size[1], size[2]);
    let material = new THREE.MeshStandardMaterial({color: col});
    let shape = new THREE.Mesh(mesh, material);

    // adding shadow functionality to cubes
    shape.castShadow = true;
    shape.receiveShadow = true;

    // returning shape object
    return shape;

}

export { createCube };
```
{% endtab %}

{% tab title="generateRoom.js" %}
```javascript
import * as THREE from "three";
import { Corridor, Junction } from "./roomClass.js";
import { createCube } from "./createCube.js";
import { Scene } from "three";

// all walls need to be same height for consistency
const wallHeight = 5;

function generateCorridor(size, colour, position) { // size [1, 10, 1]
    // creating floor cube, setting position and shadow
    let floor = createCube(size, colour);
    floor.receiveShadow = true; // floor wont be casting shadow
    floor.position.set(position[0], position[1], position[2]);

    // making wall "cube" 
    let wall1 = createCube([size[0], wallHeight, size[1]], 0xffffff);
    wall1.receiveShadow = true;
    wall1.castShadow = false; // ruins visibility if true
    wall1.position.set(position[0], position[1] + (0.5 * wallHeight) - 0.5, position[2] - (size[2] / 2) + .5); // change wallheight to size[0] for reactiveness

    // making other corridor wall
    let wall2 = createCube([size[0], wallHeight, size[1]], 0xffffff);
    wall2.receiveShadow = true;
    wall2.castShadow = false;
    wall2.position.set(position[0], position[1] + (0.5 * wallHeight) - 0.5, position[2] + (size[2] / 2) - .5); // change wallheight to size[0] for reactiveness

    // combining elements into custom corridor class
    let room = new Corridor(floor, wall1, wall2)

    // returing class Corridor
    return room;

}

export { generateCorridor };
```
{% endtab %}

{% tab title="exports.js" %}
```javascript
// THREE modules
export { OrbitControls } from "/examples/jsm/controls/OrbitControls.js";
export { GLTFLoader } from "/examples/jsm/loaders/GLTFLoader.js";
export { EffectComposer } from "/examples/jsm/postprocessing/EffectComposer.js";
export { RenderPass } from "/examples/jsm/postprocessing/RenderPass.js";
export { ShaderPass } from "/examples/jsm/postprocessing/ShaderPass.js";
export { GlitchPass } from "/examples/jsm/postprocessing/GlitchPass.js";
export { UnrealBloomPass } from "/examples/jsm/postprocessing/UnrealBloomPass.js";
export { GUI } from '/examples/jsm/libs/lil-gui.module.min.js';

// custom scripts
export { createCube } from "/scripts/createCube.js";
export { generateCorridor } from "/scripts/generateRoom.js";
export { Corridor, Junction } from "/scripts/roomClass.js";
export { degToRad } from "/scripts/degToRad.js";
```
{% endtab %}

{% tab title="roomClass.js" %}
<pre class="language-javascript"><code class="lang-javascript"><strong>// storing elements as class makes management easier
</strong><strong>// also allows tracking of which parts belong to which room
</strong><strong>class Corridor {
</strong>    constructor(floor, wallLeft, wallRight) {
        this.floor = floor;
        this.wallLeft = wallLeft;
        this.wallRight = wallRight;

    }

}

// junction class only contains floor for this cycle
class Junction {
    constructor(floor) {
        this.floor = floor;

    }

}

export { Corridor, Junction };
</code></pre>
{% endtab %}
{% endtabs %}

```
Updated File Structure:
|- 📁 Node Modules
|- 📁 Public
    |- 📁 models
        |- boat.glb
    |- 📁 scripts
        |- createCube.js
        |- generateRoom.js
        |- roomClass.js
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

One of my main issues was getting the walls to line up with the corridor, and on my first attempt for a function I got the wall positions wrong and they were either too far away or out of position on the X or Y axis.

![An example screenshot of when I got the positioning wrong for the Y axis.](<../.gitbook/assets/image (6) (1) (1).png>)

## Testing

In Cycle 3 I needed to make sure that corridor was generating correctly and that it was the right size and colour specified.

### Tests

| Test | Instructions                                       | What I expect                                               | What happened                                            | Pass/Fail |
| ---- | -------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------- | --------- |
| 1    | Use the create cube function.                      | The generate cube function will create a square of terrain. | The generate cube function created the terrain.          | Pass      |
| 2    | Use the generate corridor function in the X axis   | The corridor will be created with everything in line.       | The corridor was generated correctly.                    | Pass      |
| 3    | Use the generate corridor function in the Z axis.  | The corridor will be created with everything in line.       | The corridor was generated wide and the wrong direction. | Fail      |
| 4    | Use the generate corridor function with its class. | The corridor will be created without errors in a class.     | I can call parts of the corridor from the class.         | Pass      |

### Evidence

![The two basic cubes, updated to use the createCube() method.](<../.gitbook/assets/image (1) (1) (2).png>)

![Successful corridor generation, using the class and in the X axis direction.](<../.gitbook/assets/image (7) (1).png>)

![Corridor generation doesn't work for the Z axis yet, it still generates as if facing X.](<../.gitbook/assets/image (8) (1).png>)
