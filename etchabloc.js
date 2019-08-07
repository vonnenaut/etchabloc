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
		var screen = document.getElementById('screen');
		
		for(var idx = 1; idx <= this.height; idx++) {
			for(var jdx = 1; jdx <= this.width; jdx++) {
				// create css style grid
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
	
};

window.onload = etchABloc();