import * as THREE from '../../../../lib/three.js-r134/build/three.module.js';
import {GLTFLoader} from '../../../../lib/three.js-r134/examples/jsm/loaders/GLTFLoader.js';

export default class PrinterFromFile extends THREE.Group {

    constructor() {
        super();
        this.gltfLoader = new GLTFLoader();

        this.load(this);
    }

    load(thisPrinter) {

        this.gltfLoader.load('src/models/printer.gltf', function (gltf) {

            gltf.scene.traverse(function (child) {

                if (child.isMesh) {
                    child.userData = thisPrinter;
                }
            });

            thisPrinter.add(gltf.scene);
        });
    }
}