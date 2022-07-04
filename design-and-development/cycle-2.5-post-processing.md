# CYCLE 2.5 Post Processing

## Design

### Objectives

In Cycle 2.5 I wanted to experiment with post-processing effects before I got too late into the project. This is so I can test that they are working now before I get later into the project and they become harder to add and may cause more problems.

* [x] Import and set up EffectComposer.
* [x] Import and set up BloomPass.
* [x] Import and set up GlitchPass.
* [x] Change renderer to work with Bloom and integrate composer.

### Key Variables

| Variable Name | Usage                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------- |
| composer      | This handles the EffectComposer that post processing passes are added to.                   |
| renderPass    | This is the pass that adds the renderer element to the composer.                            |
| glitchPass    | This pass adds the glitch effects to the screen, but they will be disabled for development. |
| bloomPass     | This is the pass that controls the bloom added to the scene.                                |

### Pseudocode

```
import * as THREE from "three"
import OrbitControls, EffectComposer, RenderPass, GlitchPass, BloomPass

composer = new EffectComposer(renderer)
renderpass = new RenderPass(renderer, camera)
bloompass = new BloomPass
glitchpass = new GlitchPass

composer.add(renderpass)
composer.add(bloompass)
composer.add(glitchpass)

def animate() {
    composer.render()

}

animate()
```

## Development

I started by making sure to import the modules correctly; meaning that I had to update the exports.js file. Then I added the composer variable which controls all of the passes that the renderer does before it displays the screen.

I also added the bloom pass and glitch pass and made sure to customise the bloom pass so that the screen wasn't too bright and that the colours didn't seem off. I also added some GUI for development so I can in future turn some things on and off.

{% tabs %}
{% tab title="game.js" %}
This shows some of the major changes to the file but not the file in its entirety as it is quite long at this point.

```javascript
import * as THREE from "three";
import Stats from "./examples/jsm/libs/stats.module.js";

import { OrbitControls, EffectComposer, RenderPass, UnrealBloomPass, GlitchPass, GUI } from "/exports.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer( { antialias: false } );
const composer = new EffectComposer( renderer );
const renderPass = new RenderPass( scene, camera );
const stats = new Stats();

const params = {
    exposure: 1,
    bloomStrength: 5,
    bloomThreshold: 0,
    bloomRadius: 0
};

let moveSpeed = 0.05;
let wKey, aKey, sKey, dKey, shKey;

document.body.appendChild( stats.dom );
document.body.appendChild( renderer.domElement );

scene.background = new THREE.Color(0x87ceeb);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

composer.addPass( bloomPass );
composer.addPass( renderPass );
//const glitchPass = new GlitchPass();
//composer.addPass( glitchPass );

function createPanel() {

    const panel = new GUI( { width: 310 } );

    const helpFolder = panel.addFolder( "Help" );
    const settingFolder = panel.addFolder( "Settings" );

    let settings = {

        "Use the show stats button to see stats.": "SIUUUUUUUUUUUUU",
        "Show Stats": function() {

            document.body.appendChild( stats.dom );

        }

    }

    helpFolder.add( settings, "Use the show stats button to see stats." );
    settingFolder.add( settings, "Show Stats" );

    helpFolder.open();
    settingFolder.open();

}

function animate() {
    requestAnimationFrame( animate );
    stats.update();
    composer.render();

}

animate();
createPanel();
```
{% endtab %}

{% tab title="exports.js" %}
```javascript
export { OrbitControls } from "/examples/jsm/controls/OrbitControls.js";
export { GLTFLoader } from "/examples/jsm/loaders/GLTFLoader.js";
export { EffectComposer } from "/examples/jsm/postprocessing/EffectComposer.js";
export { RenderPass } from "/examples/jsm/postprocessing/RenderPass.js";
export { ShaderPass } from "/examples/jsm/postprocessing/ShaderPass.js";
export { GlitchPass } from "/examples/jsm/postprocessing/GlitchPass.js";
export { UnrealBloomPass } from "/examples/jsm/postprocessing/UnrealBloomPass.js";
export { GUI } from '/examples/jsm/libs/lil-gui.module.min.js';
```


{% endtab %}
{% endtabs %}

### Challenges

I had an issue with the order of rendering passes, so if the bloom pass doesn't go before the render pass the screen is white and it doesn't render.

![The screen didn't render if the order was wrong, despite the lack of errors in the console.](<../.gitbook/assets/image (4).png>)

## Testing

In Cycle 2.5 I needed to make sure that the passes were working and that the lighting was working correctly.

### Tests

| Test | Instructions                                 | What I expect                                               | What happened                                               | Pass/Fail     |
| ---- | -------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ------------- |
| 1    | Import all the passes and check if it loads. | The game to open and not throw an error.                    | The game loads correctly and there are no import errors.    | Pass          |
| 2    | Add the glitch pass and check it is working. | The game to open and the screen to have glitch effects.     | The game opens and the screen has glitchy effects.          | Pass          |
| 3    | Add the bloom pass and make it work.         | The game to open and the lighting to be better, with bloom. | The lighting is better however there are brightness issues. | Pass and Fail |

### Evidence

![The cube with better lighting and bloom effects.](<../.gitbook/assets/image (2).png>)

![The glitch effects; whilst a bit obnoxious at the moment, can be changed later.](<../.gitbook/assets/image (5) (1).png>)
