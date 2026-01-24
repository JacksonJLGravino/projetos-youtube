const buttons = ["green", "red", "yellow", "blue"];

const sounds = {
  green: new Audio("sounds/green.mp3"),
  red: new Audio("sounds/red.mp3"),
  yellow: new Audio("sounds/yellow.mp3"),
  blue: new Audio("sounds/blue.mp3"),
};

let gameSequence = [];
let userSequence = [];
let level = 0;
let canClick = false;

const levelText = document.getElementById("level");
const messageText = document.getElementById("message");
const startButton = document.getElementById("start");

startButton.addEventListener("click", startGame);

buttons.forEach((color) => {
  document
    .getElementById(color)
    .addEventListener("click", () => handleUserClick(color));
});

function startGame() {
  gameSequence = [];
  level = 0;
  messageText.textContent = "";
  nextRound();
}

function nextRound() {
  level++;
  levelText.textContent = level;
  userSequence = [];
  canClick = false;

  const randomColor = buttons[Math.floor(Math.random() * buttons.length)];
  gameSequence.push(randomColor);

  playSequence();
}

function playSequence() {
  let i = 0;

  const interval = setInterval(() => {
    activateButton(gameSequence[i]);
    i++;

    if (i >= gameSequence.length) {
      clearInterval(interval);
      canClick = true;
    }
  }, 800);
}

function activateButton(color) {
  const button = document.getElementById(color);

  button.classList.add("active");

  sounds[color].currentTime = 0;
  sounds[color].play();

  setTimeout(() => {
    button.classList.remove("active");
  }, 400);
}

function handleUserClick(color) {
  if (!canClick) return;

  userSequence.push(color);
  activateButton(color);

  const index = userSequence.length - 1;

  if (userSequence[index] !== gameSequence[index]) {
    gameOver();
    return;
  }

  if (userSequence.length === gameSequence.length) {
    setTimeout(nextRound, 1000);
  }
}

function gameOver() {
  messageText.textContent =
    "Game Over! Clique em iniciar para tentar novamente.";
  canClick = false;
}
