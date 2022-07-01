# CYCLE 2 Spectator Tool

## Design

### Objectives

In Cycle 2 I wanted to create a basic spectator tool and a lit up environment to make sure I could see the map I will create in later cycles. It needs to have a panning camera and also move with the WASD keys to make it easy to use.

* [x] Create two basic cubes, one is the floor and the other will be moveable.
* [x] Import Orbit Controls.
* [x] Apply Orbit Controls to the Cube.
* [x] Add in a movement system using WASD.

### Key Variables

| Variable Name                 | Usage                                                                                   |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| sun                           | The name of the variable that manages the spotlight.                                    |
| controls                      | The name of the variable managing OrbitControls which allows the camera to move around. |
| wkey, akey, skey, dkey, shkey | These variables control whether the keys are pressed down or not (true or false).       |

### Pseudocode

```
import * as THREE from "three"
import OrbitControls from "three"

renderer = new THREE renderer
camera = new THREE camera
sun = new THREE spotlight
controls = new OrbitControls

wkey, akey, skey, dkey, shkey

on wkey, akey, skey, dkey, shkey down(key):
    key = true
    
function animate() {
    if any key == true:
        cube.pos += key.direction
        
    render

}

animate()
```

## Development

### Outcome

I created a moveable cube and also a terrain cube so as to test my spectator tool; this meant I had to import OrbitControls which I had some problems with until I worked out the right import URL and created an exports.js file.&#x20;

Then I had to assign the OrbitControls to the moveable cube and set up the controls update for WASD and SHIFT keys; then I put the position change animate function so that it would update every frame.

I also added the stats module for development so I could see my frames per second and also the connection to the server, to do this I had to add the stats module to the exports.js file. Then I had to attach the stats element to the body.

{% tabs %}
{% tab title="First Tab" %}

{% endtab %}

{% tab title="Second Tab" %}

{% endtab %}
{% endtabs %}
