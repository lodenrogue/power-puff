class Reload {

    reload() {
        chrome.runtime.sendMessage({ action: "reload" }, (r) => { });
    }
}
