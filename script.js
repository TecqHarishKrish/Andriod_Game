const board = document.getElementById('board');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameBtn = document.getElementById('newGameBtn');
const gameContainer = document.getElementById('gameContainer');

let currentPlayer = 'X';
let cells = Array(9).fill('');
let gameActive = true;

function drawBoard() {
  board.innerHTML = '';
  cells.forEach((val, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.textContent = val;
    board.appendChild(cell);
  });
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      showResult(`${cells[a]} Wins! 🎉`);
      return;
    }
  }

  if (!cells.includes('')) {
    showResult("It's a Draw 🤝");
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  drawBoard();
  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function showResult(message) {
  gameActive = false;
  gameContainer.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  resultMessage.textContent = message;
}

function restartGame() {
  cells = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  drawBoard();
  status.textContent = `Player ${currentPlayer}'s turn`;
}

// New Game Button
newGameBtn.addEventListener('click', () => {
  restartGame();
  resultScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
});

// Restart Button (in main game screen)
restartBtn.addEventListener('click', restartGame);

// Board click
board.addEventListener('click', handleCellClick);

// Init
restartGame();
