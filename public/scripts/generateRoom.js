import * as THREE from "three";
import { Corridor, Junction } from "./roomClass.js";
import { createCube } from "./createCube.js";

function generateCorridor(size, colour, position) { // size [1, 10, 1]

    let floor = createCube(size, colour)
    floor.receiveShadow = true;
    floor.position.set(position[0], position[1], position[2]);
    return floor;

}

export { generateCorridor };