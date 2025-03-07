const playerBoardElement = document.getElementById('player-board');
const opponentBoardElement = document.getElementById('opponent-board');
const messageElement = document.getElementById('message');
const radarButton = document.getElementById('radar');
const torpedoButton = document.getElementById('torpedo');
const resetButton = document.getElementById('reset');

const boardSize = 10;
let playerBoard = [];
let opponentBoard = [];
let playerTurn = true;
let torpedoes = 3;

function initBoard() {
    playerBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
    opponentBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
    placeShips(opponentBoard);
    renderBoards();
    messageElement.innerText = "Your turn!";
}

function placeShips(board) {
    // Simple ship placement logic (for demonstration)
    for (let i = 0; i < 5; i++) {
        let x = Math.floor(Math.random() * boardSize);
        let y = Math.floor(Math.random() * boardSize);
        board[x][y] = 1; // Place a ship
    }
}

function renderBoards() {
    playerBoardElement.innerHTML = '';
    opponentBoardElement.innerHTML = '';

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const playerCell = document.createElement('div');
            playerCell.classList.add('cell');
            playerCell.onclick = () => playerTurn && attackOpponent(i, j);
            playerBoardElement.appendChild(playerCell);

            const opponentCell = document.createElement('div');
            opponentCell.classList.add('cell');
            opponentCell.dataset.x = i;
            opponentCell.dataset.y = j;
            opponentBoardElement.appendChild(opponentCell);
        }
    }
}

function attackOpponent(x, y) {
    if (opponentBoard[x][y] === 1) {
        opponentBoard[x][y] = 2; // Hit
        messageElement.innerText = "Hit
