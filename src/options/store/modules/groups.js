
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
      window.chrome.storage.sync.get('groups', ({ groups }) => {
        (groups || []).forEach((group) => {
          commit('ADD', group);
        });
      });
    },

    setChromeStorage({ state }) {
      window.chrome.storage.sync.set({
        groups: state.list
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
