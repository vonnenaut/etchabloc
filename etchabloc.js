/* Etch-a-Bloc 

*/
function etchABloc() {	
	/* variable definitions */
	var element = document.createElement('style'), sheet;
	document.head.appendChild(element);
	this.sheet = element.sheet;
	this.height = 16; // number of squares in grid
	this.width = 16;
	this.screenWidth = 500; // size of screen itself
	this.screenHeight = 350;
	this.screen = undefined;
	init();

	function init() {
		// initialize and set up screen
		this.screen = initScreen(this.height, this.width, this.screenHeight, this.screenWidth);
		//add css grid and html grid to screen
		createGrid();
		//set up event listener for screen
		screen.addEventListener("mouseover", function( event ) {
			event.target.style.background = "black";
		})

	}

	function addHTMLGrid(selector, boxNumber) {
		let construct = '<div class=\"box grid' + boxNumber + '\"></div>'
		if(typeof selector !== 'undefined' && typeof selector !== 'null') {
			selector.innerHTML += construct
		} else {
			console.log("addHTMLGrid:  selector undefined!")
		}
	}

	function addCSSRules(selector, rules, index) {
		if(typeof this.sheet !== 'undefined') {
			this.sheet.insertRule(selector + " { " + rules + " }", index);
		} else {
			console.log("addCSSRules:  stylesheet undefined!");
		}
	}

	function initScreen(height, width, screenh, screenw) {		
		let screen = document.getElementById('screen');
		let boxWidth = screenw / width;
		let boxHeight = screenh / height;

		// add css for screen's grid
		addCSSRules('#screen', 'width: ${screenw}px; height: 350px; background-color: rgb(212,208,207); margin: 0 auto; border: 1px solid black; border-radius: 15px; display: grid; grid-template-rows: repeat(${height}) 1fr; grid-template-columns: repeat(${width}) 1fr; grid-gap: 0;', this.sheet.cssRules.length);

		// add css for box class inside screen container
		addCSSRules('.box', 'width: ${boxWidth}px; height: ${boxHeight}; border: 1px solid rgb(107,107,107); padding: 0; margin: 0;');


		return screen;
	}

	function createGrid() {
		let box = 0; // counter for labeling box id's

		for(var idx = 0; idx < this.height; idx++) {
			for(var jdx = 0; jdx < this.width; jdx++) {
				// create css grid
				let selector = '.grid' + box
				let rules = 'grid-column: col ' + jdx +
					' / span 1; grid-row: row ' + idx + ' / span 1;'
				addCSSRules(selector, rules, this.sheet.cssRules.length);
				
				// create html grid
				addHTMLGrid(screen, box);
				box += 1;
			}
		}
	}
	
};

window.onload = etchABloc();