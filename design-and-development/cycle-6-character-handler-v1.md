# CYCLE 6 Character Handler v1

## Design

### Objectives

In Cycle 6 I wanted to create a basic character handling system, using classes, so that in the next few cycles I can work on characters and gameplay. This also meant that I needed to create a test map so that I can have something to work with as I am programming in the gameplay.

The basic character handler will involve using classes and also a function at the end of the game.js file to make sure that their position is updated every frame. However I will also need to implement a system that makes it consistent as I do not want the game to run slower or faster on different frame rates as it currently does now.

There will also be a top down camera mode which will lock the OrbitControls and camera position which will be switchable using the GUI.

* [x] Create a test map.
* [x] Create a top down Camera.
* [ ] Create classes for characters.
* [ ] Create an update function at the end of game.js.

### Key Variables

| Variable Name | Usage                                                                                 |
| ------------- | ------------------------------------------------------------------------------------- |
| c1-c6         | The variables that store the corridors from the test map.                             |
| j1-j5         | The variables that store the junctions from the test map.                             |
| freecam       | The variable used to store the boolean for if the free camera mode is enabled or not. |

### Pseudocode

```
```

## Development

For this section I will be breaking down the development into multiple parts as there are a number of separate elements which I have to create.

**Development Part 1:** Creating The Map & Camera

To start with I began by making the map; for now it will be basic and created with a number of variables. These are listed above: c1-c6 and j1-j5. This will allow me to create a simple map and also focus on other things such as adding a locked camera.

To add the locked camera I had to add two functions to the GUI which when activated move the cameras position and where it is looking, it also disables OrbitControls. Then when pressing free cam this creates the opposite effect.

{% tabs %}
{% tab title="Map Code" %}
```javascript
const spawnJunction = generateJunction([10, 1, 10], 0xffffff, [0, 0, 0]);
spawnJunction.add(scene);

const c1 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [10, 0, 0]);
c1.add(scene);

const c2 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [-10, 0, 0]);
c2.add(scene);

const j1 = generateJunction([10, 1, 10], 0xffffff, [-20, 0, 0]);
j1.add(scene);

const c3 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [20, 0, 0]);
c3.add(scene);

const c4 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [0, 0, 10], "z");
c4.add(scene);

const c5 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [-20, 0, 10], "z");
c5.add(scene);

const j2 = generateJunction([10, 1, 10], 0xffffff, [-20, 0, 20]);
j2.add(scene);

const c6 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [-10, 0, 20]);
c6.add(scene);

const j3 = generateJunction([10, 1, 10], 0xffffff, [0, 0, 20]);
j3.add(scene);

const j4 = generateJunction([10, 1, 10], 0xffffff, [30, 0, 0]);
j4.add(scene);
```
{% endtab %}

{% tab title="Camera Code" %}
```javascript
function createPanel() {

    const panel = new GUI( { width: 310 } );

    const helpFolder = panel.addFolder( "Help" );
    const settingFolder = panel.addFolder( "Settings" );

    let settings = {

        "Use the show stats button to see stats.": "SIUUUUUUUUUUUUU",
        "Show Stats": function() {

            document.body.appendChild( stats.dom );

        },
        "Lock Camera": function() {

            camera.position.set(-10, 40, 10);
            camera.lookAt(-10, 0, 10);
            freecam = false;

        },
        "Free Camera": function() {

            camera.position.set(moveableCube.position.x - 5, moveableCube.position.y + 5, moveableCube.position.z);
            camera.lookAt(moveableCube.position);
            freecam = true;

        }

    }

    helpFolder.add( settings, "Use the show stats button to see stats." );
    settingFolder.add( settings, "Show Stats" );
    settingFolder.add( settings, "Lock Camera" );
    settingFolder.add( settings, "Free Camera" );

    helpFolder.close();
    settingFolder.open();

}

createPanel();
```
{% endtab %}
{% endtabs %}

**Development Part 2:** Creating Character Classes

