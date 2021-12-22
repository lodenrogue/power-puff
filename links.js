class LinkHinter {

    constructor() {
        this.letters = ["A", "B", "C", "D", "E", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        this.hintClassName = 'powerpuff-hint';
        this.linkMap = {};

        this.firstLetterIndex = 0;
        this.secondLetterIndex = 0;
        this.isActive = false;
        this.pressedKey = '';

        this.toggleKey = 'f'
        registry.register(['Control', this.toggleKey], () => this.toggleHint());

        this.createKeyListener();
    }

    createKeyListener() {
        document.addEventListener('keypress', (e) => {
            if (this.isActive && e.key != 'Control' && e.key != 'f') {
                this.processSelection(e.key);
            }
        });
    }

    processSelection(key) {
        this.pressedKey += key.toUpperCase();

        if (this.pressedKey.length > 1) {
            this.goToLink(this.pressedKey);
            this.pressedKey = '';

            this.removeHints();
            this.isActive = false;
        }
    }

    toggleHint() {
        if (this.isActive) {
            this.removeHints();
        }
        else {
            this.showHints();
        }
        this.isActive = !this.isActive;
    }

    goToLink(key) {
        const link = this.linkMap[key];
        if (link) {
            window.location.href = link;
        }
    }

    removeHints() {
        const hints = document.getElementsByClassName(this.hintClassName);
        while (hints[0]) {
            hints[0].parentNode.removeChild(hints[0]);
        }
        this.linkMap = {};
    }

    showHints() {
        this.firstLetterIndex = 0;
        this.secondLetterIndex = 0;

        const links = document.getElementsByTagName("a");

        for (const link of links) {
            const letters = this.getNextLinkHint();

            if (letters) {
                this.linkMap[letters] = link.href;
                this.addHint(link, letters);
            }
        }
    }

    addHint(link, letters) {
        const hintElem = document.createElement("span");
        hintElem.classList.add(this.hintClassName);

        const hint = document.createTextNode(letters);
        hintElem.appendChild(hint);
        link.prepend(hintElem);
    }

    getNextLinkHint() {
        if (this.firstLetterIndex > this.letters.length - 1) return null;

        if (this.secondLetterIndex > this.letters.length - 1) {
            this.secondLetterIndex = 0;
            this.firstLetterIndex++;
        }
        return this.letters[this.firstLetterIndex] + this.letters[this.secondLetterIndex++];
    }
}

new LinkHinter();
