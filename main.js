'use strict';

const documentElement = document;
const columns = Array.from(documentElement.querySelectorAll('.board > span'));
const resetButton = documentElement.querySelector('#reset');

let currentPlayerIsX = true;
let gameBoard = new Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
  [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

function handleEvent(canListen) {
  resetButton.addEventListener('click', resetGame);
  
  for (let column of columns) {
    if (canListen) {
      column.addEventListener('click', makeMove);
    } else {
      column.removeEventListener('click', makeMove);
    }
  }
}

handleEvent(true);

function makeMove(event) {
  const clickedCell = event.target;

  if (!clickedCell.innerHTML) {
    currentPlayerIsX = !currentPlayerIsX;
    clickedCell.innerHTML = currentPlayerIsX ? '<h1 name="O">O</h1>' : '<h1 name="X">X</h1>';
    updateGameState(parseInt(clickedCell.id.split(/\D+/g)[1]), clickedCell.childNodes[0].getAttribute('name'));
  }
}

function updateGameState(index, playerSymbol) {
  gameBoard[index] = playerSymbol;
  console.log(gameBoard);

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    
    if (checkWinningCondition(gameBoard[a], gameBoard[b], gameBoard[c])) {
      console.log(playerSymbol, ' wins');
      handleEvent(false);
      columns[a].classList.add('win');
      columns[b].classList.add('win');
      columns[c].classList.add('win');
    }
  }
}

function checkWinningCondition(cellA, cellB, cellC) {
  if (cellA && cellB && cellC) {
    return (cellA === cellB) && (cellA === cellC) && (cellB === cellC);
  }
}

function resetGame() {
  for (let column of columns) {
    column.classList.remove('win');
    column.innerHTML = '';
  }
  
  gameBoard = new Array(9).fill(null);
  handleEvent(true);
}
