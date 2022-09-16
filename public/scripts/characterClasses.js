class Enemy {

    constructor(room, mesh) {

        this.room = room;
        this.mesh = mesh;

    }

    setPos(scene) {

        scene.add(this.mesh);
        this.mesh.position.set(this.room.components[0].position.x, this.room.components[0].position.y /*+ (this.mesh.height / 2)*/, this.room.components[0].position.z);

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

        let pos = [room.components[0].position.x, 0, room.components[0].position.z];
        this.setPos(scene, pos);

    }

}

export { Enemy, Character }