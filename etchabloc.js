/* Etch-a-Bloc 

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
		let box = 1;
		// TEST LINES:
		addCSSRules('body', 'text-align: center; background-color: steelblue;', 0);

		// TO-DO:  t/s container is null
		var container = document.getElementById('container');
		
		for(var idx = 1; idx <= this.height; idx++) {
			for(var jdx = 1; jdx <= this.width; jdx++) {
				// create css style grid
				let selector = '.grid' + box
				let rules = 'grid-column: col ' + jdx +
					' / span 1; grid-row: row ' + idx + ' / span 1;'
				addCSSRules(selector, rules, box);
				
				// create html grid
				addHTMLGrid(container, box);

				box += 1;
			}
		}

		addCSSRules('.container', 'width: 90%; margin: 0 auto 0 auto; 	display: grid; grid-template-rows: repeat(16); grid-template-columns: repeat(16);', this.sheet.cssRules.length);
		addCSSRules('.box', 'width: 25px; height: 25px; border: 1px solid blue;', this.sheet.cssRules.length);

	}

	function addHTMLGrid(container, boxNumber) {
		let construct = '<div class=\"box grid' + boxNumber + '\"></div>'
		if(typeof container !== 'undefined' && typeof container !== 'null') {
			container.innerHTML += construct
		} else {
			console.log("addHTMLGrid:  container undefined!")
		}
	}

	function addCSSRules(selector, rules, index) {
		if(typeof this.sheet !== 'undefined') {
			this.sheet.insertRule(selector + " { " + rules + " }", index);
			console.log("Adding rule: \'" + selector + " {" + rules + " }'" + ' to index: ' + index);
		} else {
			console.log("addCSSRules:  stylesheet undefined!");
		}
	}
	
};

window.onload = etchABloc();