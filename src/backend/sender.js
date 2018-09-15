
const WHATSAPP_URL = 'https://web.whatsapp.com/send';
const link = document.createElement('a');
link.target = '_blank';

module.exports = class Sender {
  constructor({ prefix = '', message, phones }) {
    this.prefix = prefix;
    this.message = message;
    this.phones = phones;
    this.queuePos = 0;
    this.report = {
      success: 0,
      error: 0,
      invalid: 0,
    };

    this.next();
  }

  next() {
    const phone = this.phones[this.queuePos];
    if (phone) {
      this.openBrowser(`${this.prefix}${phone}`, this.message);
      this.queuePos += 1;
    } else {
      this.finish();
    }
  }

  feedback(type) {
    this.report[type] = this.report[type] ? this.report[type] + 1 : 1;
  }

  openBrowser(phone, message) {
    link.href = `${WHATSAPP_URL}?phone=${phone}&text=${message}`;
    link.click();
  }

  finish() {
    window.chrome.runtime.sendMessage({ type: 'ws-finish' });
  }
}