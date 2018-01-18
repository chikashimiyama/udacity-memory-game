/*jshint esversion: 6 */

// represent a gate
class Gate{

	constructor(){
		this.status = true;
	}

	open(){
		this.status = true;
	}

	close(){
		this.status = false;
	}

	triggerOpen(){
		return ()=>{
			this.open();
		};
	}
}