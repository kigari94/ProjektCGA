import * as THREE from '../../../../lib/three.js-r134/build/three.module.js';
import {GLTFLoader} from '../../../../lib/three.js-r134/examples/jsm/loaders/GLTFLoader.js';

export default class PrinterFromFile extends THREE.Group {

    constructor() {
        super();
        this.gltfLoader = new GLTFLoader();
        this.loadingDone = false;
        this.animationMixer = null;
        this.animations = new Map();

        this.state = {
            powerOn: false
        };

        this.loadingDone = false;
        this.load(this);
    }

    load(thisPrinter) {

        this.gltfLoader.load('src/models/printer.gltf', function (gltf) {

            gltf.scene.traverse(function (child) {

                if (child.isMesh) {
                    child.userData = thisPrinter;
                }

                if (child.name === 'cubeGLTF') {
                    child.visible = false;
                }
            });

            thisPrinter.animationMixer = new THREE.AnimationMixer(gltf.scene);
            for (let i = 0; i < gltf.animations.length; i++) {
                let action = thisPrinter.animationMixer.clipAction(gltf.animations[i]);
                action.clampWhenFinished = true;
                action.setLoop(THREE.LoopOnce);
                thisPrinter.animations.set(gltf.animations[i].name, action);
            }

            thisPrinter.add(gltf.scene);
            thisPrinter.loadingDone = true;
        });
    }

    addPhysics() {

        const positions = [
            [20.1, 15.0, 15.0],     // 0
            [-20.1, 15.0, 15.0],    // 1
            [-20.1, -2.0, 26.5],   // 2
            [20.1, -2.0, 26.5],    // 3
            [20.1, 15.0, -20.2],    // 4
            [-20.1, 15.0, -20.2],   // 5
            [-20.1, -2.0, -20.2],  // 6
            [20.1, -2.0, -20.2],    // 7
            [20.1, 12.0, -7.5],   // 8
            [-20.1, 12.0, -7.5],    // 9
            [20.1, 58.0, -7.5] ,   // 10
            [-20.1, 58.0, -7.5],    // 11
            [20.1, 58.0, 0.2],    // 12
            [-20.1, 58.0, 0.2],    // 13
            [20.1, 12.0, 0.2],    // 14
            [-20.1, 12.0, 0.2]   // 15
        ];

        const indices = [
            [0, 1, 2, 3],  // front
            [1, 5, 6, 2],  // left
            [4, 0, 3, 7],  // right
            [9, 8, 4, 5],  // topBack
            [14, 15, 1, 0],  // topFront
            [12, 13, 14, 15],  // frameFront
            [11, 10, 8, 9],  // frameBack
            [10, 11, 13, 12],  // frameTop
            [10, 12, 14, 8],  // frameLeft
            [13, 11, 9, 15],  // frameRight
            [3, 2, 6, 7],  // bottom
            [5, 4, 7, 6]   // back
        ];

        window.physics.addConvexPolyhedron(this, 3, positions, indices, true);
    }
}