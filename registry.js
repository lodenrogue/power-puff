class Registry {

    constructor() {
        this.modes = {};
        this.addMode("normal");
        this.addMode("insert");

        this.currentMode = this.modes.normal;
        this.isInCommandMode = false;
        this.createKeyListener(this);
    }

    register(modeName, keys, command) {
        if (keys.includes('Escape')) {
            this.warnInvalidKeyBinding();
            return;
        }

        const registeringMode = this.getMode(modeName);
        let node = registeringMode.rootNode;

        for (let i = 0; i < keys.length; i++) {
            let childNode = new Trie();
            node.children[keys[i]] = childNode;
            node = childNode;
        }
        node.command = command;
    }

    warnInvalidKeyBinding() {
        console.log("Escape cannot be used as a keybinding");
        console.log(keys);
    }

    changeMode(modeName) {
        if (modeName in this.modes) {
            this.currentMode.currentNode = this.currentMode.rootNode;
            this.currentMode = this.modes[modeName];
        }
    }

    getMode(modeName) {
        if (modeName in this.modes) {
            return this.modes[modeName];
        }
        else {
            return this.addMode(modeName);
        }
    }

    addMode(modeName) {
        const mode = this.createMode(modeName);
        this.modes[modeName] = mode;
        return mode;
    }

    createMode(modeName) {
        let mode = {
            name: modeName,
            rootNode: new Trie()
        };
        mode.currentNode = mode.rootNode;
        return mode;
    }

    createKeyListener(registry) {
        document.addEventListener('keydown', (e) => {
            registry.keyDown(e.key);
        });
    }

    keyDown(key) {
        if (key in this.currentMode.currentNode.children) {
            this.processKey(key);
        }
        else {
            this.currentMode.currentNode = this.currentMode.rootNode;
        }
    }

    processKey(key) {
        const node = this.currentMode.currentNode.children[key];

        if (node.command) {
            node.command();
            this.currentMode.currentNode = this.currentMode.rootNode;
        }
        else if (Object.keys(node.children).length) {
            this.currentMode.currentNode = node;
        }
        else {
            this.currentMode.currentNode = this.currentMode.rootNode;
        }
    }
}

let registry = new Registry();
