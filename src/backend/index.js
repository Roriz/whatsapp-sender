
/* eslint-disable no-undef */
import AwaitFor from './await-for';

function clickToOpenChat() {
  document.getElementById('action-button').click();
}

function writeMgs() {
  AwaitFor('[contenteditable]').then(() => {
    document.querySelectorAll('footer button')[1].click();
  });
}

function openPage({ url }) {
  if (url.includes('api.whatsapp.com')) {
    chrome.tabs.executeScript(null, clickToOpenChat);
  }

  if (url.includes('web.whatsapp.com')) {
    chrome.tabs.executeScript(null, writeMgs);
  }
}

chrome.browserAction.onClicked.addListener(() => chrome.runtime.openOptionsPage());
chrome.webNavigation.onCompleted.addListener(openPage);
