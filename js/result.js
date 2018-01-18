/*jshint esversion: 6 */

// represents the result sheet
class ResultController{

	constructor(element){
		this.targetElement = element;

		this.moveElement = document.querySelector('.res-moves');
		this.timeElement = document.querySelector('.res-time');
		this.starElement = document.querySelector('.res-stars');
	}

	show(moves, elapsedTime, rating){
		this.moveElement.innerHTML = moves;
		this.timeElement.innerHTML = elapsedTime;
		this.starElement.innerHTML = rating;
		this.targetElement.classList.add('show');
	}

	close(){
		this.targetElement.classList.remove('show');
	}
}



