import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import generator from './modules/generator'
import lobby from './modules/lobby'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    generator,
    lobby
  }
})
