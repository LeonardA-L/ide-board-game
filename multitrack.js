// Global variables
var categories = {};
var loop = false;
var ended = 0;	// counts the number of instruments that *are playing* and that *haven't ended yet*
var categoryWrapper = document.getElementById("cat-wrapper");

/*
Create a category
Categories are dynamically created below for two reasons
	- Their number might change
	- They have a similar design/behaviour, only with changing parameters, so hardcode them would duplicate a lot of code
*/
function createCategory(name, volume) {
	// Create a model object for the category
	var category = {
		name: name,
		color: categoryColor[name]
	};

	// Create a HTML element that will represent the category
	var elem = document.createElement("div");
	elem.classList.add("category");	// This adds a CSS class
	// As well as children element (card picture, category title, ...)
	var cardContainer = document.createElement("div");
	cardContainer.classList.add("card-wrapper");
	cardContainer.classList.add("card-wrapper-empty");
	var img = document.createElement("img");
	var title = document.createElement("h1");
	title.innerHTML = name;

	// Create the text field for this catergory
	var form = document.createElement("input");
	form.setAttribute("size", 1);	// This sets a HTML attribute
	form.classList.add("card-form");
	form.setAttribute("style", "background-color: "+category.color);

	// This is a listener, it listens for a change in the content of the text field
	form.onchange = function(e) {
		// When the content has changed, we call the pick function to update the category according to user input
		pick(category, e.target.value);
	};

	cardContainer.appendChild(img);	// This appends an element into another
	cardContainer.appendChild(title);
	elem.appendChild(cardContainer);
	elem.appendChild(form);

	// This puts references for each object into the category for further use
	category.elem = elem;
	category.title = title;
	category.cardContainer = cardContainer;
	category.img = img;

	// Create an HTML5 audio element
	var audio = document.createElement("audio");
	audio.volume = volume;
	// Reference it in the category
	category.audio = audio;
	// Create a play function for the category object
	category.play = function() {
		category.audio.currentTime = 0;
		category.audio.play();
	};
	// Create a paint function for the category object
	category.paint = function(){
		// If there is an instrument set for this category
		if(this.instrument) {
			// Set the image source link for the image element
			this.img.src = this.instrument.img;
			// Remove the border for the card placeholder
			category.cardContainer.classList.remove("card-wrapper-empty");
		} else {
			// Add the border for the placeholder
			category.cardContainer.classList.add("card-wrapper-empty");
			this.img.src = "";
		}
	};

	// This listener listens for the end of the audio stream
	audio.onended = function(){
		// Upon end of the audio stream, we decrease a variable counting *how many streams have ended*
		ended--;
		// If all streams have ended AND the loop mode is activated, we play again
		// i.e. the last one will restart all of them
		if(loop && ended === 0){
			play();
		}
	};

	// Display the HTML view object
	categoryWrapper.appendChild(elem);
	// Reference the newly created category in the category list, by name
	categories[name] = category;
}

// This function sets an instrument for a category
function pick(category, instrumentName) {
	console.log(category, instrumentName)
	var categoryName = category.name;
	instrumentName = instrumentName.toUpperCase();	// this is a safety to be case insensitive
	var audio = category.audio;
	// check if the instrument actually exists in the list of instruments (this list is in instruments.js)
	if (!instruments[categoryName][instrumentName]){
		// If it doesn't, reset stuff
		category.instrument = null;
		audio.src = null;
	} else{
		// If it does, reference it in the category and set the audio stream source
		category.instrument = instruments[categoryName][instrumentName];
		audio.src = category.instrument.src;
		audio.currentTime = 0;
	}

	// Update the view of the category
	category.paint();
	// Pause the music
	pause();
}

// Pause all
function pause() {
	// This loops checks all categories and pauses their audio streams
	for(var c in categories){
		var audio = categories[c].audio;
		audio.pause();
	}
}

// Play all
function play() {
	// Initialize the number of playing audio streams that have ended
	ended = 0;
	// For each category
	for(var c in categories){
		var category = categories[c];
		// if the category has an instrument set, play
		if(category.instrument && category.instrument.src) {
			category.play();
			// Update the number of audio streams
			ended ++;
		}
	}
}

// Toggles the loop mode by reversing the loop boolean
function toggleLoop() {
	loop = !loop;
	var elemLoop = document.getElementById('toggle-loop');
	elemLoop.innerHTML = (loop ? 'Unl' : 'L') + 'oop';
}


// Init categories
createCategory("melody", 1);
createCategory("bass", 0.7);
createCategory("effects", 0.2);
createCategory("drums", 0.8);