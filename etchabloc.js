/* Etch-a-Bloc 

*/
const etchABloc = {
	///// Initializer //////////////////////////////////
	init: function(dimension) {
		/* variable definitions */
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
		this.sheet = this.addStyleSheet;	// initialize new stylesheet for new grid
		var input = 0;	

		// get user input for grid resolution
		while(input <= 0 || input > 64) {
			input = window.prompt("Number of squares per side (between 1 and 64):");
		} 

		// set grid variables and reinitialize grid
		this.dimension = input;

		this.addGrid(this.dimension, this.screenHeight, this.screenWidth);
		// this.addEventListeners();
	},

	mode: function() {},


	///// Methods /////////////////////////////////////
	addGrid: function(screen, dimension, screenh, screenw) {
		let boxWidth = screenw / dimension;
		let boxHeight = screenh / dimension;
		let box = 0; // counter for labeling box id's

		// remove existing HTML grid divs
		screen.innerHTML = '';

		//remove existing dynamic css and set css variable to new grid dimensions
		// document.styleSheetList[]
			// add css for screen's grid -- moved this to css using variable '--dimension'
		// addCSSRules('#screen', 'width: ${screenw}px; height: 350px; background-color: rgb(212,208,207); margin: 0 auto; border: 1px solid black; border-radius: 15px; display: grid; grid-template-rows: repeat(${dimension}) 1fr; grid-template-columns: repeat(${dimension}) 1fr; grid-gap: 0;', this.sheet.cssRules.length);
		document.documentElement.style.setProperty('--dimension', dimension);

		// add css for box class inside screen container
		this.addCSSRules('.box', 'width: ${boxWidth}px; height: ${boxHeight}; border: 1px solid rgb(107,107,107); padding: 0; margin: 0;');
		// should probably add housekeeping to delete old css sheet when resizing grid --  this should also be along the lines of getting functionality to work as well
		console.log("document.styleSheets: ", document.styleSheets);
		// console.log("Deleting old sheet...")
		// document.stylesheets
		// console.log

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


	///// Helpers //////////////////////////////////////////
	addEventListeners: function() {
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
		if(typeof this.sheet !== 'undefined') {
			this.sheet.insertRule(selector + " { " + rules + " }", index);
		} else {
			console.log("addCSSRules:  stylesheet undefined!");
		}
	},

	addHTMLGrid: function(selector, boxNumber) {
		let construct = '<div class=\"box grid' + boxNumber + '\"></div>'
		if(typeof selector !== 'undefined' && typeof selector !== 'null') {
			selector.innerHTML += construct
		} else {
			console.log("addHTMLGrid:  selector undefined!")
		}
	},

	addStyleSheet: function() {
		// // TO-DO:  If there are any sheets created by this script, remove them before creating another
		// while(document.styleSheets.length > 2) {
		// 	delete document.styleSheets[document.styleSheets.length-1];
		// }
		let element = document.createElement('style');
		document.head.appendChild(element);
		return element.sheet;
	}
};


const etch = Object.create(etchABloc);
window.onload = etch.init(16);