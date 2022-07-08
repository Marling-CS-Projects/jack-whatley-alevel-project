const random = (max) => {

    return Math.round((Math.random() * max - 1) + 1);

}

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

    setPos(scene) {

        scene.add(this.mesh);
        this.mesh.position.set(this.room.components[0].position.x + random(4), this.room.components[0].position.y /*+ (this.mesh.height / 2)*/, this.room.components[0].position.z + random(4));

    }

}

export { Enemy, Character }