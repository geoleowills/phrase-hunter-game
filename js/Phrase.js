class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

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

    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

    showMatchedLetter(letter) {
        const phraseDivUl = document.getElementById('phrase').firstElementChild.children;
        for (let i = 0; i < phraseDivUl.length; i++) {
            if (letter === phraseDivUl[i].textContent) {
                phraseDivUl[i].className = `show letter ${phraseDivUl[i].textContent}`;
            }
        }
    }

}