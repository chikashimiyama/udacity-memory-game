/*jshint esversion: 6 */

/**
* @description represents the result sheet
*/
class Result{

	/**
	* @description stores the HTML
	* @constructor
	* @param {object} element
	*/
	constructor(element){
		this.targetElement = element;

		this.moveElement = document.querySelector(".res-moves");
		this.timeElement = document.querySelector(".res-time");
		this.starElement = document.querySelector(".res-stars");
	}

	/**
	* @description shows a modal sheet with the result of the game
	* @param {number} moves
	* @param {number} elapsedTime
	* @param {number} rating
	*/
	show(moves, elapsedTime, rating){
		this.moveElement.innerHTML = moves;
		this.timeElement.innerHTML = elapsedTime;
		this.starElement.innerHTML = rating;
		this.targetElement.classList.add("show");
	}

	/**
	* @description close the modal sheet
	*/
	close(){
		this.targetElement.classList.remove("show");
	}
}



