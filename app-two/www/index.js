function startCountdown() {
    var seconds = 30;
    var timerElement = document.getElementById('timer');

    function updateTimer() {
        timerElement.textContent = `00:${seconds}`;
        seconds--;

        if (seconds < 0) {
            alert("Время вышло! Ваши очки: " + score);
            clearInterval(intervalId);
        }
    }
    updateTimer();
    var intervalId = setInterval(updateTimer, 1000);
}
startCountdown()

setInterval(function () {
    location.reload();
}, 30000);
const gridSize = 20;
const snake = [{ x: 10, y: 10 }];
let direction = "right";
const fruit = { x: getRandomNumber(), y: getRandomNumber() };
const speed = 200;
let score = 0;
const gameBoard = document.getElementById("game-board");
const scoreElement = document.getElementById("score");
const obstacles = [];

var restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", function () {
    restartGame();
});

function getRandomNumber() {
    return Math.floor((Math.random() * gridSize));
}

function drawGameBoard() {
    gameBoard.innerHTML = "";

    for (var x = 0; x < gridSize; x++) {
        for (var y = 0; y < gridSize; y++) {
            var cell = document.createElement("div");
            cell.style.width = cell.style.height = (100 / gridSize) + "%";
            cell.style.position = "absolute";
            cell.style.top = (y * (100 / gridSize)) + "%";
            cell.style.left = (x * (100 / gridSize)) + "%";
            cell.style.border = "1px #ffffff";

            if (isSnake(x, y)) {
                cell.className = "snake";
            } else if (isFruit(x, y)) {
                cell.className = "fruit";
            } else if (isObstacle(x, y)) {
                cell.className = "obstacle";
            }

            gameBoard.appendChild(cell);
        }
    }
}

function isSnake(x, y) {
    for (var i = 0; i < snake.length; i++) {
        if (snake[i].x === x && snake[i].y === y) {
            return true;
        }
    }
    return false;
}

function isFruit(x, y) {
    return fruit.x === x && fruit.y === y;
}

function isObstacle(x, y) {
    for (var i = 0; i < obstacles.length; i++) {
        if (obstacles[i].x === x && obstacles[i].y === y) {
            return true;
        }
    }
    return false;
}

function moveSnake() {
    var head = { x: snake[0].x, y: snake[0].y };

    if (direction === "up") {
        head.y--;
    } else if (direction === "down") {
        head.y++;
    } else if (direction === "left") {
        head.x--;
    } else if (direction === "right") {
        head.x++;
    }

    if (isCollision(head)) {
        endGame();
        return;
    }

    snake.unshift(head);

    if (isFruit(head.x, head.y)) {
        score++;
        scoreElement.innerHTML = "Очки: " + score;
        generateFruit();
        if (score % 5 === 0) {
            generateObstacle();
        }
    } else {
        snake.pop();
    }

    drawGameBoard();

    setTimeout(moveSnake, speed);
}

function isCollision(head) {
    return (
        head.x < 0 ||
        head.x >= gridSize ||
        head.y < 0 ||
        head.y >= gridSize ||
        isSnake(head.x, head.y) ||
        isObstacle(head.x, head.y)
    );
}

function generateFruit() {
    fruit.x = getRandomNumber();
    fruit.y = getRandomNumber();
}

function generateObstacle() {
    obstacles.push({ x: getRandomNumber(), y: getRandomNumber() });
}

function endGame() {
    alert("Игра окончена! Ваши очки: " + score);
    restartGame();
}

function restartGame() {
    location.reload()
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    } else if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    } else if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    } else if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }
});

drawGameBoard();
moveSnake();