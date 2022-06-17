class Corridor {
    constructor(floor, wallLeft, wallRight) {
        this.floor = floor;
        this.wallLeft = wallLeft;
        this.wallRight = wallRight;

    }

}

class Junction {
    constructor(floor) {
        this.floor = floor;

    }

}

export { Corridor, Junction };