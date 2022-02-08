// external libaries
import * as THREE from '../../lib/three.js-r134/build/three.module.js';
import * as CONTROLS from '../../lib/three.js-r134/examples/jsm/controls/OrbitControls.js';
import * as TWEEN from '../../lib/tween.js-18.6.4/dist/tween.esm.js';

// Own modules
import Printer from './objects/Printer.js';
import RoomFromFile from '../src/objects/roomFromFile.js';
import FrontWallFromFile from '../src/objects/FrontWallFromFile.js';
import SideWallFromFile from '../src/objects/SideWallFromFile.js';
import PrinterFromFile from './objects/PrinterFromFile.js';
import DeskLeftFromFile from './objects/DeskLeftFromFile.js';
import DeskRightFromFile from './objects/DeskRightFromFile.js';
import MonitorFromFile from './objects/MonitorFromFile.js';
import KeyboardFromFile from './objects/KeyboardFromFile.js';
import MouseFromFile from './objects/MouseFromFile.js';
import CupFromFile from './objects/CupFromFile.js';
import ChairFromFile from './objects/ChairFromFile.js';
import PlantFromFile from './objects/PlantFromFile.js';
import TrashbinFromFile from './objects/TrashbinFromFile.js';
import PCFromFile from './objects/PCFromFile.js';

// Physics
import Physics from './physics/Physics.js';

// Event functions
import {updateAspectRatio} from './eventFunctions/updateAspectRatio.js';
import {calculateMousePosition} from './eventfunctions/calculateMousePosition.js';
import {executeRaycast} from './eventfunctions/executeRaycast.js';
import {keyDownAction, keyUpAction} from './eventfunctions/executeKeyAction.js';

function main() {

  // Scene
  window.scene = new THREE.Scene();

  // Camera
  window.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth /
      window.innerHeight,
      0.1,
      1050
  );
  window.camera.position.set(-200, 200, 80);

  // Renderer
  window.renderer = new THREE.WebGLRenderer({antialias: true});
  window.renderer.setSize(window.innerWidth, window.innerHeight);
  window.renderer.setClearColor(0xffffff);
  window.renderer.shadowMap.enabled = true;
  window.renderer.physicallyCorrectLights = false;

  // Physics
  window.physics = new Physics(false);
  window.physics.setup(0, -200, 0, 1 / 240, true);

  // Connection to HTML Element
  document.getElementById('3d_content').appendChild(window.renderer.domElement);

  // Objects in scene

  // Room
  const roomFromFile = new RoomFromFile();
  roomFromFile.position.set(0, -1, 0);
  window.scene.add(roomFromFile);

  const frontWallFromFile = new FrontWallFromFile();
  frontWallFromFile.position.set(0, -1, -385);
  frontWallFromFile.addPhysics();

  const backWallFromFile = new FrontWallFromFile();
  backWallFromFile.position.set(0, -1, 385);
  backWallFromFile.addPhysics();

  const sideWallRightFromFile = new SideWallFromFile();
  sideWallRightFromFile.position.set(545, -1, 2);
  sideWallRightFromFile.addPhysics();

  const sideWallLeftFromFile = new SideWallFromFile();
  sideWallLeftFromFile.position.set(-545, -1, 2);
  sideWallLeftFromFile.addPhysics();

  // Printer
  let printer = new Printer();
  printer.position.set(-45, 72, -150);
  printer.rotation.set(0, THREE.MathUtils.degToRad(-90), 0);
  printer.addPhysics();
  window.scene.add(printer);

  const printerFromFile = new PrinterFromFile();
  printerFromFile.position.set(52, 70, -150);
  printerFromFile.rotation.set(0, THREE.MathUtils.degToRad(90), 0);
  printerFromFile.addPhysics();
  window.scene.add(printerFromFile);

  // Desk
  const deskLeftFromFile = new DeskLeftFromFile();
  deskLeftFromFile.position.set(-100, 0, -250);
  deskLeftFromFile.addPhysics();
  window.scene.add(deskLeftFromFile);

  const deskRightFromFile = new DeskRightFromFile();
  deskRightFromFile.position.set(100, 0, -250);
  deskRightFromFile.addPhysics();
  window.scene.add(deskRightFromFile);

  // Chair
  const chairFromFileLeft = new ChairFromFile();
  chairFromFileLeft.position.set(-120, 45, -190);
  chairFromFileLeft.rotateY(THREE.MathUtils.degToRad(10));
  chairFromFileLeft.addPhysics();
  window.scene.add(chairFromFileLeft);

  const chairFromFileRight = new ChairFromFile();
  chairFromFileRight.position.set(120, 45, -190);
  chairFromFileRight.rotateY(THREE.MathUtils.degToRad(-10));
  chairFromFileRight.addPhysics();
  window.scene.add(chairFromFileRight);

  // Monitor
  const monitorFromFileLeftFirst = new MonitorFromFile();
  monitorFromFileLeftFirst.position.set(-150, 91.55, -270);
  monitorFromFileLeftFirst.rotateY(THREE.MathUtils.degToRad(10));
  monitorFromFileLeftFirst.addPhysics();
  window.scene.add(monitorFromFileLeftFirst);

  const monitorFromFileLeftSecond = new MonitorFromFile();
  monitorFromFileLeftSecond.position.set(-90, 91.55, -270);
  monitorFromFileLeftSecond.rotateY(THREE.MathUtils.degToRad(-10));
  monitorFromFileLeftSecond.addPhysics();
  window.scene.add(monitorFromFileLeftSecond);

  const monitorFromFileRightFirst = new MonitorFromFile();
  monitorFromFileRightFirst.position.set(170, 91.55, -270);
  monitorFromFileRightFirst.rotateY(THREE.MathUtils.degToRad(-10));
  monitorFromFileRightFirst.addPhysics();
  window.scene.add(monitorFromFileRightFirst);

  const monitorFromFileRightSecond = new MonitorFromFile();
  monitorFromFileRightSecond.position.set(110, 91.55, -270);
  monitorFromFileRightSecond.rotateY(THREE.MathUtils.degToRad(10));
  monitorFromFileRightSecond.addPhysics();
  window.scene.add(monitorFromFileRightSecond);

  // Keyboard
  const keyboardFromFileLeft = new KeyboardFromFile();
  keyboardFromFileLeft.position.set(-123, 70, -240);
  keyboardFromFileLeft.addPhysics();
  window.scene.add(keyboardFromFileLeft);

  const keyboardFromFileRight = new KeyboardFromFile();
  keyboardFromFileRight.position.set(107, 70, -240);
  keyboardFromFileRight.addPhysics();
  window.scene.add(keyboardFromFileRight);

  // Mouse
  const mouseFromFileLeft = new MouseFromFile();
  mouseFromFileLeft.position.set(-90, 70, -235);
  mouseFromFileLeft.rotateY(THREE.MathUtils.degToRad(-25));
  mouseFromFileLeft.addPhysics();
  window.scene.add(mouseFromFileLeft);

  const mouseFromFileRight = new MouseFromFile();
  mouseFromFileRight.position.set(140, 70, -235);
  mouseFromFileRight.rotateY(THREE.MathUtils.degToRad(-25));
  mouseFromFileRight.addPhysics();
  window.scene.add(mouseFromFileRight);

  // PC
  const pcFromFileLeft = new PCFromFile();
  pcFromFileLeft.position.set(-200, 19.8, -240);
  pcFromFileLeft.addPhysics();
  window.scene.add(pcFromFileLeft);

  const pcFromFileRight = new PCFromFile();
  pcFromFileRight.position.set(210, 19.8, -240);
  pcFromFileRight.addPhysics();
  window.scene.add(pcFromFileRight);

  // Cup
  const cupFromFile = new CupFromFile();
  cupFromFile.position.set(-170, 75, -235);
  cupFromFile.rotateY(THREE.MathUtils.degToRad(35));
  cupFromFile.addPhysics();
  window.scene.add(cupFromFile);

  // Plant
  const plantFromFile = new PlantFromFile();
  plantFromFile.position.set(55, 77.5, -250);
  plantFromFile.addPhysics();
  window.scene.add(plantFromFile);

  // Trashbin
  const trashbinFromFileLeft = new TrashbinFromFile();
  trashbinFromFileLeft.position.set(-47, 18.5, -90);
  trashbinFromFileLeft.addPhysics();
  window.scene.add(trashbinFromFileLeft);

  const trashbinFromFilRight = new TrashbinFromFile();
  trashbinFromFilRight.position.set(57, 18.5, -90);
  trashbinFromFilRight.addPhysics();
  window.scene.add(trashbinFromFilRight);

  // LightSpot
  const leftLightSpot = new THREE.Object3D();
  leftLightSpot.position.set(-140, 0, -40);
  window.scene.add(leftLightSpot);

  const rightLightSpot = new THREE.Object3D();
  rightLightSpot.position.set(130, 0, -40);
  window.scene.add(rightLightSpot);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff);
  ambientLight.intensity = 0.5;
  window.scene.add(ambientLight);

  // Spotlights
  let spotLightWindowLeft = new THREE.SpotLight(0xffffff);
  spotLightWindowLeft.position.set(-150, 170, -295);
  spotLightWindowLeft.intensity = 0.5;
  spotLightWindowLeft.power = 3;
  spotLightWindowLeft.target = leftLightSpot;
  spotLightWindowLeft.angle = THREE.MathUtils.degToRad((80));
  spotLightWindowLeft.penumbra = 1;
  spotLightWindowLeft.castShadow = true;

  spotLightWindowLeft.shadow.mapSize.set(2048, 2048);
  spotLightWindowLeft.shadow.camera.aspect = 1;
  spotLightWindowLeft.shadow.camera.near = 10;
  spotLightWindowLeft.shadow.camera.far = 500;
  spotLightWindowLeft.shadow.bias = -0.001;

  // window.scene.add(new THREE.CameraHelper(spotLightWindowLeft.shadow.camera));
  window.scene.add(spotLightWindowLeft);

  let spotLightWindowRight = new THREE.SpotLight(0xffffff);
  spotLightWindowRight.position.set(150, 170, -295);
  spotLightWindowRight.intensity = 0.5;
  spotLightWindowRight.power = 3;
  spotLightWindowRight.target = rightLightSpot;
  spotLightWindowRight.angle = THREE.MathUtils.degToRad((80));
  spotLightWindowRight.penumbra = 1;
  spotLightWindowRight.castShadow = true;

  spotLightWindowRight.shadow.mapSize.set(2048, 2048);
  spotLightWindowRight.shadow.camera.aspect = 1;
  spotLightWindowRight.shadow.camera.near = 10;
  spotLightWindowRight.shadow.camera.far = 500;
  spotLightWindowRight.shadow.bias = -0.001;

  // window.scene.add(new THREE.CameraHelper(spotLightWindowRight.shadow.camera));
  window.scene.add(spotLightWindowRight);

  // Orbit controls
  const orbitControls = new CONTROLS.OrbitControls(window.camera, window.renderer.domElement);
  orbitControls.target = new THREE.Vector3(0, 0, -250);
  orbitControls.update();

  // Setting the clock
  const clock = new THREE.Clock();

  // Main loop
  function mainLoop() {
    const delta = clock.getDelta();

    TWEEN.update();

    if (printerFromFile.animationMixer !== null) {
      printerFromFile.animationMixer.update(delta);
    }

    window.physics.update(delta);

    window.renderer.render(window.scene, window.camera);
    requestAnimationFrame(mainLoop);
  }

  mainLoop();
}

window.onload = main;
window.onresize = updateAspectRatio;
window.onmousemove = calculateMousePosition;
window.onclick = executeRaycast;
window.onkeydown = keyDownAction;
window.onkeyup = keyUpAction;