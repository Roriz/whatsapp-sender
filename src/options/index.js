import Vue from 'vue';
import store from './store';
import './plugins/vuetify';
import app from './index.vue';
import '../stylesheet/main.css';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#root',

  store,

  render: h => h(app)
})
