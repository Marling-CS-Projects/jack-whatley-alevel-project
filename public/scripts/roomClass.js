class Corridor {
    constructor(floor, wallLeft, wallRight) {
        this.floor = floor;
        this.wallLeft = wallLeft;
        this.wallRight = wallRight;

    }

}

class Junction {
    constructor(floor, walls) {
        this.floor = floor;
        this.walls = walls;

    }

}

export { Corridor, Junction };