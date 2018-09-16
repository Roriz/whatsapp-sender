<template lang="pug">

table
  thead
    tr
      th Date
      th Message
      th Duration
      th Success
      th Invalid

  tbody
    tr(v-for="(report, key) in reports" :key="key")
      td {{ report.createdAt }}
      td {{ report.message }}
      td {{ report.duration / 1000 }}s
      td {{ report.success }}
      td {{ report.invalid }}


</template>

<script>
/* eslint-disable no-undef, no-console */
export default {
  name: 'Reports',

  data() {
    return {
      reports: [],
    };
  },

  mounted() {
    this.populate();
  },

  methods: {
    populate() {
      window.chrome.storage.sync.get('reports', (storage) => {
        this.reports = storage.reports;
      });
    },
  },
}
</script>

<style scoped>

table {
  width: 100%
}

</style>
