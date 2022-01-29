import * as THREE from '../../../../lib/three.js-r134/build/three.module.js';
import {GLTFLoader} from '../../../../lib/three.js-r134/examples/jsm/loaders/GLTFLoader.js';

export default class RoomFromFile extends THREE.Group {

  constructor() {
    super();
    this.gltfLoader = new GLTFLoader();
    this.loadingDone = false;
    this.load(this);
  }

  load(thisRoom) {

    this.gltfLoader.load('src/models/roomhighRes.gltf', function (gltf) {

      gltf.scene.traverse(function (child) {

        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });

      thisRoom.add(gltf.scene);
      thisRoom.loadingDone = true;
    });
  }

  addPhysics() {

    if (this.loadingDone === false) {
      window.setTimeout(this.addPhysics.bind(this), 100);
    } else {
      const positions = [
        [-500.0, 500.0, -250.0],     // 0
        [-12.0, 18.5, 12.0],    // 1
        [-9.5, -18.5, 9.0],   // 2
        [9.5, -18.5, 9.0],    // 3

        [12.0, 18.5, -12.0],    // 4
        [-12.0, 18.5, -12.0],   // 5
        [-9.5, -18.5, -9.0],  // 6
        [9.5, -18.5, -9.0]    // 7

        [12.0, 18.5, 12.0],     // 8
        [-12.0, 18.5, 12.0],    // 9
        [-9.5, -18.5, 9.0],   // 10
        [9.5, -18.5, 9.0],    // 11

        [12.0, 18.5, 12.0],     // 12
        [-12.0, 18.5, 12.0],    // 13
        [-9.5, -18.5, 9.0],   // 14
        [9.5, -18.5, 9.0],    // 15

        [12.0, 18.5, 12.0],     // 16
        [-12.0, 18.5, 12.0],    // 17
        [-9.5, -18.5, 9.0],   // 18
        [9.5, -18.5, 9.0],    // 19
      ];

      const indices = [
        [0, 1, 2, 3],  // front
        [1, 5, 6, 2],  // left
        [4, 0, 3, 7],  // right
        [4, 5, 1, 0],  // top
        [5, 4, 7, 6]   // back
      ];

      window.physics.addConvexPolyhedron(this, 100, positions, indices, true);
    }
  }
}