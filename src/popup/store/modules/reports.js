
export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    ADD(state, group) {
      state.list.push(group);
    },

    DESTROY(state, id) {
      state.list = state.list.filter(g => g.id !== id);
    },
  },
  actions: {
    getChromeStorage({ commit }) {
      window.chrome.storage.sync.get('reports', ({ reports }) => {
        reports.forEach((group) => {
          commit('ADD', group);
        });
      });
    },

    setChromeStorage({ state }) {
      window.chrome.storage.sync.set({
        reports: state.list
      });
    },

    add({ commit, dispatch }, group) {
      commit('ADD', group);
      dispatch('setChromeStorage');
    },

    destroy({ commit, dispatch }, group) {
      commit('DESTROY', group.id);
      dispatch('setChromeStorage');
    },
  },
}
