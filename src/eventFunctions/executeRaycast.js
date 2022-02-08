import * as THREE from '../../../../lib/three.js-r134/build/three.module.js';

window.raycaster = new THREE.Raycaster();

export function executeRaycast() {

  window.raycaster.setFromCamera(window.mousePosition, window.camera);

  let intersects = window.raycaster.intersectObject(window.scene, true);

  if (intersects.length > 0) {

    let firstHit = intersects[0].object;

    if (firstHit.name === 'startButton' &&
       !firstHit.userData.printTween.isPlaying() &&
       !firstHit.userData.printheadRightTween.isPlaying() &&
       !firstHit.userData.railUpTween.isPlaying() &&
       !firstHit.userData.plateForwardTween.isPlaying()) {
      firstHit.userData.printheadRightTween.start();
      firstHit.userData.railUpTween.start();
      firstHit.userData.plateForwardTween.start();
      firstHit.userData.printTween.start();
      firstHit.userData.cube.visible = true;

      firstHit.userData.printheadRightTween.repeat(8);
    }
    else if(firstHit.name === 'stopButton'){
      firstHit.userData.printheadRightTween.stop();
      firstHit.userData.railUpTween.stop();
      firstHit.userData.plateForwardTween.stop();
      firstHit.userData.printTween.stop();
    }

    if (firstHit.name === 'startButtonGLTF' &&
        !firstHit.userData.animations.get('plate_on').isRunning() &&
        !firstHit.userData.animations.get('print_on').isRunning() &&
        !firstHit.userData.animations.get('rail_on').isRunning() &&
        !firstHit.userData.animations.get('printhead_on').isRunning()) {
        firstHit.userData.state.powerOn = !firstHit.userData.state.powerOn;
      if (firstHit.userData.state.powerOn) {
        firstHit.userData.animations.get('plate_on').play();
        firstHit.userData.animations.get('print_on').play();
        firstHit.userData.children[0].children[3].children[0].visible = true;
        firstHit.userData.animations.get('rail_on').play();
        firstHit.userData.animations.get('printhead_on').play();
      } else {
          firstHit.userData.animations.get('plate_on').reset();
          firstHit.userData.animations.get('print_on').reset();
          firstHit.userData.animations.get('rail_on').reset();
          firstHit.userData.animations.get('printhead_on').reset();
          firstHit.userData.state.powerOn = !firstHit.userData.state.powerOn;
      }
    } else if (firstHit.name === 'stopButtonGLTF' &&
        firstHit.userData.animations.get('rail_on').isRunning()) {
      if (firstHit.userData.state.powerOn) {
        firstHit.userData.animations.get('plate_on').paused = true;
        firstHit.userData.animations.get('print_on').paused = true;
        firstHit.userData.animations.get('rail_on').paused = true;
        firstHit.userData.animations.get('printhead_on').paused = true;
      } else {

      }
    }
  }
}