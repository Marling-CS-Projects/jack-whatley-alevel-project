# turn.js

```javascript
class ViewTurn {
    constructor(turn) {
        this.turn = turn;

    }

    // true = viewing; false = moving

    initialise() {
        this.turn = true;

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
```
