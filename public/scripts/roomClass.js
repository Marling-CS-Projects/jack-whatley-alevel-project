class Corridor {
    constructor(size, components) {
        this.size = size;
        this.components = components;

    }

    add(scene) {
        for (let i = 0; i < this.components.length; i++) {
            scene.add(this.components[i]);

        }

    }

}

class Junction {
    constructor(size, components) {
        this.size = size;
        this.components = components;

    }

    add(scene) {
        for (let i = 0; i < this.components.length; i++) {
            scene.add(this.components[i]);

        }

    }

}

export { Corridor, Junction };