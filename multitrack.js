// 
var categories = {};
var instruments = {
	"melody": [{
		src: "sounds/melody_1.mp3",
		name: "The Flute"
	},
	{
		src: "sounds/melody_2.mp3",
		name: "The Violin"
	}],
	"bass":   [{
		src: "sounds/bass_1.mp3",
		name: "The Bass"
	},
	{
		src: "sounds/bass_2.mp3",
		name: "The Trumpet"
	}],
	"drums":  [{
		src: "sounds/drum_1.mp3",
		name: "Kicks"
	},
	{
		src: "sounds/drum_2.mp3",
		name: "Claps"
	}],
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
	var title = document.createElement("h1");
	title.innerHTML = name;
	elem.appendChild(title);
	var instrElem = document.createElement("span");
	elem.appendChild(instrElem);
	category.elem = elem;
	category.title = title;
	category.instrElem = instrElem;
	var audio = document.createElement("audio");
	category.audio = audio;
	category.play = function() {
		category.audio.currentTime = 0;
		category.audio.play();
	};
	category.paint = function(){
		console.log(this)
		var name = this.instrument ? this.instrument.name : "";
		this.instrElem.innerHTML = name;
	};
	audio.onended = function(){
		ended--;
		if(loop && ended === 0){
			play();
		}
	};
	document.body.appendChild(elem);
	categories[name] = category;
}

function pick(categoryName, item) {
	var category = categories[categoryName];
	var audio = category.audio;
	if (item < 0 || item >= instruments[categoryName].length){
		category.instrument = null;
		audio.src = null;
	} else{
		category.instrument = instruments[categoryName][item];
		audio.src = category.instrument.src;
		audio.currentTime = 0;
	}
	category.paint();
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
		if(category.instrument) {
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