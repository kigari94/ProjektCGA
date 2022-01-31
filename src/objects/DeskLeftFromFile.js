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

    this.gltfLoader.load('src/models/deskLleft.gltf', function (gltf) {

      gltf.scene.traverse(function (child) {

        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });

      // gltf.scene.position.set(-50, 0, 0);

      thisDesk.add(gltf.scene);
      thisDesk.loadingDone = true;
    });
  }

  addPhysics() {
    if (this.loadingDone === false) {
      window.setTimeout(this.addPhysics.bind(this), 100);
    } else {
      const boundingBox = new THREE.Box3().setFromObject(this);
      const boundingSize = new THREE.Vector3();
      boundingBox.getSize(boundingSize);
      window.physics.addCustomBox(this, 10,
          boundingSize.x / 3, boundingSize.y - 1, boundingSize.z,
          boundingSize.x / 2 + 27.5, boundingSize.y - 1, boundingSize.z / 3 + 5,
          boundingSize.x - 201, boundingSize.y - 34, boundingSize.z - 175,
          boundingSize.x / 3 - 4, boundingSize.y - 34, 56, true) ;
    }
  }
}