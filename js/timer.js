/*jshint esversion: 6 */

/**
* @description emulates the functionality of a simple timer
*/
class Timer{
	constructor(){
		this.id = null;
		this.elapsedTime = 0;
	}

	start(callback){
		this.id = setInterval(() => { 
			this.elapsedTime++;
			if(callback) callback();
		}, 1000);
	}

	stop(){
		clearInterval(this.id);
	}

	reset(){
		this.stop();
		this.elapsedTime = 0;
	}
}

/**
* @description represents a timer with a display
*/
class TimerController extends Timer{

	constructor(element){
		super();
		this.targetElement = element;
	}

	start(){
		super.start(() => { this.update();});
	}

	reset(){
		super.reset();
		this.update();
	}

	update(){
		this.targetElement.innerHTML = this.elapsedTime;
	}
}
