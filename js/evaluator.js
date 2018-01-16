/*jshint esversion: 6 */

class Evaluator {

	constructor(){
		this.thresholds = [10, 20];
		this.starCounterElement = document.querySelector(".stars");
	}

	evaluate(moveCount){
		if(this.thresholds.includes(moveCount)){
			this.removeStar();
		}
	}

	removeStar(){
		const children = this.starCounterElement.children;
		if(children.length > 0){
			this.starCounterElement.removeChild(this.starCounterElement.children[0]);
		}
	}

	reset(){
		const italicElement = document.createElement("i");
		italicElement.classList.add("fa", "fa-star");

		const starsToBeAdded = 3 - this.starCounterElement.children.length;

		for(let i = 0; i < starsToBeAdded; i++){
			this.starCounterElement(italicElement);
		}
	}
}