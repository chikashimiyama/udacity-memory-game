/*jshint esversion: 6 */

class Dealer{

	constructor(){

		this.cards = [];
		this.openedCards = [];
		this.deckFrame = document.querySelector(".deck");
		this.restartButton = document.querySelector(".restart");
		this.elapsedTime = 0.0;
		this.matchedPairCounter = new Counter();
		this.timer = new TimerController(document.querySelector(".elapsedTime"));
		this.moveCounter = new MoveCounter(document.querySelector(".moves"));
		this.evaluator = new Evaluator(document.querySelector(".stars"));
		this.clickAcception = true;

		this.timer.start();


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
				
				this.moveCounter.increment();
				this.evaluator.evaluate(this.moveCounter.value);

				if(this.checkMatch()){
					for(const openCard of this.openedCards){
						openCard.match(becomeClickable);
					}
					this.matchedPairCounter.increment();
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
		if(this.matchedPairCounter.value === 8){
			this.matchedPairCounter.reset();
			return true;
		}
		return false;
	}

	checkMatch(){
		return this.openedCards[0].isMatched(this.openedCards[1].type);
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

	restart(){
		this.shuffle();
		this.init();
	}
}