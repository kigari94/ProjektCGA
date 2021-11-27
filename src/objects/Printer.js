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
    const positionsCorpus = [
      -20, 0, -20,          // 0
      -20, 0, 25,           // 1
      20, 0, 25,            // 2
      20, 0, -20,           // 3
      -20, 10, -20,        // 4
      -20, 10, 15,           // 5
      20, 10, 15,           // 6
      20, 10, -20,           // 7
    ];

    const indicesCorpus = [
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

    const positionsFrame = [
      -20, 0, -6.5,          // 0
      -20, 0, -3.5,           // 1
      -15, 0, -3.5,           // 2
      -15, 0, -6.5,          // 3

      -20, 55, -6.5,         // 4
      -20, 55, -3.5,          // 5
      -15, 55, -3.5,          // 6
      -15, 55, -6.5,         // 7

      -20, 58, -6.5,         // 8
      -20, 58, -3.5,          // 9
      -15, 58, -3.5,          // 10
      -15, 58, -6.5,         // 11

      15, 58, -6.5,          // 12
      15, 58, -3.5,           // 13
      20, 58, -3.5,           // 14
      20, 58, -6.5,          // 15

      15, 55, -6.5,          // 16
      15, 55, -3.5,           // 17
      20, 55, -3.5,           // 18
      20, 55, -6.5,          // 19

      15, 0, -6.5,           // 20
      15, 0, -3.5,            // 21
      20, 0, -3.5,            // 22
      20, 0, -6.5,           // 23
    ];

    const indicesFrame = [
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
      4, 8, 9,
      9, 5, 4,
      9, 5, 6,
      9, 10, 6,
      8, 4, 7,
      11, 7, 8,
      8, 9, 10,
      8, 10, 11,
      7, 12, 11,
      7, 16, 12,
      7, 6, 16,
      6, 17, 16,
      10, 6, 13,
      6, 17, 13,
      11, 12, 13,
      11, 10, 13,
      12, 16, 15,
      16, 19, 15,
      16, 17, 18,
      16, 19, 18,
      14, 18, 15,
      13, 17, 14,
      14, 18, 17,
      15, 19, 18,
      12, 13, 15,
      15, 14, 13,
      16, 20, 17,
      20, 21, 17,
      21, 22, 17,
      17, 18, 22,
      22, 18, 23,
      18, 19, 23,
      20, 23, 19,
      16, 19, 20,
    ];

    const positionsSocket = [
      -5, 10, -20,          // 0
      -5, 10, 15,           // 1
       5, 10, 15,           // 2
       5, 10, -20,          // 3
      -5, 13, -20,          // 4
      -5, 13, 15,           // 5
       5, 13, 15,           // 6
       5, 13, -20,          // 7
    ];

    const indicesSocket = [
      0, 1, 2,
      0, 2, 3,
      1, 5, 6,
      1, 6, 2,
      4, 0, 3,
      4, 3, 7,
      4, 5, 1,
      4, 1, 0,
      3, 2, 6,
      3, 6, 7,
      5, 4, 7,
      5, 7, 6,
    ];

    const positionsPrinthead = [
      -2, 15, -2,          // 0
      -2, 15, 1,           // 1
       2, 15, 1,           // 2
       2, 15, -2,          // 3

      -2, 17, -2,          // 4
      -2, 17, 2,           // 5
       2, 17, 2,           // 6
       2, 17, -2,          // 7

      -2, 21, -2,          // 8
      -2, 21, 2,           // 9
       2, 21, 2,           // 10
       2, 21, -2,          // 11
    ];

    const indicesPrinthead = [
      0, 1, 2,
      0, 2, 3,
      1, 5, 6,
      1, 6, 2,
      4, 0, 3,
      4, 3, 7,
      4, 5, 1,
      4, 1, 0,
      3, 2, 6,
      3, 6, 7,
      6, 5, 9,
      6, 9, 10,
      7, 6, 10,
      7,10, 11,
      4, 5, 8,
      5, 8, 9,
      4, 7, 8,
      7, 8,11,
      8, 9,11,
      9,10,11,
    ];

    // Corpus
    const corpusGeometry = new THREE.BufferGeometry();
    corpusGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positionsCorpus), 3));
    corpusGeometry.setIndex(indicesCorpus);
    corpusGeometry.computeVertexNormals();
    const corpus = new THREE.Mesh(corpusGeometry, corpusMaterial);
    corpus.castShadow = true;
    this.add(corpus);

    // Frame
    const frameGeometry = new THREE.BufferGeometry();
    frameGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positionsFrame), 3));
    frameGeometry.setIndex(indicesFrame);
    frameGeometry.computeVertexNormals();
    const frame = new THREE.Mesh(frameGeometry, corpusMaterial);
    frame.castShadow = true;
    this.add(frame);

    // Arch
    // ---------------------
    // const length = 15, width = 10;
    //
    // const shape = new THREE.Shape();
    // shape.moveTo( 0,0 );
    // shape.lineTo( 0, width );
    // shape.lineTo( length, width );
    // shape.lineTo( length, 0 );
    // shape.lineTo( 0, 0 );
    //
    // const spline = new THREE.CatmullRomCurve3([
    //   new THREE.Vector3(-30, 0, 0),
    //   new THREE.Vector3(-30, 60, 0),
    //   new THREE.Vector3(30, 60, 0),
    //   new THREE.Vector3(30, 0, 0),
    // ]);
    // spline.curveType = 'catmullrom';
    // spline.tension = 0.0;
    //
    // const extrudeSettings = {
    //   steps: 100,
    //   curveSegments: 100,
    //   bevelEnabled: false,
    //   // bevelSize: 1,
    //   // bevelOffset: 0,
    //   // bevelSegments: 10,
    //   extrudePath: spline
    // };
    //
    // const extrusionGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    //
    // const arch = new THREE.Mesh(extrusionGeometry, metalMaterial);
    // //arch.rotation.set(THREE.MathUtils.degToRad(80), 0, 0);
    // arch.position.set(0, 10, 0);
    // arch.scale.set(0.5, 0.5,0.5);
    // arch.name = 'arch';
    // this.add(arch);

    // Socket
    const socketGeometry = new THREE.BufferGeometry();
    socketGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positionsSocket), 3));
    socketGeometry.setIndex(indicesSocket
    );
    socketGeometry.computeVertexNormals();
    const socket = new THREE.Mesh(socketGeometry, corpusMaterial);
    socket.castShadow = true;
    this.add(socket);

    // Plate
    const plateGeometry = new THREE.BoxGeometry(25,1,25);
    const plate = new THREE.Mesh(plateGeometry, corpusMaterial);
    plate.position.set(0, 13.5, 0);
    plate.castShadow = true;
    this.add(plate);

    // Left Bracket
    const leftBracketGeometry = new THREE.BoxGeometry(5,5,2);
    const leftBracket = new THREE.Mesh(leftBracketGeometry, corpusMaterial);
    leftBracket.position.set(-17.5, 18, -2);
    leftBracket.castShadow = true;
    this.add(leftBracket);

    // Right Bracket
    const rightBracket = leftBracket.clone();
    rightBracket.position.set(17.5, 18, -2);
    rightBracket.castShadow = true;
    this.add(rightBracket);

    // Rail
    const railGeometry = new THREE.BoxGeometry(30,5,0.5);
    const rail = new THREE.Mesh(railGeometry, corpusMaterial);
    rail.position.set(0, 18, -2);
    rail.castShadow = true;
    this.add(rail);

    // Printhead
    const printheadGeometry = new THREE.BufferGeometry();
    printheadGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positionsPrinthead), 3));
    printheadGeometry.setIndex(indicesPrinthead);
    printheadGeometry.computeVertexNormals();
    const printhead = new THREE.Mesh(printheadGeometry, corpusMaterial);
    printhead.castShadow = true;
    this.add(printhead);

    // Buttons
    const startButtonGeometry = new THREE.BoxGeometry(5,5,1);
    const startButton = new THREE.Mesh(startButtonGeometry, corpusMaterial);
    startButton.position.set(5, 5, 20);
    startButton.rotateX(THREE.MathUtils.degToRad(-45));
    startButton.castShadow = true;
    this.add(startButton);

    const stopButton = startButton.clone();
    stopButton.position.set(15, 5, 20);
    stopButton.castShadow = true;
    this.add(stopButton);

    // Textures
  }
}