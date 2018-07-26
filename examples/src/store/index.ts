import Vue from 'vue'
import Vuex from 'vuex'
import * as VuexAggregate from '../../../src'
import { rootFactory } from './root'
import * as Counter from './modules/counter'

// ______________________________________________________

Vue.use(Vuex)

const store = new Vuex.Store({
  ...rootFactory({ name: 'ROOT' }),
  modules: {
    [Counter.namespace]: Counter.moduleFactory({ name: 'COUNTER' })
  }
})

VuexAggregate.use(store) // Required

export { store }
