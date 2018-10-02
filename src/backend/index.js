
const ClickToSend = require('./click-to-send');
const EventOrchestrator = require('./event-orchestrator');

function openPage({ url, tabId }) {
  if (url.includes('web.whatsapp.com')) {
    window.chrome.tabs.executeScript(tabId, { code: `(${ClickToSend})();` });
  }
}

new EventOrchestrator();
window.chrome.webNavigation.onCompleted.addListener(openPage);
window.chrome.browserAction.onClicked.addListener(() => window.chrome.runtime.openOptionsPage());
