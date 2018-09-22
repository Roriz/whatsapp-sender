import Vue from 'vue'
import store from './store'
import app from './index.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#root',

  store,

  render: h => h(app)
})
