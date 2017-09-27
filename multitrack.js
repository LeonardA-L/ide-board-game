// 
var instruments = [["sounds/melody_1.mp3","sounds/melody_2.mp3"],
					["sounds/bass_1.mp3", "sounds/bass_2.mp3"],
					["sounds/drum_1.mp3", "sounds/drum_2.mp3"]];

var picked = [null, null, null];
var audios = [];
var loop = false;
var cats = 3;
var ended = cats;

function updateLabels (){
	var melo = document.getElementById('melo');
	melo.innerHTML = picked[0] || 'Aucune';
	var bass = document.getElementById('bass');
	bass.innerHTML = picked[1] || 'Aucune';
	var drum = document.getElementById('drum');
	drum.innerHTML = picked[2] || 'Aucune';
}

function pick(category, item) {
	if (item < 0){
		picked[category] = null;
	} else{
		picked[category] = instruments[category][item];
	}
	init();
}

function init() {
	updateLabels();
	audios[0] = document.getElementById('audio-melo');
	audios[1] = document.getElementById('audio-bass');
	audios[2] = document.getElementById('audio-drum');
	for(var i in audios){
		audios[i].pause();
		if(picked[i]){
			audios[i].src = picked[i];
			audios[i].currentTime = 0;
		} else {
			audios[i].src = null;
		}
		audios[i].onended = function(){
			ended--;
			if(loop && ended === 0){
				play();
			}
		}
	}
}

function play() {
	init();

	ended = cats;
	audios[0].currentTime = 0;
	audios[1].currentTime = 0;
	audios[2].currentTime = 0;

	audios[0].play();
	audios[1].play();
	audios[2].play();
}

function toggleLoop() {
	loop = !loop;
	var elemLoop = document.getElementById('toggle-loop');
	elemLoop.innerHTML = (loop ? 'Unl' : 'L') + 'oop';
}