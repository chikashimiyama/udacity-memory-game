/*jshint esversion: 6 */

class Evaluator {

	constructor(){
		this.thresholds = [1,2,3];
		this.starCounterElement = document.querySelector(".stars");
	}

	evaluate(moveCount){
		if(this.thresholds.includes(moveCount)){
			this.decrement();
		}
	}

	decrement(){
		this.starCounterElement.removeChild(this.startCounterElement.firstChild);
	}

	reset(){
		const italicElement = document.createElement("i");
		italicElement.classList.add("fa", "fa-star");
		for(let i = 0; i < 3; i++){
			this.starCounterElement(italicElement);
		}
	}
}