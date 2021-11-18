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
      color: 0xf52525,
      flatShading: true,
      side: THREE.DoubleSide
    });

    const metalMaterial = new THREE.MeshPhongMaterial({
      color: 0xe7e7e7,
      flatShading: true
    });

    // Positions
    const positions = [
      -20, 0, -20,          // 0
      -20, 0, 25,           // 1
      20, 0, 25,            // 2
      20, 0, -20,           // 3
      -20, 10, -20,        // 4
      -20, 10, 15,           // 5
      20, 10, 15,           // 6
      20, 10, -20,           // 7
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

    // Corpus
    const corpusGeometry = new THREE.BufferGeometry();
    corpusGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    corpusGeometry.setIndex(indices);
    corpusGeometry.computeVertexNormals();
    const corpus = new THREE.Mesh(corpusGeometry, corpusMaterial);
    corpus.castShadow = true;
    this.add(corpus);

    // Arch
    // ---------------------
    const length = 15, width = 10;

    const shape = new THREE.Shape();
    shape.moveTo( 0,0 );
    shape.lineTo( 0, width );
    shape.lineTo( length, width );
    shape.lineTo( length, 0 );
    shape.lineTo( 0, 0 );

    const spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-30, 0, 0),
      new THREE.Vector3(-30, 60, 0),
      new THREE.Vector3(30, 60, 0),
      new THREE.Vector3(30, 0, 0),
    ]);
    spline.curveType = 'catmullrom';
    spline.tension = 0.0;

    const extrudeSettings = {
      steps: 100,
      curveSegments: 100,
      bevelEnabled: false,
      // bevelSize: 1,
      // bevelOffset: 0,
      // bevelSegments: 10,
      extrudePath: spline
    };

    const extrusionGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    const arch = new THREE.Mesh(extrusionGeometry, metalMaterial);
    //arch.rotation.set(THREE.MathUtils.degToRad(80), 0, 0);
    arch.position.set(0, 10, 0);
    arch.scale.set(0.5, 0.5,0.5);
    arch.name = 'arch';
    this.add(arch);
  }
}