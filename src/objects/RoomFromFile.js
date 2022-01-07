import * as THREE from '../../../../lib/three.js-r134/build/three.module.js';
import {GLTFLoader} from '../../../../lib/three.js-r134/examples/jsm/loaders/GLTFLoader.js';

export default class RoomFromFile extends THREE.Group {

  constructor() {
    super();
    this.gltfLoader = new GLTFLoader();

    this.load(this);
  }

  load(thisRoom) {

    this.gltfLoader.load('src/models/officeRework.glb', function (gltf) {

      gltf.scene.traverse(function (child) {

        if (child.isMesh) {
          child.userData = thisRoom;
        }
      });

      thisRoom.add(gltf.scene);
    });
  }
}