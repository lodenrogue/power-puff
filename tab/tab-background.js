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
            context.switchToTab(context, currentTab.id, currentTab.index + 1, sendResponse);
        });
    }

    switchToTab(context, currentTabId, targetTabIndex, sendResponse) {
        chrome.tabs.query({ index: targetTabIndex }, (tabs) => {
            if (tabs.length) {
                chrome.tabs.update(tabs[0].id, { highlighted: true });
                chrome.tabs.update(currentTabId, { highlighted: false });
            }
            sendResponse("switched-to-next-tab");
        });
    }

    registerCloseCurrentTab() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action == "close-current-tab") {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.tabs.remove(tabs[0].id);
                    sendResponse({ message: 'tab-closed' });
                });
            }
        }
        );
    }
}
