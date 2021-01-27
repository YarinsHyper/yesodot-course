const mime = require('mime-types')
const prompt = require("prompt-sync")();
const term = require("terminal-kit").terminal;
const fs = require("fs");
const fsPromises = fs.promises;
const textFileString = ".txt";
const menuOptions = [" Files", " Folders", " Exit "];
const fileMenuOptions = [" Delete File", " Create File", " Write into File", " Merge Files", " Back", " Exit "];
const folderMenuOptions = [" Create Folder", " Delete Folder", " Create File in Folder", " Delete File in Folder", " Back", " Exit "];
const menuCustomize = { y: 1, style: term.inverse, selectedStyle: term.dim.black.bgBlue };
const deleteItems = ["a) Yes", "b) No"];
let directoryType = "";
let deletedFolder = "";
let deletedFile = "";
let filesArray = [];
let foldersArray = [];
const filesLocation = "./Files/";
let files = fs.readdir(filesLocation, (err, files) => {
    if (err) { console.log("there's probably no files to filter!\nmake some files and run it again\nsee you later ;D") }
    files.forEach(file => {
        if (mime.contentType(file) === false) { foldersArray.push(file) }
        else { filesArray.push(file) }
    })
});
let progressBar, progress = 0;
let wantToDelete = false;

function main() {
    mainMenu()
}

function mainMenu() {
    term.clear();
    term.singleLineMenu(menuOptions, menuCustomize, function (error, response) {
        switch (response.selectedText) {
            case menuOptions[0]:
                filesMenu();
                break;
            case menuOptions[1]:
                foldersMenu();
                break;
            case menuOptions[2]:
                console.log("\nokay, see you later!")
                process.exit()
        }
    });
}

function filesMenu() {
    directoryType = "file";
    term.clear();
    term.singleLineMenu(fileMenuOptions, menuCustomize, function (error, response) {
        switch (response.selectedText) {
            case fileMenuOptions[0]:
                deleteFileSystem();
                break;
            case fileMenuOptions[1]:
                createFile();
                break;
            case fileMenuOptions[2]:
                writeFile();
                break;
            case fileMenuOptions[3]:
                mergeFiles();
                break;
            case fileMenuOptions[4]:
                main();
                break;
            case fileMenuOptions[5]:
                console.log("\n never mind then, see you later you baiter!")
                process.exit()
        }
    });
}

function foldersMenu() {
    directoryType = "folder";
    term.clear();
    term.singleLineMenu(folderMenuOptions, menuCustomize, function (error, response) {
        switch (response.selectedText) {
            case folderMenuOptions[0]:
                createFolder();
                break;
            case folderMenuOptions[1]:
                deleteFolderSystem();
                break;
            case folderMenuOptions[2]:
                createFileInFolder()
                break;
            case folderMenuOptions[3]:
                deleteFileInFolder();
                break;
            case folderMenuOptions[4]:
                main();
                break;
            case folderMenuOptions[5]:
                console.log("\n never mind then, see you late.. you baiter!")
                process.exit()
        }
    });
}

function deleteFileSystem() {
    files = fs.readdir(filesLocation, (err, files) => {
        if (err) { console.log("files array is empty!\ntry again later!") }
    });
    console.log("\n")
    term.cyan("\nChoose a file:");
    term.gridMenu(filesArray, function (error, response) {
        term("\n").eraseLineAfter.green(
            "File selected: %s\n",
            response.selectedText,
            "\n"
        );
        deletedFile = response.selectedText;
        term.red("Are you sure you want to delete [".concat(deletedFile, "] ?"));

        term.singleColumnMenu(deleteItems, function (error, response) {
            deleteQuestionHandler(directoryType, response.selectedText);
            if (wantToDelete) { deleteDirType(directoryType); }
        });
    });
}

function deleteFolderSystem() {
    files = fs.readdir(filesLocation, (err, files) => {
        if (err) { console.log("folders array is empty!\ntry again later!") }
    });
    console.log("\n")
    term.cyan("\nChoose a Folder:");
    term.gridMenu(foldersArray, function (error, response) {

        term("\n").eraseLineAfter.green(
            "Folder selected: %s\n",
            response.selectedText,
            "\n"
        );
        deletedFolder = response.selectedText;
        term.red("Are you sure you want to delete [".concat(deletedFolder, "] ?"));

        term.singleColumnMenu(deleteItems, function (error, response) {
            deleteQuestionHandler(directoryType, response.selectedText);
            if (wantToDelete) { deleteDirType(directoryType); }
        });
    });
}

function deleteQuestionHandler(fileType, response) {
    if (fileType === "file") {
        if (response === "a) Yes") { wantToDelete = true; }
        else if (response === "b) No") {
            files = fs.readdir(filesLocation, (err, files) => {
                if (err) { throw err }
            });
            wantToDelete = false;
            term.clear();
            main();
        }
    }
    else if (fileType === "folder") {
        if (response === "a) Yes") { wantToDelete = true; }
        else if (response === "b) No") {
            files = fs.readdir(filesLocation, (err, files) => {
                if (err) { throw err }
            });
            wantToDelete = false;
            term.clear();
            main();
        }
    }
}

function deleteDirType(fileType) {
    if (fileType === "folder") {

        term("\n").eraseLineAfter.green(
            "Deleting the ".concat(fileType, " - %s \n"),
            deletedFolder
        );

        progressBar = term.progressBar({
            width: 50,
            title: "Deleting..",
            eta: true,
            percent: true
        });
        doProgressBar();
        deleteFolder(deletedFolder);
    }
    else if (fileType === "file") {

        term("\n").eraseLineAfter.green(
            "Deleting the ".concat(fileType, " - %s \n"),
            deletedFile
        );

        progressBar = term.progressBar({
            width: 50,
            title: "Deleting..",
            eta: true,
            percent: true
        });
        doProgressBar();
        deleteFile(deletedFile);
    }
}

function doProgressBar() {
    progress += Math.random() / 10;
    progressBar.update(progress);

    if (progress >= 1) {
        setTimeout(function () { term("\n"); console.log("\nTask Complete :D"); setTimeout(function () { main() }, 1280); }, 200);
    }
    else {
        setTimeout(doProgressBar, 100 + Math.random() * 400);
    }
}

function deleteFile(directory) {
    let filesDir = filesLocation;
    let fileDir = filesDir.concat(directory);
    fsPromises.unlink(fileDir, function (err) { });
    if (filesArray.indexOf(directory) > -1) filesArray.splice(filesArray.indexOf(directory), 1);
    files = fs.readdir(filesLocation, (err, files) => {
        if (err) { throw err }
    });
}

function deleteFolder(directory) {
    let filesDir = filesLocation;
    let fileDir = filesDir.concat(directory);
    // if (foldersArray.includes(directory)) { fs.rmdir(fileDir, function (err) { }); }
    // else { console.log("there's not such folder called: ".concat(directory, "\ntry again!")); SetTimeout(function () { main(), 1200 }) }
    if (foldersArray.indexOf(directory) > -1) foldersArray.splice(foldersArray.indexOf(directory), 1);
    files = fs.readdir(filesLocation, (err, files) => { if (err) { throw err } });
}

function createFile() {
    console.log("\n");
    const fileName = prompt("Enter your file name: ").concat(textFileString);
    fsPromises.appendFile(filesLocation.concat(fileName), "");
    filesArray.push(fileName);
    setTimeout(function () { console.log(`\nFile named: ${fileName} was created successfuly`) }, 600);
    setTimeout(function () { main() }, 1500);
}

function createFolder() {
    console.log("\n");
    const folderName = prompt("Enter your folder name: ");
    fs.mkdir(filesLocation.concat(folderName), (err, file) => { if (err) { throw err } });
    foldersArray.push(folderName);
    setTimeout(function () { console.log(`\nFolder named: ${folderName} was created successfully`) }, 600);
    setTimeout(function () { main() }, 1500);
}

function writeFile() {
    answer = "";
    console.log("\n");
    const fileToWrite = prompt("which file would you like to write to: ").concat(textFileString);
    const fileText = prompt("Write your text here: ");
    if (filesArray.includes(fileToWrite)) { fs.writeFile(filesLocation.concat(fileToWrite), fileText, (err, file) => { if (err) { throw err } }); answer = "successfuly"; }
    else { setTimeout(function () { console.log("\nthere's no such file.\ntry again."), 600 }); answer = "unsuccessfuly"; }
    setTimeout(function () { console.log(`\nInformation was `.concat(answer, ` written into the file: ${fileToWrite}`)) }, 800);
    setTimeout(function () { main() }, 2000);
}

function createFileInFolder() {
    console.log("\n");
    const folderDir = prompt("In which folder would you like to create a file: ");
    const fileInFolder = prompt("Enter your file name: ").concat(textFileString);;
    const folderLocation = folderDir.concat("/", fileInFolder);
    fsPromises.appendFile(filesLocation.concat(folderLocation), "");
    setTimeout(function () { console.log(`\nFile named: ${fileInFolder} was created successfuly`) }, 600);
    setTimeout(function () { main() }, 1500);
}

function deleteFileInFolder() {
    const filesInFolder = []
    let answer = ""
    console.log("\n");
    const folderDir = prompt("In which folder would you like to delete a file: ");
    const deleteFile = prompt("Enter the file you want do delete: ").concat(textFileString);
    const folderLocation = folderDir.concat("/", deleteFile);
    fs.readdir(folderLocation, (err, file) => {
        filesInFolder.push(file);
    });
    if (filesInFolder.includes(deleteFile)) { fsPromises.unlink(filesLocation.concat(folderLocation)); answer = "successfuly" }
    else { console.log("\nthere's no such file in folder - ".concat(folderDir, "\ntry again!")); answer = "unsuccessfuly" }
    setTimeout(function () { console.log(`\nFile named: ${deleteFile} was deleted `.concat(answer)) }, 700);
    setTimeout(function () { main() }, 3000);
}

async function mergeFiles() {
    let answer = "";
    console.log("\n");
    mergeFile1 = prompt("what file would you like to merge INTO: ").concat(textFileString);
    mergeFile2 = prompt("what file would you like to merge FROM(and delete after): ").concat(textFileString);
    if (filesArray.includes(mergeFile1) && filesArray.includes(mergeFile2)) {
        ReadAppend(mergeFile1, mergeFile2);
        answer = "successfuly";
    }
    else {
        answer = "unsuccessfuly";
        setTimeout(function () { console.log("\n\nthere's no such file/files. try again.."), 1000 })
        main();
    }
    await setTimeout(function () { console.log(`\n\nFiles ${mergeFile1}and ${mergeFile2} was merged `.concat(answer)) }, 1400);
    setTimeout(function () { main() }, 3000);
}

function ReadAppend(file, appendFile) {
    fs.readFile(filesLocation.concat(appendFile), function (err, data2) {
        const fileInfo = " ".concat(String(data2));
        fs.appendFile(filesLocation.concat(file), fileInfo, (err, file) => { if (err) { throw err } });
        fsPromises.unlink(filesLocation.concat(appendFile));
    });
}

main();