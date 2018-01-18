/*jshint esversion: 6 */

// controls the rating system
class Evaluator {

	constructor(initialStars, thresholds){
		this.thresholds = thresholds;
		this.initialStars = initialStars;
		this.stars = this.initialStars;
	}

	evaluate(moveCount){
		if(this.thresholds.includes(moveCount)){
			this.removeStar();
		}
	}

	removeStar(){
		this.stars--;
	}

	reset(){
		this.stars = this.initialStars;
	}

}

class EvaluatorController extends Evaluator{

	constructor(element, initialStars, thresholds){
		super(initialStars, thresholds);
		this.starCounterElement = element;
		this.reset();
	}

	removeStar(){
		super.removeStar();
		this.update();
	}

	reset(){
		super.reset();
		this.update();		
	}

	update(){
		this.starCounterElement.innerHTML = '';
		for(let i = 0; i < this.stars; i++){
			const listElement = document.createElement('li');
			const italicElement = document.createElement('i');
			italicElement.classList.add('fa', 'fa-star');
			listElement.appendChild(italicElement);
			this.starCounterElement.appendChild(listElement);
		}
	}	

}