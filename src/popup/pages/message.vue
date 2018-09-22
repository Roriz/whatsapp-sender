<template lang="pug">
div.ws-page
  form(@submit.prevent="handleSubmit")
    .form-group
      label Group
      select(v-model="groupId")
        option(value="") Select one group
        option(v-for="group in groups" :key="group.id" :value="group.id") {{ group.name }} ({{ group.phones.length }} phones)
    .form-group
      label Message
      textarea.form-control(rows=8 placeholder="Hi, thanks for using this  extention" v-model="message")

      button.btn.btn-primary(type="submit" :disabled="!isValid") Send!
</template>

<script>
  /* eslint-disable no-undef, no-console */

import '../../stylesheet/main.css';

export default {
  name: 'Message',

  data() {
    return {
      message: '',
      groupId: '',
    };
  },

  computed: {
    groups() {
      return this.$store.state.groups.list || [];
    },

    group() {
      return this.groups.find(g => g.id === this.groupId) || {};
    },

    isValid() {
      return this.message && this.groupId;
    },
  },

  methods: {
    handleSubmit() {
      window.chrome.runtime.sendMessage({
        type: 'ws-start',
        params: {
          group: this.group,
          phones: this.validPhones,
        },
      });
    },
  },
};
</script>

<style scoped>
</style>
