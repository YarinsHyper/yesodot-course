const fs = require("fs");
const fsPromises = fs.promises;
const args = process.argv.slice(2);
const filesAmount = args[0];
const randomWordsAmount = args[1];
const fileStartName = "created-files/wordFile";
let fileIndex = 0;
let randomWords = require('random-words');

function createFiles(filesAmount, wordAmount) {
    let fileString = "";
    let fileInfo = fileString.concat((randomWords(wordAmount * 2 ** fileIndex)));

    if (fileIndex < filesAmount) {
        fileIndex++;
    }
    fsPromises.appendFile(fileStartName.concat(fileIndex), fileInfo);
}

function main() {
    while (fileIndex < filesAmount) {
        createFiles(filesAmount, randomWordsAmount);
    }
}
main();