class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [];
        this.activePhrase = null;
    }

    createPhrases() {
        const chosenPhrases = ['Needle in a haystack', 'Go for broke', 'Under your nose', 'A piece of cake', 'Cut to the chase'];
        chosenPhrases.forEach(phrase => this.phrases.push(new Phrase(phrase)));
    }

    getRandomPhrase() {
        let randNum = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randNum];
    }

    startGame() {
        const phraseDivUl = document.getElementById('phrase').firstElementChild;
        phraseDivUl.innerHTML = '';

        const clickedKeyboardButtons = document.querySelectorAll('div button.chosen, div button.wrong');
        clickedKeyboardButtons.forEach(button => {
            button.className = 'key'
            button.disabled = false;
        });

        const lives = document.querySelectorAll('.tries');
        lives.forEach(life => life.firstElementChild.src = 'images/liveHeart.png');

        const overlayDiv = document.getElementById('overlay');
        overlayDiv.style.display = 'none';

        this.createPhrases();

        const randPhrase = this.getRandomPhrase();
        randPhrase.addPhraseToDisplay();
        this.activePhrase = randPhrase;
    }

    checkForWin() {
        const phraseLength = this.activePhrase.phrase.length;
        const numOfShownCharacters = document.querySelectorAll('div ul li.show, div ul li.space').length;
        return (phraseLength === numOfShownCharacters);
    }

    gameOver(outcome) {
        const overlayDiv = document.getElementById('overlay');
        overlayDiv.style.display = '';

        if (outcome) {
            document.getElementById('game-over-message').textContent = 'You won!';
            document.getElementById('overlay').className = 'win';
        } else {
            document.getElementById('game-over-message').textContent = 'You lost!';
            document.getElementById('overlay').className = 'lose';
        }
    }

    removeLife() {
        const currentLife = document.getElementById('scoreboard').firstElementChild.children[this.missed].firstElementChild;
        currentLife.src = 'images/lostHeart.png';
        this.missed++
        if (this.missed === 5) {
            this.gameOver(false);
        }
    }

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