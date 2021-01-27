const fibonacciStr = document.getElementById("fibonacciSeries");
const fibonacciInput = document.getElementById("input");
const canvas = document.getElementById("myCanvas");
const fibonacciButton = document.getElementById("fibonacciButton");
const rangeSize = document.getElementById('sizeSlider');
const rangeAmount = document.getElementById('amountSlider');
const limitAmountZero = 0;
const limitAmountOne = 1;
const limitAmountTwo = 2;
const result = "There's no amount of number in the series";
let sizeRangeValue = rangeAmount.value;

function showcaseFibonacciSeries(seriesNumber) {
  let fibonacciArray;

  switch (seriesNumber){
    case limitAmountZero:
      return result;
    case limitAmountOne:
      return [1];
    case limitAmountTwo:
      return [1, 1];
}
  fibonacciArray = showcaseFibonacciSeries(seriesNumber - 1);
  fibonacciArray.push(fibonacciArray[fibonacciArray.length - 1] + fibonacciArray[fibonacciArray.length - 2]);

  return fibonacciArray;
}

function showFibonacciSeries() {
  fibonacciStr.innerHTML = "Fibonacci series result: " + showcaseFibonacciSeries(Number(fibonacciInput.value));
}

createBlackTriangle(Number(rangeSize.value), Number(rangeAmount.value));

function createBlackTriangle(size, amount) {
  const colorString = "black";
  let context = canvas.getContext("2d");
  let halfOfSideLength = (size / 2);
  let topBlackX = halfOfSideLength;
  let leftBlackX = 0;
  let rightBlackX = size;
  let topBlackY = 0;
  let leftBlackY = size;
  let rightBlackY = size;

  context.beginPath();
  context.moveTo(topBlackX, topBlackY);
  context.lineTo(leftBlackX, leftBlackY);
  context.lineTo(rightBlackX, rightBlackY);
  context.closePath();
  context.fillStyle = colorString;
  context.fill();

  createWhiteTriangle(topBlackX, topBlackY, leftBlackX, leftBlackY, rightBlackX, rightBlackY, amount);
}

function createWhiteTriangle(topBlackX, topBlackY, leftBlackX, leftBlackY, rightBlackX, rightBlackY, number) {
  const triangleRatio = 2;
  const colorString = "white";

  if (number < 1){
    return;
  }
  
  let context = canvas.getContext('2d');
  let whiteTopBlackX = (topBlackX + leftBlackX) / triangleRatio;
  let whiteTopBlackY = (topBlackY + leftBlackY) / triangleRatio;
  let whiteLeftBlackX = (leftBlackX + rightBlackX) / triangleRatio;
  let whiteLeftBlackY = (leftBlackY + rightBlackY) / triangleRatio;
  let whiteRightBlackX = (rightBlackX + topBlackX) / triangleRatio;
  let whiteRightBlackY = (rightBlackY + topBlackY) / triangleRatio;

  context.beginPath();
  context.moveTo(whiteTopBlackX, whiteTopBlackY);
  context.lineTo(whiteLeftBlackX, whiteLeftBlackY);
  context.lineTo(whiteRightBlackX, whiteRightBlackY);
  context.closePath();
  context.stroke();
  context.fillStyle = colorString;
  context.fill();

  createWhiteTriangle(whiteTopBlackX, whiteTopBlackY, leftBlackX, rightBlackY, whiteLeftBlackX, whiteLeftBlackY, number - 1);
  createWhiteTriangle(whiteRightBlackX, whiteRightBlackY, whiteLeftBlackX, whiteLeftBlackY, rightBlackX, rightBlackY, number - 1);
  createWhiteTriangle(topBlackX, topBlackY, whiteTopBlackX, whiteTopBlackY, whiteRightBlackX, whiteRightBlackY, number - 1);
}

function trianglesSize() {
  let context = canvas.getContext('2d');
  
  context.clearRect(0, 0, canvas.width, canvas.height);
  createBlackTriangle(Number(rangeSize.value), Number(rangeAmount.value));
}

function trianglesAmount() {
  let context = canvas.getContext('2d');

  context.clearRect(0, 0, canvas.width, canvas.height);
  createBlackTriangle(Number(rangeSize.value), Number(rangeAmount.value));
}