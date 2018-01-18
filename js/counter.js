/*jshint esversion: 6 */

// represents the behavior of a counter
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

// represents a counter with display
class CounterController extends Counter{
	
	constructor(element){
		super();
		this.counterElement = element;
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

