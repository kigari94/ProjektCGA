import * as THREE from '../../lib/three.js-r134/build/three.module.js';
import CSG from '../../lib/three-csg-2020/dist/three-csg.js';

export default class Printer extends THREE.Group {

  constructor() {
    super();

    this.addParts();
  }

  addParts() {
    // Materials

    const corpusMaterial = new THREE.MeshPhongMaterial({
      color: 0xff4000,
      flatShading: true,
      side: THREE.DoubleSide
    });

    // Positions
    const positions = [
      -10, 0, -15,          // 0
      -10, 0, 15,           // 1
      10, 0, 15,            // 2
      10, 0, -15,           // 3
      -8, 10, -13.0,        // 4
      -8, 10, 13,           // 5
      8, 10, 13,           // 6
      8, 10, -13,           // 7
    ];

    const indices = [
      0, 1, 2,    // body front 1/2
      0, 2, 3,    // body front 2/2
      1, 5, 6,    // body left 1/2
      1, 6, 2,    // body left 2/2
      4, 0, 3,    // body right 1/2
      4, 3, 7,    // body right 2/2
      4, 5, 1,    // body top 1/2
      4, 1, 0,    // body top 2/2
      3, 2, 6,    // body bottom 1/2
      3, 6, 7,    // body bottom 2/2
      5, 4, 7,    // body back 1/2
      5, 7, 6,    // body back 2/2
    ];

    // Geometry
    const corpusGeometry = new THREE.BufferGeometry();
    corpusGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    corpusGeometry.setIndex(indices);
    corpusGeometry.computeVertexNormals();
    const corpus = new THREE.Mesh(corpusGeometry, corpusMaterial);
    corpus.castShadow = true;
    this.add(corpus);
  }
}