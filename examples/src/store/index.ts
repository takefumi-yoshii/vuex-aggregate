import Vue from 'vue'
import Vuex from 'vuex'
import * as VuexAggregate from 'vuex-aggregate'
import { rootFactory } from './root'
import * as Counter from './modules/counter'
import * as NestedModule from './modules/nested/module'

// ______________________________________________________

Vue.use(Vuex)

const store = new Vuex.Store({
  ...rootFactory({ name: 'ROOT' }),
  modules: {
    [Counter.namespace]: Counter.moduleFactory({ name: 'COUNTER' }),
    [NestedModule.namespace]: NestedModule.moduleFactory({ name: 'NESTED_MODULE' })
  }
})

VuexAggregate.use(store) // Required

export { store }
