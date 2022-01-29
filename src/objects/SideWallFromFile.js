import * as THREE from '../../../../lib/three.js-r134/build/three.module.js';
import {GLTFLoader} from '../../../../lib/three.js-r134/examples/jsm/loaders/GLTFLoader.js';

export default class SideWallFromFile extends THREE.Group {

    constructor() {
        super();
        this.gltfLoader = new GLTFLoader();
        this.loadingDone = false;
        this.load(this);
    }

    load(thisSideWall) {

        this.gltfLoader.load('src/models/sideWall.gltf', function (gltf) {

            gltf.scene.traverse(function (child) {

                if (child.isMesh) {

                }
            });

            thisSideWall.add(gltf.scene);
            thisSideWall.loadingDone = true;
        });
    }

    addPhysics() {
        if (this.loadingDone === false) {
            window.setTimeout(this.addPhysics.bind(this), 100);
        } else {
            const boundingBox = new THREE.Box3().setFromObject(this);
            const boundingSize = new THREE.Vector3();
            boundingBox.getSize(boundingSize);
            window.physics.addBox(this, 10000, boundingSize.x, boundingSize.y, boundingSize.z,
                0, boundingSize.y / 2, 0);
        }
    }
}