var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var notes = [];
var noteInterval = 0.3;
var currentNote = 0;
var sequence = null;

var stopButton = document.querySelector('.stop');
var playButton = document.querySelector('.play');
var noteControls = document.querySelector('.sliders');
var sliders = document.querySelectorAll('.sliders input');

function playNote(frequency) {
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.frequency.value = frequency;
  oscillator.start(0);
  oscillator.stop(audioCtx.currentTime + noteInterval);
}

function startSequence() {
  var counter = 0;
  sequence = setInterval(function() {
    currentNote = counter%notes.length;
    playNote(notes[currentNote]);
    for (i = 0; i < sliders.length; i++) {
      sliders[i].dataset.current = "false";
    }
    sliders.item(currentNote).dataset.current = "true";
    counter++;
  }, noteInterval * 1000);
}

stopButton.onclick = function(){
  sequence = clearInterval(sequence);
  stopButton.setAttribute('disabled', true);
  playButton.removeAttribute('disabled');
}

playButton.onclick = function() {
  playButton.setAttribute('disabled', true);
  stopButton.removeAttribute('disabled');
  startSequence();
}

noteControls.onchange = function(e){
  var noteId = e.target.dataset.note;
  notes[noteId] = + e.target.value;
}

for (var i = 0; i < sliders.length; i++) {
  //initialize note values
  notes[i] = +sliders[i].value;
}

