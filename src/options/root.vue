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
export default {
  name: 'Options',

  data() {
    return {
      prefix: '5561',
      phones: '83798207',
      message: 'Test',
    };
  },

  methods: {
    handleSubmit() {
      const phones = this.phones.split(',');

      const link = document.createElement('a');
      link.href = `https://api.whatsapp.com/send?phone=${this.prefix}${phones[0]}&text=${this.message}`;
      link.target = '_blank';
      link.click();
    },
  },
};
</script>
