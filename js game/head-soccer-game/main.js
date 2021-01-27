import Player from "./player/player.js";
import inputHandler from "./player/inputHandler.js";
import Ball from "./ball/ball.js";
import { showSoccerItems, showScoreBar, showGameText } from "./gameUtiles.js";
import { charactersArray1, charactersArray2 } from "./players.js"

const canvas = document.getElementById("myCanvas");
const context = canvas.getContext('2d');
const resetButton = document.getElementById("resetScore");
const pauseButton = document.getElementById("pauseImage");
const backButton = document.getElementById("menuBack");
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
let playerImage1;
let playerImage2;
const ballImage = "images/ball/ball-lava.png";
const legImage1 = "images/leg/shoe-1.png";
const legImage2 = "images/leg/shoe-2.png";
const playerInfo1 = { x: GAME_WIDTH - 350, y: GAME_HEIGHT - 180, width: 100, height: 100, playerName: "player1" };
const playerInfo2 = { x: 250, y: GAME_HEIGHT - 180, width: 100, height: 100, playerName: "player2" };
const ballInfo = { x: GAME_WIDTH / 2 - 40, y: GAME_HEIGHT - 115, width: 35, height: 35 };
const playerKeys1 = { up: "ArrowUp", left: "ArrowLeft", right: "ArrowRight", kick: "Space" };
const playerKeys2 = { up: "KeyW", left: "KeyA", right: "KeyD", kick: "Digit1" };
const grassImage = new Image();
const backgroundImage = new Image();
const soccerNet = new Image();
const soccerNetTwo = new Image();
const timesUpText = new Image();
const player1 = new Player(GAME_WIDTH, GAME_HEIGHT, playerInfo1);
const player2 = new Player(GAME_WIDTH, GAME_HEIGHT, playerInfo2);
const ball = new Ball(GAME_WIDTH, GAME_HEIGHT, ballInfo);
const score1 = "score1";
const score2 = "score2";

let playerOneLeft = document.getElementById("playerOneLeft");
let playerOneRight = document.getElementById("playerOneRight");
let playerTwoLeft = document.getElementById("playerTwoLeft");
let playerTwoRight = document.getElementById("playerTwoRight");
let playerOneIndex = 28;
let playerTwoIndex = 17;

let scoreString = "";
let colorString = "";
let fontString = "";
let timesUpString = "";
let playerOneScored = false;
let playerTwoScored = false;
let startResertCount = false;
let onePlayerWins = false;
let gamePaused = false;
let scoreCount1 = 0;
let scoreCount2 = 0;
let gameStartTimer = 3;
let afterGoalTimer = 4;
let gameTimer = 60;
let RoundTime = 60;
let lastTime = 0;

grassImage.src = "images/ground/grass-ground.jpg";
backgroundImage.src = "images/background/crowd-5.jpg";
soccerNet.src = "images/soccer-net/soccer-net-1.png";
soccerNetTwo.src = "images/soccer-net/soccer-net-2.png";
timesUpText.src = "images/pause-images/pause-game.gif"
playerImage1 = charactersArray1[playerOneIndex];
playerImage2 = charactersArray2[playerTwoIndex];

resetButton.onclick = resetGame;
pauseButton.onclick = pauseGame;
backButton.onclick = backMenu;
playerOneLeft.onclick = playerOneLeftFunction;
playerOneRight.onclick = playerOneRightFunction;
playerTwoLeft.onclick = playerTwoLeftFunction;
playerTwoRight.onclick = playerTwoRightFunction;

new inputHandler(player1, playerKeys1);
new inputHandler(player2, playerKeys2);

function checkObjectsCollision(object1, object2) {
  if (object1.position.x < object2.position.x + object2.width && object1.position.x + object1.width > object2.position.x &&
    object1.position.y < object2.position.y + object2.height && object1.position.y + object1.height > object2.position.y) {
    return true;
  }
}

function checkPlayersSideCollision(player1, player2) {
  if (checkObjectsCollision(player1, player2)) {
    if (player1.position.y === player2.position.y || Math.abs(player1.position.y - player2.position.y) === 1) {
      if (player1.position.x > player2.position.x) {
        return "right side";
      }
      if (player1.position.x < player2.position.x) {
        return "left side";
      }
    }

    if (player1.position.y < player2.position.y) {
      return "up side";
    }

    if (player1.position.y > player2.position.y) {
      return "down side";
    }
  }
}

function doPlayersCollision(player1, player2) {
  if ((player1.speed != 0)) {
    if (checkPlayersSideCollision(player1, player2) === "right side") {
      player2.moveLeft();
      player2.backwardSpeed = true;
    }
    if (checkPlayersSideCollision(player1, player2) === "left side") {
      player2.moveRight();
      player2.backwardSpeed = true;
    }
  }
  if (!(player2.speed == 0)) {
    if (checkPlayersSideCollision(player1, player2) === "right side") {
      player1.moveRight();
      player1.backwardSpeed = true;
    }
    if (checkPlayersSideCollision(player1, player2) === "left side") {
      player1.moveLeft();
      player1.backwardSpeed = true;
    }
  }
  if (checkPlayersSideCollision(player1, player2) === "up side") {
    if (player1.position.y > player2.position.y - player1.height - 12) {
      player1.position.y = player2.position.y - player1.height - 12;
      player1.onPlatform = true;
    }
  }
  if (checkPlayersSideCollision(player1, player2) === "down side") {
    if (player2.position.y > player1.position.y - player2.height - 12) {
      player2.position.y = player1.position.y - player2.height - 12;
      player2.onPlatform = true;
    }
  }
  if (player1.position.y > GAME_HEIGHT - 180) {
    player1.position.y = GAME_HEIGHT - 180 - 15;
    player1.onPlatform = true;
  }
  if (player2.position.y > GAME_HEIGHT - 180) {
    player2.position.y = GAME_HEIGHT - 180 - 15;
    player2.onPlatform = true;
  }
  objectsWallCollision(player1, player2, ball);
}

function objectsWallCollision(player1, player2, ball) {

  if (player1.position.x > GAME_WIDTH - 305 && player1.position.y < GAME_HEIGHT - 330) {
    player1.position.y = GAME_HEIGHT - 330;
  }
  if (player1.position.x < 175 && player1.position.y < GAME_HEIGHT - 330) {
    player1.position.y = GAME_HEIGHT - 330;
  }
  if (player2.position.x > GAME_WIDTH - 305 && player2.position.y < GAME_HEIGHT - 330) {
    player2.position.y = GAME_HEIGHT - 330;
  }
  if (player2.position.x < 175 && player2.position.y < GAME_HEIGHT - 330) {
    player2.position.y = GAME_HEIGHT - 330;
  }
  if (ball.position.x + ball.width > GAME_WIDTH - 35) {
    ball.position.x = GAME_WIDTH - 25 - ball.width;
  }
  if (ball.position.x < 25) {
    ball.position.x = 25;
  }

  if (ball.position.x < 175 && ball.position.y < GAME_HEIGHT - 330 && ball.position.y > GAME_HEIGHT - 380) {
    ball.position.y = GAME_HEIGHT - 330;
  }
  if (ball.position.x < 175 && ball.position.y + ball.height < GAME_HEIGHT - 330 && ball.position.y + ball.height > GAME_HEIGHT - 380) {
    ball.position.y = GAME_HEIGHT - 420;
    ball.moveRight();
  }
  if (ball.position.x > GAME_WIDTH - 285 && ball.position.y < GAME_HEIGHT - 330 && ball.position.y > GAME_HEIGHT - 380) {
    ball.position.y = GAME_HEIGHT - 330;
  }
  if (ball.position.x > GAME_WIDTH - 305 && ball.position.y + ball.height < GAME_HEIGHT - 330 && ball.position.y + ball.height > GAME_HEIGHT - 380) {
    ball.position.y = GAME_HEIGHT - 420;
    ball.moveLeft();
  }
  if (ball.position.y < 55) {
    ball.position.y = 55;
  }
}

function checkBallSideCollision(player, ball) {
  if (checkObjectsCollision(player, ball)) {

    if (ball.position.y + ball.height === player.position.y + player.height || Math.abs((ball.position.y + ball.height) - (player.position.y + player.height)) < 20) {
      if (player.position.x + player.width > ball.position.x + ball.width) {
        return "right side";
      }
      if (player.position.x < ball.position.x + ball.width) {
        return "left side";
      }
    }

    if (player.position.y + player.height < ball.position.y + ball.height) {
      return "up side";
    }
    if (player.position.y + player.height > ball.position.y + ball.height) {
      return "down side";
    }
  }
  return "none";
}

function doBallCollision(player1, ball, player2) {
  if (checkBallSideCollision(player1, ball) === "left side" && checkBallSideCollision(player2, ball) === "right side") {
    player1.moveLeft();
    player1.backwardSpeed = true;
    player2.moveRight();
    player2.backwardSpeed = true;
    return;
  }
  if (checkBallSideCollision(player1, ball) === "right side" && checkBallSideCollision(player2, ball) === "left side") {
    player2.moveLeft();
    player2.backwardSpeed = true;
    player1.moveRight();
    player1.backwardSpeed = true;
    return;
  }
  if (checkBallSideCollision(player1, ball) === "right side" && (checkBallSideCollision(player2, ball) === "none")) {
    ball.moveLeft();
    ball.backwardSpeed = true;
  }
  if (checkBallSideCollision(player1, ball) === "left side" && (checkBallSideCollision(player2, ball) === "none")) {
    ball.moveRight();
    ball.backwardSpeed = true;
  }
  if (checkBallSideCollision(player1, ball) === "up side") {
    if (player1.position.y > ball.position.y - player1.height - 12) {
      player1.position.y = ball.position.y - player1.height - 12;
      player1.onPlatform = true;
    }
  }
  if (checkBallSideCollision(player1, ball) === "down side") {
    ball.position.y = player1.position.y - ball.height;
    ball.backwardSpeed = true;
    ball.speed = 0;
  }
}

function doAllCollision() {
  doBallCollision(player1, ball, player2);
  doBallCollision(player2, ball, player1);
  doPlayersCollision(player1, player2);
}

function kickSystem() {
  ball.backwardSpeed = false;
  let player1Shoe;
  let player2Shoe;

  player2Shoe = {
    position: {
      x: player2.position.x + player2.width,
      y: player2.position.y + (player2.height / 2) + 30
    }, width: player2.width / 4, height: player2.height / 7
  }

  player1Shoe = {
    position: {
      x: player1.position.x - 30,
      y: player1.position.y + (player1.height / 2) + 30
    }, width: player1.width / 4, height: player1.height / 7
  }

  if ((player1.kicking && (checkObjectsCollision(player1Shoe, ball))) || (player2.kicking && (checkObjectsCollision(player2Shoe, ball)))) {

    if (player1.kicking) {
      ball.backwardSpeed = false;
      ball.moveLeft();

    }
    if (player2.kicking) {
      ball.backwardSpeed = false;
      ball.moveRight();

    }
    ball.moveUp();
  }

  if (player1.kicking && checkObjectsCollision(player1Shoe, player2)) {
    player2.moveLeft();
    player2.backwardSpeed = true;
  }

  if ((player2.kicking && (checkObjectsCollision(player2Shoe, player1)))) {
    player1.moveRight();
    player1.backwardSpeed = true;
  }

  if (ball.position.y > GAME_HEIGHT - 115) {
    ball.position.y = GAME_HEIGHT - 115 - 28;
    ball.backwardSpeed = true;
  }

}

function scoreSystem() {
  if (ball.position.x > GAME_WIDTH - 195 && ball.position.y > GAME_HEIGHT - 330 && !playerTwoScored && !startResertCount) {
    playerTwoScored = true;
    scoreCount2++;
    localStorage.setItem(score2, scoreCount2);
    afterGoalTimer = 4;
    startResertCount = true;
  }

  if (ball.position.x > 175 && playerOneScored) {
    playerOneScored = false;
  }

  if (ball.position.x < 175 && ball.position.y > GAME_HEIGHT - 330 && !playerOneScored && !startResertCount) {
    playerOneScored = true;
    scoreCount1++;
    afterGoalTimer = 4;
    startResertCount = true;
    localStorage.setItem(score1, scoreCount1);
  }

  if (afterGoalTimer === 0 && startResertCount) {
    resetObjects();
  }

  if (playerOneScored) {
    scoreString = "Player 1 Scored!";
    colorString = "blue";
  }
  else if (playerTwoScored) {
    scoreString = "Player 2 Scored!";
    colorString = "red";
  }

  if (!startResertCount) {
    scoreString = "";
  }

  if (ball.position.x < 1295 && playerTwoScored) {
    playerTwoScored = false;
  }

  if (scoreCount1 === 10) {
    scoreString = "Player 1 Wins!!";
    colorString = "purple";
    onePlayerWins = true;
    gameTimer = "00";
    gameStartTimer = -1;
  }
  else if (scoreCount2 === 10) {
    scoreString = "Player 2 Wins!!";
    colorString = "purple";
    onePlayerWins = true;
    gameTimer = -1;
    gameStartTimer = 0;
  }

  if (gameStartTimer < -RoundTime && gameStartTimer > -(RoundTime + 6)) {
    fontString = "200x Arial";
    timesUpString = "TIME'S UP!!";
    colorString = "yellow";
    startResertCount = true;
  }
}

function resetGame() {
  localStorage.clear();
  localStorage.setItem(score1, 0);
  localStorage.setItem(score2, 0);
  resetObjects();
  scoreCount1 = 0;
  scoreCount2 = 0;
  gameStartTimer = 3;
  afterGoalTimer = 4;
}

function pauseGame() {
  if (gamePaused) {
    gamePaused = false;
  }
  else {
    gamePaused = true;
    context.drawImage(timesUpText, GAME_WIDTH / 2 - 170, 135, 300, 300);
  }
  requestAnimationFrame(gameLoop);
}

function resetSpeeds() {
  player1.maxSpeed = 0;
  player1.maxJumpSpeed = 0;
  player1.speed = 0;
  player1.jumpSpeed = 0;
  player2.maxSpeed = 0;
  player2.maxJumpSpeed = 0;
  player2.speed = 0;
  player2.jumpSpeed = 0;
}

function resetObjects() {
  player1.position.x = GAME_WIDTH - 350;
  player2.position.x = 250;
  player1.position.y = GAME_HEIGHT - 180;
  player2.position.y = GAME_HEIGHT - 180;
  ball.position.x = GAME_WIDTH / 2 - 40;
  ball.position.y = GAME_HEIGHT - 115;
  resetSpeeds();
  gameStartTimer = 3;
  gameTimer = 60;
  startResertCount = false;
  afterGoalTimer = 4;
}

function backMenu() {
  window.location.replace('http://127.0.0.1:5500/game-login.html');
}

function playerOneLeftFunction() {
  playerTwoIndex++;
  playerImage2 = charactersArray2[playerTwoIndex];
  if (playerTwoIndex > charactersArray2.length) playerTwoIndex = 0;
}

function playerOneRightFunction() {
  playerTwoIndex--;
  playerImage2 = charactersArray2[playerTwoIndex];
  if (playerTwoIndex < 0) playerTwoIndex = charactersArray2.length;
}

function playerTwoLeftFunction() {
  playerOneIndex++;
  playerImage1 = charactersArray1[playerOneIndex];
  if (playerOneIndex > charactersArray1.length) playerOneIndex = 0;
}

function playerTwoRightFunction() {
  playerOneIndex--;
  playerImage1 = charactersArray1[playerOneIndex];
  if (playerOneIndex < 0) playerOneIndex = charactersArray1.length;
}

resetGame();

function gameLoop(timestamp) {
  if (!gamePaused) {
    let deltaTime = timestamp - lastTime;
    context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    showScoreBar(context, backgroundImage, GAME_WIDTH, GAME_HEIGHT);
    showGameText(context, GAME_WIDTH, GAME_HEIGHT, score1, gameTimer, score2, grassImage, scoreString, colorString, timesUpString, fontString)

    if (gameStartTimer > 0) {
      resetSpeeds();
      context.fillText(gameStartTimer, GAME_WIDTH / 2 - 35, 120);
    }
    else if (gameStartTimer === 0) {
      context.fillStyle = "lightgreen";
      context.fillText("GO!!", GAME_WIDTH / 2 - 65, 120);
      player1.maxSpeed = 10;
      player1.maxJumpSpeed = 16;
      player2.maxSpeed = 10;
      player2.maxJumpSpeed = 16;
    }
    if (deltaTime > 1000) {
      gameStartTimer--;
      lastTime = timestamp;

      if (startResertCount && !onePlayerWins) {
        afterGoalTimer--;
        timesUpString = "";
      }
    }
    if (deltaTime > 1000 && gameStartTimer < 0 && gameStartTimer > -(RoundTime + 1) && !startResertCount) {
      gameTimer--;
    }

    player1.update(deltaTime);
    player1.draw(context, playerImage1, legImage1);
    player2.update(deltaTime);
    player2.draw(context, playerImage2, legImage2);
    ball.update(deltaTime);
    ball.draw(context, ballImage);
    showSoccerItems(GAME_HEIGHT, GAME_WIDTH, context, soccerNet, soccerNetTwo, grassImage);
    scoreSystem();
    doAllCollision();
    kickSystem();

    requestAnimationFrame(gameLoop);
  }
}
gameLoop();