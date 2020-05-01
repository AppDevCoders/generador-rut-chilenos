/* ---------------
// Vuex Store
--------------- */

const store = new Vuex.Store({
  state: {
    ruts: [],
  },
  getters: {
    getRuts: (state) => () => {
      return state.ruts;
    },
  },
  mutations: {
    SET_RUTS(state, value) {
      state.ruts = value || [];
      // console.log('SET_RUTS', state.ruts);
    },
  },
  actions: {
    setRuts(context, value) {
      context.commit("SET_RUTS", value);
    },
  },
});
