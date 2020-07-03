let game;

const startButton = document.getElementById('btn__reset');
startButton.addEventListener('click', (event) => {
    game = new Game();
    game.startGame();
});

const keyboard = document.getElementById('qwerty');

keyboard.addEventListener('click', (e) => {
    e.preventDefault();
    let clickedButton = e.target;
    if (/^[a-zA-z]$/.test(e.target.textContent)) {
        console.log(e.target);
        game.handleInteraction(clickedButton);
    }
});

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