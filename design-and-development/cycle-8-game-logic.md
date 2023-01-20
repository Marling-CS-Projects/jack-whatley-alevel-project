# CYCLE 8 Game Logic

## Design

### Objectives

In Cycle 8 I want to make sure the key game logic is in place; this means implementing the "sort of" turn based system. This means that once the player has given the characters a move, after they have performed it, the game switches to the enemy's turn. This will allow the enemy character to move without causing any issues with the player. This means that later on events like the enemy attacking will be handled in this turn.

* [x] Implement a turn managing system (object).
* [x] Add a dev option to force switch turns.
* [x] Make rooms store data about which room is connected.
* [x] Add simple movement to enemy.

### Key Variables

| Variable Name    | Usage                                                                            |
| ---------------- | -------------------------------------------------------------------------------- |
| character, enemy | These store the character and enemy objects and contain all their functionality. |
| MAP              | The map object stores a large amount of data about the rooms.                    |

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

<figure><img src="../.gitbook/assets/image (12) (2).png" alt=""><figcaption><p>The character on the map view, clicking moves it around.</p></figcaption></figure>

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

Due to how much time it would take to make a proper solution to sort out how rooms are connected. I decided to make the room connections be handle manually i.e. I would just hard code which rooms are connected; then use the DomEvents to verify.

{% tabs %}
{% tab title="domevents" %}
{% code title="game.js" overflow="wrap" %}
```javascript
for (let i = 0; i < MAP.scenes.length; i++) {
    domEvent.addEventListener(MAP.map[i].components[0], "click", (e) => {
        if (viewTurn.turn === false) {
            if (character.room.link.connected[0] === MAP.map[i].link.name) {
                character.changeRoomMap(MAP.map[i], MapView);

            } else if (character.room.link.connected[1] === MAP.map[i].link.name) {
                character.changeRoomMap(MAP.map[i], MapView);

            } else if (character.room.link.connected[2] === MAP.map[i].link.name) {
                character.changeRoomMap(MAP.map[i], MapView);

            } else {
                console.log("no match");

            }
            //character.changeRoom(MAP.scenes[i].room, MAP.scenes[i].scene);
            //viewTurn.turn = true;

        } else if (viewTurn.turn === true) {
            SCENE = MAP.scenes[i].scene;
            CAMERA = MAP.scenes[i].camera[0];

        } 
    });
}
```
{% endcode %}
{% endtab %}

{% tab title="Second Tab" %}
{% code title="game.js" %}
```javascript
spawnJunction.connected.push(middleUpperCorridor.name, middleCorridor.name, longCorridorLeft.name);
middleUpperCorridor.connected.push(spawnJunction.name, topLeftJunction.name);
topLeftJunction.connected.push(middleUpperCorridor.name, middleLeftCorridor.name);
middleLeftCorridor.connected.push(topLeftJunction.name, lowerLeftJunction.name);
lowerLeftJunction.connected.push(middleLeftCorridor.name, middleLowerCorridor.name);
middleLowerCorridor.connected.push(lowerLeftJunction.name, lowerMiddleJunction.name);
lowerMiddleJunction.connected.push(middleLowerCorridor.name, middleCorridor.name);
middleCorridor.connected.push(lowerMiddleJunction.name, spawnJunction.name);
longCorridorLeft.connected.push(spawnJunction.name, longCorridorRight.name);
longCorridorRight.connected.push(longCorridorLeft.name, rightJunction.name);
rightJunction.connected.push(longCorridorRight.name);
```
{% endcode %}
{% endtab %}
{% endtabs %}

**Development Part 4:** Making the Enemy

To end this cycle, I wanted to add a basic enemy with enough functionality to chase the player character around whenever it is their turn. I say "chase" here because THREE lacks a lot of functionality that would allow me to implement this quickly so I just decided to have it move randomly on some turns.

To do this I made an object for handling whether it was the enemies turn to move or not. Then into the update function at the end I added the code that would move the enemy whenever it was their turn; and also, when they rolled the right number on a random function. I also added another if statement to check whether the name of the room the enemy and character currently in match. In which case it ends the game.

{% tabs %}
{% tab title="game.js" %}
```javascript
if (enemyTurn.turn == true) {
        let chance = Math.floor(Math.random() * 10);
        let random = Math.floor(Math.random() * 2);

        if (chance > 6) {
            let room = MAP.map.findIndex((MapRoom) => MapRoom.link.name === enemy.room.link.connected[random])
            enemy.changeRoomMap(MAP.map[room], MapView);

        }
        enemyTurn.turn = false;
    }

if (enemy.room.link.name === character.room.link.name) {
    document.getElementById("view-output").classList.remove("hidden");

}
```
{% endtab %}

{% tab title="game.html" %}
```html
<body>

    <div class="text-box hidden" id="view-output">
            
        <h1 class="text">Game Over</h1>
        
    </div>

    <script type="importmap">
            
        {
                
            "imports": {
                
                "three": "../build/three.module.js"
                
            }
            
        }
        
    </script>

    <script type="module" src="./game.js"></script>

</body>
```
{% endtab %}
{% endtabs %}

Below I have attached a video demonstrating the final version of this cycle. This includes the characters moving and the rooms being connected; as well as the enemy "chasing" the player.

{% embed url="https://youtu.be/LXxKtsDgTg8" %}
Here is the demonstration of the majority of features added.
{% endembed %}

### Challenges

Due to the character and enemy using one mesh and then that being moved between scenes and also the map. This caused a number of issues when moving it around as both functions tried to move the same mesh, causing it to not move at all.

This means for the moment only the map screen is functional; however, it will be an easy fix next cycle to create a new mesh for the character and enemy and make the functions manipulate their different meshes.

{% code title="Current Map Function" %}
```javascript
character.changeRoomMap(MAP.map[i], MapView);
```
{% endcode %}

{% code title="Current Scene Function" %}
```javascript
character.changeRoom(MAP.scenes[i].room, MAP.scenes[i].scene);
```
{% endcode %}

As is visible here they both move the same mesh which causes a lot of issues, but I will be able to fix easily next cycle.

## Testing

In Cycle 8 it was important to make sure all these key features are working so I can make sure the game is set up for more gameplay in the next cycle.

### Tests

**Test 1:** Character Movement + View Turns

The new function for moving in the map scene needs to be tested as it is the basis for everything else in this cycle. As does switching between a viewing and moving turn.

| What I expect                                                               | What happened                                                             | Pass/Fail |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------- | --------- |
| Whenever I click on a room the Character will move                          | When I click on a room the character moves.                               | Pass      |
| When I click on a room in the view turn the camera will switch to the room. | When I click on a room in the view turn it switches to a view of the room | Pass      |

**Test 2:** Room Connections

Making rooms connected is important because it is the basis for the enemies "AI" and also for making the character only be able to move into connected rooms.

| What I expect                                                      | What happened                                                    | Pass/Fail |
| ------------------------------------------------------------------ | ---------------------------------------------------------------- | --------- |
| The character will not be able to move to and unconnected room     | When clicking on an unconnected room the character doesn't move  | Pass      |
| Clicking on an unconnected room will not cause the turn to change. | Clicking on a room that is not connected doesn't switch turns    | Pass      |

**Test 3:** Enemy Movement

The enemy needs to move around after the player has (40% chance of this) and also needs to be limited to certain rooms; creating a fake sense of a patrol pattern.

| What I expect                                                             | What happened                                                 | Pass/Fail |
| ------------------------------------------------------------------------- | ------------------------------------------------------------- | --------- |
| The enemy will move randomly after the player moves                       | The enemy moves after the player does                         | Pass      |
| The enemy will stick to the square of rooms rather than the long corridor | The enemy seems to patrol only the square shape of rooms      | Pass      |
| When the player and enemy are in the same room the game ends              | The game over screen activates and the game is not playable\* | Pass      |

\* Meaning that the player can't continue playing with the text on screen; not that the game is completely broken.
