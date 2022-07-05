# CYCLE 4 Room Generation v2

## Design

### Objectives

In Cycle 4 I wanted to make sure the room generation for corridors worked perfectly on both axes and that the floor for the junction class of room was working. To do this I added an optional part to the generateCorridor() function from Cycle 3 which rotated the parts of corridor 90°; this wasn't so simple though as I had to make sure the parts of the corridor lined up correctly in the z axis.

I also had to create the basis of the generateJunction() function which would allow me to create the floor generating element now; and then allow me in future cycles to work on the generation of the walls of junction.

* [x] Add rotation to the generateCorridor() function.
* [x] Test that it is working with multiple examples.
* [x] Begin work on the generateJunction() function.

### Key Variables

| Variable Name      | Usage                                                          |
| ------------------ | -------------------------------------------------------------- |
| Corridor           | The class for storing all the elements in a corridor.          |
| room, room2, room3 | The variables used for testing that the rotation of corridors. |
| wallHeight         | The constant used to keep the height of walls the same.        |

### Pseudocode

```
function generateCorridor(size, colour, position, rotation) {
    floor = createCube(size, colour)
    floor.setPosition(position[0], position[1], position[2])
    
    wall1 = createCube(size[0], wallHeight, size[1], colour)
    wall2 = createCube(size[0], wallHeight, size[1], colour)
    
    wall1.setPosition(position[0], position[1], position[2])
    wall2.setPosition(position[0], position[1], position[2])
    
    corridor = new Corridor(floor, wall1, wall2)
    
    return corridor

}
```

## Development

I started by creating a degrees to radians function as THREE handles rotation in radians, however it was more intuitive for me to just rotate it 90 degrees. This meant I had to look up the formula for converting degrees to radians which in javascript is `degrees * (Math.PI / 180)`. I then added this to my exports.js file so I could import it into the main.js file.

I then experimented in the main file with just some basic rotations of the corridor I created in [CYCLE 3](cycle-3-room-generation.md), that lead to some of the images that can be seen below in the Challenges section. However once I had it working (I ended up making a better position solution which used the local position of the floor and its width to align it perfectly) I added it to the generateCorridor() function.&#x20;

This involved adding another element to the function when parsing it, so if it sees "z" input into it, it rotates the corridor 90 degrees onto the z axis and repositions the walls.

I also began work on the generateJunction() function, only the floor for now as I would have to create a lot of walls if I was to fully make it in this cycle. This meant creating a new function and importing it: to do this I made a similar function to that of the corridor one and then I only added the floor for now.

I then added it to the scene to check that it worked and it correctly imported and appeared with the colour.

{% tabs %}
{% tab title="game.js" %}
This shows some of the major changes to the file but not the file in its entirety as it is quite long at this point.

```javascript
import * as THREE from "three";
import Stats from "./examples/jsm/libs/stats.module.js";

import { OrbitControls, EffectComposer, RenderPass, UnrealBloomPass, GlitchPass, GLTFLoader, GUI } from "/exports.js";
import { createCube, generateCorridor, generateJunction, Corridor, Junction, degToRad } from "/exports.js";

const basicCube = createCube([10, 1, 10], 0xfffffff);
const moveableCube = createCube([1, 1, 1], 0xddff00);
const room = generateCorridor([8, 1, 5], 0xffffff, [12, 0, 0], "x");
const roomzexample = generateCorridor([5, 1, 5], 0xff1111, [0, 0, 10], "z");

const junction = generateJunction([5, 1, 5], 0x11ff11, [20, 0, 0])

scene.add(basicCube);

scene.add(moveableCube);

scene.add(room.floor);
scene.add(room.wallLeft);
scene.add(room.wallRight);

scene.add(junction.floor)

scene.add(roomzexample.floor);
scene.add(roomzexample.wallLeft);
scene.add(roomzexample.wallRight);
```
{% endtab %}

{% tab title="generateRoom.js" %}
```javascript
import * as THREE from "three";
import { Corridor, Junction } from "./roomClass.js";
import { createCube } from "./createCube.js";
import { degToRad } from "./degToRad.js";

const wallHeight = 5;

function generateCorridor(size, colour, position, rotation) { // size [1, 10, 1]
    let floor = createCube(size, colour);
    floor.receiveShadow = true;
    floor.position.set(position[0], position[1], position[2]);

    let wall1 = createCube([size[0], wallHeight, size[1]], colour);
    wall1.receiveShadow = true;
    wall1.castShadow = false;
    wall1.position.set(position[0], position[1] + (0.5 * wallHeight) - 0.5, position[2] - (size[2] / 2) + .5); // change wallheight to size[0] for reactiveness

    let wall2 = createCube([size[0], wallHeight, size[1]], colour);
    wall2.receiveShadow = true;
    wall2.castShadow = false;
    wall2.position.set(position[0], position[1] + (0.5 * wallHeight) - 0.5, position[2] + (size[2] / 2) - .5); // change wallheight to size[0] for reactiveness

    if (rotation === "z") {

        floor.rotation.y = degToRad(90);
        wall1.rotation.y = degToRad(90);
        wall2.rotation.y = degToRad(90);

        wall1.position.set(floor.position.x + (size[2] / 2), wall1.position.y, floor.position.z);
        wall2.position.set(floor.position.x - (size[2] / 2), wall2.position.y, floor.position.z);

    }

    let room = new Corridor(floor, wall1, wall2)

    return room;

}

function generateJunction(size, colour, position) {
    let floor = createCube(size, colour);
    floor.receiveShadow = true;
    floor.position.set(position[0], position[1], position[2]);

    let room = new Junction(floor);

    return room;

}

export { generateCorridor, generateJunction };
```
{% endtab %}

{% tab title="exports.js" %}
```javascript
export { OrbitControls } from "/examples/jsm/controls/OrbitControls.js";
export { GLTFLoader } from "/examples/jsm/loaders/GLTFLoader.js";
export { EffectComposer } from "/examples/jsm/postprocessing/EffectComposer.js";
export { RenderPass } from "/examples/jsm/postprocessing/RenderPass.js";
export { ShaderPass } from "/examples/jsm/postprocessing/ShaderPass.js";
export { GlitchPass } from "/examples/jsm/postprocessing/GlitchPass.js";
export { UnrealBloomPass } from "/examples/jsm/postprocessing/UnrealBloomPass.js";
export { GUI } from '/examples/jsm/libs/lil-gui.module.min.js';

export { createCube } from "/scripts/createCube.js";
export { generateCorridor, generateJunction } from "/scripts/generateRoom.js";
export { Corridor, Junction } from "/scripts/roomClass.js";
export { degToRad } from "/scripts/degToRad.js";
```
{% endtab %}
{% endtabs %}

### Challenges

One of the challenges I face was getting the corridor to rotate correctly, with earlier attempts being out of alignment or further ahead/behind on the z axis. I was able to overcome this effectively by trial and error which also allowed me to come up with a solution that would work for all corridor shapes and sizes.

![When initially just rotating, the walls would rotate inside each other.](<../.gitbook/assets/image (5) (1) (1).png>)

![After some experimenting I managed to get one wall lined up.](<../.gitbook/assets/image (3) (1).png>)

## Testing

In Cycle 4 I needed to test that the corridor was generating correctly, that it would rotate in the Z axis and that the junction floor was generating correctly in the correct colour.

### Tests

| Test | Instructions                                               | What I expect                                                        | What happened                                            | Pass/Fail |
| ---- | ---------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------- | --------- |
| 1    | Create a new corridor and check if it generates correctly. | The corridor will generate in the x axis with everything inline.     | The corridor generates with everything in place.         | Pass      |
| 2    | Generate a corridor on the z axis.                         | The corridor is correctly rotated and lined up.                      | The corridor is generated correctly.                     | Pass      |
| 3    | Generate a new junction floor.                             | The junction floor will be in the right place with the right colour. | The floor appears in the right place and correct colour. | Pass      |

### Evidence

![A functioning corridor in the z axis (blue).](<../.gitbook/assets/image (7).png>)

![The start of a junction.](<../.gitbook/assets/image (8).png>)

![All of the test rooms generated. They can now be in any place, any size and aligned along the x or z axis.](<../.gitbook/assets/image (5) (1).png>)
