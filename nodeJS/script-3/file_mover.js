//node file_mover
const fs = require("fs");
const fsPromises = fs.promises;
const originalDir = "files_to_move/";
const destinationDir = "moved_files/";
let filesNames = "";

function readFiles() {
    fs.readdir(originalDir, (err, files) => {
        if (err) {
            console.log("no files were moved!")
            console.log("\nerror:" + err)
        }
        files.forEach((file) => {
            moveFiles(originalDir + file, destinationDir + file, file);
            filesNames += file + ", ";
            console.log("Files that was moved: " + filesNames);
        })
        fsPromises.appendFile("moved_files.txt", "Files Moved: " + filesNames + "\n", function () { });
    })
}

function moveFiles(originPath, destinPath) {
    fsPromises.rename(originPath, destinPath, (err) => {
        if (err) { console.log("there was an error!\n" + err) }
        else {
        }
    });
}

setInterval(readFiles, 2000);