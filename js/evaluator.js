/*jshint esversion: 6 */

/**
* @description controls the rating system
*/
class Evaluator {

	/**
	* @constructor 
	*/
	constructor(element){
		this.thresholds = [10, 20];
		this.starCounterElement = element;
	}

	/**
	* @description evalutates the provided moveCount and removes star if necessary
	* @param {number} moveCount
	*/
	evaluate(moveCount){
		if(this.thresholds.includes(moveCount)){
			this.removeStar();
		}
	}

	/**
	* @description access the DOM and remove one star element
	*/
	removeStar(){
		const children = this.starCounterElement.children;
		if(children.length > 0){
			this.starCounterElement.removeChild(this.starCounterElement.children[0]);
		}
	}

	/**
	* @description access the DOM and reset the rating
	*/
	reset(){
		const italicElement = document.createElement('i');
		italicElement.classList.add('fa', 'fa-star');

		const starsToBeAdded = 3 - this.numStars();

		for(let i = 0; i < starsToBeAdded; i++){
			this.starCounterElement.appendChild(italicElement);
		}
	}

	/**
	* @description returns number of stars
	*/
	numStars(){
		return this.starCounterElement.children.length;
	}

}