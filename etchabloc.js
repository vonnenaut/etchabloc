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
	init();

	function init() {
		createGrid(this.height, this.width);
		addCSSRules('body', 'text-align: center; background-color: steelblue;', 0);
	}

	function createGrid(height, width) {
		document.body.innerHTML += `<div class="container"></div>`;
		const container = document.querySelector('.container');
		container.style.gridTemplateRows = `repeat(${height}, 25px)`;
		container.style.gridTemplateColumns = `repeat(${width}, 25px)`;
	}

	function addCSSRules(selector, rules, index) {
		if(typeof this.sheet !== 'undefined') {
			this.sheet.insertRule(selector + "{" + rules + "}", index);
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