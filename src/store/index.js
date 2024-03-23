import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   state () {
    return {
      accessToken: null,
      msalApp: null,
      logindata: null,
      axios: null,
      rooms:{},
      sessionId: null,
      msalAccount: null,
      clientId: null,
      assessmentData: {},
    }
  },
  mutations: {
    assessmentDataChange(state, payload){
      const modifyPayload = {
        ...state.assessmentData,
        ...payload,
      };

      state.assessmentData = modifyPayload;
      
      localStorage.setItem('assessmentData', JSON.stringify(modifyPayload));
    },
    accessToken(state, payload) {
      state.accessToken = payload;
   },
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
      state.assessment_client_name = payload;
    },
    assessment_date(state, payload){
      state.assessment_date = payload;
    }
  },
  actions: {
    
  }
})
