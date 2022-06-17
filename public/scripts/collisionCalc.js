import * as THREE from "three";

const collisionCalc = (mesh, scale, type="collision") => {

    let bbox = new THREE.Box3().setFromObject(mesh);

    let bounds = {
        type: type,
        xMin: bbox.min.x,
        xMax: bbox.max.x,
        yMin: bbox.min.y,
        yMax: bbox.max.y,
        zMin: bbox.min.z,
        zMax: bbox.max.z,
    };

    collisions.push(bounds);

}

// export { collisionCalc };