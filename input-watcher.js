class InputWatcher {

    constructor() {
        const inputs = document.getElementsByTagName("input");
        const textareas = document.getElementsByTagName("textarea");

        this.addEventListeners(inputs);
        this.addEventListeners(textareas);
    }

    addEventListeners(elems) {
        for (const elem of elems) {
            elem.addEventListener("focus", () => registry.changeMode("insert"));
            elem.addEventListener("blur", () => registry.changeMode("normal"));
        }
    }
}
