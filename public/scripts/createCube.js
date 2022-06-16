import * as THREE from "three";

function createCube(size, col) {

    let mesh = new THREE.BoxGeometry(size[0], size[1], size[2]);
    let material = new THREE.MeshStandardMaterial({color: col});
    let shape = new THREE.Mesh(mesh, material);

    return shape;

}

export { createCube };