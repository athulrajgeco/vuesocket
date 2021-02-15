import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminAuth: false
  },
  mutations: {
    changeAuth: (state, payload)=>{
      if(payload == 'admin'){
        state.adminAuth = !state.adminAuth
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
