import * as THREE from '../../../../lib/three.js-r134/build/three.module.js';
import {GLTFLoader} from '../../../../lib/three.js-r134/examples/jsm/loaders/GLTFLoader.js';

export default class DeskLeftFromFile extends THREE.Group {

  constructor() {
    super();
    this.gltfLoader = new GLTFLoader();
    this.loadingDone = false;
    this.load(this);
  }

  load(thisDesk) {

    this.gltfLoader.load('src/models/deskLleft05.gltf', function (gltf) {

      gltf.scene.traverse(function (child) {

        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });

      gltf.scene.position.set(-70, 0, 0);

      thisDesk.add(gltf.scene);
      thisDesk.loadingDone = true;
    });
  }

  addPhysics() {

    if (this.loadingDone === false) {
      window.setTimeout(this.addPhysics.bind(this), 100);
    } else {
      const positions = [
        [11.0, 71.0, 143.7],     // 0
        [-45.5, 71.0, 143.7],    // 1
        [-45.5, 0.0, 143.7],   // 2
        [11.0, 0.0, 143.7],    // 3

        [11.0, 71.0, -32.0],    // 4
        [-45.5, 71.0, 32.0],    // 5
        [-45.5, 0.0, 32.0],    // 6
        [11.0, 0.0, -32.0],    // 7

        [-158.2, 71.0, -32.0],    // 8
        [-158.2, 71.0, 32.0],    // 9
        [-158.2, 0.0, 32.0],    // 10
        [-158.2, 0.0, -32.0],    // 11

      ];

      const indices = [
        [0, 1, 2, 3],  // front
        [1, 5, 6, 2],  // left ToDo mit addBox verifizieren
        [4, 0, 3, 7],  // right
        [4, 5, 1, 0],  // top
        [6, 7, 3, 2],  // bottom

        [5, 9, 10, 6],  // front
        [9, 8, 11, 10],  // left ToDo
        [8, 4, 7, 11],  // back
        [4, 8, 9, 5],  // top
        [11, 7, 6, 10],  // bottom

      ];

      window.physics.addConvexPolyhedron(this, 25, positions, indices, true);
    }
  }
}