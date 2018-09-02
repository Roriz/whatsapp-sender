import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'

import root from './root.vue'

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(root)
})
