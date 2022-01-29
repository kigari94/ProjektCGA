import * as THREE from '../../../../lib/three.js-r134/build/three.module.js';
import {GLTFLoader} from '../../../../lib/three.js-r134/examples/jsm/loaders/GLTFLoader.js';

export default class MonitorFromFile extends THREE.Group {

  constructor() {
    super();
    this.gltfLoader = new GLTFLoader();
    this.loadingDone = false;
    this.load(this);
  }

  load(thisMonitor) {

    this.gltfLoader.load('src/models/monitor.gltf', function (gltf) {

      gltf.scene.traverse(function (child) {

        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });

      gltf.scene.position.set(0, -21.55, 0);

      thisMonitor.add(gltf.scene);
      thisMonitor.loadingDone = true;
    });
  }

  addPhysics() {

    if (this.loadingDone === false) {
      window.setTimeout(this.addPhysics.bind(this), 100);
    } else {
      const positions = [
        [29.0, 21.55, 5.5],     // 0
        [-29.0, 21.55, 5.5],    // 1
        [-29.0, -12.5, 5.5],   // 2
        [29.0, -12.5, 5.5],    // 3
        [29.0, 21.55, -5.5],    // 4
        [-29.0, 21.55, -5.5],   // 5
        [-29.0, -12.5, -5.5],  // 6
        [29.0, -12.5, -5.5],    // 7
        [-12.0, -21.6, 9.5],    // 8
        [12.0, -21.6, 9.5] ,   // 9
        [12.0, -21.6, -5.5] ,   // 10
        [-12.0, -21.6, -5.5]    // 11
      ];

      const indices = [
        [0, 1, 2, 3],  // front
        [1, 5, 6, 2],  // left
        [4, 0, 3, 7],  // right
        [4, 5, 1, 0],  // top
        [5, 4, 7, 6],   // back
        [3, 2, 8, 9],   // bottomFront
        [2, 6, 11, 8],   // bottomLeft
        [7, 3, 9, 10],   // bottomRight
        [6, 7, 10, 11],   // bottomBack
        [9, 8, 11, 10]  // bottom
      ];

      window.physics.addConvexPolyhedron(this, 3, positions, indices, true);
    }
  }
}