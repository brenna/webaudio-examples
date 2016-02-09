var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// more details on the AudioContex properties and methods:
// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext

// oscillator creates a tone
var oscillator = audioCtx.createOscillator();

// gain lets us control volume
var gainNode = audioCtx.createGain();

var maxFreq = 6000;
var maxVol = 1;
var initialFreq = 3000;
var initialVol = 0.5;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var CurX;
var CurY;

var mute = document.querySelector('.mute');
var clear = document.querySelector('.clear');
var canvas = document.querySelector('.canvas');
var canvasCtx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;


// connect our volume control to our tone then attach to audio output
// you can connect additional audio nodes for more complex effects
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

// calibrate our tone
// https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode
// types: https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/type
oscillator.type = 'sine';
oscillator.frequency.value = initialFreq;
oscillator.start();

// calibrate our gain node
gainNode.gain.value = initialVol;

document.onmousemove = updatePage;

mute.onclick = toggleMute;

clear.onclick = function () {
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
}

function random(number1,number2) {
  var randomNo = number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
  return randomNo;
}


function toggleMute() {
  if (mute.dataset.muted === 'true'){
    gainNode.connect(audioCtx.destination);
    mute.innerHTML = 'Mute';
    mute.dataset.muted = 'false';
  } else {
    gainNode.disconnect(audioCtx.destination);
    mute.innerHTML = 'Unmute';
    mute.dataset.muted = 'true';
  }
}

function updatePage(e) {
  CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
  CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

  oscillator.frequency.value = (CurX/WIDTH) * maxFreq;
  gainNode.gain.value = (CurY/HEIGHT) * maxVol;

  canvasDraw();
}

function canvasDraw() {
  rX = CurX;
  rY = CurY;
  rC = Math.floor((gainNode.gain.value/maxVol)*30);

  canvasCtx.globalAlpha = 0.2;

  for(i=1;i<=15;i=i+2) {
    canvasCtx.beginPath();
    canvasCtx.fillStyle = 'rgb(' + 100+(i*10) + ',' + Math.floor((gainNode.gain.value/maxVol)*255) + ',' + Math.floor((oscillator.frequency.value/maxFreq)*255) + ')';
    canvasCtx.arc(rX+random(0,50),rY+random(0,50),rC/2+i,(Math.PI/180)*0,(Math.PI/180)*360,false);
    canvasCtx.fill();
    canvasCtx.closePath();
  }
}





