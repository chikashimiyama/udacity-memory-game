/*jshint esversion: 6 */

class CardArray extends Array {

	constructor(deck, cardTypes){
		super();

		const allCards = cardTypes.concat(cardTypes);

		for(const cardType of allCards){
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