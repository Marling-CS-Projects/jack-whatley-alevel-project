# CYCLE 5 Room Generation v3

## Design

### Objectives

In Cycle 5 I wanted to complete the basic room generation so I could work on different things such as creating a map. This meant I had to complete the junction generation function from [CYCLE 4](cycle-4-room-generation-v2.md) and test that it worked for all sizes so that I could work on a map in the next cycle.

I also wanted to make sure that I have tested everything I have worked on so far, so that I can focus gameplay more in the next cycles. Rather than working on exclusively the level design or a spectator tool.

* [x] Finish the Junction Generation function.
* [x] Test the junction generation function for all possibilities.
* [x] Test the corridor generation function for all possibilities.
* [x] Make sure everything made so far works.

### Key Variables

| Variable Name       | Usage                                                                       |
| ------------------- | --------------------------------------------------------------------------- |
| junction, junction2 | The variables that store the junctions that I created for testing purposes. |
| generateJunction    | The function that creates junctions.                                        |

### Pseudocode

```
function generateJunction(size, colour, position):
    floor = createCube(size, colour)
    floor.position = position
    
    walls = []
    
    for i less than 8:
        wall = createCube(size, colour)
        wall.position = position
        
        walls.push(wall)
        
    return new Junction(floor, walls)
```

## Development

I began by testing that both the functions (corridor and junctions) worked; so that if I broke something I would know that I had working code to restore. Then I began adding walls to the junction, two at each corner. I then had to make sure they lined up and worked for any size of junction that I might need to make if I was to make a map.

To make the walls I updated the Junction class to contain an array called walls which I used to keep all the elements. This meant I could easily add all of them to the game using a for loop and that it wasn't cluttering the class up with eight walls. I also added all the walls as separate variables in the function initially, however I am working on a solution using a for loop to make the function less cluttered.

After this I had to test all of the new elements I've added, making sure that they always lined up, rendered correctly and that they worked for any size. This is because I'm not sure what size the map will be yet; therefore to make it future proof I need the functions to work for all sizes that I can input.

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

const room = generateCorridor([10, 1, 5], 0x1111ff, [11, 0, 0], "x");
const roomzexample = generateCorridor([5, 1, 5], 0xff1111, [0, 0, 10], "z");

const junction = generateJunction([5, 1, 5], 0x11ff11, [20, 0, 0]);

scene.add(basicCube);

scene.add(moveableCube);

scene.add(junction.floor)

scene.add(room.floor);
scene.add(room.wallLeft);
scene.add(room.wallRight);

scene.add(junction.floor);
for(let i=0; i < junction.walls.length; i++){scene.add(junction.walls[i])};

scene.add(roomzexample.floor);
scene.add(roomzexample.wallLeft);
scene.add(roomzexample.wallRight);

const junction2 = generateJunction([10, 1, 10], 0x11ff11, [0, 0, 20]);

scene.add(junction2.floor);
for(let i=0; i < junction2.walls.length; i++){scene.add(junction2.walls[i])};
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

    let walls = [];

    let wall1 = createCube([size[0] / 3, wallHeight, size[1]], colour);
    wall1.position.set(floor.position.x + (size[0] / 3), position[1] + (wallHeight / 2) - 0.5, floor.position.z + (size[2] / 2) - 0.5)
    walls.push(wall1);

    let wall2 = createCube([size[0] / 3, wallHeight, size[1]], colour);
    wall2.position.set(floor.position.x - (size[0] / 3), position[1] + (wallHeight / 2) - 0.5, floor.position.z + (size[2] / 2) - 0.5);
    walls.push(wall2);

    let wall3 = createCube([size[1], wallHeight, size[0] / 3], colour);
    wall3.position.set(floor.position.x + (size[2] / 2) - 0.5,  position[1] + (wallHeight / 2) - 0.5, floor.position.z + (size[0] / 3));
    walls.push(wall3);

    let wall4 = createCube([size[1], wallHeight, size[0] / 3], colour);
    wall4.position.set(floor.position.x + (size[2] / 2) - 0.5,  position[1] + (wallHeight / 2) - 0.5, floor.position.z - (size[0] / 3));
    walls.push(wall4);

    let wall5 = createCube([size[0] / 3, wallHeight, size[1]], colour);
    wall5.position.set(floor.position.x + (size[0] / 3), position[1] + (wallHeight / 2) - 0.5, floor.position.z - (size[2] / 2) + 0.5);
    walls.push(wall5);

    let wall6 = createCube([size[0] / 3, wallHeight, size[1]], colour);
    wall6.position.set(floor.position.x - (size[0] / 3), position[1] + (wallHeight / 2) - 0.5, floor.position.z - (size[2] / 2) + 0.5);
    walls.push(wall6);

    let wall7 = createCube([size[1], wallHeight, size[0] / 3], colour);
    wall7.position.set(floor.position.x - (size[2] / 2) + 0.5,  position[1] + (wallHeight / 2) - 0.5, floor.position.z + (size[0] / 3));
    walls.push(wall7);

    let wall8 = createCube([size[1], wallHeight, size[0] / 3], colour);
    wall8.position.set(floor.position.x - (size[2] / 2) + 0.5,  position[1] + (wallHeight / 2) - 0.5, floor.position.z - (size[0] / 3));
    walls.push(wall8);

    /*for (let i = 0; i < 8; i++) {



    }*/

    let room = new Junction(floor, walls);

    return room;

}

export { generateCorridor, generateJunction }
```
{% endtab %}

{% tab title="roomClass.js" %}
```javascript
class Corridor {
    constructor(floor, wallLeft, wallRight) {
        this.floor = floor;
        this.wallLeft = wallLeft;
        this.wallRight = wallRight;

    }

}

class Junction {
    constructor(floor, walls) {
        this.floor = floor;
        this.walls = walls;

    }

}

export { Corridor, Junction };
```
{% endtab %}
{% endtabs %}

### Challenges

One of the main challenges I faced in this cycle, similar to the last two, was aligning the different parts of the Junction. This required some experimentation but also some research into the THREE docs which showed I could use local positioning to align meshes. Meaning that I could use to the position of the floor to align the walls.

![I had issues like this where the cubes would appear on the wrong side.](<../.gitbook/assets/image (9).png>)

## Testing

In cycle 5 I needed to do a lot of testing to make sure everything worked so that I could move on to the gameplay section. This meant I had to test corridors, junctions, colours and post processing.

### Tests

**Test 1:** Corridors

To do this test I wanted to put down as many corridors as possible in both different sizes and rotations to make sure it was fully working and that there were no issues.

| What I expect                                                            | What happened                                                 | Pass/Fail |
| ------------------------------------------------------------------------ | ------------------------------------------------------------- | --------- |
| Corridor will generate in any size on the x axis with correct alignment. | The corridor generates on the x axis with proper alignment.   | Pass      |
| Corridor will generate in any size on the z axis with correct alignment. | The corridor generates too wide when generated in the z axis. | Fail      |
| Corridors will generate with the correct colour.                         | The corridors colour displays correctly.                      | Pass      |

![Spawning two identical (except rotation) corridors inside each other with only the axis changes proves that z axis corridors generate incorrectly.](<../.gitbook/assets/image (4) (1).png>)

**Test 2:** Junctions

Like for Test 1 I wanted to put down as many junctions as possible to test that they were the correct alignment and that the colour was working correctly. However for junctions there is no need to worry about alignment as they always have four openings.

| What I expect                                       | What happened                                   | Pass/Fail |
| --------------------------------------------------- | ----------------------------------------------- | --------- |
| The junction will generate correctly at any size.   | The junction generates correctly at any size.   | Pass      |
| The junction will generate with the correct colour. | The junction generates with the correct colour. | Pass      |

{% hint style="info" %}
**Exception**

Due to the way the function is made, both the x and z values need to be the same. If not the function can generate other shapes. This will be fixed below by reducing the reliance on the z and instead just using x as it should be the same both directions.

The left image below is from the z value being half the x; whereas the right image is the correct one with the x and z being 10.

`generateJunction([10, 1, 5], 0x11ff11, [15, 0, 0]);`

``<img src="../.gitbook/assets/image (3) (2).png" alt="" data-size="original">``![](<../.gitbook/assets/image (2) (1).png>)``
{% endhint %}

**Test 3:** Postprocessing & Spectator Tool

For Test 3 I wanted to test everything else that had been added so far, this meant checking that the post processing patches were working: bloom, glitch and render. It also meant checking that the spectator tool had no errors and that the UI worked.

| What I expect                                                 | What happened                                                  | Pass/Fail |
| ------------------------------------------------------------- | -------------------------------------------------------------- | --------- |
| The spectator tool should respond to inputs without error.    | Pressing the mouse and keyboard works and there are no errors. | Pass      |
| The bloom pass should be visible and the settings changeable. | The bloom pass isn't working due to the colour background.     | Fail      |

## Bug Fixing / Changed Code

**Fix 1:** Corridor Rotation

This was the most important thing to fix; to do this I just had to add a plus and minus 0.5 to both walls. This was what I did for the corridor in the x direction which made it thinner. However I had not copied this across when changing the position of the rotated walls.

![The new, fixed, corridor layout.](<../.gitbook/assets/image (10).png>)

**Fix 2:** Bloom Pass

The Bloom Pass wasn't actually applying when I was using it; and when it did it would either result in a white screen (error) or it would make the game look horrible. Therefore, for the moment, I have decided to cut the Bloom Pass out as it is not really necessary as the lighting already looks passable without it.

![The Bloom Pass made the game look way worse; and was incompatible with the blue background.](<../.gitbook/assets/image (1) (2) (1).png>)

**Code Changed**

When making the junctions I had an array to hold all of the walls and I was able to add them using a for loop. This was a much better solution then manually adding something; therefore I decided to do this for all elements in the class. This meant I had to combine the walls and floor into an array bur also that the constructor of the class was cleaner and will be able to have more in when I get to adding gameplay.

{% tabs %}
{% tab title="game.js" %}
This is not the whole file just the updated methodology for adding all the parts of a junction or corridor to the scene.

```javascript
const junction = generateJunction([10, 1, 10], 0x11ff11, [15, 0, 0]);
const corridor = generateCorridor([10, 1, 5], 0xff11ff, [0, 0, 15], "z");

// this is more efficient than the previous method
for(let i=0; i < junction.components.length; i++){scene.add(junction.components[i])};
for(let i=0; i < corridor.components.length; i++){scene.add(corridor.components[i])};
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

        wall1.position.set(floor.position.x + (size[2] / 2) - 0.5, wall1.position.y, floor.position.z);
        wall2.position.set(floor.position.x - (size[2] / 2) + 0.5, wall2.position.y, floor.position.z);

    }

    let components = [floor, wall1, wall2];

    let room = new Corridor(components);

    return room;

}

function generateJunction(size, colour, position) {

    let floor = createCube(size, colour);
    floor.receiveShadow = true;
    floor.position.set(position[0], position[1], position[2]);

    let components = [];

    let wall1 = createCube([size[0] / 3, wallHeight, size[1]], colour);
    wall1.position.set(floor.position.x + (size[0] / 3), position[1] + (wallHeight / 2) - 0.5, floor.position.z + (size[2] / 2) - 0.5)
    components.push(wall1);

    let wall2 = createCube([size[0] / 3, wallHeight, size[1]], colour);
    wall2.position.set(floor.position.x - (size[0] / 3), position[1] + (wallHeight / 2) - 0.5, floor.position.z + (size[2] / 2) - 0.5);
    components.push(wall2);

    let wall3 = createCube([size[1], wallHeight, size[0] / 3], colour);
    wall3.position.set(floor.position.x + (size[2] / 2) - 0.5,  position[1] + (wallHeight / 2) - 0.5, floor.position.z + (size[0] / 3));
    components.push(wall3);

    let wall4 = createCube([size[1], wallHeight, size[0] / 3], colour);
    wall4.position.set(floor.position.x + (size[2] / 2) - 0.5,  position[1] + (wallHeight / 2) - 0.5, floor.position.z - (size[0] / 3));
    components.push(wall4);

    let wall5 = createCube([size[0] / 3, wallHeight, size[1]], colour);
    wall5.position.set(floor.position.x + (size[0] / 3), position[1] + (wallHeight / 2) - 0.5, floor.position.z - (size[2] / 2) + 0.5);
    components.push(wall5);

    let wall6 = createCube([size[0] / 3, wallHeight, size[1]], colour);
    wall6.position.set(floor.position.x - (size[0] / 3), position[1] + (wallHeight / 2) - 0.5, floor.position.z - (size[2] / 2) + 0.5);
    components.push(wall6);

    let wall7 = createCube([size[1], wallHeight, size[0] / 3], colour);
    wall7.position.set(floor.position.x - (size[2] / 2) + 0.5,  position[1] + (wallHeight / 2) - 0.5, floor.position.z + (size[0] / 3));
    components.push(wall7);

    let wall8 = createCube([size[1], wallHeight, size[0] / 3], colour);
    wall8.position.set(floor.position.x - (size[2] / 2) + 0.5,  position[1] + (wallHeight / 2) - 0.5, floor.position.z - (size[0] / 3));
    components.push(wall8);

    /*for (let i = 0; i < 8; i++) {



    }*/

    components.push(floor);

    let room = new Junction(components);

    return room;

}

export { generateCorridor, generateJunction };
```
{% endtab %}
{% endtabs %}

**Code Changed 2**

To make the above change more efficient I was able to add a function to the class which added all the elements to the scene. This meant the code used in the game.js file is very basic and simple meaning that it is less crowded. I did this by adding the function add(scene) to the classes which just had a for loop which looped through the components array and added each one to the scene.

{% tabs %}
{% tab title="game.js" %}
This is not the whole game.js file; I have only shown the updated method of adding objects to the scene.

```javascript
const junction = generateJunction([10, 1, 10], 0x11ff11, [15, 0, 0]);
const corridor = generateCorridor([10, 1, 5], 0xff11ff, [0, 0, 15], "z");

junction.add(scene);
corridor.add(scene);
```
{% endtab %}

{% tab title="roomClass.js" %}
```javascript
class Corridor {
    constructor(components) {
        this.components = components;

    }

    add(scene) {
        for (let i = 0; i < this.components.length; i++) {
            scene.add(this.components[i]);

        }

    }

}

class Junction {
    constructor(components) {
        this.components = components;

    }

    add(scene) {
        for (let i = 0; i < this.components.length; i++) {
            scene.add(this.components[i]);

        }

    }

}

export { Corridor, Junction };
```
{% endtab %}
{% endtabs %}

![Proof that the new generation method works; here are the two test rooms.](<../.gitbook/assets/image (2) (2).png>)
