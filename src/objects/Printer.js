import * as THREE from '../../lib/three.js-r134/build/three.module.js';
import CSG from '../../lib/three-csg-2020/dist/three-csg.js';
import {Animation, AnimationType, AnimationAxis} from "../animation/Animation.js";
import * as TWEEN from '../../../../lib/tween.js-18.6.4/dist/tween.esm.js'

export default class Printer extends THREE.Group {

  constructor() {
    super();

    this.animations = [];
    this.addParts();
  }

  addParts() {
    // Materials
    const testMaterial = new THREE.MeshPhongMaterial({
      color: 0xdd0af0,
      flatShading: true,
      side: THREE.DoubleSide
    });

    const corpusMaterial = new THREE.MeshPhongMaterial({
      color: 0x373837,
      flatShading: true,
      side: THREE.DoubleSide
    });

    const frontCorpusMaterial = new THREE.MeshPhongMaterial({
      color: 0x111111,
      flatShading: true,
      bumpMap: new THREE.TextureLoader().load('src/images/frontFrame.png'),
      bumpScale: 1.0
    });

    const screwMaterial = new THREE.MeshPhongMaterial({
      color: 0x373837,
      flatShading: true,
      bumpMap: new THREE.TextureLoader().load('src/images/screwBump.png'),
      bumpScale: 1.0
    });

    const frontFrameTopMaterial = new THREE.MeshPhongMaterial({
      color: 0x373837,
      bumpMap: new THREE.TextureLoader().load('src/images/frontFrameTop.png'),
      bumpScale: 1.0
    });

    const frontFrameSideMaterial = new THREE.MeshPhongMaterial({
      color: 0x373837,
      flatShading: true,
      bumpMap: new THREE.TextureLoader().load('src/images/frontFrameSide.png'),
      bumpScale: 0.5
    });

    const railMaterial = new THREE.MeshPhongMaterial({
      color: 0x373837,
      flatShading: true,
      bumpMap: new THREE.TextureLoader().load('src/images/rail.png'),
      bumpScale: 0.5
    })

    const printheadMaterial = new THREE.MeshPhongMaterial({
      color: 0x373837,
      flatShading: true,
      bumpMap: new THREE.TextureLoader().load('src/images/ventSmall.png'),
      bumpScale: 0.5
    })

    const plateMaterial = new THREE.MeshPhongMaterial({
      color: 0xe7e7e7,
      flatShading: true,
      transparent: true,
      opacity: 0.8
    });

    const startButtonMaterial = new THREE.MeshPhongMaterial({
      color: 0x198003,
      flatShading: true
    });

    const stopButtonMaterial = new THREE.MeshPhongMaterial({
      color: 0xfc1703,
      flatShading: true
    });

    const cubeMaterial = new THREE.MeshLambertMaterial({
      visible: true,
      colorWrite: false
    });

    const ballMaterial = new THREE.MeshPhongMaterial({
      color: 0xffaa00,
      side: THREE.DoubleSide,
      flatShading: true
    })

    // Positions
    const positionsCorpus = [
      -20, 0, -20,          // 0
      -20, 0, 25,           // 1
      20, 0, 25,           // 2
      20, 0, -20,          // 3

      -20, 3, -20,          // 4
      -20, 3, 25,           // 5
      20, 3, 25,           // 6
      20, 3, -20,          // 7

      -20, 10, -20,        // 8
      -20, 10, 15,         // 9
      20, 10, 15,         // 10
      20, 10, -20,        // 11
    ];

    const indicesCorpus = [
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
      4, 5, 8,
      5, 9, 8,
      5, 6, 9,
      9, 6, 10,
      6, 7, 10,
      10, 7, 11,
      11, 7, 4,
      4, 8, 11,
      8, 9, 11,
      9, 10, 11
    ];

    const positionsFrame = [
      -20, 0, -6.5,          // 0
      -20, 0, -3.5,          // 1
      -15, 0, -3.5,          // 2
      -15, 0, -6.5,          // 3

      -20, 55, -6.5,         // 4
      -20, 55, -3.5,         // 5
      -15, 55, -3.5,         // 6
      -15, 55, -6.5,         // 7

      -20, 58, -6.5,         // 8
      -20, 58, -3.5,         // 9
      -15, 58, -3.5,         // 10
      -15, 58, -6.5,         // 11

      15, 58, -6.5,          // 12
      15, 58, -3.5,          // 13
      20, 58, -3.5,          // 14
      20, 58, -6.5,          // 15

      15, 55, -6.5,          // 16
      15, 55, -3.5,          // 17
      20, 55, -3.5,          // 18
      20, 55, -6.5,          // 19

      15, 0, -6.5,           // 20
      15, 0, -3.5,           // 21
      20, 0, -3.5,           // 22
      20, 0, -6.5,           // 23
    ];

    const indicesFrame = [
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
      7, 10, 11,
      4, 5, 8,
      5, 8, 9,
      4, 7, 8,
      7, 8, 11,
      8, 9, 11,
      9, 10, 11,
    ];

    // Corpus
    const corpusGeometry = new THREE.BufferGeometry();
    corpusGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positionsCorpus), 3));
    corpusGeometry.setIndex(indicesCorpus);
    corpusGeometry.computeVertexNormals();
    const corpus = new THREE.Mesh(corpusGeometry, corpusMaterial);
    corpus.castShadow = true;
    this.add(corpus);

    // Screw Texture
    const screwGeometry = new THREE.PlaneGeometry(1, 1);
    const screwLeftFront = new THREE.Mesh(screwGeometry, screwMaterial);
    screwLeftFront.position.set(-15, 10.1, 12);
    screwLeftFront.rotateX(THREE.MathUtils.degToRad(-90));
    corpus.add(screwLeftFront);

    const screwRightFront = screwLeftFront.clone();
    screwRightFront.position.set(15, 10.1, 12);
    corpus.add(screwRightFront);

    const screwLeftBack = screwLeftFront.clone();
    screwLeftBack.position.set(-15, 10.1, -12);
    corpus.add(screwLeftBack);

    const screwRightBack = screwLeftFront.clone();
    screwRightBack.position.set(15, 10.1, -12);
    corpus.add(screwRightBack);

    // Front Corpus Texture
    const frontCorpusGeometry = new THREE.PlaneGeometry(40, 12.2);
    const frontCorpus = new THREE.Mesh(frontCorpusGeometry, corpusMaterial);
    frontCorpus.position.set(0, 6.5, 20);
    frontCorpus.rotateX(THREE.MathUtils.degToRad(-55));
    this.add(frontCorpus);

    // Frame
    const frameGeometry = new THREE.BufferGeometry();
    frameGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positionsFrame), 3));
    frameGeometry.setIndex(indicesFrame);
    frameGeometry.computeVertexNormals();
    const frame = new THREE.Mesh(frameGeometry, corpusMaterial);
    frame.castShadow = true;
    this.add(frame);

    // Front Frame Top Texture
    const frontFrameTopGeometry = new THREE.PlaneGeometry(40, 3);
    const frontFrameTop = new THREE.Mesh(frontFrameTopGeometry, frontFrameTopMaterial);
    frontFrameTop.position.set(0, 56.5, -3.4);
    this.add(frontFrameTop);

    // Front Frame Left Texture
    const frontFrameLeftGeometry = new THREE.PlaneGeometry(5, 45);
    const frontFrameLeft = new THREE.Mesh(frontFrameLeftGeometry, frontFrameSideMaterial);
    frontFrameLeft.position.set(-17.5, 32.5, -3.4);
    this.add(frontFrameLeft);

    // Front Frame Right Texture
    const frontFrameRightGeometry = new THREE.PlaneGeometry(5, 45);
    const frontFrameRight = new THREE.Mesh(frontFrameRightGeometry, frontFrameSideMaterial);
    frontFrameRight.position.set(17.5, 32.5, -3.4);
    this.add(frontFrameRight);

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
    const plateGeometry = new THREE.BoxGeometry(25, 1, 25);
    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
    plate.position.set(0, 13.5, 0);
    plate.castShadow = true;
    this.add(plate);

    // Plate Animation
    let plateForwardTween = new TWEEN.Tween(plate.position).to(new THREE.Vector3(
        plate.position.x,
        plate.position.y,
        plate.position.z + 10), 265)
        .easing(TWEEN.Easing.Linear.None)

    let plateBackwardTween = new TWEEN.Tween(plate.position).to(new THREE.Vector3(
        plate.position.x,
        plate.position.y,
        plate.position.z - 10), 265)
        .easing(TWEEN.Easing.Linear.None)

    let plateOriginTween = new TWEEN.Tween(plate.position).to(new THREE.Vector3(
        plate.position.x,
        plate.position.y,
        plate.position.z), 265)
        .easing(TWEEN.Easing.Linear.None)

    plateForwardTween.chain(plateBackwardTween);
    plateOriginTween.chain(plateForwardTween);
    plateBackwardTween.chain(plateOriginTween);

    // Rail
    const railGeometry = new THREE.BoxGeometry(30, 5, 0.5);
    const rail = new THREE.Mesh(railGeometry, corpusMaterial);
    rail.position.set(0, 18, -2.5);
    rail.castShadow = true;
    this.add(rail);

    // Rail Texture
    const railTextureGeometry = new THREE.PlaneGeometry(30, 5);
    const railTexture = new THREE.Mesh(railTextureGeometry, railMaterial);
    railTexture.position.set(0, 0, 0.3);
    rail.add(railTexture);

    // Rail Animation
    let railUpTween = new TWEEN.Tween(rail.position).to(new THREE.Vector3(
        rail.position.x,
        rail.position.y + 35,
        rail.position.z), 4000)
        .easing(TWEEN.Easing.Linear.None)
        .onComplete(function () {
          plateForwardTween.stop();
        })

    let railDownTween = new TWEEN.Tween(rail.position).to(new THREE.Vector3(
        rail.position.x,
        rail.position.y,
        rail.position.z), 2000)
        .easing(TWEEN.Easing.Linear.None)

    // railUpTween.chain(railDownTween);

    // Left Bracket
    const leftBracketGeometry = new THREE.BoxGeometry(5, 5, 2);
    const leftBracket = new THREE.Mesh(leftBracketGeometry, corpusMaterial);
    leftBracket.position.set(-17.5, 0, 0);
    leftBracket.castShadow = true;
    rail.add(leftBracket);

    // Right Bracket
    const rightBracket = leftBracket.clone();
    rightBracket.position.set(17.5, 0, 0);
    rightBracket.castShadow = true;
    rail.add(rightBracket);

    // Printhead
    const printheadGeometry = new THREE.BufferGeometry();
    printheadGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positionsPrinthead), 3));
    printheadGeometry.setIndex(indicesPrinthead);
    printheadGeometry.computeVertexNormals();
    const printhead = new THREE.Mesh(printheadGeometry, corpusMaterial);
    printhead.position.set(-13, -17, 2.25);
    printhead.castShadow = true;
    printhead.name = 'printhead';
    rail.add(printhead);

    // Printhead Texture
    const printheadVentGeometry = new THREE.PlaneGeometry(4, 4);
    const printheadVent = new THREE.Mesh(printheadVentGeometry, printheadMaterial);
    printheadVent.position.set(0,19,2.025);
    printhead.add(printheadVent);

    // Printhead Animations
    let printheadRightTween = new TWEEN.Tween(printhead.position).to(new THREE.Vector3(
        printhead.position.x + 25,
        printhead.position.y,
        printhead.position.z), 250)
        .easing(TWEEN.Easing.Linear.None)
        .onRepeat(function () {
          printheadLeftTween.start();
        })

    let printheadLeftTween = new TWEEN.Tween(printhead.position).to(new THREE.Vector3(
        printhead.position.x,
        printhead.position.y,
        printhead.position.z), 250)
        .easing(TWEEN.Easing.Linear.None)

    printheadRightTween.chain(printheadLeftTween);

    // Printing Object
    const ballGeometry = new THREE.SphereGeometry(10, 10, 10);
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(0, 10.5, 0);
    ball.castShadow = true;
    ball.renderOrder = 1;
    plate.add(ball);

    // Hiding Cube
    const cubeGeometry = new THREE.BoxGeometry(20, 20, 20);
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 10.5, 0);
    cube.renderOrder = 0;
    plate.add(cube);

    // Unhide Animation
    let cubeUpTween = new TWEEN.Tween(cube.position).to(new THREE.Vector3(
        cube.position.x,
        cube.position.y + 70,
        cube.position.z), 8000)
        .easing(TWEEN.Easing.Linear.None)

    // Buttons
    const startButtonGeometry = new THREE.BoxGeometry(5, 5, 1);
    const startButton = new THREE.Mesh(startButtonGeometry, startButtonMaterial);
    startButton.position.set(5, 7, 20);
    startButton.rotateX(THREE.MathUtils.degToRad(-54));
    startButton.castShadow = true;
    startButton.name = 'startButton';
    startButton.userData = {
      printheadRightTween,
      railUpTween,
      plateForwardTween,
      cubeUpTween
    }
    this.add(startButton);

    const stopButtonGeometry = new THREE.BoxGeometry(5, 5, 1);
    const stopButton = new THREE.Mesh(stopButtonGeometry, stopButtonMaterial);
    stopButton.position.set(15, 7, 20);
    stopButton.rotateX(THREE.MathUtils.degToRad(-54));
    stopButton.castShadow = true;
    stopButton.name = 'stopButton';
    stopButton.userData = {
      printheadRightTween,
      railUpTween,
      plateForwardTween
    }
    this.add(stopButton);

    // Foots
    const footGeometry = new THREE.CylinderGeometry(1, 0.8, 2, 8, 1);
    const footFrontRight = new THREE.Mesh(footGeometry, corpusMaterial);
    footFrontRight.position.set(18,-1,22);
    footFrontRight.castShadow = true;
    corpus.add(footFrontRight);

    const footFrontLeft = footFrontRight.clone();
    footFrontLeft.position.set(-18, -1, 22);
    corpus.add(footFrontLeft);

    const footBackRight = footFrontRight.clone();
    footBackRight.position.set(18, -1, -19);
    corpus.add(footBackRight);

    const footBackLeft = footFrontRight.clone();
    footBackLeft.position.set(-18, -1, -19);
    corpus.add(footBackLeft);
  }
}