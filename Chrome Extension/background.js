chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(sender.tab ?
		"from a content script:" + sender.tab.url :
		"from the extension");
	
	if(request.action == "showPageAction") {
		chrome.pageAction.show(sender.tab.id);
	} else if(request.action == "insertCSS") {
		chrome.tabs.insertCSS(sender.tab.id, {file: request.file, runAt: "document_start"});
	}
});