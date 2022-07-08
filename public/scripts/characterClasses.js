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

export { Enemy }