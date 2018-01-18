/*jshint esversion: 6 */

class CardArray extends Array {

	constructor(deck){
		super();
		const cardTypes = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-cube', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-cube'];
		for(const cardType of cardTypes){
			const newCard = new Card(cardType, deck);
			this.push(newCard);
		}

		this.clean(deck);
		this.shuffle();
		this.deal();
	}

	clean(deck){
		deck.innerHTML = '';
	}

	shuffle() {
    	let currentIndex = this.length;
    	let temporaryValue, randomIndex;
	    while (currentIndex !== 0) {
    	    randomIndex = Math.floor(Math.random() * currentIndex);
        	currentIndex -= 1;
	        temporaryValue = this[currentIndex];
    	    this[currentIndex] = this[randomIndex];
        	this[randomIndex] = temporaryValue;
	    }
	}

	deal(){
		for(const card of this){
			card.show();
		}
	}

	allMatched(){
		for(const card of this){
			if(!card.matched){
				return false;
			}
		}
		return true;
	}

}