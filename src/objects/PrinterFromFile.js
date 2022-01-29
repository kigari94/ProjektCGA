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
}