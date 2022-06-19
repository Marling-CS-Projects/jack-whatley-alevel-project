import * as THREE from "three";
import { Corridor, Junction } from "./roomClass.js";
import { createCube } from "./createCube.js";
import { Scene } from "three";

const wallHeight = 5;

function generateCorridor(size, colour, position) { // size [1, 10, 1]

    let floor = createCube(size, colour);
    floor.receiveShadow = true;
    floor.position.set(position[0], position[1], position[2]);

    let wall1 = createCube([size[0], wallHeight, size[1]], 0xffffff);
    wall1.receiveShadow = true;
    wall1.castShadow = false;
    wall1.position.set(position[0], position[1] + (0.5 * wallHeight) - 0.5, position[2] - (size[2] / 2)); // change wallheight to size[0] for reactiveness

    let wall2 = createCube([size[0], wallHeight, size[1]], 0xffffff);
    wall2.receiveShadow = true;
    wall2.castShadow = false;
    wall2.position.set(position[0], position[1] + (0.5 * wallHeight) - 0.5, position[2] + (size[2] / 2)); // change wallheight to size[0] for reactiveness

    let room = new Corridor(floor, wall1, wall2)

    return room;

}

export { generateCorridor };