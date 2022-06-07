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
