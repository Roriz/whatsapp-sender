/* eslint-disable no-undef, no-console */

const Sender = require('./sender');

module.exports = class EventOrchestrator {
  constructor() {
    this.sender = null;
    this.startTime = new Date();
    this.report = {
      success: 0,
      fail: 0,
      invalid: 0,
    };
    this.invalidPhones = [];

    this.addListeners();
  }

  addListeners() {
    window.chrome.runtime.onMessage.addListener((...args) => this.listener(...args));
  }

  listener(obj) {
    if (typeof obj !== 'object' || !obj.type.includes('ws-')) { return; }

    const methodName = obj.type.replace(/(ws-)/gi, '')
    if (this[methodName]) {
      this[methodName](obj.params);
    } else {
      throw new Error('invalid-event');
    }
  }

  start(params) {
    this.sender = new Sender(params);
  }

  success() {
    this.report.success += 1;
    this.next();
  }

  invalid() {
    this.report.invalid += 1;
    this.invalidPhones.push(this.sender.currentPhone);
    this.next();
  }

  fail() {
    this.report.fail += 1;
    this.next();
  }

  next() {
    if (this.sender.hasDone) {
      this.finish();
    } else {
      this.sender.next();
    }
  }

  async finish() {
    chrome.storage.sync.get(['reports'], (storage) => {
      const reports = (storage.reports || []);

      reports.push({
        prefix: this.sender.prefix,
        message: this.sender.message,
        phones: this.sender.phones,
        duration: new Date() - this.startTime,
        success: this.report.success,
        fail: this.report.fail,
        invalid: this.report.invalid,
        invalidPhones: this.invalidPhones,
        createdAt: new Date(),
      });

      chrome.storage.sync.set({ reports });
    });

  }
}
