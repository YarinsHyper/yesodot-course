import { charactersArray1, charactersArray2 } from "./players.js"

let player1Image = document.getElementById("player-image-1");
let player2Image = document.getElementById("player-image-2");
let player2Left = document.getElementById("player2ButtonLeft");
let player2Right = document.getElementById("player2ButtonRight");
let player1Left = document.getElementById("player1ButtonLeft");
let player1Right = document.getElementById("player1ButtonRight");
let buttonPlay = document.getElementById("play-button");
let playerIndex1 = 0;
let playerIndex2 = 0;

let image1 = new Image();
let image2 = new Image();

image1.src = charactersArray1[playerIndex1];
image2.src = charactersArray2[playerIndex2];

player1Image = image1;
player2Image = image2;

player1Left.onclick = playerOneLeftButton;
player1Right.onclick = playerOneRightButton;
player2Left.onclick = playerTwoLeftButton;
player2Right.onclick = playerTwoRightButton;
buttonPlay.onclick = playButton;

function playerTwoRightButton() {
    playerIndex2++;
    image2.src = charactersArray2[playerIndex2];
    if (playerIndex2 > charactersArray2.length) playerIndex2 = 0;
}

function playerTwoLeftButton() {
    playerIndex2--;
    image2.src = charactersArray2[playerIndex2];
    if (playerIndex2 < 0) playerIndex2 = charactersArray2.length;
}

function playerOneRightButton() {
    playerIndex1++;
    image1.src = charactersArray1[playerIndex1];
    if (playerIndex1 > charactersArray1.length) playerIndex1 = 0;
}

function playerOneLeftButton() {
    playerIndex1--;
    image1.src = charactersArray1[playerIndex1];
    if (playerIndex1 < 0) playerIndex1 = charactersArray1.length;
}

function playButton() {
    window.location = "http://127.0.0.1:5500/head-soccer-game/index.html";
}

export let playerOne = "images/characters/player-1/character14.png";
export let playerTwo = "images/characters/player-2/character18.png";