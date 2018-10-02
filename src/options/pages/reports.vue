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
export default {
  name: 'Reports',

  data() {
    return {
      reports: [],
    };
  },

  mounted() {
    this.reports = this.$store.state.reports.list || [];
  },
}
</script>
