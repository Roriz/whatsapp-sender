<template lang="pug">
  form(@submit.prevent="handleSubmit")
    .form-group
      label Prefix
      input.form-control(placeholder="5511" v-model="prefix")
    .form-group
      label Phone numbers
      textarea.form-control(placeholder="953664050,953664051" v-model="phones")
    .form-group
      label Message
      textarea.form-control(placeholder="Hi, thanks for using this  extention" v-model="message")

      button.btn.btn-primary(type="submit") Send!
</template>
<script>
/* eslint-disable no-undef, no-console */

import { compact, trim } from 'lodash';

const WHATSAPP_URL = 'https://api.whatsapp.com/send';
const link = document.createElement('a');
link.target = '_blank';

export default {
  name: 'Options',

  data() {
    return {
      prefix: '5561',
      phones: '83798207',
      message: 'Test',
      queue: [],
    };
  },

  mounted() {
    window.addEventListener('focus', this.sendNext);
  },

  methods: {
    handleSubmit() {
      this.queue = compact(this.phones.split(',').map(p => trim(p)));
      this.sendNext();
    },

    sendNext() {
      const phone = this.queue.pop();
      if (phone) {
        link.href = `${WHATSAPP_URL}?phone=${this.prefix}${phone}&text=${this.message}`;
        link.click();
      }
    }
  },
};
</script>
