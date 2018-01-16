/*jshint esversion: 6 */

class Card{

	constructor(type, deck){
		this.type = type;
		this.deck = deck;
		this.view = null;
		this.open = false; // the face of the card is down by default;
	}

	show(){
		const listElement = document.createElement("li");
		listElement.classList.add("card");

		const italicElement = document.createElement("i");
		italicElement.classList.add("fa", this.type);
		listElement.appendChild(italicElement);
		this.deck.appendChild(listElement);
		this.view = listElement;
	}

	flip(postProcess){
		const offset = this.open ? 0 : -180;
		let value = 0;
		const id = setInterval(() => {
			const degree = value + offset;
			this.view.style.transform = "rotateY("+degree+"deg)";
			value += 10;
			if(value === 90){
				this.open = !this.open;
				this.view.setAttribute("class", this.open ? "card show open" : "card");
			}
			if(value === 180){
				clearInterval(id);
				if(postProcess)postProcess();
			}
		}, 35);
	}

	match(postProcess){
		this.view.setAttribute("class", "card match");
		this.view.style.transform = "scale(1.5)";
		let scale = 1.4;
		const id = setInterval( () =>{
			this.view.style.transform = "scale("+scale+")";
			scale -= 0.08;
			if(scale <= 1.0){
				this.view.style.transform = "scale(1.0)";
				clearInterval(id);
				postProcess();
			}
		}, 35);
	}

	unmatch(postProcess){
		let phase = 0.0;
		this.view.setAttribute("class", "card unmatch");
		const id = setInterval( () =>{
			const amp = Math.sin(phase) * 20;
			this.view.style.transform = "translateX("+amp+"px)";
			phase += 0.8;
			if(phase >= 12){
				clearInterval(id);
				this.view.style.transform = "translateX(0px)";
				this.flip(postProcess);
			}
		}, 35);
	}
}
