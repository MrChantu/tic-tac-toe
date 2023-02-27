// Global variables
const BOARDCONTAINER = document.querySelector('#board-container');
const PLAYEROPTION = document.querySelector('#player-select');
const WINBOX = document.querySelector('#win-box');
const WINBOXTEXT = document.querySelector('#win-info');
const WINBUTTON = document.querySelector('#win-button');
let BOARDCELLS;
let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];
let player = PLAYEROPTION.value;
let enemy;
let isWon;

function createBoard() {
    // Generate the cells
    const CELLS = [];
    for (let i = 0; i < 9; i++) {
        const CELL = document.createElement('div');
        CELL.classList.add('board-cell');
        BOARDCONTAINER.appendChild(CELL);
        CELLS.push(CELL);
    }
    CELLS[0].classList.add('right', 'bottom');
    CELLS[1].classList.add('right', 'bottom');
    CELLS[2].classList.add('bottom');
    CELLS[3].classList.add('right', 'bottom');
    CELLS[4].classList.add('right', 'bottom');
    CELLS[5].classList.add('bottom');
    CELLS[6].classList.add('right');
    CELLS[7].classList.add('right');

    BOARDCELLS = document.querySelectorAll('.board-cell');
}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}

function updateBoard() {
    const gbLength = gameBoard.length;
    // Row 1
    for (let i = 0; i < gbLength; i++) {
        gameBoard[0][i] = BOARDCELLS[i].textContent;
    }
    // Row 2
    for (let i = 0; i < gbLength; i++) {
        gameBoard[1][i] = BOARDCELLS[i + 3].textContent;
    }
    // Row 3
    for (let i = 0; i < gbLength; i++) {
        gameBoard[2][i] = BOARDCELLS[i + 6].textContent;
    }
    checkForWin();
}

function renderBoard() {
    const gbLength = gameBoard.length;
    removeChildren(BOARDCONTAINER);
    createBoard();
    // Row 1
    for (let i = 0; i < gbLength; i++) {
        BOARDCELLS[i].textContent = gameBoard[0][i];
    }
    // Row 2
    for (let i = 0; i < gbLength; i++) {
        BOARDCELLS[i + 3].textContent = gameBoard[1][i];
    }
    // Row 3
    for (let i = 0; i < gbLength; i++) {
        BOARDCELLS[i + 6].textContent = gameBoard[2][i];
    }
}

function resetBoard() {
    // Remove any cells that exist
    removeChildren(BOARDCONTAINER);

    // Set array back to empty
    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];

    // Add back all cells to container
    createBoard();
    addCellListeners();
}

function addCellListeners() {
    BOARDCELLS.forEach((cell) => {
        cell.addEventListener('click', () => {
            if (cell.textContent != 'X' && cell.textContent != 'O') {
                // Set player input in box
                cell.textContent = player;
                updateBoard();
                // Set enemy input in box
                const EnemySpot = getEenmyInput();
                setEnemyInput(EnemySpot[0], EnemySpot[1]);
                updateBoard();
                //console.log(cell);
            }
        });
    });
}

function getEenmyInput() {
    const array = [];
    const gbLength = gameBoard.length;
    let Row = null;
    let Column = null;
    for (let i = 0; i < gbLength; i++) {
        for (let j = 0; j < 9; j++) {
            if (gameBoard[i][j] === '') {
                Row = i;
                Column = j;
                array.push(Row, Column);
                return array;
            }
        }
    }
}

function setEnemyInput(row, column) {
    const index = row * 3;
    if (player === 'X') {
        gameBoard[row][column] = 'O';
        BOARDCELLS[index + column].textContent = 'O';
    } else if (player === 'O') {
        gameBoard[row][column] = 'X';
        BOARDCELLS[index + column].textContent = 'X';
    }
}

function setWin(player) {
    isWon = true;
    WINBOXTEXT.textContent = `${player} wins!`;
    WINBOX.style.display = 'flex';
}

function changeEnemy() {
    if (player === 'X') {
        enemy = 'O';
    } else if (player === 'O') {
        enemy = 'X';
    }
}

function checkForWin() {
    const gbLength = gameBoard.length;
    // Check rows
    for (let i = 0; i < gbLength; i++) {
        if (
            gameBoard[i][0] === gameBoard[i][1] &&
            gameBoard[i][0] === gameBoard[i][2]
        ) {
            if (gameBoard[i][0] === player) {
                setWin(player);
            } else if (gameBoard[i][0] === enemy) {
                setWin(enemy);
            }
        }
    }
    // Check columns
    for (let i = 0; i < gbLength; i++) {
        if (
            gameBoard[0][i] === gameBoard[1][i] &&
            gameBoard[0][i] === gameBoard[2][i]
        ) {
            if (gameBoard[0][i] === player) {
                setWin(player);
            } else if (gameBoard[0][i] === enemy) {
                setWin(enemy);
            }
        }
    }
    // Check diagonally
    if (
        gameBoard[0][0] === gameBoard[1][1] &&
        gameBoard[0][0] === gameBoard[2][2]
    ) {
        if (gameBoard[0][0] === player) {
            setWin(player);
        } else if (gameBoard[0][0] === enemy) {
            setWin(enemy);
        }
    }
    if (
        gameBoard[0][2] === gameBoard[1][1] &&
        gameBoard[0][2] === gameBoard[2][0]
    ) {
        if (gameBoard[0][2] === player) {
            setWin(player);
        } else if (gameBoard[0][2] === enemy) {
            setWin(enemy);
        }
    }

    if (isWon === false) {
        let isTie = false;
        for (let i = 0; i < gbLength; i++) {
        for (let j = 0; j < gbLength; j++) {
            if (gameBoard[i][j] !== '') {
                isTie = true;
            } else {
                isTie = false;
            }
        }
        }
        if (isTie === true) {
            setWin("TIE");
        }
    }
}

function checkForTie() {
    let isTie = false;
    for (let i = 0; i < gbLength; i++) {
        for (let j = 0; j < gbLength; j++) {
            if (gameBoard[i][j] !== '') {
                isTie = true;
            } else {
                isTie = false;
            }
        }
    }
    if (isTie === true) {
        setWin("TIE");
    }
}

// Render everything for first startup
isWon = false;
createBoard();
addCellListeners();
changeEnemy();

// Event listeners
PLAYEROPTION.addEventListener('click', () => {
    player = PLAYEROPTION.value;
    resetBoard();
    changeEnemy();
});

WINBUTTON.addEventListener('click', () => {
    isWon = false;
    WINBOX.style.display = 'none';
    resetBoard();
});
