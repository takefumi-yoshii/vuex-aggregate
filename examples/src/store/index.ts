import Vue from 'vue'
import Vuex from 'vuex'
import * as VuexAggregate from '../../../src'
import * as Counter from './modules/counter'

// ______________________________________________________
//
// @ Types

interface StoreState {
  counter: Counter.State
}
interface Store {
  state: StoreState
}
interface BoundsStore {
  $store: Store
}

// ______________________________________________________

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    [Counter.namespace]: Counter.moduleFactory({ name: 'COUNTER' })
  }
})

VuexAggregate.use(store)

export { StoreState, Store, BoundsStore, store }
