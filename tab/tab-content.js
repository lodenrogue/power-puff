class Tab {

    switchToNext() {
        chrome.runtime.sendMessage({ action: "switch-to-next-tab" }, (r) => { });
    }

    close() {
        chrome.runtime.sendMessage({ action: "close-current-tab" }, (r) => { });
    }
}
