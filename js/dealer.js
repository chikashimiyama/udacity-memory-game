/*jshint esversion: 6 */

class Dealer{

	constructor(){

		this.deckDiv = document.querySelector('.deck');
		this.restartButton = document.querySelector('.restart');
		this.retryButton = document.querySelector('.retry');

		this.cards = new CardArray(this.deckDiv, CARD_TYPES);
		this.openedCards = [];

		this.firstFlip = false;

		this.gate = new Gate();
		this.timer = new TimerController(document.querySelector('.elapsed-time'));
		this.moveCounter = new CounterController(document.querySelector('.moves'));
		this.evaluator = new EvaluatorController(document.querySelector('.stars'), 3, [10, 20]);
		this.result = new ResultController(document.querySelector('.result'));
		this.defineCallbacks();

	}

	defineCallbacks(){
		this.deckDiv.addEventListener('click', (event) => {
			let target = event.target;
			
			// in case the icon in the card is clicked, change the target to its parent, the card itself.
			if(target.tagName === 'I'){
				target = target.parentNode;
			}

			const index = Array.prototype.indexOf.call(this.deckDiv.children, target);
			
			// in case the user clicks the deck not the card or animation is ongoing
			if(index < 0 || !this.gate.status) return;
			this.respondToClick(index);
		});

		this.restartButton.addEventListener('click', (event) => {
			this.restart();
		});

		this.retryButton.addEventListener('click', (event) => {
			this.result.close();
			this.restart();
		});

	}

	respondToClick(index){

		// the player clicked the same card twice
		if(this.cards[index] === this.openedCards[0]) return;
		
		// if this is the first flip, start the timer
		if(!this.firstFlip){
			this.firstFlip = true;
			this.timer.start();
		}

		this.executeFlip(index);
	}

	executeFlip(index){
		this.gate.close();
		this.cards[index].flip(() => {
			this.openedCards.push(this.cards[index]);

			if(this.openedCards.length === 2){
				
				this.moveCounter.increment();
				this.evaluator.evaluate(this.moveCounter.value);

				if(this.openedCards[0].isMatched(this.openedCards[1])){
					for(const openCard of this.openedCards){
						openCard.match(this.gate.triggerOpen());
					}
					if(this.cards.allMatched()){
						this.timer.stop();
						this.result.show(this.moveCounter.value, this.timer.elapsedTime, this.evaluator.stars);
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

	restart(){
		this.firstFlip = false;
		this.timer.reset();
		this.moveCounter.reset();
		this.evaluator.reset();
		this.deckDiv.innerHTML = '';
		this.cards = new CardArray(this.deckDiv, CARD_TYPES);
	}

}