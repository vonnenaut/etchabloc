/* Etch-a-Bloc 
	dynamically creates grid
*/
function etchABloc() {	
	/* variable definitions */
	var element = document.createElement('style'), sheet;
	document.head.appendChild(element);
	this.sheet = element.sheet;
	this.height = 16;
	this.width = 16;
	this.box = 1;
	init();

	function init() {
		// TEST LINE:
		addCSSRules('body', 'text-align: center; background-color: steelblue;', 0);

		for(var idx = 1; idx < this.height; idx++) {
			for(var jdx = 1; jdx < this.width; jdx++) {
				// create css style grid
				let selector = '.grid' + this.box
				let rules = 'grid-column: col ' + jdx +
					' / span 1; grid-row: row ' + idx + ' / span 1;'
				addCSSRules(selector, rules, this.sheet.length);
				this.box += 1;

				// TO-DO:  create html grid

			}
		}
	}

	function createGrid(height, width) {
		document.body.innerHTML += `<div class="container"></div>`;
		const container = document.querySelector('.container');
		container.style.gridTemplateRows = `repeat(${height}, 25px)`;
		container.style.gridTemplateColumns = `repeat(${width}, 25px)`;
	}

	function addCSSRules(selector, rules, index) {
		if(typeof this.sheet !== 'undefined') {
			this.sheet.insertRule(selector + " { " + rules + " }", index);
			console.log("Adding rule: " + selector + " {" + rules + " }" + ' to index: ' + index);
		} else {
			console.log("addCssRules:  stylesheet undefined!");
		}
	}
	
};

etchABloc();


// var etchABloc = (function() {
// 	/* method definitions */
// 	function layoutGrid(height, width) {
// 		const container = document.querySelector('.container');
// 		container.style.gridTemplateRows = `repeat(${height}, 25px)`;
// 		container.style.gridTemplateColumns = `repeat(${width}, 25px)`;
// 	}	

// 	// const fillGrid = () => {
// 	// 	const container = document.querySelector('.container');
// 	// }

// 	/* object initializer */
// 	function init() {
// 		createGrid();
// 		addCSSRules(sheet, document.style, "background-color", "orange");
// 		// addCSSRules(sheet, document.style.div, "width: 90%; margin: 0 auto 0 auto; display: grid; border: 1px solid blue; height: 100% width: 100%",
// 		// layoutGrid(16, 16);
// 		// fillGrid();
// 	}

// 	init();
// })();