class Enemy {

    constructor(room, mesh) {

        this.room = room;
        this.mesh = mesh;

    }

    setPos(scene, pos) {

        scene.add(this.mesh);
        
        if (pos) {

            this.mesh.position.set(pos[0], pos[1], pos[2])

        }

    }

    changeRoom(room, scene) {

        this.room = room;
        this.setPos(scene);

    }

    changeRoomMap(room, scene) {

        let pos = [room.link.components[0].position.x, 0, room.link.components[0].position.z];
        this.room = room;
        this.setPos(scene, pos);

    }

}

class Character {

    constructor(room, mesh, inventory) {

        this.room = room;
        this.mesh = mesh;
        this.inventory = inventory;

    }

    setPos(scene, pos) {

        scene.add(this.mesh);
        
        if (pos) {

            this.mesh.position.set(pos[0], pos[1], pos[2])

        }

    }

    changeRoom(room, scene) {

        this.room = room;
        this.setPos(scene);

    }

    changeRoomMap(room, scene) {

        let pos = [room.link.components[0].position.x, 0, room.link.components[0].position.z];
        this.room = room;
        this.setPos(scene, pos);

    }

}

export { Enemy, Character }