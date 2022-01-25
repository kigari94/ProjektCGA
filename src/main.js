// external libaries
import * as THREE from '../lib/three.js-r134/build/three.module.js';
import * as CONTROLS from '../lib/three.js-r134/examples/jsm/controls/OrbitControls.js';
import * as DAT from '../lib/dat.gui-0.7.7/build/dat.gui.module.js';
import * as TWEEN from '../../../lib/tween.js-18.6.4/dist/tween.esm.js';

// Own modules
import Printer from './objects/Printer.js';
import RoomFromFile from '../src/objects/roomFromFile.js';
import ArmChairFromFile from './objects/ArmChairFromFile.js';
import DeskLeftFromFile from './objects/DeskLeftFromFile.js';
import DeskRightFromFile from './objects/DeskRightFromFile.js';
import MonitorFromFile from './objects/MonitorFromFile.js';
import KeyboardFromFile from './objects/KeyboardFromFile.js';
import MouseFromFile from './objects/MouseFromFile.js';
import PhoneFromFile from './objects/PhoneFromFile.js';
import CupFromFile from './objects/CupFromFile.js';
import ChairFromFile from './objects/ChairFromFile.js';

// Physics
// import Physics from './physics/Physics.js';

// Event functions
import {updateAspectRatio} from './eventFunctions/updateAspectRatio.js';
import {calculateMousePosition} from './eventfunctions/calculateMousePosition.js';
import {executeRaycast} from './eventfunctions/executeRaycast.js';

function main() {
  // Scene
  window.scene = new THREE.Scene();
  window.scene.add(new THREE.AxesHelper(50));

  // Camera
  window.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth /
      window.innerHeight,
      0.1,
      2000
  );
  window.camera.position.set(100, 100, 100);
  window.camera.lookAt(0, 100, -150);
  // window.scene.add(new THREE.CameraHelper(window.camera));

  // Renderer
  window.renderer = new THREE.WebGLRenderer({antialias: true});
  window.renderer.setSize(window.innerWidth, window.innerHeight);
  window.renderer.setClearColor(0xffffff);
  window.renderer.shadowMap.enabled = true;

  // Physics
  // window.physics = new Physics(true);
  // window.physics.setup(0, -200, 0, 1 / 240, true);

  // Meshes
  // let planeGeometry = new THREE.PlaneGeometry(1500, 1000);
  // let planeMaterial = new THREE.MeshLambertMaterial({color: 0xf59725, wireframe: false, side: THREE.DoubleSide});
  // let plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // Objects in scene
  // Floor
  // plane.position.set(0, 0, 0);
  // plane.rotateX(THREE.MathUtils.degToRad(-90));
  // plane.receiveShadow = true;
  // window.scene.add(plane);

  // Room
  // const roomFromFile = new RoomFromFile();
  // roomFromFile.position.set(0, 0, 0);
  // window.scene.add(roomFromFile);

  // Printer
  let printer = new Printer();
  printer.position.set(-50, 70, -150);
  window.scene.add(printer);

  // Desk
  // const deskLeftFromFile = new DeskLeftFromFile();
  // deskLeftFromFile.position.set(-100, 0, -250);
  // window.scene.add(deskLeftFromFile);
  //
  // const deskRightFromFile = new DeskRightFromFile();
  // deskRightFromFile.position.set(100, 0, -250);
  // window.scene.add(deskRightFromFile);

  // Chair
  // const chairFromFileLeft = new ChairFromFile();
  // chairFromFileLeft.position.set(-90, 0, -190);
  // chairFromFileLeft.rotateY(THREE.MathUtils.degToRad(-70));
  // window.scene.add(chairFromFileLeft);

  // const chairFromFileRight = new ChairFromFile();
  // chairFromFileRight.position.set(90, 0, -190);
  // chairFromFileRight.rotateY(THREE.MathUtils.degToRad(70));
  // window.scene.add(chairFromFileRight);

  // Monitor
  // const monitorFromFile = new MonitorFromFile();
  // monitorFromFile.position.set(-50, 70, -250);
  // monitorFromFile.rotateY(THREE.MathUtils.degToRad(-40));
  // window.scene.add(monitorFromFile);

  // Keyboard
  // const keyboardFromFile = new KeyboardFromFile();
  // keyboardFromFile.position.set(-65, 70, -225);
  // keyboardFromFile.rotateY(THREE.MathUtils.degToRad(-35))
  // window.scene.add(keyboardFromFile);

  // Mouse
  // const mouseFromFile = new MouseFromFile();
  // mouseFromFile.position.set(-50, 70, -210);
  // mouseFromFile.rotateY(THREE.MathUtils.degToRad(-45));
  // window.scene.add(mouseFromFile);

  // Phone
  // const phoneFromFile = new PhoneFromFile();
  // phoneFromFile.position.set(-130, 70, -250);
  // phoneFromFile.rotateY(THREE.MathUtils.degToRad(40))
  // window.scene.add(phoneFromFile);

  // Cup
  // const cupFromFile = new CupFromFile();
  // cupFromFile.position.set(0, 0, 0);
  // window.scene.add(cupFromFile);

  // ArmChair
  // const armChairFromFile = new ArmChairFromFile();
  // armChairFromFile.position.set(0, 0, 0);
  // window.scene.add(armChairFromFile);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff);
  // ambientLight.intensity = 0.5;
  window.scene.add(ambientLight);

  let spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(100, 100, 100);
  spotLight.intensity = 0.5;
  // spotLight.target = plane;
  spotLight.angle = THREE.MathUtils.degToRad((30));
  spotLight.penumbra = 1;
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.set(2048, 2048);
  spotLight.shadow.camera.aspect = 1;
  spotLight.shadow.camera.near = 10;
  spotLight.shadow.camera.far = 500;

  window.scene.add(new THREE.CameraHelper(spotLight.shadow.camera));
  window.scene.add(spotLight);

  // DAT GUI
  let gui = new DAT.GUI();
  gui.add(spotLight.position, 'x', 0, 200).step(5);
  gui.add(spotLight.position, 'y', 0, 200).step(5);
  gui.add(spotLight.position, 'z', 0, 200).step(5);

  // Orbit controls
  let orbitControls = new CONTROLS.OrbitControls(window.camera, window.renderer.domElement);
  orbitControls.target = new THREE.Vector3(0, 0, 0);
  orbitControls.update();

  // Connection to HTML Element
  document.getElementById('3d_content').appendChild(window.renderer.domElement);

  // Setting the clock
  const clock = new THREE.Clock();

  // Main loop
  function mainLoop() {
    const delta = clock.getDelta();

    printer.animations.forEach(function (animation) {
      animation.update(delta);
    });

    TWEEN.update();

    window.renderer.render(window.scene, window.camera);
    requestAnimationFrame(mainLoop);
  }

  mainLoop();
}

window.onload = main;
window.onresize = updateAspectRatio;
window.onmousemove = calculateMousePosition;
window.onclick = executeRaycast;