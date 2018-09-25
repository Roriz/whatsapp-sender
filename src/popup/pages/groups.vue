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
      textarea(v-model="phones" rows="10" required)

    span or

    .form-group
      label file
      input(type="file" @change="handleFile")

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
      file: null,
    };
  },

  computed: {
    validPhones() {
      return this.validatePhones(this.phones) || [];
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

    handleFile(e) {
      const [file] = e.target.files;
      const [ext] = file.name.match(/\..*$/gi);

      let promise;
      if (ext === '.txt') {
        promise = this.getFileText(file);
      } else if (ext === '.json') {
        promise = this.getFileJson(file);
      } else {
        return;
      }

      promise.then((phones) => {
        this.phones = phones;
      });
    },

    getFileText(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsText(file);
      });
    },

    getFileJson(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const result = JSON.parse(reader.result);
            resolve(result);
          } catch (e) {
            reject(e);
          }
        };
        reader.readAsText(file);
      });
    },

    validatePhones(phones) {
      return phones.replace(/[^0-9,]/g, '').match(/[0-9]{9}/g) || [];
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
