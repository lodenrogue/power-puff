chrome.runtime.onMessage.addListener(

    function(request, sender, sendResponse) {
        if (request.action == 'open-in-new-tab') {
            chrome.tabs.create({ url: request.url });
        }
    }
);
