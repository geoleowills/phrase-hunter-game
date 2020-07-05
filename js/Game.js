class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    /**
     * Takes an array of phrases, uses each phrase to pass in to a new instance
     * of the Phrase class, pushes this new Phrase instance to an empty array
     * and returns the new array.
     */
    createPhrases() {
        const chosenPhrases = ['Needle in a haystack', 'Go for broke', 'Under your nose', 'A piece of cake', 'Cut to the chase'];
        const chosenPhrasesObjects = [];
        chosenPhrases.forEach(phrase => chosenPhrasesObjects.push(new Phrase(phrase)));
        return chosenPhrasesObjects;
    }

    /**
     * Returns a random Phrase class object from the phrase array.
     */
    getRandomPhrase() {
        let randNum = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randNum];
    }

    /**
     * Resets and starts the game.
     */
    startGame() {

        // Removes the phrase that had been selected and was being shown on screen.
        const phraseDivUl = document.getElementById('phrase').firstElementChild;
        phraseDivUl.innerHTML = '';

        // Resets call of the key buttons to be available to be clicked.
        const clickedKeyboardButtons = document.querySelectorAll('div button.chosen, div button.wrong');
        clickedKeyboardButtons.forEach(button => {
            button.className = 'key'
            button.disabled = false;
        });

        // Resets the number of lives left back to full amount.
        const lives = document.querySelectorAll('.tries');
        lives.forEach(life => life.firstElementChild.src = 'images/liveHeart.png');

        // Hides the inital overlay and shows the gameplay screen.
        const overlayDiv = document.getElementById('overlay');
        overlayDiv.style.display = 'none';

        // Chooses random phrase object for game.
        const randPhrase = this.getRandomPhrase();
        randPhrase.addPhraseToDisplay();
        this.activePhrase = randPhrase;
    }

    /**
     * Checks if the player has won yet - checks if the number of characters being shown
     * on screen is the same number of character on the phrase string. If true, then the
     * player has won.
     */
    checkForWin() {
        const phraseLength = this.activePhrase.phrase.length;
        const numOfShownCharacters = document.querySelectorAll('div ul li.show, div ul li.space').length;
        return (phraseLength === numOfShownCharacters);
    }

    /**
     * Sets overlay class and text content depending of what the outcome of the game
     * is. Shows the overlay to hide gameplay screen.
     */
    gameOver(outcome) {
        if (outcome) {
            document.getElementById('game-over-message').textContent = 'You won!';
            document.getElementById('overlay').className = 'win';
        } else {
            document.getElementById('game-over-message').textContent = 'You lost!';
            document.getElementById('overlay').className = 'lose';
        }

        const overlayDiv = document.getElementById('overlay');
        overlayDiv.style.display = '';
    }

    /**
     * Removes a life from the screen, replaces the individual life image with an
     * 'empty' heart, rather than full heart. Increments the 'missed' counter, once 5 goes
     * have been missed and the counter gets to 5, the gameOver method is called.
     */
    removeLife() {
        const currentLife = document.getElementById('scoreboard').firstElementChild.children[this.missed].firstElementChild;
        currentLife.src = 'images/lostHeart.png';
        this.missed++
        if (this.missed === 5) {
            this.gameOver(false);
        }
    }

    /**
     * This method is called when a keyboard (onscreen or hardware) button is pressed. It disabled the button
     * so can't be pressed again. Checks if the selected letter is in the phrase, if it is 
     * then the showMatchedLetter method is called to reveal the letter and the button class
     * is set to 'chosen' to set its new 'correct' color. Then checks for win, if the player has won then gameOver
     * is called. If the chosen letter is not in the phrase, the button class in set to 'wrong' to show the 'incorrect'
     * color and the removeLife method is called.
     */
    handleInteraction(button) {
        button.disabled = true;
        if (this.activePhrase.checkLetter(button.textContent)) {
            this.activePhrase.showMatchedLetter(button.textContent)
            button.className = 'chosen';
            if (this.checkForWin()) {
                this.gameOver(true);
            };
        } else {
            button.className = 'wrong';
            this.removeLife();
        }
    }
}