let game;

/**
 * Creates a new Game object when the start button is pressed, calls the startGame
 * method to start the game.
 */
const startButton = document.getElementById('btn__reset');
startButton.addEventListener('click', (event) => {
    game = new Game();
    game.startGame();
});

/**
 * Listens for an element on the on screen keybaord to be clicked, checks that
 * it is a letter button that has been clicked and that is wasn't just whitespace.
 * Calls the handleInteraction method.
 */
const keyboard = document.getElementById('qwerty');
keyboard.addEventListener('click', (e) => {
    e.preventDefault();
    let clickedButton = e.target;
    if (/^[a-zA-z]$/.test(e.target.textContent)) {
        game.handleInteraction(clickedButton);
    }
});

/**
 * Listens for a key to be pressed on the physical keyboard, checks that the key pressed
 * is a letter (a-z/65-90). Loops through the on screen keyboard buttons until it gets to
 * the one that matches the button pressed on the physical keyboard, then calls the 
 * handleIntercation method with that button element.
 */
window.addEventListener('keydown', (e) => {
    e.preventDefault();
    const keyboardButtons = document.querySelectorAll('div button.key');
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        keyboardButtons.forEach(button => {
            if (button.textContent === (String.fromCharCode(e.keyCode).toLowerCase())) {
                game.handleInteraction(button);
            }
        });
    }
});