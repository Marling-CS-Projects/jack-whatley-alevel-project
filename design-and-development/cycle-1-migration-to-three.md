# CYCLE 1 Migration to THREE

## Design

### Objectives

In Cycle 1 I wanted to change my library that I was using for game development and setup a basic canvas with a rotating cube to make sure that THREE is working and that I am able to run the express server with THREE.

* [x] Create a separate git branch to migrate to THREE.
* [x] Uninstall Kaboom JS and clear out the game.js file.
* [x] Install THREE JS and make sure it is a dependency.
* [x] Create the scene in THREE and render a Cube.
* [x] Create .gitignore to make sure node\_modules is not uploaded.

### Usability Features

### Key Variables

| Variable Name | Usage                                                       |
| ------------- | ----------------------------------------------------------- |
| scene         | The main scene that I will use in THREE to render the cube. |
| cube          | The 3D object made out of the geometry and material.        |

### Pseudocode

```
import THREE from "three"
constant scene = new THREE scene

constant camera = new Camera
constant cube = new Mesh

scene add cube

animate()
```

## Development

### Outcome

I began by removing the old library kaboom using the command `npm uninstall kaboom` and then I cleared the game.js file from [CYCLE 0](../2-design-and-development/cycle-1.md). I followed this up by installing the new library THREE with the command `npm install --save three` with the --save part telling node that it is a dependency.

I also had to import THREE into the javascript file which meant in the game.html file shown in [CYCLE 0](../2-design-and-development/cycle-1.md) I had to create an import map; otherwise I would keep getting an error where I couldn't use require and it the import wouldn't recognise the location of the three.module.js file.

Then I created an example scene with a rotating cube to demonstrate that THREE was imported correctly and that I had set up the project correctly.

{% tabs %}
{% tab title="server.js" %}
```javascript
// only one line was added here:

app.use(express.static("node_modules/three"));
```
{% endtab %}

{% tab title="game.html" %}
```html
<!-- the only thing added was an import map -->

<script type="importmap">
            
    {
                
        "imports": {
                
                "three": "../build/three.module.js"
                
        }
            
    }
        
</script>
```
{% endtab %}

{% tab title="game.js" %}
```javascript
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
	
	requestAnimationFrame(animate);
	renderer.render(scene, camera);

}

animate();
```
{% endtab %}
{% endtabs %}

### Challenges

When migrating to THREE I had a number of issues with importing THREE as I had installed it locally this time rather than loading a CDN like with Kaboom. However I had not done this before and did not know about using import maps so I used `import * as THREE from "three"` which normally works with node.js however it does not work in a web browser. Therefore I had to post the  THREE files using the server and use the import map to get the browser to recognise the import.

![The browser doesn't automatically handle imports unlike node.js.](<../.gitbook/assets/image (4) (1) (1).png>)

## Testing

For CYCLE 1 I needed to test a number of things: was THREE imported correctly, is Kaboom uninstalled and is the game environment working.

### Tests

| Tests | Instructions                                                     | What I expect                                                                         | What actually happens                                     | Pass/Fail |
| ----- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------- | --------- |
| 1     | Check if Kaboom is still present in package.json.                | Kaboom will not be in package.json.                                                   | Kaboom js is successfully uninstalled                     | Pass      |
| 2     | Check for an import error when running the server with THREE.    | After the import map there should not be an import error.                             | There is no longer an import error when I run the server. | Pass      |
| 3     | Check that the game environment renders and that I can see cube. | I will click on New Game and it will redirect me to game screen where I can see cube. | I am redirected to game scene and the cube is visible.    | Pass      |

### Evidence

![The cube is displaying correctly meaning that THREE is imported and working correctly.](<../.gitbook/assets/image (5) (1).png>)
