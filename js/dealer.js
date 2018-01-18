/*jshint esversion: 6 */

class Dealer{

	constructor(){

		this.cards = [];
		this.openedCards = [];

		this.deckFrame = document.querySelector(".deck");
		this.restartButtons = document.querySelectorAll(".restart");

		this.gate = new Gate();
		this.matchedPairCounter = new Counter();
		this.timer = new TimerController(document.querySelector(".elapsed-time"));
		this.moveCounter = new MoveCounter(document.querySelector(".moves"));
		this.evaluator = new Evaluator(document.querySelector(".stars"));
		this.result = new Result(document.querySelector(".result"));
		this.defineCallbacks();
		this.init();

	}

	defineCallbacks(){
		this.deckFrame.addEventListener("click", (event) => {
			let target = event.target;
			
			// in case the icon in the card is clicked, change the target to its parent, the card itself.
			if(target.tagName === "I"){
				target = target.parentNode;
			}

			const index = Array.prototype.indexOf.call(this.deckFrame.children, target);
			
			// in case the user clicks the deck not the card or animation is ongoing
			if(index < 0 || !this.gate.status) return;
			this.respondToClick(index);
		});

		for(const restartButton of this.restartButtons){
			restartButton.addEventListener("click", (event) => {
				this.restart();
			});
		}

	}

	init(){
		const cardTypes = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-cube", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-cube"];
		for(const cardType of cardTypes){
			const newCard = new Card(cardType, this.deckFrame);
			this.cards.push(newCard);
		}
		//this.shuffle();
		this.deal();
	}

	deal(){
		for(const card of this.cards) card.show();
	}

	respondToClick(index){

		// the player clicked the same card twice
		if(this.cards[index] === this.openedCards[0]) return;
		
		// if this is the first flip, start the timer
		if(this.allDown()){
			this.timer.start();
		}

		this.executeFlip(index);
	}

	allDown(){
		for(const card of this.cards){
			if(card.open) return false;
		}
		return true;
	}

	executeFlip(index){
		this.gate.close();
		this.cards[index].flip(() => {
			this.openedCards.push(this.cards[index]);

			if(this.openedCards.length === 2){
				
				this.moveCounter.increment();
				this.evaluator.evaluate(this.moveCounter.value);

				if(this.checkMatch()){
					for(const openCard of this.openedCards){
						openCard.match(this.gate.triggerOpen());
					}
					this.matchedPairCounter.increment();
					if(this.checkFinished()){
						this.timer.stop();
						this.result.show(this.moveCounter.value, this.timer.elapsedTime, this.evaluator.numStars());
					}
				}else{
					for(const openCard of this.openedCards){
						openCard.unmatch(this.gate.triggerOpen());
					}
				}
				this.openedCards = []; // clear array

			}else{
				this.gate.open();
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
	}
}