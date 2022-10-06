# CYCLE 9 Final Patch

## Design

### Objectives

In Cycle 9, the final patch, I wanted to polish the game to the point where all the current features work consistently. I also wanted to add a number of small features that could be implemented in time and that would add and improve the gameplay.

* [x] Fix Character / Enemy mesh issues.
* [x] Make FPS counter optional.

### Key Variables

| Variable Name    | Usage                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------- |
| showStats, stats | Controls whether the FPS counter is displayed. True or False. Stats contains DOM element. |
| character, enemy | The variables containing the enemy and character objects.                                 |

## Development

**Development Part 1:** Fix Character / Enemy mesh issues.

As mentioned in the challenges section of [Cycle 8](cycle-8-game-logic.md#challenges), there were issues as when both functions to move the mesh were used, the game crashed. However as was also stated there it was a simple fix which involved creating two meshes and then making sure the character and enemy functions moved their respective meshes.

{% code title="game.js" overflow="wrap" %}
```javascript
const character = new Character(MAP.map[0], [createCube([1, 5, 1], material2), createCube([1, 5, 1], material2)]);
character.changeRoomMap(MAP.map[0], MapView);
character.changeRoom(MAP.scenes[0].room, MAP.scenes[0].scene);

const enemy = new Enemy(MAP.map[4], [createCube([1, 5, 1], material1), createCube([1, 5, 1], material1)]);
enemy.changeRoomMap(MAP.map[4], MapView);
enemy.changeRoom(MAP.scenes[4].room, MAP.scenes[4].scene);

for (let i = 0; i < MAP.scenes.length; i++) {
    domEvent.addEventListener(MAP.map[i].components[0], "click", (e) => {
        if (viewTurn.turn === false) {
            if (character.room.link.connected[0] === MAP.map[i].link.name) {
                character.changeRoomMap(MAP.map[i], MapView);
                character.changeRoom(MAP.scenes[i].room, MAP.scenes[i].scene);

                console.log(MAP.scenes[i]);

            } else if (character.room.link.connected[1] === MAP.map[i].link.name) {
                character.changeRoomMap(MAP.map[i], MapView);
                character.changeRoom(MAP.scenes[i].room, MAP.scenes[i].scene);

                console.log(MAP.scenes[i]);

            } else if (character.room.link.connected[2] === MAP.map[i].link.name) {
                character.changeRoomMap(MAP.map[i], MapView);
                character.changeRoom(MAP.scenes[i].room, MAP.scenes[i].scene);

                console.log(MAP.scenes[i]);

            } else {
                console.log("no match");
            }
            
            viewTurn.turn = true;
            enemyTurn.turn = true;

        } else if (viewTurn.turn === true) {
            SCENE = MAP.scenes[i].scene;
            CAMERA = MAP.scenes[i].camera[0];
        }
    });
}

/// inside animate function

if (enemyTurn.turn == true) {
    let chance = Math.floor(Math.random() * 10);
    let random = Math.floor(Math.random() * 2);

    if (chance > 6) {
        let room = MAP.map.findIndex((MapRoom) => MapRoom.link.name === enemy.room.link.connected[random])
        enemy.changeRoomMap(MAP.map[room], MapView);
        enemy.changeRoom(MAP.scenes[room].room, MAP.scenes[room].scene);

    }
    enemyTurn.turn = false;
    
}
```
{% endcode %}

{% code title="characterClasses.js" overflow="wrap" %}
```javascript
class Enemy {
    constructor(room, mesh) {
        this.room = room;
        this.mesh = mesh;

    }

    setPos(scene, pos, mesh) {
        scene.add(this.mesh[mesh]);
        
        if (pos) {
            this.mesh[mesh].position.set(pos[0], pos[1], pos[2])

        }
    }

    changeRoom(room, scene) {
        this.setPos(scene, [0,0,0], 1);

    }

    changeRoomMap(room, scene) {
        let pos = [room.link.components[0].position.x, 0, room.link.components[0].position.z];
        this.room = room;
        this.setPos(scene, pos, 0);

    }
}

class Character {
    constructor(room, mesh, inventory) {
        this.room = room;
        this.mesh = mesh;
        this.inventory = inventory;

    }

    setPos(scene, pos, mesh) {
        scene.add(this.mesh[mesh]);
        
        if (pos) {
            this.mesh[mesh].position.set(pos[0], pos[1], pos[2])

        }
    }

    changeRoom(room, scene) {
        this.setPos(scene, [0,0,0], 1);

    }

    changeRoomMap(room, scene) {
        let pos = [room.link.components[0].position.x, 0, room.link.components[0].position.z];
        this.room = room;
        this.setPos(scene, pos, 0);

    }
}
export { Enemy, Character }
```
{% endcode %}

As is visible I added back the function `changeRoom()` to game.js and then ensured that it was working. However, I did have a slight issue of the character's / enemy's second mesh's position being undefined; but this was a simple fix as I just parsed the position `(0,0,0)` into the `setPos()` function.

**Development Part 2:** Optional FPS counter.

I also wanted to make the FPS counter optional, as it was earlier, as not all players will necessarily want it on the screen. This was easy as I just had to remove the comments by the `showStats` variable and the update the animate function to contain the `stats.update()` function.

{% code title="game.js" overflow="wrap" %}
```javascript
const stats = new Stats();
let showStats = false;

/// create UI button function

"Show FPS": function() {

    document.body.appendChild( stats.dom );
    showStats = true;

}

/// animate function

if (showStats === true) {
    stats.update();

}
```
{% endcode %}

## Testing

For the final Cycle I wanted to make sure the features that I had just added were functioning correctly so that I could say I got the game to a completed state.

### Tests

**Test 1:** Character / Enemy Meshes

Now that I have finished a feature that I have been working on for a while so I need to ensure that it works perfectly.

| What I expect                                               | What happened            | Pass / Fail |
| ----------------------------------------------------------- | ------------------------ | ----------- |
| When I click on a room the character will be visible        | The character is visible | Pass        |
| When I click on a room the enemy will be visible            | The enemy is visible     | Pass        |
| When I move the character or enemy their room should change | Their room changes       | Pass        |

**Test 2:** FPS Counter

So the player can see how well the game is performing, I need to make sure that the FPS counter works.

| What I expect                                        | What happened                                                     | Pass / Fail |
| ---------------------------------------------------- | ----------------------------------------------------------------- | ----------- |
| The FPS counter won't start displayed on the screen. | The FPS counter is not on screen when the game starts             | Pass        |
| The FPS counter appears when the button is pressed   | The FPS counter is visible and working when the button is pressed | Pass        |

## Video Evidence

{% embed url="https://youtu.be/aeEWgbreKjE" %}
&#x20;A demonstration of everything added in Cycle 9.
{% endembed %}
