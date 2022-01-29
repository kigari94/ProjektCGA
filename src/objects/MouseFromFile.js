import * as THREE from '../../../../lib/three.js-r134/build/three.module.js';
import {GLTFLoader} from '../../../../lib/three.js-r134/examples/jsm/loaders/GLTFLoader.js';

export default class MouseFromFile extends THREE.Group {

  constructor() {
    super();
    this.gltfLoader = new GLTFLoader();
    this.loadingDone = false;
    this.load(this);
  }

  load(thisMouse) {

    this.gltfLoader.load('src/models/mouse.gltf', function (gltf) {

      gltf.scene.traverse(function (child) {

        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });

      thisMouse.add(gltf.scene);
      thisMouse.loadingDone = true;
    });
  }

  addPhysics() {
    if (this.loadingDone === false) {
      window.setTimeout(this.addPhysics.bind(this), 100);
    } else {
      //window.physics.addBox(this, 10, 150, 39, 62, 0, 19.5, 0);
      const boundingBox = new THREE.Box3().setFromObject(this);
      const boundingSize = new THREE.Vector3();
      boundingBox.getSize(boundingSize);
      window.physics.addBox(this, 2, boundingSize.x, boundingSize.y, boundingSize.z,
          0, boundingSize.y / 2, 0, true);
    }
  }
}