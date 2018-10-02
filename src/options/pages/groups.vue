<template lang="pug">
v-container(fluid grid-list-xl)
  v-form(@submit.prevent="save")
    v-layout(wrap align-center)
      v-flex(xs12 sm12 d-flex)
        v-select(:items="countries" label="Country" v-model="country")

      v-flex(xs12 sm12 d-flex)
        v-text-field(label="Name" v-model="name" required)

      v-flex(xs12 sm12 d-flex)
        v-textarea(label="phones" v-model="phones" append-outer-icon="attach_file" @click:append-outer="sendFile" required)
        input.hidden(type="file" ref="file" @change="handleFile")
    v-btn(color="success" type="submit" :disabled="!isValid") Save

  v-data-table(:headers="tableHeader" :items="groups" hide-actions)
    template(slot="items" slot-scope="props")
      td {{ props.item.country }}
      td {{ props.item.name }}
      td {{ props.item.phones.length }}
      td {{ formattedDatetime(props.item.createdAt) }}
      td
        v-btn(color="error" @click="handleClickRow(props.item)") Destroy

</template>
<script>
  /* eslint-disable no-undef, no-console */

import uuid from 'uuid/v4';
import moment from '../mixins/moment';

export default {
  name: 'Groups',

  mixins: [moment],

  data() {
    return {
      name: '',
      phones: '',
      country: 55,
      file: null,
      tableHeader: [
        { text: 'Country', value: 'country', sortable: false },
        { text: 'Name', value: 'name', sortable: false },
        { text: 'Phones count', value: 'phones', sortable: false },
        { text: 'Created at', value: 'createdAt', sortable: false },
        { text: 'Actions', value: 'id', sortable: false },
      ],
    };
  },

  computed: {
    countries() {
      return [{
        text: 'Brazil (+55)',
        value: '55',
      }];
    },

    validPhones() {
      return this.validatePhones(this.phones) || [];
    },

    groups() {
      return this.$store.state.groups.list || [];
    },

    isValid() {
      return this.validPhones.length && this.name && this.country;
    },
  },

  methods: {
    sendFile() {
      this.$refs.file.click();
    },

    handleClickRow(group) {
      this.$store.dispatch('groups/destroy', group);
    },

    save() {
      if (!this.valid) { return; }

      const group = {
        id: uuid(),
        country: this.country,
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
        this.phones = phones.replace(/\r?\n|\r/g, ' ');
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
