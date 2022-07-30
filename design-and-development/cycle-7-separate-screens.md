# CYCLE 7 Separate Screens

## Design

### Objectives

In Cycle 7 I wanted to start making the game less of a testing ground and more like a game. This means adding in more of the game logic and also creating the separate screens; these are the map screen and the individual room screens.

I also wanted the game to be able to handle new features in the future like procedural generation with less work needed. Therefore I also wanted to create a system that would do all the generation for me when provided with an array of rooms.

* [x] Create a method for switch between scenes.
* [ ] Create a class for the map; that stores rooms and functions.
* [ ] Create a function that generates the map scene.
* [ ] Create a function that generates all the individual room scenes.
* [ ] Make the map screen simple looking.

### Key Variables

| Variable Name       | Usage                                                          |
| ------------------- | -------------------------------------------------------------- |
| SCENE               | The variable that stores which scene is currently being used.  |
| CAMERA              | The variable that stores which camera is currently being used. |
| MapCamera, MapScene | The constants that store the new Map scene and camera.         |

### Pseudocode

```
```

## Development

As in Cycle 6 I will be breaking down this development into multiple parts; this is again because the development is quite long for this cycle.

**Development Part 1:** Scene & Camera Switching

To allow me to have a map screen and also a room screen; I needed to create a method for switching scenes. To do this I created variables for storing which scene and camera is currently active. These can then be changed whilst the game is running and are updated in the animate function.

```javascript
// part of game.js
const scene = new THREE.Scene();
const MapView = new THREE.Scene();

let SCENE = scene; // sets to default scene (test map)

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );
const MapCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );

let CAMERA = camera; // sets to default camera (test map camera)
```

To actually test this out, I had to implement a way to switch scenes while the game was running. This was easy to do thanks to the GUI I had added previously as all I had to do was add two buttons that would switch the scenes and cameras. Then all I had to do was update the render function with the two variables `SCENE` and `CAMERA`.

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

    stats.update();

    renderer.render( SCENE, CAMERA ); // these variables can be changed to change
                                      // the scene and camera
}

animate();
createPanel();
```

**Development Part 2:** t
