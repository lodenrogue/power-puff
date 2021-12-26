class Tab {

    switchToPrev() {
        chrome.runtime.sendMessage({ action: "switch-to-prev-tab" }, (r) => { });
    }

    switchToNext() {
        chrome.runtime.sendMessage({ action: "switch-to-next-tab" }, (r) => { });
    }

    close() {
        chrome.runtime.sendMessage({ action: "close-current-tab" }, (r) => { });
    }
}
