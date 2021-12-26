class LinkHinter {

    constructor(currentTabToggleKey, newTabToggleKey) {
        this.currentTabToggleKey = currentTabToggleKey;
        this.newTabToggleKey = newTabToggleKey;

        this.letters = ["A", "B", "C", "D", "E", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        this.hintClassName = 'powerpuff-hint';
        this.linkMap = {};

        this.firstLetterIndex = 0;
        this.secondLetterIndex = 0;
        this.isActive = false;
        this.pressedKey = '';

        this.createKeyListener();
    }

    createKeyListener() {
        document.addEventListener('keydown', (e) => {
            if (this.isActive && this.isNotToggleKey(e.key)) {
                if (e.key == 'Escape') {
                    this.toggleHint();
                }
                else {
                    this.processSelection(e.key);
                }
            }
        });
    }

    isNotToggleKey(key) {
        return key != this.currentTabToggleKey && key != this.newTabToggleKey;
    }

    processSelection(key) {
        if (key.length === 1) {
            this.pressedKey += key.toUpperCase();

            if (this.pressedKey.length > 1) {
                this.goToLink(this.pressedKey);
                this.pressedKey = '';

                this.removeHints();
                this.isActive = false;
            }
        }
    }

    toggleHint(openInNewTab) {
        this.openInNewTab = openInNewTab;

        if (this.isActive) {
            registry.changeMode('normal');
            this.removeHints();
        }
        else {
            registry.changeMode('links');
            this.showHints();
        }
        this.isActive = !this.isActive;
    }

    goToLink(key) {
        const link = this.linkMap[key];

        if (link) {
            if (this.openInNewTab) {
                chrome.runtime.sendMessage({ action: "open-in-new-tab", url: link }, (r) => { });
            }
            else {
                window.location.href = link;
            }
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
