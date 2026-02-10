// Tic-Tac-Toe game logic (bot + local 2-player)
const cells = Array.from(document.querySelectorAll('.ttt-cell'));
const statusEl = document.getElementById('ttt-status');
const resetBtn = document.getElementById('ttt-reset');
const modeButtons = document.querySelectorAll('.mode-btn');

const symbols = {
    human: '❤',
    other: '✨'
};

const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let board = Array(9).fill('');
let currentPlayer = symbols.human;
let gameOver = false;
let mode = 'bot';

function setStatus(message) {
    statusEl.textContent = message;
}

function updateModeButtons() {
    modeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
}

function updateTurnStatus() {
    if (gameOver) return;
    if (mode === 'bot') {
        if (currentPlayer === symbols.human) {
            setStatus(`Your turn ${symbols.human}`);
        } else {
            setStatus(`Sweet bot thinking ${symbols.other}`);
        }
    } else {
        const playerNumber = currentPlayer === symbols.human ? 'Player 1' : 'Player 2';
        setStatus(`${playerNumber} turn ${currentPlayer}`);
    }
}

function resetBoard() {
    board = Array(9).fill('');
    currentPlayer = symbols.human;
    gameOver = false;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('filled');
        cell.disabled = false;
    });
    updateTurnStatus();
}

function checkWin(player) {
    return wins.some(pattern => pattern.every(index => board[index] === player));
}

function checkDraw() {
    return board.every(cell => cell);
}

function endGame(winner) {
    gameOver = true;
    if (!winner) {
        setStatus('It’s a draw — still a lovely tie.');
        return;
    }

    if (mode === 'bot') {
        setStatus(winner === symbols.human
            ? 'You win! Your love shines brightest.'
            : 'The bot won, but my heart is yours.');
    } else {
        setStatus(`${winner} wins! A sweet little victory.`);
    }
}

function makeMove(index, player) {
    board[index] = player;
    const cell = cells[index];
    cell.textContent = player;
    cell.classList.add('filled', 'pop');
    cell.disabled = true;
    cell.addEventListener('animationend', () => cell.classList.remove('pop'), { once: true });
}

function getAvailableMoves() {
    return board
        .map((value, index) => (value ? null : index))
        .filter(index => index !== null);
}

// Simple bot: win, block, center, corner, random
function getBestMove(botSymbol, humanSymbol) {
    const available = getAvailableMoves();

    for (const index of available) {
        board[index] = botSymbol;
        if (checkWin(botSymbol)) {
            board[index] = '';
            return index;
        }
        board[index] = '';
    }

    for (const index of available) {
        board[index] = humanSymbol;
        if (checkWin(humanSymbol)) {
            board[index] = '';
            return index;
        }
        board[index] = '';
    }

    if (available.includes(4)) return 4;

    const corners = available.filter(index => [0, 2, 6, 8].includes(index));
    if (corners.length) return corners[Math.floor(Math.random() * corners.length)];

    return available[Math.floor(Math.random() * available.length)];
}

function botMove() {
    if (gameOver) return;
    const move = getBestMove(symbols.other, symbols.human);
    makeMove(move, symbols.other);

    if (checkWin(symbols.other)) {
        endGame(symbols.other);
        return;
    }

    if (checkDraw()) {
        endGame(null);
        return;
    }

    currentPlayer = symbols.human;
    updateTurnStatus();
}

function handleCellClick(event) {
    if (gameOver) return;
    const index = Number(event.currentTarget.dataset.index);
    if (board[index]) return;

    makeMove(index, currentPlayer);

    if (checkWin(currentPlayer)) {
        endGame(currentPlayer);
        return;
    }

    if (checkDraw()) {
        endGame(null);
        return;
    }

    currentPlayer = currentPlayer === symbols.human ? symbols.other : symbols.human;
    updateTurnStatus();

    if (mode === 'bot' && currentPlayer === symbols.other) {
        setTimeout(botMove, 450);
    }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetBoard);
modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        mode = btn.dataset.mode;
        updateModeButtons();
        resetBoard();
    });
});

updateModeButtons();
resetBoard();
