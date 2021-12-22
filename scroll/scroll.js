class Scroll {

    registerKeys() {
        registry.register(["g", "g"], () => this.scrollToTop());
        registry.register(["G"], () => this.scrollToBottom());
        registry.register(["d"], () => this.scrollDown());
        registry.register(["u"], () => this.scrollUp());
    }

    scrollToTop() {
        scroll(0, 0);
    }

    scrollToBottom() {
        scroll(0, document.body.scrollHeight)
    }

    scrollDown() {
        scrollBy(0, window.innerHeight / 2);
    }

    scrollUp() {
        scrollBy(0, -(window.innerHeight / 2));
    }
}

new Scroll().registerKeys();
