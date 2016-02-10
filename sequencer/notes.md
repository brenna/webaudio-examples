# Sequencer tutorial

## set up the audio context 
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

## set up a single tone that starts then stops

```
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

oscillator.frequency.value = 200;
oscillator.start();
oscillator.stop(audioCtx.currentTime + 1);

```

## make it a `playNote` function, that accepts a frequency

eg. 
```
function playNote(frequency) {
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.frequency.value = frequency;
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.5);
}

playNote(500);
```

## make a sequence of notes

```
var currentNote = 0;
var counter = 0;

var sequence = setInterval(function() {
  currentNote = counter%notes.length;
  playNote(notes[currentNote]);
  counter++;
}, noteInterval * 1000);
```

## make start and stop buttons

```
var sequence = null;
var stopButton = document.querySelector('.stop');
var playButton = document.querySelector('.play');

function startSequence() {
  var counter = 0;
  sequence = setInterval(function() {
    currentNote = counter%notes.length;
    playNote(notes[currentNote]);
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
```

### sliders to control tones
```
<input data-note="0" class="slider" orient="vertical" type="range" min="200" max="2000" step="100">
<input data-note="1" class="slider" orient="vertical" type="range" min="200" max="2000" step="100">
```

```
.sliders input {
  width: 50px;
  height: 200px;
  -webkit-appearance: slider-vertical;
}
```

```
var notes = [];

noteControls.onchange = function(e){
  var noteId = e.target.dataset.note;
  notes[noteId] = + e.target.value;
}

for (var i = 0; i < sliders.length; i++) {
  //initialize note values
  notes[i] = +sliders[i].value;
}
```

### highlight the current note

```
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
```
.sliders input[data-current="true"]::-webkit-slider-container {
  background: darkturquoise;
}
```
