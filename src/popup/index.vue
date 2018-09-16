<template lang="pug">
div#app
  ul.menu
    li(v-for="(item, key) in menu", :key="key", @click="handleMenu(item)") {{ item.name }}

  div.content
    keep-alive
      component(:is="container")
</template>
<script>
import Message from './components/message';
import Groups from './components/groups';
import Reports from './components/reports';

export default {
  name: 'Popup',

  components: {
    Message,
    Groups,
    Reports,
  },

  props: {
    menu: {
      type: Array,
      default: () => ([{
        name: 'Send message',
        component: 'message',
      }, {
        name: 'Manager Groups',
        component: 'groups',
      }, {
        name: 'Reports',
        component: 'reports',
      }])
    }
  },

  data() {
    return {
      activeContent: this.menu[0],
    };
  },

  computed: {
    container() {
      return this.activeContent.component;
    },
  },

  methods: {
    handleMenu(item) {
      this.activeContent = item;
    },
  },
};
</script>

<style scoped>

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: row;
  min-width: 700px;
  min-height: 500px;
}

.menu li {
  padding: 10px 20px;
}

.menu li + li {
  border-top: 1px solid #ccc;
}

.content {
  flex-grow: 1;
}

.menu + .content {
  margin-left: 40px;
}

</style>
