class TabService {

    constructor() {
        this.registerCloseCurrentTab();
        this.registerSwitchToNextTab();
        this.registerSwitchToPrevTab();
    }

    registerSwitchToNextTab() {
        const context = this;

        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action == 'switch-to-next-tab') {
                context.switchToNextTab(context, sendResponse);
            }
        });
    }

    registerSwitchToPrevTab() {
        const context = this;

        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action == 'switch-to-prev-tab') {
                context.switchToPrevTab(context, sendResponse);
            }
        });
    }

    registerCloseCurrentTab() {
        const context = this;

        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action == "close-current-tab") {
                context.closeCurrentTab(context);
            }
        });
    }

    switchToPrevTab(context, sendResponse) {
        context.getCurrentTab((tabs) => {
            const currentTab = tabs[0];
            const targetTabIndex = currentTab.index - 1;
            context.switchToTab(context, currentTab.id, targetTabIndex, sendResponse);
        });
    }

    switchToNextTab(context, sendResponse) {
        context.getCurrentTab((tabs) => {
            const currentTab = tabs[0];
            const targetTabIndex = currentTab.index + 1;
            context.switchToTab(context, currentTab.id, targetTabIndex, sendResponse);
        })
    }

    switchToTab(context, currentTabId, targetTabIndex, sendResponse) {
        if(targetTabIndex < 0) return;

        chrome.tabs.query({ index: targetTabIndex }, (tabs) => {
            if (tabs.length) {
                chrome.tabs.update(tabs[0].id, { highlighted: true });
                chrome.tabs.update(currentTabId, { highlighted: false });
            }
            sendResponse({ message: "switched-to-next-tab" });
        });
    }

    getCurrentTab(callback) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            callback(tabs);
        });
    }

    closeCurrentTab(context) {
        context.getCurrentTab((tabs) => {
            chrome.tabs.remove(tabs[0].id);
        });
    }
}
