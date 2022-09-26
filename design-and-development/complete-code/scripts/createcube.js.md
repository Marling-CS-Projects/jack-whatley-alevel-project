# createCube.js

```javascript
import * as THREE from "three";

function createCube(size, mat) {
    let mesh = new THREE.BoxGeometry(size[0], size[1], size[2]);
    let shape = new THREE.Mesh(mesh, mat);

    shape.castShadow = true;
    shape.receiveShadow = true;

    return shape;

}

export { createCube };
```
