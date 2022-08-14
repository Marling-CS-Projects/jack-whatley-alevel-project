import { Corridor, Junction } from "/scripts/roomClass.js";
import { createCube } from "/scripts/createCube.js";

class Map {
    constructor(characters, enemy, rooms, mapScreen) {
        this.characters = characters;
        this.enemy = enemy;
        this.rooms = rooms;
        this.mapScreen = mapScreen;

    }

    createScene(scene) {
        this.rooms.forEach(element => {
            element.add(scene);

        });

    }

    createMapScreen(scene) {
        for (let i = 0; i < this.rooms.length; i++) {
            scene.add(createCube([this.rooms[i].size[0], 1, this.rooms[i].size[2]], 0xffffff));

        }

    }

}

class MapScreen {
    constructor(rooms, maprooms) {
        this.rooms = rooms;
        this.maprooms = maprooms;

    }

    generateMap(scene) {
        for (let i = 0; i < this.rooms.length; i++) {
            scene.add(createCube([this.rooms[i].size[0], 1, this.rooms[i].size[2]], 0xffffff));

        }

    }

}

export { Map }