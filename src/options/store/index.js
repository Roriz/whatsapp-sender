
import Vue from 'vue';
import Vuex from 'vuex';

import groups from './modules/groups';
import reports from './modules/reports';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  modules: {
    groups,
    reports,
  },
});
