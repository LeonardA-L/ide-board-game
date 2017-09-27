// 
var categories = {};

var loop = false;
var ended = 0;
var categoryWrapper = document.getElementById("cat-wrapper");

function createCategory(name) {
	var category = {
		name: name
	};
	var elem = document.createElement("div");
	elem.classList.add("category");
	var cardContainer = document.createElement("div");
	cardContainer.classList.add("card-wrapper");
	var title = document.createElement("h1");
	title.innerHTML = name;
	var instrElem = document.createElement("span");

	elem.appendChild(title);
	elem.appendChild(instrElem);
	elem.appendChild(cardContainer);
	category.elem = elem;
	category.title = title;
	category.instrElem = instrElem;
	category.cardContainer = cardContainer;

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
	categoryWrapper.appendChild(elem);
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