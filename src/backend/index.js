/* eslint-disable no-undef, no-console */

const Sender = require('./sender');
const ClickToSend = require('./click-to-send');


function openPage({ url, tabId }) {
  if (url.includes('web.whatsapp.com')) {
    chrome.tabs.executeScript(tabId, { code: `(${ClickToSend})();` });
  }
}

const events = {
  'ws-start': startSender,
  'ws-finish': finishSender,
  'ws-success': successSender,
  'ws-invalid': invalidSender,
};

function onMessage(obj) {
  if (typeof obj !== 'object' || !obj.type.includes('ws-')) { return; }

  const event = events[obj.type];
  if (event) {
    event(obj.params);
  } else {
    throw new Error('mgs-not-found');
  }
}

let sender;
function startSender(params) {
  sender = new Sender(params);
}

function finishSender() {
  console.log('finish');
}

function successSender() {
  sender.feedback('success');
}

function invalidSender() {
  sender.feedback('invalid');
}

function onRemoved() {
  if (!sender) { return; }
  sender.next();
}

chrome.tabs.onRemoved.addListener(onRemoved);
chrome.webNavigation.onCompleted.addListener(openPage);
chrome.runtime.onMessage.addListener(onMessage);
