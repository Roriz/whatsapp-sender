import Vue from 'vue'
import app from './index.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(app)
})