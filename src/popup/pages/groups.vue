<template lang="pug">
div.ws-page
  form(@submit.prevent="handleSubmit")
    .form-group
      label Prefix
      input.form-control(placeholder="5511" v-model="prefix")

    .form-group
      label name
      input(v-model="name" required)

    .form-group
      label phones
      textarea(v-model="phones" required)

    button.btn.btn-primary(type="submit") Save

  table
    thead
      tr
        th Name
        th Prefix
        th Phones count
        th Created at

    tbody
      tr(v-for="(group, key) in groups" :key="key" @click="handleClickRow(group)")
        td {{ group.name }}
        td {{ group.prefix }}
        td {{ group.phones.length }}
        td.action
          span {{ group.createdAt }}
          button.btn.btn-danger Click to remove

</template>
<script>
  /* eslint-disable no-undef, no-console */

import '../../stylesheet/main.css';
import uuid from 'uuid/v4';

export default {
  name: 'Groups',

  data() {
    return {
      name: '',
      phones: '',
      prefix: '',
      groups: [],
    };
  },

  computed: {
    validPhones() {
      return this.phones.replace(/[^0-9,]/g, '').match(/[0-9]{9}/g) || [];
    },
  },

  mounted() {
    this.groups = this.$store.state.groups.list || [];
  },

  methods: {
    handleClickRow(group) {
      this.$store.dispatch('groups/destroy', group);
    },

    handleSubmit() {
      const group = {
        id: uuid(),
        prefix: this.prefix,
        name: this.name,
        phones: this.validPhones,
        createdAt: new Date().getTime(),
      };

      this.$store.dispatch('groups/add', group);
      this.$forceUpdate();
    },
  },
};
</script>
 <style scoped>

table tbody tr .action .btn {
  display: none;
}

table tbody tr:hover .action span {
  display: none;
}

table tbody tr:hover .action .btn {
  display: block;
}

 </style>
