/* Etch-a-Bloc 

*/
function etchABloc() {	
	init();

	function init() {
		/* variable definitions */
		this.dimension = 16; // number of squares on a side for grid
		this.screenWidth = 500; // size of screen itself
		this.screenHeight = 350;
		this.screen = undefined;
		this.sheet = undefined;
		this.resetListener = undefined;
		this.modeListener = undefined;

		// initialize and set up screen
		this.screen = initScreen(this.dimension, this.screenHeight, this.screenWidth);
		//add css grid and html grid to screen
		createGrid();
		// add event listeners
		addEventListeners();
	}


	function initScreen(dimension, screenh, screenw) {
		let screen = document.getElementById('screen');
		let boxWidth = screenw / dimension;
		let boxHeight = screenh / dimension;

		// create css for current grid layout
		createStyleSheet();	

		// add css for screen's grid
		addCSSRules('#screen', 'width: ${screenw}px; height: 350px; background-color: rgb(212,208,207); margin: 0 auto; border: 1px solid black; border-radius: 15px; display: grid; grid-template-rows: repeat(${dimension}) 1fr; grid-template-columns: repeat(${dimension}) 1fr; grid-gap: 0;', this.sheet.cssRules.length);

		// add css for box class inside screen container
		addCSSRules('.box', 'width: ${boxWidth}px; height: ${boxHeight}; border: 1px solid rgb(107,107,107); padding: 0; margin: 0;');

		return screen;
	}


	function createStyleSheet() {
		var element = document.createElement('style'), sheet;
		document.head.appendChild(element);
		this.sheet = element.sheet;
	}


	function createGrid() {
		let box = 0; // counter for labeling box id's

		// check for existing grid in case of reset and remove both html and css
		clearGrid()

		// create new css
		createStyleSheet();

		if(this.dimension > 0 && this.dimension < 65) {
			for(var idx = 0; idx < this.dimension; idx++) {
				for(var jdx = 0; jdx < this.dimension; jdx++) {
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
	}


	function addCSSRules(selector, rules, index) {
		if(typeof this.sheet !== 'undefined') {
			this.sheet.insertRule(selector + " { " + rules + " }", index);
		} else {
			console.log("addCSSRules:  stylesheet undefined!");
		}
	}


	function addHTMLGrid(selector, boxNumber) {
		let construct = '<div class=\"box grid' + boxNumber + '\"></div>'
		if(typeof selector !== 'undefined' && typeof selector !== 'null') {
			selector.innerHTML += construct
		} else {
			console.log("addHTMLGrid:  selector undefined!")
		}
	}


	function addEventListeners() {
		screen.addEventListener("mouseover", function( event ) {
			event.target.style.background = "black";
		})
		// add reset button event listener
		let resetBtn = document.getElementById('reset');
		let modeBtn = document.getElementById('mode');
		this.resetListener = resetBtn.addEventListener("click", function(){reset()});
		this.modeListener = modeBtn.addEventListener("click", function(){console.log('mode clicked')});
	}


	function reset() {
		boxArray = document.getElementsByClassName('box');

		// reset screen boxes to background color
		for(idx=0; idx <boxArray.length; idx++) {
			boxArray[idx].style.background = "rgb(212,208,207)";
		};

		// get user input for grid resolution		
		var input = 0;		

		while(input <= 0 || input > 64) {
			input = window.prompt("Number of squares per side (between 1 and 64):");
		} 

		// set grid variables and reinitialize grid
		this.height = input;
		this.width = this.height;

		this.screen = initScreen(this.height, this.width, this.screenHeight, this.screenWidth);
		createGrid();
		addEventListeners();
	}


	function clearGrid() {
		// remove html elements from page
		// var boxes = document.getElementsByClassName('box');
		// while(boxes[0]) {
		// 	boxes[0].parentNode.removeChild(boxes[0]);
		// }
		this.screen.innerHTML = '';

		// TO-DO:  remove css -- the below doesn't work
		// if (typeof this.sheet != 'undefined') {
		// 	this.sheet.parentNode.removeChild(this.sheet);
		// }
	}
};


window.onload = etchABloc();