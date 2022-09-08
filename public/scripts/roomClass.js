class Corridor {
    constructor(size, components, position, orientation, connected) {
        this.size = size;
        this.components = components;
        this.position = position;
        this.orientation = orientation;
        this.connected = connected;

    }

    add(scene) {
        for (let i = 0; i < this.components.length; i++) {
            scene.add(this.components[i]);

        }

    }

}

class Junction {
    constructor(size, components, position, connected) {
        this.size = size;
        this.components = components;
        this.position = position;
        this.connected = connected;

    }

    add(scene) {
        for (let i = 0; i < this.components.length; i++) {
            scene.add(this.components[i]);

        }

    }

}

export { Corridor, Junction };