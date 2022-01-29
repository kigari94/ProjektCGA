import * as THREE from '../../../../lib/three.js-r134/build/three.module.js';
import {GLTFLoader} from '../../../../lib/three.js-r134/examples/jsm/loaders/GLTFLoader.js';

export default class PlantFromFile extends THREE.Group {

    constructor() {
        super();
        this.gltfLoader = new GLTFLoader();
        this.loadingDone = false;
        this.load(this);
    }

    load(thisPlant) {

        this.gltfLoader.load('src/models/smallPlant.gltf', function (gltf) {

            gltf.scene.traverse(function (child) {

                if (child.isMesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });

            gltf.scene.position.set(0, -7.5, 0);

            thisPlant.add(gltf.scene);
            thisPlant.loadingDone = true;
        });
    }

    addPhysics() {
        if (this.loadingDone === false) {
            window.setTimeout(this.addPhysics.bind(this), 100);
        } else {
            window.physics.addCylinder(this, 5, 10, 8, 15, 12,
                0, 0, 0, 0, 0, 0, true);
        }
    }
}