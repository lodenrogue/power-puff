class Registry {

    constructor() {
        this.bindings = new Trie();
        this.currentCommandNode = this.bindings;
        this.isInCommandMode = false;
        this.createKeyListener(this);
    }

    register(keys, command) {
        if (keys.includes('Escape')) {
            console.log("Escape cannot be used as a keybinding");
            console.log(keys);
            return;
        }

        let node = this.bindings;

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
            const node = this.currentCommandNode.children[key];

            if (node.command) {
                node.command();
                this.currentCommandNode = this.bindings;
            }
            else if (Object.keys(node.children).length) {
                this.currentCommandNode = node;
            }
            else {
                this.currentCommandNode = this.bindings;
            }
        }
        else {
            this.currentCommandNode = this.bindings;
        }
    }
}

let registry = new Registry();
