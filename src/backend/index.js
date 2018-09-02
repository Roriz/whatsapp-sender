/* eslint-disable no-undef, no-console */

function clickToOpenChat() {
  document.getElementById('action-button').click();
}

function clickToSend() {
  const awaitFor = (selector) => {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        resolve();
      } else {
        setTimeout(() => {
          awaitFor(selector).then(resolve);
        }, 500);
      }
    });
  }
  awaitFor('[contenteditable]').then(() => {
    document.querySelectorAll('footer button')[1].click();
    setTimeout(() => {
      window.close();
    }, 200);
  });
}

function openPage({ url, tabId }) {
  if (url.includes('api.whatsapp.com')) {
    chrome.tabs.executeScript(tabId, { code: `(${clickToOpenChat})();` });
  }

  if (url.includes('web.whatsapp.com')) {
    chrome.tabs.executeScript(tabId, { code: `(${clickToSend})();` });
  }
}

chrome.browserAction.onClicked.addListener(() => chrome.runtime.openOptionsPage());
chrome.webNavigation.onCompleted.addListener(openPage);
