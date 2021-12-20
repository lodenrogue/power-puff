const letters = ["A", "B", "C", "D", "E", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const hintClassName = 'powerpuff-hint';

let linkMap = {};

let firstLetterIndex = 0;
let secondLetterIndex = 0;

let isActive = false;
let pressedKey = '';

document.addEventListener('keypress', (e) => {
    if (e.key == 'f') {
        toggleHint();
    }
    else {
        processSelection(e.key);
    }

});

function processSelection(key) {
    pressedKey += key.toUpperCase();

    if (pressedKey.length > 1) {
        goToLink(pressedKey);
        pressedKey = '';

        removeHints();
        isActive = false;
    }
}

function toggleHint() {
    if (isActive) {
        removeHints();
    }
    else {
        showHints();
    }
    isActive = !isActive;
}

function goToLink(key) {
    const link = linkMap[key];
    if (link) {
        window.location.href = link;
    }
}

function removeHints() {
    const hints = document.getElementsByClassName(hintClassName);
    while (hints[0]) {
        hints[0].parentNode.removeChild(hints[0]);
    }
    linkMap = {};
}

function showHints() {
    firstLetterIndex = 0;
    secondLetterIndex = 0;

    const links = document.getElementsByTagName("a");

    for (link of links) {
        const letters = getNextLinkHint();

        if (letters) {
            linkMap[letters] = link.href;
            addHint(link, letters);
        }
    }
}

function addHint(link, letters) {
    const hintElem = document.createElement("span");
    hintElem.classList.add(hintClassName);

    const hint = document.createTextNode(letters);
    hintElem.appendChild(hint);
    link.prepend(hintElem);
}

function getNextLinkHint() {
    if (firstLetterIndex > letters.length - 1) return null;

    if (secondLetterIndex > letters.length - 1) {
        secondLetterIndex = 0;
        firstLetterIndex++;
    }
    return letters[firstLetterIndex] + letters[secondLetterIndex++];
}
