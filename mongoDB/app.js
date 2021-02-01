const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

const dbName = 'myBooks';
const collectionNameBooks = 'books'
const collectionNameAuthors = 'authors'
let booksCollection;
let authrosCollection;

MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("\nConnected successfully to the server");

    const db = client.db(dbName);
    // insertAuthorsDocs(db, function () { });
    // insertBooksDocs(db, function () { });
    // createIndex(db, function () { });

    // findAuthorBooks(db, function () { });
    // findBooksWithPageAmount(db, function () { });
    findBooksByNameAndAbout(db, function(){});

    client.close();
});

const insertAuthorsDocs = function (db, callback) {
    authrosCollection = db.collection(collectionNameAuthors);
    const authors = [
        { _id: "author" + 1, name: "joey", familyName: "barret", birthDate: new Date("1973-03-27") },
        { _id: "author" + 2, name: "phil", familyName: "ryan", birthDate: new Date("1987-06-07") },
        { _id: "author" + 3, name: "kate", familyName: "carlson", birthDate: new Date("1993-11-13") },
        { _id: "author" + 4, name: "evan", familyName: "francis", birthDate: new Date("1965-12-03") },
        { _id: "author" + 5, name: "jack", familyName: "cooke", birthDate: new Date("1985-05-10") }];
    authrosCollection.insertMany(authors,
        function (err, result) {
            callback(result);
            console.log("Inserted documents into the collection ".concat(collectionNameAuthors, " successfuly", "\ndocuments that's inserted:"));
            console.log(authors);
        });
}

const insertBooksDocs = function (db, callback) {
    booksCollection = db.collection(collectionNameBooks);
    booksCollection.insertMany([{ _id: "book" + 1, bookName: "2 Am scarcery", about: "this book is about people who's telling us about their most scray stoires late at night", date: new Date("2016-03-18"), author: "joey barret", pages: 360 },
    { _id: "book" + 2, bookName: "Cooking with kate", about: "cooking recipiece that kate made herself, how to make them, and how to eat healthy", date: new Date("2017-08-13"), author: "kate carlson", pages: 240 },
    { _id: "book" + 3, bookName: "Farm boy", about: "texas citizen talks about his past, as being a kid in texas and loving to ride horses, pet sheep, play with dogs, feed cows and etc", date: new Date("2015-09-16"), author: "jack cooke", pages: 180 },
    { _id: "book" + 4, bookName: "Different life out there", about: "talks about aliens and his beliefe in theyre existance and so on", date: new Date("2013-01-19"), author: "evan francis", pages: 480 },
    { _id: "book" + 5, bookName: "My past life", about: "remembering his past life and everything that happened in that era, including scars, family members, tv shows and the way he died back then.", date: new Date("2018-08-17"), author: "phil ryan", pages: 520 }],
        function (err, result) {
            callback(result);
            console.log("Inserted documents into the collection ".concat(collectionNameBooks, " successfuly", "\ndocuments that's inserted:"));
            console.log(booksCollection.find());
        });
}

const createIndex = function (db, callback) {
    booksCollection = db.collection(collectionNameBooks);
    booksCollection.createIndex({ author: "text", bookName: "text", about: "text", pages: "text" });
}

const findAuthorBooks = function (db, callback) {
    const authorName = { author: "joey barret" }
    booksCollection = db.collection(collectionNameBooks);
    db.collection(collectionNameBooks).find(authorName).toArray(function (err, docs) {
        if (err) throw err;
        console.log(docs);
    });
}

const findBooksWithPageAmount = function (db, callback) {
    const pagesAmount = { pages: { $gt: 250 } }
    booksCollection = db.collection(collectionNameBooks);
    db.collection(collectionNameBooks).find(pagesAmount).sort({ pages: 1 }).toArray(function (err, docs) {
        if (err) throw err;
        console.log(docs);
    });
}

const findBooksByNameAndAbout = function (db, callback) {
    const nameBook = "scarcery";
    const aboutBook = "texas citizen talks about his past, as being a kid in texas and loving to ride horses, pet sheep, play with dogs, feed cows and etc.";
    booksCollection = db.collection(collectionNameBooks);
    db.collection(collectionNameBooks).find({ $or: [{ bookName: {$regex :nameBook} }, { about: aboutBook }] }).toArray(function (err, docs) {
        if (err) throw err;
        console.log(docs);
    });
}