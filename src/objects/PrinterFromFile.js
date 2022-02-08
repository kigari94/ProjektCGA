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
                    child.castShadow = true;
                    child.receShadow = true;
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
            [20.1, 15.0, 11.0],     // 0
            [-20.1, 15.0, 11.0],    // 1
            [-20.1, 0.0, 26.5],     // 2
            [20.1, 0.0, 26.5],      // 3

            [20.1, 15.0, -20.2],    // 4
            [-20.1, 15.0, -20.2],   // 5
            [-20.1, 0.0, -20.2],    // 6
            [20.1, 0.0, -20.2],     // 7

            [20.1, 59.0, -5.5] ,    // 8
            [-20.1, 59.0, -5.5],    // 9

            [20.1, 59.0, -0.2],     // 10
            [-20.1, 59.0, -0.2],    // 11
        ];

        const indices = [
            [0, 1, 2, 3],  // front
            [1, 5, 6, 2],  // left
            [4, 0, 3, 7],  // right
            [10, 11, 1, 0],  // frameFront
            [9, 8, 4, 5],  // frameBack
            [8, 9, 11, 10],  // frameTop
            [8, 10, 0, 4],  // frameLeft
            [11, 9, 5, 1],  // frameRight
            [3, 2, 6, 7],  // bottom
            [5, 4, 7, 6]   // back
        ];

        window.physics.addConvexPolyhedron(this, 4, positions, indices, true);
    }
}