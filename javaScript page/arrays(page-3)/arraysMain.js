const ageString = "Age";
const nameString = "Name";
const adminString = "Admin";
const gradesString = "Grades";
const addressString = "Address";
const cityString = "city.";
const houseNumberString = "houseNumber.";
const empty = "";
const truesString = "true";
let output = document.getElementById("lsOutput");

const usersArray = [{
    age: 16,
    name: 'yossi',
    admin: true,
    grades: [20, 23, 50, 30],
    address: {
        city: 'ashdod',
        houseNumber: 12
    }
},
{
    age: 25,
    name: 'yael',
    admin: false,
    grades: [50, 16, 100, 78],
    address: {
        city: 'ashdod',
        houseNumber: 8
    }
},
{
    age: 22,
    name: 'idan',
    admin: false,
    grades: [100, 100, 100, 30],
    address: {
        city: 'tel aviv',
        houseNumber: 40
    }
},
{
    age: 29,
    name: 'yarden king',
    admin: true,
    grades: [99, 99, 99, 99],
    address: {
        city: 'kfar bialik',
        houseNumber: 1
    }
},
{
    age: 34,
    name: 'banu',
    admin: true,
    grades: [100, 100, 100, 100],
    address: {
        city: 'ashdod',
        houseNumber: 16
    }
},
{
    age: 57,
    name: 'nabetjs',
    admin: false,
    grades: [3, 16, 0, 30],
    address: {
        city: 'tel aviv',
        houseNumber: 12
    }
},
{
    age: 15,
    name: 'rongular',
    admin: true,
    grades: [92, 87, 69, 84],
    address: {
        city: 'yafo',
        houseNumber: 12
    }
},
{
    age: 10,
    name: 'david',
    admin: false,
    grades: [20, 23, 50, 30],
    address: {
        city: 'ashdod',
        houseNumber: 12
    }
},
{
    age: 66,
    name: 'liad',
    admin: false,
    grades: [92, 76, 77, 82],
    address: {
        city: 'beit dagan',
        houseNumber: 112
    }
},
{
    age: 34,
    name: 'happy',
    admin: true,
    grades: [54, 23, 100, 30],
    address: {
        city: 'beit dagan',
        houseNumber: 112
    }
}
];

function createCard(card) {
    const cardElement = document.createElement("div");
    const ageElement = document.createElement("h1");
    const nameElement = document.createElement("h2");
    const adminElement = document.createElement("h3");
    const gradesElement = document.createElement("h4");
    const houseNumberElement = document.createElement("h5");
    const cityElement = document.createElement("h6");

    appendAllCardElements(cardElement, ageElement, nameElement, adminElement, gradesElement, cityElement, houseNumberElement);
    setAttributeAllCardElements(cardElement, ageElement, nameElement, adminElement, gradesElement, houseNumberElement, cityElement);

    ageElement.textContent = card.age;
    nameElement.textContent = card.name;
    adminElement.textContent = card.admin;
    gradesElement.textContent = card.grades;
    houseNumberElement.textContent = card.address.houseNumber;
    cityElement.textContent = card.address.city;

    output.appendChild(cardElement);
}

function appendAllCardElements(cardElement, ageElement, nameElement, adminElement, gradesElement, cityElement, houseNumberElement) {
    cardElement.appendChild(ageElement);
    cardElement.appendChild(nameElement);
    cardElement.appendChild(adminElement);
    cardElement.appendChild(gradesElement);
    cardElement.appendChild(cityElement);
    cardElement.appendChild(houseNumberElement);
}

function setAttributeAllCardElements(cardElement, ageElement, nameElement, adminElement, gradesElement, houseNumberElement, cityElement) {
    cardElement.setAttribute("class", "card");
    ageElement.setAttribute("class", "age");
    nameElement.setAttribute("class", "name");
    adminElement.setAttribute("class", "admin");
    gradesElement.setAttribute("class", "grade");
    houseNumberElement.setAttribute("class", "houseNumber");
    cityElement.setAttribute("class", "city");
}

displayAllCards();

function checkSelectOption() {
    let input;
    let selectedOption;
    let selectValue;

    selectedOption = document.getElementById("selectBox");
    selectValue = selectedOption.options[selectedOption.selectedIndex].text;
    input = document.getElementById("searchInput").value;

    switch (selectValue){
        case ageString:
            getUsersByAge(+input);
            break;
        case nameString:
            getUsersByName(input);
            break;
        case adminString:
            getUsersByAdmin(input);
            break;
        case gradesString:
            getUsersByGrades(+input);
            break;
        case addressString:
            getUsersByAddress(input);  
            break;
    }
}

function deleteAllCards() {
    while (lsOutput.firstChild) {
        lsOutput.removeChild(lsOutput.firstChild);
    }
}

function displayAllCards() {
    usersArray.forEach((user) => { createCard(user); });
}

function getUsersByAge(input) {
    deleteAllCards();
    usersArray.filter((user) => user.age > input).forEach((user) => createCard(user));
}

function getUsersByName(input) {
    let newInput = input.toLowerCase();
    deleteAllCards();
    usersArray.filter((user) => user.name == newInput).forEach((user) => createCard(user));
}

function getUsersByAdmin(input) {
    let newInput = input.toLowerCase();
    deleteAllCards();
    usersArray.filter((user) => user.admin == (newInput == truesString)).forEach((user) => createCard(user));
}

function getUsersByGrades(input) {
    deleteAllCards();
    usersArray.filter((user) => getAverage(user.grades) > input).forEach((user) => createCard(user));
}

function getUsersByAddress(input) {
    deleteAllCards();
    usersArray.filter((user) => (cityString + user.address.city) == input).forEach((user) => createCard(user));
    usersArray.filter((user) => (houseNumberString + user.address.houseNumber) == input).forEach((user) => createCard(user));
}

function getAverage(grades) {
    let sum = 0;
    grades.forEach((grade) => { sum += grade; });

    return sum / grades.length;
}

function showCardsAllGradesGreater() {
    let input = document.getElementById("searchInput").value;
    const isAllBiggerThan = (grade) => grade > input;

    deleteAllCards();

    usersArray.filter((user) => (user.grades.every(isAllBiggerThan))).forEach((user) => createCard(user));
}

function showCardsSomeGradesGreater() {
    let input = document.getElementById("searchInput").value;
    const isSomeBiggerThan = (grade) => grade > input;

    deleteAllCards();

    usersArray.filter((user) => (user.grades.some(isSomeBiggerThan))).forEach((user) => createCard(user));
}

function ArrayFilterAndManipulation() {
    const isAverageBiggerThan = (grades) => getAverage(grades) < input;
    const isHouseNumberBiggerThan = (user) => user.address.houseNumber > input;
    let input = document.getElementById("searchInput").value;
    
    deleteAllCards();

    usersArray.filter((user) => isAverageBiggerThan(user.grades) && (isHouseNumberBiggerThan(user))).forEach((user) => {user.age += Number(input); createCard(user)});
}