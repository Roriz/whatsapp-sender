/* eslint-disable no-undef, no-console */

const ClickToSend = require('./click-to-send');
const EventOrchestrator = require('./event-orchestrator');

function openPage({ url, tabId }) {
  if (url.includes('web.whatsapp.com')) {
    chrome.tabs.executeScript(tabId, { code: `(${ClickToSend})();` });
  }
}

new EventOrchestrator();
chrome.webNavigation.onCompleted.addListener(openPage);
chrome.browserAction.onClicked.addListener(() => chrome.runtime.openOptionsPage());
