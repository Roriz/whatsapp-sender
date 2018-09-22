<template lang="pug">
div.ws-page
  form(@submit.prevent="handleSubmit")
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
        th Phones
        th Created at

    tbody
      tr(v-for="(group, key) in groups" :key="key" @click="handleClickRow(group)")
        td {{ group.name }}
        td {{ group.phones.length }}
        td.action
          span {{ group.createdAt }}
          button.btn.btn-danger Click to remove

</template>
<script>
import '../../stylesheet/main.css';
import uuid from 'uuid/v4';

export default {
  name: 'Groups',

  data() {
    return {
      name: '',
      phones: '',
      groups: [],
    };
  },

  computed: {
    validPhones() {
      return this.phones.replace(/[^0-9,]/g, '').match(/[0-9]{9}/g) || [];
    },
  },

  mounted() {
    this.populate();
  },

  methods: {
    handleClickRow(group) {
      this.groups = this.groups.filter(g => g.id !== group.id);

      window.chrome.storage.sync.set({ groups: this.groups });
    },

    handleSubmit() {
      this.groups.push({
        id: uuid(),
        name: this.name,
        phones: this.validPhones,
        createdAt: new Date().getTime(),
      });
      window.chrome.storage.sync.set({ groups: this.groups });
    },

    populate() {
      window.chrome.storage.sync.get('groups', (storage) => {
        this.groups = storage.groups || [];
      });
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
