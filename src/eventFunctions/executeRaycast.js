import * as THREE from '../../../../lib/three.js-r134/build/three.module.js';

window.raycaster = new THREE.Raycaster();

export function executeRaycast() {
  window.raycaster.setFromCamera(window.mousePosition, window.camera);

  let intersects = window.raycaster.intersectObject(window.scene, true);

  //console.log(intersects.length);
  if (intersects.length > 0) {

    let firstHit = intersects[0].object;

    if (firstHit.name === 'startButton') {
      firstHit.userData.printheadRightTween.start();
      firstHit.userData.railUpTween.start();
      firstHit.userData.plateForwardTween.start();
      firstHit.userData.cubeUpTween.start();

      firstHit.userData.printheadRightTween.repeat(6);
      // firstHit.userData.plateForwardTween.repeat(10);
    }
    else if(firstHit.name === 'stopButton'){
      firstHit.userData.printheadRightTween.stop();
      firstHit.userData.railUpTween.stop();
      firstHit.userData.plateForwardTween.stop();
      firstHit.userData.cubeUpTween.stop();
    }
  }
}