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

