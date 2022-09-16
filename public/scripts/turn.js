class ViewTurn {
    constructor(turn) {
        this.turn = turn;

    }

    // true = viewing; false = moving

    initialise() {
        this.turn = true;

    }

}

export { ViewTurn };