// Game constants
const GRID_SIZE = 20;
const GRID_WIDTH = 15;
const GRID_HEIGHT = 15;

// Snake constants
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 10;
const INITIAL_DIRECTION = 'right';

// Initialize game variables
let snake = [{ x: 5, y: 5 }];
let direction = INITIAL_DIRECTION;
let food = generateFood();
let score = 0;
let speed = INITIAL_SPEED;
let gameOver = false;

// Get game board and snake elements
const gameBoard = document.getElementById('game-board');
const snakeElement = document.getElementById('snake');
const foodElement = document.getElementById('food');

// Listen for arrow key presses
document.addEventListener('keydown', changeDirection);

// Start the game loop
const gameLoop = setInterval(move, speed);

// Move the snake
function move() {
    if (gameOver) {
        clearInterval(gameLoop);
        alert('Game Over! Your Score: ' + score);
        return;
    }

    const headX = snake[0].x;
    const headY = snake[0].y;

    // Move the snake in the current direction
    if (direction === 'right') {
        snake.unshift({ x: headX + 1, y: headY });
    } else if (direction === 'left') {
        snake.unshift({ x: headX - 1, y: headY });
    } else if (direction === 'up') {
        snake.unshift({ x: headX, y: headY - 1 });
    } else if (direction === 'down') {
        snake.unshift({ x: headX, y: headY + 1 });
    }

    // Check for collisions
    if (checkCollision()) {
        gameOver = true;
    }

    // Check if the snake ate the food
    if (headX === food.x && headY === food.y) {
        score++;
        speed -= SPEED_INCREMENT;
        food = generateFood();
    } else {
        // Remove the tail segment
        snake.pop();
    }

    // Update the game board
    updateBoard();
}

// Update the game board
function updateBoard() {
    // Clear the board
    snakeElement.style.display = 'none';
    foodElement.style.display = 'none';

    // Update the snake
    snakeElement.style.left = snake[0].x * GRID_SIZE + 'px';
    snakeElement.style.top = snake[0].y * GRID_SIZE + 'px';
    snakeElement.style.display = 'block';

    // Update the food
    foodElement.style.left = food.x * GRID_SIZE + 'px';
    foodElement.style.top = food.y * GRID_SIZE + 'px';
    foodElement.style.display = 'block';
}

// Generate a random position for the food
function generateFood() {
    let foodX, foodY;
    do {
        foodX = Math.floor(Math.random() * GRID_WIDTH);
        foodY = Math.floor(Math.random() * GRID_HEIGHT);
    } while (snake.some(segment => segment.x === foodX && segment.y === foodY));
    return { x: foodX, y: foodY };
}

// Check for collisions
function checkCollision() {
    const headX = snake[0].x;
    const headY = snake[0].y;

    // Check if the snake hits the wall
    if (
        headX < 0 ||
        headX >= GRID_WIDTH ||
        headY < 0 ||
        headY >= GRID_HEIGHT
    ) {
        return true;
    }

    // Check if the snake hits itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === headX && snake[i].y === headY) {
            return true;
        }
    }

    return false;
}

// Change the direction of the snake
function changeDirection(event) {
    const key = event.key;
    if (
        (key === 'ArrowUp' && direction !== 'down') ||
        (key === 'ArrowDown' && direction !== 'up') ||
        (key === 'ArrowLeft' && direction !== 'right') ||
        (key === 'ArrowRight' && direction !== 'left')
    ) {
        direction = key.toLowerCase().replace('arrow', '');
    }
}
