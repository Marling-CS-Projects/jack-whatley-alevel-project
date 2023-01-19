class ViewTurn {
    constructor(turn, count) {
        this.turn = turn;
        this.count = count;

    }

    // true = viewing; false = moving

    initialise() {
        this.turn = true;
        this.count = 0;

    }

    iterate() {
        this.count++;
    }

}

class EnemyTurn {
    constructor(turn) {
        this.turn = turn;

    }

    // true = move; false = not moving

    initialise() {
        this.turn = false;

    }

}

export { ViewTurn, EnemyTurn };