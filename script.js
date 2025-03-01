const body = document.querySelector("body");
const themeCheckbox = document.querySelector("#theme-checkbox");
const check = document.querySelector(".check");
const botn = document.querySelector(".botn");
const gameBoard = document.querySelector(".game-board");
const highestScore = document.querySelector(".highest-score");
const score = document.querySelector(".score");

body.classList.add("light-mode");
check.classList.add("light-mode");
botn.classList.add("light-mode");
gameBoard.classList.add("light-mode");
highestScore.classList.add("light-mode");
score.classList.add("light-mode");

function toggle() {
  check.classList.toggle("dark-mode");
  botn.classList.toggle("dark-mode");
  body.classList.toggle("dark-mode");
  gameBoard.classList.toggle("dark-mode");
  highestScore.classList.toggle("dark-mode");
  score.classList.toggle("dark-mode");
}

themeCheckbox.addEventListener("click", toggle);

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let generateFood = randomFoodPosition();
let currentScore = 0;
let highScore = localStorage.getItem("highest-score") || 0;
highestScore.innerHTML = `Highest ${highScore}`;

window.addEventListener("keydown", function (e) {
  const key = e.key;
  let newDirection;
  if (key === "ArrowUp") {
    newDirection = { x: 0, y: -1 };
  } else if (key === "ArrowDown") {
    newDirection = { x: 0, y: 1 };
  } else if (key === "ArrowLeft") {
    newDirection = { x: -1, y: 0 };
  } else if (key === "ArrowRight") {
    newDirection = { x: 1, y: 0 };
  }

  if (
    newDirection &&
    (newDirection.x !== -direction.x || newDirection.y !== -direction.y)
  ) {
    direction = newDirection;
  }
});

function randomFoodPosition() {
  let newFoodPosition;
  do {
    newFoodPosition = {
      x: Math.floor(Math.random() * 18 + 1),
      y: Math.floor(Math.random() * 18 + 1),
    };
  } while (
    snake.some(
      (segment) =>
        segment.x === newFoodPosition.x && segment.y === newFoodPosition.y
    )
  );
  return newFoodPosition;
}

function drawElement(position, className) {
  var element = document.createElement("div");
  element.style.gridRowStart = position.y;
  element.style.gridColumnStart = position.x;
  element.classList.add(className);
  gameBoard.appendChild(element);
}

function drawGame() {
  gameBoard.innerHTML = "";
  drawElement(generateFood, "food");

  for (let i = 0; i < snake.length; i++) {
    let item = snake[i];
    if (i === 0) {
      drawElement(item, "head");
    } else {
      drawElement(item, "tail");
    }
  }
}

function moveSnake() {
  let newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  if (
    newHead.x < 1 ||
    newHead.x > 18 ||
    newHead.y < 1 ||
    newHead.y > 18 ||
    snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    resetGame();
    return;
  }

  snake.unshift(newHead);

  if (newHead.x === generateFood.x && newHead.y === generateFood.y) {
    generateFood = randomFoodPosition();
    currentScore += 10;
    score.innerHTML = `Score ${currentScore}`;
    if (currentScore > highScore) {
      highScore = currentScore;
      localStorage.setItem("highest-score", highScore);
      highestScore.innerHTML = `Highest ${highScore}`;
    }
  } else {
    snake.pop();
  }
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  currentScore = 0;
  score.innerHTML = `Score ${currentScore}`;
}

setInterval(function () {
  drawGame();
  moveSnake();
}, 300);
