const parameterInput = document.getElementById("parameterInput");
const numberOne = document.getElementById("inputNumberOne");
const numberTwo = document.getElementById("inputNumberTwo");
const spaceString = "--------------------------";
const messageString = "message info: ";
const aString = "a) ";
const bString = "b) ";
const cString = "c) ";
const cWrongNumberOne = "b";
const cWrongNumberTwo = "z";
const bWrongString = "banana";
const firstBigger = "first number is bigger";
const secondBigger = "second number is bigger";
const wrongInput= "Wrong Input";
const goodString = "good";
const okString = "ok";
const incorrectMessage = "the message is incorrect";


//promise method
function checkParameter(parameter) {
    return new Promise((resolve, reject) => resolve(messageString + parameter));
}

function parameterPrintInOrderOne() {
    isStringGood(parameterInput.value).then((message) => console.log(bString + message)).catch((message) => console.log(bString + message));
    checkParameter(parameterInput.value).then((message) => console.log(aString + message));
    higherNumberCheck(numberOne.value, numberTwo.value).then((message) => console.log(cString + message));
    higherNumberCheck(numberOne.value, numberTwo.value).catch((message) => console.log(cString + message));
    console.log(spaceString);
}

function failParameterPrint() {
    higherNumberCheck(cWrongNumberOne, cWrongNumberTwo).then((message) => console.log(cString + message)).catch((message) => console.log(cString + message));
    isStringGood(bWrongString).then((message) => console.log(bString + message)).catch((message) => console.log(bString + message));
    console.log(spaceString);
}

function parameterPrintInOrderTwo() {
    checkParameter(parameterInput.value).then((message) => console.log(aString + message));
    isStringGood(parameterInput.value).then((message) => console.log(bString + message)).catch((message) => console.log(bString + message));;
    higherNumberCheck(numberOne.value, numberTwo.value).then((message) => console.log(cString + message));
    higherNumberCheck(numberOne.value, numberTwo.value).catch((message) => console.log(cString + message));
    console.log(spaceString);
}

function isStringGood(parameter) {
    return new Promise((resolve, reject) => {
        if (parameter === goodString) {
            resolve(okString);
        }
        else {
            reject(incorrectMessage);
        }
    });
}
 
function higherNumberCheck(num1, num2) {
    return new Promise((resolve, reject) => {
        if(!isNaN(num1) && !isNaN(num2)){
            if(num1 > num2){
                resolve(firstBigger);  
            }
            else if(num2 > num1){
                resolve(secondBigger);
            }
        }
        else{
            reject(wrongInput);
        }
    });
}


// async await method
async function asyncCheckParameter() {
    const result = await checkParameter(parameterInput.value);
    console.log(result);
}

async function asyncIsStringGood(parameter) {
    const result = await isStringGood(parameter);
    console.log(result);
}

async function asyncHigherNumberCheck(parameter1, parameter2) {
    const result = await higherNumberCheck(parameter1, parameter2)
    console.log(result);
}

function asyncParameterPrintInOrderOne() {
    asyncIsStringGood(parameterInput.value);
    asyncCheckParameter();
    asyncHigherNumberCheck(numberOne.value, numberTwo.value);
}

function asyncFailParameterPrint() {
    asyncHigherNumberCheck(cWrongNumberOne.value, cWrongNumberTwo.value);
    asyncIsStringGood(bWrongString.value);
}

function asyncParameterPrintInOrderTwo() {
    asyncCheckParameter();
    asyncIsStringGood(parameterInput.value);
    asyncHigherNumberCheck(numberOne.value, numberTwo.value);
}


//promise.all & promise.allSettled - method
function parameterPrintInOrderThree() {
    const promise1 = checkParameter(parameterInput.value);
    const promise2 = isStringGood(parameterInput.value);
    const promise3 = higherNumberCheck(numberOne.value, numberTwo.value);

    Promise.all([promise1, promise2, promise3]).then((values) => {
        console.log(values);
    }).catch((values) => {
        console.log(values);
    });
}

function parameterPrintInOrderFour() {
    const promise1 = checkParameter(parameterInput.value);
    const promise2 = isStringGood(parameterInput.value);
    const promise3 = higherNumberCheck(numberOne.value, numberTwo.value);

    Promise.all([promise2, promise1, promise3]).then((values) => {
        console.log(values);
    }).catch((values) => {
        console.log(values);
    });
}

function parameterPrintInOrderFive() {
    const promise2 = isStringGood(parameterInput.value);
    const promise3 = higherNumberCheck(numberOne.value, numberTwo.value);

    const promiseToSend = [promise2, promise3];

    const promisesResult = await Promise.allSettled(promiseToSend);
    console.log(promisesResult);
}