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
	cardContainer.classList.add("card-wrapper-empty");
	var img = document.createElement("img");
	cardContainer.appendChild(img);
	var title = document.createElement("h1");
	title.innerHTML = name;

	/*var form = document.createElement("form");
	var input = document.createElement("input");

	form.appendChild(input);
	*/
	var form = document.createElement("input");
	form.setAttribute("size", 1);
	form.classList.add("card-form");
	form.onchange = function(e) {
		pick(category, e.target.value);
	};

	elem.appendChild(cardContainer);
	elem.appendChild(title);
	elem.appendChild(form);
	category.elem = elem;
	category.title = title;
	category.cardContainer = cardContainer;
	category.img = img;

	var audio = document.createElement("audio");
	category.audio = audio;
	category.play = function() {
		category.audio.currentTime = 0;
		category.audio.play();
	};
	category.paint = function(){
		console.log(this)
		var imgSrc = this.instrument ? this.instrument.img : "";
		this.img.src = imgSrc;
		if(this.instrument) {
			category.cardContainer.classList.remove("card-wrapper-empty");
		} else {
			category.cardContainer.classList.add("card-wrapper-empty");
		}
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

function pick(category, item) {
	var categoryName = category.name;
	item = item.toLowerCase();
	var audio = category.audio;
	if (!instruments[categoryName][item]){
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