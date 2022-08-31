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

    let room = new Corridor(size, components, position, rotation);

    return room;

}

function generateJunction(size, colour, position) {

    let components = [];
    
    let floor = createCube(size, colour);
    floor.receiveShadow = true;
    floor.position.set(position[0], position[1], position[2]);

    components.push(floor);

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

    let room = new Junction(size, components, position);

    return room;

}

export { generateCorridor, generateJunction };