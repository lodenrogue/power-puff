class TabService {

    constructor() {
        this.registerCloseCurrentTab();
        this.registerSwitchToNextTab();
    }

    registerSwitchToNextTab() {
        const context = this;

        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action == 'switch-to-next-tab') {
                context.switchToNextTab(context, sendResponse);
            }
        });
    }

    switchToNextTab(context, sendResponse) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            const targetTabIndex = currentTab.index + 1;
            context.switchToTab(context, currentTab.id, targetTabIndex, sendResponse);
        });
    }

    switchToTab(context, currentTabId, targetTabIndex, sendResponse) {
        chrome.tabs.query({ index: targetTabIndex }, (tabs) => {
            if (tabs.length) {
                chrome.tabs.update(tabs[0].id, { highlighted: true });
                chrome.tabs.update(currentTabId, { highlighted: false });
            }
            sendResponse({ message: "switched-to-next-tab" });
        });
    }

    registerCloseCurrentTab() {
        const context = this;

        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action == "close-current-tab") {
                context.closeCurrentTab();
            }
        }
        );
    }

    closeCurrentTab(sendResponse) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.remove(tabs[0].id);
        });
    }
}
