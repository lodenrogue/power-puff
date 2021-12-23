class Scroll {

    scrollToTop() {
        scroll(0, 0);
    }

    scrollToBottom() {
        scroll(0, document.body.scrollHeight);
    }

    scrollDown() {
        scrollBy(0, window.innerHeight / 2);
    }

    scrollUp() {
        scrollBy(0, -(window.innerHeight / 2));
    }
}
