class Reload {

    constructor() {
        this.reloadKey = 'r';
    }

    registerKeys() {
        registry.register([this.reloadKey], () => this.reload());
    }

    reload() {
        chrome.runtime.sendMessage({ action: "reload" }, (r) => { });
    }
}

new Reload().registerKeys();
