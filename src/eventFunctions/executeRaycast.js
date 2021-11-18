import * as THREE from '../../../../lib/three.js-r134/build/three.module.js';

window.raycaster = new THREE.Raycaster();

export function executeRaycast() {
  window.raycaster.setFromCamera(window.mousePosition, window.camera);

  let intersects = window.raycaster.intersectObject(window.scene, true);

  //console.log(intersects.length);
  if (intersects.length > 0) {
    // console.log(intersects[0].object.name);
    let firstHit = intersects[0].object;

    if(firstHit.name === 'powerKnob'){
      //window.teleVisionPowerOn = !window.teleVisionPowerOn;
      if(firstHit.children.length > 0){
        firstHit.userData.toggleEndPosition();
      }else{
        firstHit.parent.userData.toggleEndPosition();
      }
    }
  }
}