document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusDisplay = document.querySelector("#status");
    const restartButton = document.querySelector("#restart");
    
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

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

    const handleCellPlayed = (clickedCell, clickedCellIndex) => {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
    };

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    };

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.textContent = `Player ${currentPlayer} has won!`;
            gameActive = false;
            return;
        }

        const roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.textContent = "Game ended in a draw!";
            gameActive = false;
            return;
        }

        handlePlayerChange();
    };

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    };

    const handleRestartGame = () => {
        gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = "");
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", handleRestartGame);

    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
});
