# CYCLE 8 Game Logic

## Design

### Objectives

In Cycle 8 I want to make sure the key game logic is in place; this means implementing the "sought of" turn based system. This means that once the player has given the characters a move, after they have performed it, the game switches to the enemy's turn. This will allow the enemy character to move without causing any issues with the player. This means that later on events like the enemy attacking will be handled in this turn.

* [ ] Implement a turn managing system (object).
* [ ] Add a dev option to force switch turns.
* [ ] Make rooms store data about which room is connected.
* [ ] Add simple movement to enemy.

### Key Variables

| Variable Name | Usage |
| ------------- | ----- |
|               |       |
|               |       |
|               |       |

### Pseudocode

```
```

## Development

**Development Part 1:** Two Methods for moving Characters

To begin this cycle, I wanted to make sure that I can easily move the character between rooms and scenes depending on whether they are currently in the Map View or the Scene View. This meant creating two new methods under the character and enemy classes.

{% code title="characterClasses.js" overflow="wrap" %}
```javascript
class Character {
    constructor(room, mesh, inventory) {
        this.room = room;
        this.mesh = mesh;
        this.inventory = inventory;

    }

    setPos(scene, pos) {
        scene.add(this.mesh);
        if (pos) { // it defaults to pos 0,0,0 in rooms, but cant for the map
            this.mesh.position.set(pos[0], pos[1], pos[2])

        }
    }

    changeRoom(room, scene) { // moving between scenes
        this.room = room;
        this.setPos(scene);

    }

    changeRoomMap(room, scene) { // moving rooms on map
        let pos = [room.components[0].position.x, 0, room.components[0].position.z];
        this.setPos(scene, pos);

    }
}
```
{% endcode %}

<figure><img src="../.gitbook/assets/image.png" alt=""><figcaption><p>The character on the map view, clicking moves it around.</p></figcaption></figure>

**Development Part 2:** Moving and Viewing Turns

One of the problems I have is that currently both switching scene views and moving the characters is tied to clicking. Meaning that to begin to implement turns I need to implement different turns for viewing and moving. This will make testing easier and also make much more sense for the game.

To do this I created an object that handles which turn it is and what can be done during the turn.

{% code title="turn.js" overflow="wrap" %}
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

export { ViewTurn };
```
{% endcode %}

This is then processed when I create the DomEvents for each separate cube on the Map screen.

{% code title="game.js" overflow="wrap" %}
```javascript
for (let i = 0; i < MAP.scenes.length; i++) {
    domEvent.addEventListener(MAP.map[i].components[0], "click", (e) => {
        if (viewTurn.turn === false) {
            character.changeRoomMap(MAP.map[i], MapView);
            character.changeRoom(MAP.scenes[i].room, MAP.scenes[i].scene);
            viewTurn.turn = true;

        } else if (viewTurn.turn === true) {
            SCENE = MAP.scenes[i].scene;
            CAMERA = MAP.scenes[i].camera[0];
            // view turn is ended via ui

        } 
    });
}
```
{% endcode %}

This now means that the game starts in the movement turn (this is because the character technically isn't in the scene yet). Which means wherever the player clicks the character moves and the turn switches to view. This turn allows the player to move freely between rooms and can be ended via a button on the UI.

**Development Part 3:** Making Rooms Connected

For the actual game the player will only be able to move into connected rooms; however, at the moment, they can just click on any room and move to it. This means I need to make rooms store which are connected and run that information through the DomEvents function.

