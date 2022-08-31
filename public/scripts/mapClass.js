import { Corridor, Junction } from "/scripts/roomClass.js";
import { createCube } from "/scripts/createCube.js";
import { degToRad } from "./degToRad.js";

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
            let mapRoom = createCube([this.rooms[i].size[0] - 1, 1, this.rooms[i].size[2] - 1], 0xffffff);
            mapRoom.position.set(this.rooms[i].position[0], 1, this.rooms[i].position[2]);
            if (this.rooms[i].constructor.name === "Corridor") {
                if (this.rooms[i].orientation === "z") {
                    mapRoom.rotation.y = degToRad(90);

                }

            }
            console.log(mapRoom);
            this.map.push(mapRoom);

        }

    }

    createMap(scene) {
        this.createMapScreen();
        this.map.forEach(element => {
            scene.add(element);

        })

    }

}

export { Map }