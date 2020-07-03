class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
     * Adds each character of the phase to the display, each within its own list
     * element, has its class set depending on whether it is an empty space or
     * another character. 
     */
    addPhraseToDisplay() {
        const phraseDivUl = document.getElementById('phrase').firstElementChild;

        for (let i = 0; i < this.phrase.length; i++) {
            let newLetter = document.createElement('li');
            newLetter.textContent = this.phrase[i];
            if (this.phrase[i] === ' ') {
                newLetter.setAttribute('class', 'space');
            } else {
                newLetter.setAttribute('class', `hide letter ${this.phrase[i]}`);
            }
            phraseDivUl.appendChild(newLetter);
        }
    }

    /**
     * Checks whether the phrase included the selected letter, returns true or false.
     */
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

    /**
     * Loops through the phrase on the display, if the input letter matches the current
     * iteration letter then the class name is changed for that element and the letter is
     * shown on display.
     */
    showMatchedLetter(letter) {
        const phraseDivUl = document.getElementById('phrase').firstElementChild.children;
        for (let i = 0; i < phraseDivUl.length; i++) {
            if (letter === phraseDivUl[i].textContent) {
                phraseDivUl[i].className = `show letter ${phraseDivUl[i].textContent}`;
            }
        }
    }

}