const boxes = document.querySelectorAll('.boxes');
const messageBox = document.querySelector('.messagebox');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""]; // Track the state of the game

// Winning conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle box click
function handleBoxClick(event) {
    const clickedBox = event.target;
    const boxIndex = parseInt(clickedBox.id);

    if (gameState[boxIndex] !== "" || !gameActive) {
        return; // Ignore if box is already filled or game is not active
    }

    // Update game state
    gameState[boxIndex] = currentPlayer;
    clickedBox.innerText = currentPlayer;

    checkResult();
}

// Check for a win or draw
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue; // Skip if any box is empty
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageBox.innerText = `Yay! Player ${currentPlayer} wins! 🎉`;
        messageBox.classList.remove('hide');
        gameActive = false;
        return;
    }

    // Check for a draw
    if (!gameState.includes("")) {
        messageBox.innerText = "It's a draw! 🤝";
        messageBox.classList.remove('hide');
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Reset the game
function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    messageBox.innerText = "";
    messageBox.classList.add('hide');
    boxes.forEach(box => {
        box.innerText = "";
    });
}

// Event listeners
boxes.forEach(box => box.addEventListener('click', handleBoxClick));
resetButton.addEventListener('click', resetGame);