class Corridor {
    constructor(components) {
        this.components = components;

    }

    add(scene) {
        for (let i = 0; i < this.components.length; i++) {
            scene.add(this.components[i]);

        }

    }

}

class Junction {
    constructor(components) {
        this.components = components;

    }

    add(scene) {
        for (let i = 0; i < this.components.length; i++) {
            scene.add(this.components[i]);

        }

    }

}

export { Corridor, Junction };