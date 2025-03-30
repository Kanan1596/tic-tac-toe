const board = document.getElementById("board");
        const status = document.getElementById("status");
        const restartBtn = document.getElementById("restart");
        let currentPlayer = "X";
        let gameBoard = Array(9).fill(null);
        let player1 = "Player X";
        let player2 = "Player O";
        
        function startGame() {
            player1 = document.getElementById("player1").value || "Player X";
            player2 = document.getElementById("player2").value || "Player O";
            document.querySelector(".setup").style.display = "none";
            board.style.display = "grid";
            status.style.display = "block";
            restartBtn.style.display = "inline-block";
            status.textContent = `${player1}'s turn`;
            initializeBoard();
        }

        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            for (let pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    status.textContent = `${gameBoard[a] === "X" ? player1 : player2} wins!`;
                    board.removeEventListener("click", handleCellClick);
                    return true;
                }
            }
            if (!gameBoard.includes(null)) {
                status.textContent = "It's a draw!";
                return true;
            }
            return false;
        }
        
        function handleCellClick(event) {
            const index = event.target.dataset.index;
            if (!gameBoard[index]) {
                gameBoard[index] = currentPlayer;
                event.target.textContent = currentPlayer;
                event.target.classList.add("taken");
                if (!checkWinner()) {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    status.textContent = `${currentPlayer === "X" ? player1 : player2}'s turn`;
                }
            }
        }
        
        function resetGame() {
            gameBoard.fill(null);
            currentPlayer = "X";
            status.textContent = `${player1}'s turn`;
            board.innerHTML = "";
            initializeBoard();
        }
        
        function initializeBoard() {
            board.innerHTML = "";
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.index = i;
                cell.addEventListener("click", handleCellClick);
                board.appendChild(cell);
            }
        }