const court = document.getElementById('court');
const ball = document.getElementById('ball');
const leftPaddle = document.getElementById('leftPaddle');
const rightPaddle = document.getElementById('rightPaddle');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');

const courtWidth = 600;
const courtHeight = 400;
const paddleHeight = 80;
let ballX = courtWidth / 2;
let ballY = courtHeight / 2;
let ballSpeedX = 0;
let ballSpeedY = 0;
let leftScore = 0;
let rightScore = 0;
let gameInterval;
let leftPaddleSpeed = 0;
let rightPaddleSpeed = 0;

document.addEventListener('keydown', (event) => {
    if (event.key === 'Shift') leftPaddleSpeed = -4;
    if (event.key === 'Control') leftPaddleSpeed = 4;
    if (event.key === 'ArrowUp') rightPaddleSpeed = -4;
    if (event.key === 'ArrowDown') rightPaddleSpeed = 4;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Shift' || event.key === 'Control') leftPaddleSpeed = 0;
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') rightPaddleSpeed = 0;
});

startButton.addEventListener('click', () => {
    resetGame();
    startBall();
});

function resetGame() {
    clearInterval(gameInterval);
    ballX = courtWidth / 2;
    ballY = courtHeight / 2;
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
    ballSpeedX = Math.random() < 0.1 ? -2 : 2;
    ballSpeedY = (Math.random() - 0.1) * 2;
    scoreDisplay.innerText = `Левый(Blue): ${leftScore} | Правый(Red): ${rightScore}`;
    gameInterval = setInterval(updateGame, 20);
}

function startBall() {
    ballX = courtWidth / 2;
    ballY = courtHeight / 2;
    ballSpeedX = Math.random() < 0.1 ? -2 : 2;
    ballSpeedY = (Math.random() - 0.1) * 2;
}

function updateGame() {
    // Update paddles position
    const leftPaddleY = parseInt(leftPaddle.style.top || 0) + leftPaddleSpeed;
    const rightPaddleY = parseInt(rightPaddle.style.top || 0) + rightPaddleSpeed;
    leftPaddle.style.top = Math.max(0, Math.min(courtHeight - paddleHeight, leftPaddleY)) + 'px';
    rightPaddle.style.top = Math.max(0, Math.min(courtHeight - paddleHeight, rightPaddleY)) + 'px';

    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with paddles
    if (ballX <= 10 && ballY + 15 >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX >= courtWidth - 25 && ballY + 15 >= rightPaddleY && ballY <= rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball collision with top and bottom
    if (ballY <= 0 || ballY >= courtHeight - 15) {
        ballSpeedY = -ballSpeedY;
    }

    // Goal detection
    if (ballX <= 0) {
        rightScore++;
        resetGame();
} else if (ballX >= courtWidth) {
        leftScore++;
        resetGame();
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}