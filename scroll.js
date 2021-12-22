class Scroll {

    registerKeys() {
        registry.register(["g", "g"], () => this.scrollToTop());
        registry.register(["G"], () => this.scrollToBottom());
    }

    scrollToTop() {
        scroll(0, 0);
    }

    scrollToBottom() {
        scroll(0, document.body.scrollHeight)
    }
}

new Scroll().registerKeys();
