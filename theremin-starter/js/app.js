// we'll use these functions later
// write your code above to get started

function random(number1,number2) {
  var randomNo = number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
  return randomNo;
}

function updatePage(e) {
  CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
  CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
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





