/*jshint esversion: 6 */

class Counter{

	constructor(){
		this.value = 0;
	}

	increment(){
		this.value++;
	}	

	reset(){
		this.value = 0;
	}
}

class MoveCounter extends Counter{
	
	constructor(){
		super();
		this.counterElement = document.querySelector(".moves");
	}

	increment(){
		super.increment();
		this.update();
	}

	reset(){
		super.reset();
		this.update();
	}

	update(){
		this.counterElement.innerHTML = this.value;
	}

}

