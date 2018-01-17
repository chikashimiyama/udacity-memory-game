/*jshint esversion: 6 */

/**
* @description represents the behavior of counter
*/
class Counter{

	/**
	* @description set value to 0
	* @constructor
	*/
	constructor(){
		this.value = 0;
	}

	/**
	* @description increment the counter
	*/
	increment(){
		this.value++;
	}	

	/**
	* @description reset the counter
	*/
	reset(){
		this.value = 0;
	}
}

/**
* @description represents a counter with display
*/
class MoveCounter extends Counter{
	
	/**
	* @description stores the target HTML element
	* @constructor
	*/
	constructor(element){
		super();
		this.counterElement = element;
	}

	/**
	* @description increment the counter and update the display
	*/
	increment(){
		super.increment();
		this.update();
	}

	/**
	* @description reset the counter and update the display
	*/
	reset(){
		super.reset();
		this.update();
	}


	/**
	* @description update the HTML content with new value
	*/
	update(){
		this.counterElement.innerHTML = this.value;
	}

}

