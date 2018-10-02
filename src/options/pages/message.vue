<template lang="pug">
v-container(fluid grid-list-xl)
  v-form(@submit.prevent="save")
    v-layout(wrap align-center)
      v-flex(xs12 sm12 d-flex)
        v-select(:items="groups" label="Group" v-model="groupId")

      v-flex(xs12 sm12 d-flex)
        v-textarea(label="Message" v-model="message" required)

    v-btn(color="success" type="submit" :disabled="!isValid") Send!
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
      return this.$store.state.groups.list.map(g => ({
        text: g.name,
        value: g.id,
      })) || [];
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
          prefix: this.group.prefix,
          phones: this.group.phones,
          message: this.message,
        },
      });
    },
  },
};
</script>
