// 
var categories = {};
var instruments = {
	"melody": ["sounds/melody_1.mp3","sounds/melody_2.mp3"],
	"bass":   ["sounds/bass_1.mp3", "sounds/bass_2.mp3"],
	"drums":  ["sounds/drum_1.mp3", "sounds/drum_2.mp3"],
	"effects": []
};

var loop = false;
var ended = 0;

function createCategory(name) {
	var category = {
		name: name
	};
	var elem = document.createElement("div");
	elem.classList.add("category");
	category.elem = elem;
	var audio = document.createElement("audio");
	category.audio = audio;
	category.play = function() {
		category.audio.currentTime = 0;
		category.audio.play();
	}
	audio.onended = function(){
		ended--;
		if(loop && ended === 0){
			play();
		}
	}
	document.body.appendChild(elem);
	categories[name] = category;
}

function pick(categoryName, item) {
	var category = categories[categoryName];
	var audio = category.audio;
	if (item < 0 || item >= instruments[categoryName].length){
		category.src = null;
		audio.src = null;
	} else{
		category.src = instruments[categoryName][item];
		audio.src = category.src;
		audio.currentTime = 0;
	}
	pause();
}

function pause() {
	for(var c in categories){
		var audio = categories[c].audio;
		audio.pause();
	}
}

function play() {
	ended = 0;
	for(var c in categories){
		var category = categories[c];
		if(category.src) {
			category.play();
			ended ++;
		}
	}
}

function toggleLoop() {
	loop = !loop;
	var elemLoop = document.getElementById('toggle-loop');
	elemLoop.innerHTML = (loop ? 'Unl' : 'L') + 'oop';
}


// Init
createCategory("melody");
createCategory("bass");
createCategory("drums");
createCategory("effects");