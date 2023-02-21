import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   state () {
    return {
      msalApp: null,
      logindata: null,
      axios: null,
      rooms:{},
      sessionId: null,
      msalAccount: null,
      clientId: null
    }
  },
  mutations: {
    msalApp(state, payload) {
       state.msalApp = payload;
    },
    logindata(state, payload) {
        state.logindata = payload;
    },
    axios(state, payload) {
        state.axios = payload;
    },
    rooms(state, payload) {
      state.rooms = payload;
    },
    sessionId(state, payload) {
      state.sessionId = payload;
    },

    clientId(state, payload) {
      state.clientId = payload;
    },
    msalAccount(state, payload) {
      state.msalAccount = payload;
    },
    assessment_client_id(state, payload){
      state.assessment_client_id = payload;
    },
    assessment_client_name(state, payload){
      state.assessment_client_id = payload;
    }
  },
  actions: {
    
  }
})
