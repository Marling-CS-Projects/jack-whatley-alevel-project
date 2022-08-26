import { Corridor, Junction } from "/scripts/roomClass.js";
import { createCube } from "/scripts/createCube.js";

class Map {
    constructor(characters, enemy, rooms, map) {
        this.characters = characters;
        this.enemy = enemy;
        this.rooms = rooms;
        this.map = map;

    }

    createScene(scene) {
        this.rooms.forEach(element => {
            element.add(scene);

        });

    }

    createMapScreen() {
        for (let i = 0; i < this.rooms.length; i++) {
            let mapRoom = createCube([this.rooms[i].size[0], 1, this.rooms[i].size[2]], 0xffffff);
            this.map.push(mapRoom);

        }

    }

    createMap(scene) {
        this.map.forEach(element => {
            scene.add(element);

        })

    }

}

export { Map }