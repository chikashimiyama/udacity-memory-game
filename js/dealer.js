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
			
			// in case the user clicks the deck not the card or animation is ongoing
			if(index < 0 || !this.clickAcception) return;
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
		this.moves = 0;
		this.clickAcception = true;
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
		for(const card of this.cards) card.show();
	}

	respondToClick(index){

		// the player clicked the same card twice
		if(this.cards[index] === this.openedCards[0]) return;

		this.clickAcception = false;
		const becomeClickable = () =>{ this.clickAcception = true;};

		this.cards[index].flip(() => {
			this.openedCards.push(this.cards[index]);

			if(this.openedCards.length === 2){
				this.moves++;
				if(this.checkMatch()){
					for(const openCard of this.openedCards){
						openCard.match(becomeClickable);
					}
					this.matchedPairs++;
					if(this.checkFinished()){
						this.showResult();
					}
				}else{
					for(const openCard of this.openedCards){
						openCard.unmatch(becomeClickable);
					}
				}
				this.openedCards = []; // clear array
			}else{
				becomeClickable();
			}
		});
	}


	checkFinished(){
		if(this.matchedPairs === 8){
			this.matchedPairs = 0;
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
			if(card.open) card.flip();
		}
	}

	restart(){
		closeAllCards();
		shuffle();
		init();
	}
}