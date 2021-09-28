import  * as VirtualityDOM from '../React_DOM/phase3.js';

export function switch_phase2() {
//function switch_phase2() {
  let switchElement = document.getElementById('waitTime');
  switchElement.addEventListener('animationend', function() {
    VirtualityDOM.reactDOM();
    /*let element = document.getElementById('phase2');
    element.style.display = 'none';
    element.style.zIndex = '-1';*/
  })
}

//switch_phase2()
