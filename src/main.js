// external libaries
import * as THREE from '../lib/three.js-r134/build/three.module.js';
import * as CONTROLS from '../lib/three.js-r134/examples/jsm/controls/OrbitControls.js';
import * as DAT from '../lib/dat.gui-0.7.7/build/dat.gui.module.js';

// Own modules
import Printer from './objects/Printer.js';

// Event functions
import {updateAspectRatio} from './eventFunctions/updateAspectRatio.js';

function main() {
  window.scene = new THREE.Scene();
  window.scene.add(new THREE.AxesHelper(50));

  // Meshes
  let planeGeometry = new THREE.PlaneGeometry(200, 200);
  let planeMaterial = new THREE.MeshLambertMaterial({color: 0xf59725, wireframe: false, side: THREE.DoubleSide});
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // Placing in scene
  plane.position.set(0, 0, 0);
  plane.rotateX(THREE.MathUtils.degToRad(-90));
  plane.receiveShadow = true;
  window.scene.add(plane);

  let printer = new Printer();
  printer.position.set(0, 1, 0);
  window.scene.add(printer);

  // Lighting
  let spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(100, 100, 100);
  spotLight.intensity = 0.5;
  spotLight.target = plane;
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

  // Camera
  window.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth /
      window.innerHeight,
      0.1,
      1000
  );
  window.camera.position.set(-100, 100, 100);
  // window.camera.lookAt(0, 0, 0);
  // window.scene.add(new THREE.CameraHelper(window.camera));

  // Renderer
  window.renderer = new THREE.WebGLRenderer({antialias: true});
  window.renderer.setSize(window.innerWidth, window.innerHeight);
  window.renderer.setClearColor(0xffffff);
  window.renderer.shadowMap.enabled = true;

  // Orbit controls
  let orbitControls = new CONTROLS.OrbitControls(window.camera, window.renderer.domElement);
  orbitControls.target = new THREE.Vector3(0, 0, 0);
  orbitControls.update();

  // Connection to HTML Element
  document.getElementById('3d_content').appendChild(window.renderer.domElement);

  // Main loop
  function mainLoop() {
    window.renderer.render(window.scene, window.camera);
    requestAnimationFrame(mainLoop);
  }

  mainLoop();
}

window.onload = main;
window.onresize = updateAspectRatio;