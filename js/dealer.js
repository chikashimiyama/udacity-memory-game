/*jshint esversion: 6 */

class Dealer{

	constructor(){

		this.cards = [];
		this.deckFrame = document.querySelector(".deck");
		this.restartButton = document.querySelector(".restart");
		this.init();

		this.deckFrame.addEventListener("click", (event) => {
			let target = event.target;
			// in case the icon in the card is clicked, change the target to its parent, the card itself.
			if(target.tagName === "I"){
				target = target.parentNode;
			}
			const index = Array.prototype.indexOf.call(this.deckFrame.children, target);
			this.respondToClick(index);
		});

		this.restartButton.addEventListener("click", (event) => {
			this.restart();
		});
	}

	init(){
		this.openedCards = [];
		this.elapsedTime = 0.0;
		this.rating = 3;
		this.matchedPairs = 0;
	}

	prepare(){
		const cardTypes = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-cube", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-cube"];
		for(const cardType of cardTypes){
			const newCard = new Card(cardType, this.deckFrame);
			this.cards.push(newCard);
		}
		this.shuffle();
		this.deal();
	}

	deal(){
		for(const card of this.cards){
			card.show();
		}
	}

	respondToClick(index){
		if(this.cards[index].open()){
			this.openedCards.push(this.cards[index]);
		}

		if(this.openedCards.length === 2){
			if(this.checkMatch()){
				for(const openCard of this.openedCards){
					openCard.match();
				}
				this.matchedPairs++;
				if(this.checkFinished()){
					this.restart();
				}
			}else{
				for(const openCard of this.openedCards){
					openCard.close();
				}
			}
			this.openedCards = []; // clear array
		}

	}

	checkFinished(){
		if(matchedPairs === 8){
			matchedPairs = 0;
			return true;
		}
		return false;
	}

	checkMatch(){
		return this.openedCards[0].type === this.openedCards[1].type;
	}

	shuffle() {
    	let currentIndex = this.cards.length;
    	let temporaryValue, randomIndex;
	    while (currentIndex !== 0) {
    	    randomIndex = Math.floor(Math.random() * currentIndex);
        	currentIndex -= 1;
	        temporaryValue = this.cards[currentIndex];
    	    this.cards[currentIndex] = this.cards[randomIndex];
        	this.cards[randomIndex] = temporaryValue;
	    }
	}

	closeAllCards(){
		for(const card of this.cards){
			card.close();
		}
	}

	restart(){
		closeAllCards();
		shuffle();
		init();
	}
}