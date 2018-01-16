/*jshint esversion: 6 */

class Card{

	constructor(type, deck){
		this.type = type;
		this.deck = deck;
		this.view = null;
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

	open(){
		const attr = this.view.getAttribute("class");
		if(attr === "card"){
			this.view.setAttribute("class", "card show open");
			return true;
		}
		return false;
	}

	close(){
		this.view.setAttribute("class", "card");
	}

	match(){
		this.view.setAttribute("class", "card match");
	}
}
