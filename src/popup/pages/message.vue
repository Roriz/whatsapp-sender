<template lang="pug">
div.ws-page
  form(@submit.prevent="handleSubmit")
    .form-group
      label Prefix
      input.form-control(placeholder="5511" v-model="prefix")
    .form-group
      label Phone numbers
      textarea.form-control(rows=8 placeholder="912345678,912345679" v-model="phones")
    .form-group
      label Message
      textarea.form-control(rows=8 placeholder="Hi, thanks for using this  extention" v-model="message")

      button.btn.btn-primary(type="submit") Send to {{ validPhones.length }} phones!
</template>

<script>
import '../../stylesheet/main.css';

export default {
  name: 'Message',

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
      window.chrome.runtime.sendMessage({
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

<style scoped>
</style>
