class Tab {

    close() {
        chrome.runtime.sendMessage({ action: "close-current-tab" }, (r) => { });
    }
}
