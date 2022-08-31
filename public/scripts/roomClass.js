class Corridor {
    constructor(size, components, position, orientation) {
        this.size = size;
        this.components = components;
        this.position = position;
        this.orientation = orientation;

    }

    add(scene) {
        for (let i = 0; i < this.components.length; i++) {
            scene.add(this.components[i]);

        }

    }

}

class Junction {
    constructor(size, components, position) {
        this.size = size;
        this.components = components;
        this.position = position;

    }

    add(scene) {
        for (let i = 0; i < this.components.length; i++) {
            scene.add(this.components[i]);

        }

    }

}

export { Corridor, Junction };