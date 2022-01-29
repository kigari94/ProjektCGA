import * as THREE from '../../../../lib/three.js-r134/build/three.module.js';
import {GLTFLoader} from '../../../../lib/three.js-r134/examples/jsm/loaders/GLTFLoader.js';

export default class TrashbinFromFile extends THREE.Group {

    constructor() {
        super();
        this.gltfLoader = new GLTFLoader();
        this.loadingDone = false;
        this.load(this);
    }

    load(thisTrashbin) {

        this.gltfLoader.load('src/models/trashbin.gltf', function (gltf) {

            gltf.scene.traverse(function (child) {

                if (child.isMesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });

            gltf.scene.position.set(0, -18.5, 0);

            thisTrashbin.add(gltf.scene);
            thisTrashbin.loadingDone = true;
        });
    }

    addPhysics() {

        if (this.loadingDone === false) {
            window.setTimeout(this.addPhysics.bind(this), 100);
        } else {
            const positions = [
                [12.0, 18.5, 12.0],     // 0
                [-12.0, 18.5, 12.0],    // 1
                [-9.5, -18.5, 9.0],   // 2
                [9.5, -18.5, 9.0],    // 3
                [12.0, 18.5, -12.0],    // 4
                [-12.0, 18.5, -12.0],   // 5
                [-9.5, -18.5, -9.0],  // 6
                [9.5, -18.5, -9.0]    // 7
            ];

            const indices = [
                [0, 1, 2, 3],  // front
                [1, 5, 6, 2],  // left
                [4, 0, 3, 7],  // right
                [4, 5, 1, 0],  // top
                [3, 2, 6, 7],  // bottom
                [5, 4, 7, 6]   // back
            ];

            window.physics.addConvexPolyhedron(this, 3, positions, indices, true);
        }
    }
}