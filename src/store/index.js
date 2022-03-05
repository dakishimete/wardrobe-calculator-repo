import Vue from 'vue'
import Vuex from 'vuex'

import { Store } from 'vuex/dist/vuex.common';

import params from './modules/params';
import inner from './modules/inner';
import doors from './modules/doors';
import additional from './modules/additional';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    params,
    inner,
    doors,
    additional
  }
})
