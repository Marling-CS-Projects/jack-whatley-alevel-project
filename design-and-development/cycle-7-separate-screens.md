# CYCLE 7 Separate Screens

## Design

### Objectives

In Cycle 7 I wanted to start making the game less of a testing ground and more like a game. This means adding in more of the game logic and also creating the separate screens; these are the map screen and the individual room screens.

I also wanted the game to be able to handle new features in the future like procedural generation with less work needed. Therefore I also wanted to create a system that would do all the generation for me when provided with an array of rooms.

* [x] Create a method for switch between scenes.
* [x] Create a class for the map; that stores rooms and functions.
* [x] Create a function that generates the map scene.
* [x] Create a function that generates all the individual room scenes.
* [x] Make the map screen simple looking.

### Key Variables

| Variable Name       | Usage                                                          |
| ------------------- | -------------------------------------------------------------- |
| SCENE               | The variable that stores which scene is currently being used.  |
| CAMERA              | The variable that stores which camera is currently being used. |
| MapCamera, MapScene | The constants that store the new Map scene and camera.         |

## Development

As in Cycle 6 I will be breaking down this development into multiple parts; this is again because the development is quite long for this cycle.

**Development Part 1:** Scene & Camera Switching

To allow me to have a map screen and also a room screen; I needed to create a method for switching scenes. To do this I created variables for storing which scene and camera is currently active. These can then be changed whilst the game is running and are updated in the animate function.

{% code title="game.js" overflow="wrap" %}
```javascript
// setting up seperate scenes
const scene = new THREE.Scene();
const MapView = new THREE.Scene();

let SCENE = scene; // sets to default scene (test map)

// setting up two cameras to switch between
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );
const MapCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );

// CAMERA variable is used in renderer function which can then be switched
let CAMERA = camera; // sets to default camera (test map camera)
```
{% endcode %}

To actually test this out, I had to implement a way to switch scenes while the game was running. This was easy to do thanks to the GUI I had added previously as all I had to do was add two buttons that would switch the scenes and cameras. Then all I had to do was update the render function with the two variables `SCENE` and `CAMERA`.

{% code title="game.js" overflow="wrap" %}
```javascript
// updating gui to include camera and scene switching
function createPanel() {
    const panel = new GUI( { width: 300 } );

    const helpFolder = panel.addFolder( "Help" );
    const settingFolder = panel.addFolder( "Settings" );

    let settings = {
        "Use the show stats button to see stats.": "0",
        "Show Stats": function() {
            document.body.appendChild( stats.dom ); // adding stats

        },
        // fixing camera above map function
        "Lock Camera": function() {
            camera.position.set(-10, 40, 10);
            camera.lookAt(-10, 0, 10);
            freecam = false;

        },
        // switch to orbit controls camera
        "Free Camera": function() {
            camera.position.set(
                moveableCube.position.x - 5, 
                moveableCube.position.y + 5, 
                moveableCube.position.z);
            camera.lookAt(moveableCube.position);
            freecam = true;

        },
        // switching to map scene
        "Map Scene": function() {
            SCENE = MapView;
            CAMERA = MapCamera;

        },
        // switching to test scene
        "Test Scene": function() {
            SCENE = scene;
            CAMERA = camera;

        }

    }

    helpFolder.add( settings, "Use the show stats button to see stats." );
    settingFolder.add( settings, "Show Stats" );
    settingFolder.add( settings, "Lock Camera" );
    settingFolder.add( settings, "Free Camera" );
    settingFolder.add( settings, "Map Scene" );
    settingFolder.add( settings, "Test Scene" );

    helpFolder.open();
    settingFolder.open();

}

function animate() { // not the full animate function
    
    requestAnimationFrame( animate );

    stats.update(); // running stats elemenet

    renderer.render( SCENE, CAMERA ); // these variables can be changed to change
                                      // the scene and camera
}

animate();
createPanel(); // adding panel to page
```
{% endcode %}

**Development Part 2:** Map Generation

For this part of development I wanted to take what I had learnt in Dev Part 1 and Cycle 6 to make sure the core game logic was in place. To do this I came up with a hierarchy chart style diagram to help plan my implementation.

![A simple plan that will allow me to add the first iteration of game logic.](../.gitbook/assets/comp-logic-plan.png)

To begin with I started by working on interpreting the data and then adding them to the Map Scene that I had created in development part one. This involved updating the Map class with a two new variables titled map (for the map scene) and scenes (to hold all the individual scenes). This ticks of a number of things set out above.

{% code title="" overflow="wrap" %}
```javascript
// the updated map class
class Map {
    // map class needs to keep track of everything in scene
    constructor(characters, enemy, rooms, map, scenes) {
        this.characters = characters;
        this.enemy = enemy;
        this.rooms = rooms;
        this.map = map;
        this.scenes = scenes;

    }

    createScene(scene) { // this puts all elements in the map creation screen
        this.rooms.forEach(element => {
            element.add(scene);

        });

    }

    createMapScreen() { // this creates the map scene by looping through rooms
        for (let i = 0; i < this.rooms.length; i++) {
            // default black material
            let material = new THREE.MeshStandardMaterial({color: 0x000000});
            // special outline material
            let outlineMaterial = 
                new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.BackSide});

            // creating map cube
            let component = createCube(
                [this.rooms[i].size[0] - 1.5, 
                1, 
                this.rooms[i].size[2] - 1.5], material);
            // creating outline cube
            let outline = createCube(
                [this.rooms[i].size[0] - 1.5, 
                1, 
                this.rooms[i].size[2] - 1.5], outlineMaterial);

            // sets position of room (in map)
            component.position.set(
                this.rooms[i].position[0], 
                1, 
                this.rooms[i].position[2]);
            outline.position.set(
                this.rooms[i].position[0], 
                1, 
                this.rooms[i].position[2]);

            // increasing outline scale to create effect
            outline.scale.set(1.05,1.05,1.05);
            
            // rotating if corridor
            if (this.rooms[i].constructor.name === "Corridor") {
                if (this.rooms[i].orientation === "z") {
                    component.rotation.y = degToRad(90);
                    outline.rotation.y = degToRad(90);

                }

            }

            // adding to the map class
            let mapRoom = new MapRoom([component, outline], this.rooms[i]);
            this.map.push(mapRoom);

        }

    }

    createMap(scene) { // this add all elements to the map scene
        this.createMapScreen();
        this.map.forEach(element => {
            element.components.forEach(component => {
                scene.add(component);

            })

        })

    }

}
```
{% endcode %}

I also needed to create two more classes so as to be able to store the scene data in a way that was intuitive and uses object orientated programming.

{% code title="mapClass.js" %}
```javascript
// class for the rooms in the map scene
class MapRoom {
    constructor(components, link) {
        this.components = components;
        this.link = link;

    }

}

// class for each individual scene that appears when clicking on room
class RoomScene {
    constructor(name, scene, room) {
        this.name = name;
        this.scene = scene;
        this.room = room;

    }

}

export { Map, RoomScene }
```
{% endcode %}

The reason that the create map scene function is so complicated is because I wanted the map items to have a white outline; this means for each room I had to create two cubes and then make one of them have a THREE.Backside texture. This means that because it is slightly larger than the other cube it appears as on outline.

<figure><img src="../.gitbook/assets/image (1) (1).png" alt=""><figcaption><p>The outline effect of the map screen.</p></figcaption></figure>

**Development Part 3:** Individual Scenes

To begin with I had to complete the final part of the diagram above; meaning that from the map screen I had to generate individual scenes from the map data. Then I had to put a new camera and also a new Corridor or Junction in each scene.

{% code title="game.jsj" overflow="wrap" %}
```javascript
// this part takes all the data from the map creation scene
let MAP = new Map([], [], [spawnJunction, c1, c2, c3, c4, c5, c6, j1, j2, j3, j4], [], []);
MAP.createScene(scene); // creating scenes
MAP.createMap(MapView); // creating the map screen

for (let i = 0; i < MAP.rooms.length; i++) {
    // creating individual scenes
    let roomScene = new RoomScene(
        `${MAP.rooms[i].constructor.name}${i}`, 
        new THREE.Scene, 
        MAP.rooms[i]);
    MAP.scenes.push(roomScene);

}
```
{% endcode %}

I then also created a loop that would create all the individual scenes and push them to the scenes array that is part of the MAP class. This is somewhat complicated as I had to make sure that all rooms stored which type they are and also knew which orientation the corridors were. Scenes also need a light and camera so I had to ensure those were added; but for the moment as a method to test out this loop I just added a function to the UI to switch to room scene one.

{% tabs %}
{% tab title="Scene Creation Loop" %}
{% code title="game.js scene loop" overflow="wrap" %}
```javascript
// creating invdividual room scenes
for (let i = 0; i < MAP.scenes.length; i++) {
    // creating components: camera, light, room
    let room;
    let camera = new THREE.PerspectiveCamera( 
        75, window.innerWidth / window.innerHeight, 1, 100 );
    let roomlight = new THREE.SpotLight( 0x87ceeb, 10 );
    roomlight.target.position.set(-10, 0, 10);
    roomlight.position.set(-10, 50, 10);
    
    // logic for corridor
    if (MAP.scenes[i].room.constructor.name === "Corridor") {
        room = generateCorridor(
            MAP.scenes[i].room.size, 0xff11ff, [0,0,0], 
            MAP.scenes[i].room.rotation);
        camera.position.set(-5,10,0);
        camera.lookAt(0,1,0);

    }
    
    // logic for junction
    if (MAP.scenes[i].room.constructor.name === "Junction") {
        room = generateJunction(MAP.scenes[i].room.size, 0xffffff, [0,0,0]);
        camera.position.set(-5,15,0);
        camera.lookAt(0,1,0);

    }
    
    // adding to scene
    room.add(MAP.scenes[i].scene);
    MAP.scenes[i].scene.add(camera);
    MAP.scenes[i].scene.add(roomlight);

}
```
{% endcode %}
{% endtab %}

{% tab title="Updated Classes" %}
{% code title="mapClass.js" overflow="wrap" %}
```javascript
// updated class for individual room scenes
class RoomScene {
    constructor(name, scene, room) {
        this.name = name;
        this.scene = scene;
        this.room = room;

    }
}
```
{% endcode %}

{% code title="roomClass.js" overflow="wrap" %}
```javascript
// updated corridor class
class Corridor {
    constructor(size, components, position, orientation) {
        this.size = size;
        this.components = components;
        this.position = position;
        this.orientation = orientation;

    }

    add(scene) {
        for (let i = 0; i < this.components.length; i++) {
            scene.add(this.components[i]);

        }
    }
}
```
{% endcode %}
{% endtab %}

{% tab title="UI Test" %}
{% code title="game.js ui code" overflow="wrap" %}
```javascript
function createPanel() {
    const panel = new GUI( { width: 300 } );

    const helpFolder = panel.addFolder( "Help" );
    const settingFolder = panel.addFolder( "Settings" );

    let settings = {
        "Use the show stats button to see stats.": "0",
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

        },
        "Map Scene": function() {

            SCENE = MapView;
            CAMERA = MapCamera;

        },
        "Test Scene": function() {

            SCENE = scene;
            CAMERA = camera;

        },
        // the new function to switch to a room scene
        "Switch Scene Test": function() {

            SCENE = MAP.scenes[0].scene;
            CAMERA = camera;

        }


    }

    helpFolder.add( settings, "Use the show stats button to see stats." );
    settingFolder.add( settings, "Show Stats" );
    settingFolder.add( settings, "Lock Camera" );
    settingFolder.add( settings, "Free Camera" );
    settingFolder.add( settings, "Map Scene" );
    settingFolder.add( settings, "Test Scene" );
    settingFolder.add( settings, "Switch Scene Test" );

    helpFolder.open();
    settingFolder.open();

}
```
{% endcode %}
{% endtab %}
{% endtabs %}

<figure><img src="../.gitbook/assets/image (3) (1) (3).png" alt=""><figcaption><p>Room Scene One.</p></figcaption></figure>

**Development Part 4:** Linking Everything

To link everything it was surprisingly simple as all I had to do was add another for loop that would create DomEvents for every part of the map room. This would then be set to switch the SCENE and CAMERA variables to the relevant ones for the room clicked on.

{% code title="game.js domevent loop" overflow="wrap" %}
```javascript
// looping throguh all map scenes
for (let i = 0; i < MAP.scenes.length; i++) {
    // setting the domevent for the current map scene
    domEvent.addEventListener(MAP.map[i].components[0], "click", (e) => {
        SCENE = MAP.scenes[i].scene;
        CAMERA = MAP.scenes[i].camera[0];

    });
}
```
{% endcode %}

{% embed url="https://youtu.be/zZaxlxfCdVI" %}
Video demonstrating the new working Map Screen.
{% endembed %}

### Challenges

The main problem I had was when I initially implemented the switching of the scenes it would sometimes switch to a corridor when I clicked on one; but other times it would be a junction. This was because the DomEvents variable was using the camera from the test scene. This meant the rays it was sending were from the wrong camera causing this issue.

{% code title="DomEvents before." %}
```javascript
let domEvent = new THREEx.DomEvents( camera, renderer.domElement );
```
{% endcode %}

{% code title="DomEvents after." %}
```javascript
let domEvent = new THREEx.DomEvents( MapCamera, renderer.domElement );
```
{% endcode %}

## Testing

In Cycle 7 I needed to make sure that the scene switching was working correctly, that the map was working correctly and that the DomEvents are triggering in the map screen.

### Tests

**Test 1:** Scene Switching

I needed to make sure that the scene switching was working correctly as the basis for all the other progress that I had made in this development cycle.

| What I expect                                   | What happened                                                        | Pass/Fail |
| ----------------------------------------------- | -------------------------------------------------------------------- | --------- |
| The scene and camera will change without error. | The scene and camera correctly change without error.                 | Pass      |
| Actions in one scene won't affect another.      | The characters in other scenes don't move when I click on the rooms. | Pass      |

**Test 2:** Map Screen Dom Events

It is also important to make sure the map screen works correctly as this will be the basis for the rest of the game.

| What I expect                                                      | What happened                      | Pass/Fail |
| ------------------------------------------------------------------ | ---------------------------------- | --------- |
| Clicking on a junction will take me to the correct junction scene. | The correct junction is displayed. | Pass      |
| Clicking on a corridor will take me to the correct corridor scene. | The correct corridor is displayed. | Pass      |
