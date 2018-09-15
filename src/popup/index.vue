<template lang="pug">
form(@submit.prevent="handleSubmit")
  .form-group
    label Prefix
    input.form-control(placeholder="5511" v-model="prefix")
  .form-group
    label Phone numbers
    textarea.form-control(placeholder="912345678,912345679" v-model="phones")
  .form-group
    label Message
    textarea.form-control(placeholder="Hi, thanks for using this  extention" v-model="message")

    button.btn.btn-primary(type="submit") Send to {{ validPhones.length }} phones!
</template>
<script>
/* eslint-disable no-undef, no-console */

export default {
  name: 'Options',

  data() {
    return {
      prefix: '5561',
      phones: '983791111',
      message: 'test',
      queue: [],
    };
  },

  computed: {
    validPhones() {
      return this.phones.replace(/[^0-9,]/g, '').match(/[0-9]{9}/g) || [];
    },
  },

  methods: {
    handleSubmit() {
      chrome.runtime.sendMessage({
        type: 'ws-start',
        params: {
          prefix: this.prefix,
          message: this.message,
          phones: this.validPhones,
        },
      });
    },
  },
};
</script>
