//node jokes
const fs = require("fs");
const fsPromises = fs.promises;

const dotenv = require("dotenv");
dotenv.config();
const jokeSubject = process.env.JOKE_SUBJECT;
const jokeAmount = process.env.JOKE_AMOUNT;

let oneLinerJoke = require('one-liner-joke');
let filteredJokesArray = [];
let jokesArray = [];
let dupedJokes = 0;
let getRandomJokeWithTag;

function moveJokesToArray() {
    let arrayLength = jokeAmount - jokesArray.length;
    let isDuplicated;
    if (arrayLength === 0) { return; }

    for (let jokeIndex = 0; jokeIndex < arrayLength; jokeIndex++) {
        makeRandomJoke();
        isDuplicated = false;
        if (jokesArray.length === 0) {
            pushRandomJoke(jokesArray);
        }
        else {
            pushRandomJoke(jokesArray);
        }
    }
    moveJokesToArray();
}

function pushRandomJoke(jokesArray) {
    makeRandomJoke();
    jokesArray.push(getRandomJokeWithTag.body + " \n");
}

function makeRandomJoke() {
    getRandomJokeWithTag = oneLinerJoke.getRandomJokeWithTag(jokeSubject);
}

function checkJokesAmount() {
    if (jokeAmount === undefined) {
        jokeAmount = 50;
    }
    if (jokeAmount < 50) {
        console.log("error!! need to have at least 50 jokes!");
        jokesArray = [];
    }
}

function checkJokesSubject() {
    let getRandomJokeWithTag = oneLinerJoke.getRandomJokeWithTag(jokeSubject);
    if (getRandomJokeWithTag.body === "") {
        console.log("error!! no joke in that subject");
        jokesArray = [];
    }
}

function checkDuplicates() {
    const jokes = new Set(jokesArray);
    filteredJokesArray = [...jokes];
    if (filteredJokesArray.length < jokeAmount) {
        for (let leftJokes = 0; leftJokes < jokeAmount - filteredJokesArray.length; leftJokes++) {
            pushRandomJoke(jokesArray);
            checkDuplicates();
            dupedJokes++;
        }
    }
}

function main() {
    moveJokesToArray();
    checkJokesAmount();
    checkJokesSubject();
    checkDuplicates();

    fsPromises.appendFile("jokes_file", String(filteredJokesArray), function () { });
    console.log("Jokes file was created succefully!")
    console.log("Amound of duplicated jokes handled: " + dupedJokes);
}
main();