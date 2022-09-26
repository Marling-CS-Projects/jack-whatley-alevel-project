# characterClasses.js

```javascript
class Enemy {
    constructor(room, mesh) {
        this.room = room;
        this.mesh = mesh;

    }

    setPos(scene, pos, mesh) {
        scene.add(this.mesh[mesh]);
        
        if (pos) {
            this.mesh[mesh].position.set(pos[0], pos[1], pos[2])

        }
    }

    changeRoom(room, scene) {        
        this.setPos(scene, [0,0,0], 1);

    }

    changeRoomMap(room, scene) {
        let pos = [room.link.components[0].position.x, 0, room.link.components[0].position.z];
        this.room = room;
        this.setPos(scene, pos, 0);

    }

}

class Character {
    constructor(room, mesh, inventory) {
        this.room = room;
        this.mesh = mesh;
        this.inventory = inventory;

    }

    setPos(scene, pos, mesh) {
        scene.add(this.mesh[mesh]);
        
        if (pos) {
            this.mesh[mesh].position.set(pos[0], pos[1], pos[2])

        }
    }

    changeRoom(room, scene) {
        this.setPos(scene, [0,0,0], 1);

    }

    changeRoomMap(room, scene) {
        let pos = [room.link.components[0].position.x, 0, room.link.components[0].position.z];
        this.room = room;
        this.setPos(scene, pos, 0);

    }
}

export { Enemy, Character }
```
