const palindromeString = document.getElementById("palindromeInput");
const FIRST_SMALL_LETTER_ASCII = 97;
const LAST_SMALL_LETTER_ASCII = 122
const FIRST_BIG_LETTER_ASCII = 65;
const LAST_BIG_LETTER_ASCII = 90;
const ABC_LETTERS_AMOUNT = 26;
const colorRedString = "red";
const colorGreenString = "green";
let output = document.getElementById("lsOutput");
let encryptButton = document.getElementById("encryptButton");
let decryptButton = document.getElementById("decryptButton");


function reloadPage() {
    location.reload();
}

function palnidromeColorChange() {
    if (isPalindrome(palindromeString.value)) {
        palindromeInput.style.backgroundColor = colorGreenString;
    }
    else {
        palindromeInput.style.backgroundColor = colorRedString;
    }
}

function isPalindrome(word) {
    return word == word.split("").reverse().join("");
}

function encrypt() {
    let word = englishString.value;
    let amount = numberInput.value;

    englishString.value = encryptAction(word, Number(amount));
}

function encryptAction(word, amount) {
    let cipher = "";
    
    if (amount < 0)
        return caesarShift(word, amount + ABC_LETTERS_AMOUNT);

    for (let charIndex = 0; charIndex < word.length; charIndex++) {
        let wordChar = word.charCodeAt(charIndex);

        if (wordChar >= FIRST_BIG_LETTER_ASCII && wordChar <= LAST_BIG_LETTER_ASCII)
            cipher += String.fromCharCode((wordChar - FIRST_BIG_LETTER_ASCII + amount) % ABC_LETTERS_AMOUNT + FIRST_BIG_LETTER_ASCII);

        else if (wordChar >= FIRST_SMALL_LETTER_ASCII && wordChar <= LAST_SMALL_LETTER_ASCII)
            cipher += String.fromCharCode((wordChar - FIRST_SMALL_LETTER_ASCII + amount) % ABC_LETTERS_AMOUNT + FIRST_SMALL_LETTER_ASCII);

        else
            cipher += word.charAt(wordChar);
    }

    return cipher;
}

function decrypt() {
    let word = document.getElementById("englishString");
    let amount = (ABC_LETTERS_AMOUNT - numberInput.value) % ABC_LETTERS_AMOUNT;

    word.value = encryptAction(word.value, Number(amount));
}