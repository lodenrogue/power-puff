class Registry {

    constructor() {
        this.rootCommandNode = new Trie();
        this.currentCommandNode = this.rootCommandNode;
        this.isInCommandMode = false;
        this.createKeyListener(this);
    }

    register(keys, command) {
        if (keys.includes('Escape')) {
            console.log("Escape cannot be used as a keybinding");
            console.log(keys);
            return;
        }

        let node = this.rootCommandNode;

        for (let i = 0; i < keys.length; i++) {
            let childNode = new Trie();
            node.children[keys[i]] = childNode;
            node = childNode;
        }
        node.command = command;
    }

    createKeyListener(register) {
        document.addEventListener('keydown', (e) => {
            register.keyDown(e.key);
        });
    }

    keyDown(key) {
        if (key in this.currentCommandNode.children) {
            this.processKey(key);
        }
        else {
            this.currentCommandNode = this.rootCommandNode;
        }
    }

    processKey(key) {
        const node = this.currentCommandNode.children[key];

        if (node.command) {
            node.command();
            this.currentCommandNode = this.rootCommandNode;
        }
        else if (Object.keys(node.children).length) {
            this.currentCommandNode = node;
        }
        else {
            this.currentCommandNode = this.rootCommandNode;
        }
    }
}

let registry = new Registry();
