const etchABloc = {	
	///// Methods /////////////////////////////////////
	initScreen: function(dimension, screenh, screenw) {
		let screen = document.getElementById('screen');
		let boxWidth = screenw / dimension;
		let boxHeight = screenh / dimension;

		// create css for current grid layout
		this.addStyleSheet();

		// add css for screen's grid -- moved this to css using variable '--dimension'
		// addCSSRules('#screen', 'width: ${screenw}px; height: 350px; background-color: rgb(212,208,207); margin: 0 auto; border: 1px solid black; border-radius: 15px; display: grid; grid-template-rows: repeat(${dimension}) 1fr; grid-template-columns: repeat(${dimension}) 1fr; grid-gap: 0;', this.sheet.cssRules.length);
		document.documentElement.style.setProperty('--dimension', dimension);

		// add css for box class inside screen container
		addCSSRules('.box', 'width: ${boxWidth}px; height: ${boxHeight}; border: 1px solid rgb(107,107,107); padding: 0; margin: 0;');
		// should probably add housekeeping to delete old css sheet when resizing grid --  this should also be along the lines of getting functionality to work as well
		console.log("document.styleSheets: ", document.styleSheets);
		console.log("Deleting old sheet...")
		document.stylesheets
		console.log

		return screen;
	},

		///// Initializer //////////////////////////////////
	init: function(dimension) {
		/* variable definitions */
		this.dimension = 16; // number of grid squares on a side
		this.screenWidth = 500; // size of screen
		this.screenHeight = 350;
		this.screen = undefined;
		this.sheet = undefined;
		this.resetListener = undefined;
		this.modeListener = undefined;

		// initialize and set up screen
		this.screen = this.initScreen(this.dimension, this.screenHeight, this.screenWidth);
		//add css grid and html grid to screen
		this.createGrid();
		// add event listeners
		this.addEventListeners();
	}
};

window.onload = etchABloc.init(16); 
