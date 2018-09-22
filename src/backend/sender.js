
/* eslint-disable no-undef, no-console */

const WHATSAPP_URL = 'https://web.whatsapp.com/send';
const link = document.createElement('a');
link.target = '_blank';

module.exports = class Sender {
  get currentPhone() {
    return this.phones[this.queuePos];
  }
  get hasDone() {
    return !(this.queuePos in this.phones);
  }

  constructor({ prefix = '', message, phones }) {
    this.prefix = prefix;
    this.message = message;
    this.phones = phones;
    this.queuePos = 0;

    this.next();
  }

  next() {
    if (this.hasDone) {
      this.finish();
    } else {
      this.openBrowser(`${this.prefix}${this.currentPhone}`, this.message);
    }

    this.queuePos += 1;
  }

  openBrowser(phone, message) {
    const queryParam = encodeURI(`phone=${phone}&text=${message}`);
    link.href = `${WHATSAPP_URL}?${queryParam}`;
    link.click();
  }
}
