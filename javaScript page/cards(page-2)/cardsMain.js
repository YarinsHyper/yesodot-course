const inputName = document.getElementById("usernameInput");
const inputProfession = document.getElementById("professionInput");
const inputEmail = document.getElementById("emailInput");
const buttonInsert = document.getElementById("buttonInsert");
const buttonResetPage = document.getElementById("buttonResetPage");
const output = document.getElementById("lsOutput");
const keyName = "cards";
const emptyString = "";
const emptyArray = "[]";
const invalidEmaill = "valid@email.com";
const SPLICE_COUNT = 1;
const replaceText = "פקיד";
const FIRST_SMALL_LETTER_ASCII = 97;
const LAST_SMALL_LETTER_ASCII = 122
const FIRST_BIG_LETTER_ASCII = 65;
const LAST_BIG_LETTER_ASCII = 90;
const MINIMAL_NAME_LENGTH = 2;

displayAllCards();

function submitCard() {
    const email = emailValidation(inputEmail.value) ? inputEmail.value : invalidEmaill;
    let name = inputName.value;
    let profession = inputProfession.value;
    profession = checkProfession(profession);

    if (name.length >= MINIMAL_NAME_LENGTH) {
        const card = { name: name, profession: profession, email: email };
        const cards = JSON.parse(localStorage.getItem(keyName) ?? emptyArray);
        const newId = cards.length;

        cards.push(card);
        localStorage.setItem(keyName, JSON.stringify(cards));
        createCard(name, profession, email,newId);
    }
}

function checkProfession(profession) {
    let newProfession = profession;
    newProfession = newProfession.replace(replaceText, emptyString);

    return newProfession;
}

function displayAllCards() {
    let cards = JSON.parse(localStorage.getItem(keyName) ?? emptyArray);

    while (output.firstChild) {
        output.removeChild(output.firstChild);
    }

    let cardIndex = -1;
    cards.forEach((card) => { cardIndex++; createCard(card.name, card.profession, card.email, cardIndex); });
}

function createCard(name, profession, email, cardId) {
    const cardElement = document.createElement("div");
    const nameElement = document.createElement("h1");
    const professionElement = document.createElement("h2");
    const emailElement = document.createElement("h3");
    const deleteButton = document.createElement("button");

    appendAllCardElements(cardElement, nameElement, professionElement, emailElement, deleteButton);
    setAttributeAllCardElements(cardElement, nameElement, professionElement, emailElement, deleteButton);

    nameElement.textContent = name;
    professionElement.textContent = profession;
    emailElement.textContent = email;

    output.appendChild(cardElement);

    deleteButton.onclick = function () {
        const cards = JSON.parse(localStorage.getItem(keyName) ?? emptyArray);

        cards.splice(cardId, SPLICE_COUNT);
        localStorage.setItem(keyName, JSON.stringify(cards));
        displayAllCards();
    }
}

function appendAllCardElements(cardElement, nameElement, professionElement, emailElement, deleteButton) {
    cardElement.appendChild(nameElement);
    cardElement.appendChild(professionElement);
    cardElement.appendChild(emailElement);
    cardElement.appendChild(deleteButton);
}

function setAttributeAllCardElements(cardElement, nameElement, professionElement, emailElement, deleteButton) {
    cardElement.setAttribute("class", "card");
    nameElement.setAttribute("class", "name");
    professionElement.setAttribute("class", "profession");
    emailElement.setAttribute("class", "email");
    deleteButton.setAttribute("class", "divDeleteButton");
}

function ResetPage() {
    while (output.firstChild) {
        output.removeChild(output.firstChild);
    }

    localStorage.clear();
    location.reload();
}

function emailValidation(email) {
    const emailRegx = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]/;

    return emailRegx.test(email);
}

function isLetter(evt) {
    let charCode = (evt.which) ? evt.which : event.keyCode;

    return ((charCode >= FIRST_SMALL_LETTER_ASCII && charCode <= LAST_SMALL_LETTER_ASCII) ||
        (charCode >= FIRST_BIG_LETTER_ASCII && charCode <= LAST_BIG_LETTER_ASCII));
}