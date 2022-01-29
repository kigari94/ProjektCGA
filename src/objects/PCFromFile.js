import * as THREE from '../../../../lib/three.js-r134/build/three.module.js';
import {GLTFLoader} from '../../../../lib/three.js-r134/examples/jsm/loaders/GLTFLoader.js';

export default class PCFromFile extends THREE.Group {

    constructor() {
        super();
        this.gltfLoader = new GLTFLoader();
        this.loadingDone = false;
        this.load(this);
    }

    load(thisPC) {

        this.gltfLoader.load('src/models/pc.gltf', function (gltf) {

            gltf.scene.traverse(function (child) {

                if (child.isMesh) {
                    child.castShadow = true;
                    child.receShadow = true;
                }
            });

            gltf.scene.position.set(0, -19.55, 0);

            thisPC.add(gltf.scene);
            thisPC.loadingDone = true;
        });
    }

    addPhysics() {

        if (this.loadingDone === false) {
            window.setTimeout(this.addPhysics.bind(this), 100);
        } else {
            const positions = [
                [10.0, 19.55, 20.55],     // 0
                [-10.0, 19.55, 20.55],    // 1
                [-10.0, -19.55, 20.55],   // 2
                [10.0, -19.55, 20.55],    // 3

                [10.0, 19.55, -20.55],    // 4
                [-10.0, 19.55, -20.55],   // 5
                [-10.0, -19.55, -20.55],  // 6
                [10.0, -19.55, -20.55]    // 7
            ];

            const indices = [
                [0, 1, 2, 3],  // front
                [1, 5, 6, 2],  // left
                [4, 0, 3, 7],  // right
                [4, 5, 1, 0],  // top
                [3, 2, 6, 7],  // bottom
                [5, 4, 7, 6]   // back
            ];

            window.physics.addConvexPolyhedron(this, 10, positions, indices, true);
        }
    }
}