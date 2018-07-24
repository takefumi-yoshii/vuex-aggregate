import Vue from 'vue'
import Vuex from 'vuex'
import * as Counter from './modules/counter'

// ______________________________________________________
//
// @ Types

export interface StoreState {
  counter: Counter.State
}
export interface Store {
  state: StoreState
  commit: Function
  dispatch: Function
  getters: any
}
export interface BoundsStore {
  $store: Store
}

// ______________________________________________________

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    [Counter.namespace]: Counter.moduleFactory({ name: 'COUNTER' })
  }
})
