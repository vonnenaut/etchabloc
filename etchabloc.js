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

		// set up grid
		this.addGrid();
	},


	///// Methods /////////////////////////////////////
	addGrid: function() {
		/* adds grid HTML and CSS to screen container 
		with help of reinitGrid
		*/
		let box = 0; // counter for labeling box id's
		
		this.reinitGrid(this.dimension, this.screenWidth, this.screenHeight);

		for(var idx = 0; idx < this.dimension; idx++) {
			for(var jdx = 0; jdx < this.dimension; jdx++) {
				// create css grid
				let selector = '.grid' + box
				let rules = 'grid-column: col ' + jdx +
					' / span 1; grid-row: row ' + idx + ' / span 1;'
				this.addCSSRules(selector, rules, this.sheet.cssRules.length);
				
				// create html grid
				this.addHTMLGrid(this.screen, box);
				box += 1;
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
		this.screen.innerHTML = '';

		// update css variable to new user-input grid size
		document.documentElement.style.setProperty('--dimension', dimension);

		// add css for box class
		this.addCSSRules('.box', 'width: ${boxWidth}px; height: ${boxHeight}; border: 1px solid rgb(107,107,107); padding: 0; margin: 0;');
		// for troubleshooting:
		// console.log("document.styleSheets: ", document.styleSheets);
	},


	///// Helpers //////////////////////////////////////////
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


function createObj(dimension) {
	init(dimension);

	function init(dimension) {
		// create object and call its init method, add event listeners for the two buttons
		const etch = Object.create(etchABloc);
		etch.init(dimension);
		addEventListeners();

		///// Button-handling /////
		function addEventListeners() {
		/* 	Adds event listeners to the two buttons,
			'Reset' and 'Mode'*/
		etch.screen.addEventListener("mouseover", function( event ) {
			event.target.style.background = "black";
		});
		// add reset and mode button event listeners
		let resetBtn = document.getElementById('reset');
		let modeBtn = document.getElementById('mode');
		etch.resetListener = resetBtn.addEventListener("click", reset);
		etch.modeListener = modeBtn.addEventListener("click", function() { alert('mode functionality disabled!'); });
		}

		function reset() {
			/* resets object upon user input
			*/
			let input = 0;

			// get user input for grid resolution
			while(input < 8 || input > 64) {
				input = window.prompt("Enter number of squares per side, between 8 and 64:");
			} 

			// init object
			init(input);
		}
	}

}

window.onload = function() { 
	createObj(16);
}