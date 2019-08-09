/* Etch-a-Bloc 

*/
const etchABloc = {
	///// Initializer //////////////////////////////////
	init: function(dimension) {
		/* Initializes object 
		*/
		this.dimension = dimension; // number of grid squares on a side
		this.screenWidth = 500; // size of screen
		this.screenHeight = 350;
		this.screen = document.getElementById('screen');;
		this.sheet = this.addStyleSheet();
		this.resetListener = undefined;
		this.modeListener = undefined;

		// set up grid
		this.addGrid(this.screen, this.dimension, this.screenHeight, this.screenWidth);

		// add event listeners
		this.addEventListeners();
	},


	///// Button-handling////////////////////////////////
	reset: function() {
		/* resets object upon user input
		*/
		this.sheet = this.addStyleSheet;	// initialize new stylesheet for new grid
		var input = 0;	

		// get user input for grid resolution
		while(input <= 0 || input > 64) {
			input = window.prompt("Number of squares per side (between 1 and 64):");
		} 

		// set grid variables and reinitialize grid
		this.dimension = input;

		this.addGrid(this.screen, this.dimension, this.screenHeight, this.screenWidth);
		// this.addEventListeners();
	},

	mode: function() {},


	///// Methods /////////////////////////////////////
	addGrid: function(screen, dimension, screenh, screenw) {
		/* adds grid HTML and CSS to screen container 
		with help of reinitGrid
		*/
		let box = 0; // counter for labeling box id's
		
		this.reinitGrid(dimension, screenw, screenh);

		if(dimension > 0 && dimension < 65) {
			for(var idx = 0; idx < dimension; idx++) {
				for(var jdx = 0; jdx < dimension; jdx++) {
					// create css grid
					let selector = '.grid' + box
					let rules = 'grid-column: col ' + jdx +
						' / span 1; grid-row: row ' + idx + ' / span 1;'
					this.addCSSRules(selector, rules, this.sheet.cssRules.length);
					
					// create html grid
					this.addHTMLGrid(screen, box);
					box += 1;
				}
			}
		}
	},


	reinitGrid: function(dimension, width, height) {
		/* 	Helper function for addGrid
			removes screen's HTML 
			and updates css variable to
			new user-input grid size
		*/
		let boxWidth = width / dimension;
		let boxHeight = height / dimension;
		

		// remove existing HTML grid divs
		screen.innerHTML = '';

		// update css variable to new user-input grid size
		document.documentElement.style.setProperty('--dimension', dimension);

		// add css for box class inside screen container
		this.addCSSRules('.box', 'width: ${boxWidth}px; height: ${boxHeight}; border: 1px solid rgb(107,107,107); padding: 0; margin: 0;');
		// for troubleshooting:
		console.log("document.styleSheets: ", document.styleSheets);
	},


	///// Helpers //////////////////////////////////////////
	addEventListeners: function() {
		/* 	Adds event listeners to the two buttons,
			'Reset' and 'Mode'*/
		this.screen.addEventListener("mouseover", function( event ) {
			event.target.style.background = "black";
		})
		// add reset and mode button event listeners
		var resetBtn = document.getElementById('reset');
		var modeBtn = document.getElementById('mode');
		this.resetListener = resetBtn.addEventListener("click", this.reset);
		this.modeListener = modeBtn.addEventListener("click", function() { console.log('mode clicked'); });
	},

	addCSSRules: function(selector, rules, index) {
		/*  Adds CSS rules to JS-created dynamic stylesheet
		*/
		if(typeof this.sheet !== 'undefined') {
			this.sheet.insertRule(selector + " { " + rules + " }", index);
		} else {
			console.log("addCSSRules:  stylesheet undefined!");
		}
	},

	addHTMLGrid: function(selector, boxNumber) {
		/*  Adds an HTML grid of divs to screen container 
		*/
		let construct = '<div class=\"box grid' + boxNumber + '\"></div>'
		if(typeof selector !== 'undefined' && typeof selector !== 'null') {
			selector.innerHTML += construct
		} else {
			console.log("addHTMLGrid:  selector undefined!")
		}
	},

	addStyleSheet: function() {
		/*  Adds a new dynamic stylesheet to the DOM
		*/
		let element = document.createElement('style');
		document.head.appendChild(element);
		return element.sheet;
	}
};


const etch = Object.create(etchABloc);
window.onload = etch.init(16);