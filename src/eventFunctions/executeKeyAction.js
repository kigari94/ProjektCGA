import * as THREE from '../../../../lib/three.js-r134/build/three.module.js';

window.spaceDown = false;

export function keyDownAction(event) {
  switch (event.keyCode) {
    case 32:
      if (!window.spaceDown) {
        window.spaceDown = true;

        const cubeLength = 15;
        const cubeGeometry = new THREE.BoxGeometry(cubeLength, cubeLength, cubeLength);
        const cube = new THREE.Mesh(cubeGeometry, new THREE.MeshLambertMaterial({color: 0xffaa00}));

        cube.position.set(window.camera.position.x, window.camera.position.y, window.camera.position.z);
        cube.castShadow = true;
        window.scene.add(cube);

        const directionalVectorDC = new THREE.Vector3(0, 0, 1);
        const velocityVectorWC = directionalVectorDC.unproject(window.camera).sub(window.camera.position);
        velocityVectorWC.normalize();
        velocityVectorWC.multiplyScalar(800);
        window.physics.addCube(cube, 2, cubeLength, cubeLength, cubeLength, velocityVectorWC);
      }
      break;
  }
}

export function keyUpAction(event) {
  switch (event.keyCode) {
    case 32:
      window.spaceDown = false;
      break;
  }
}