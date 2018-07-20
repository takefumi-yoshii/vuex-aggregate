import Vue from 'vue'
import Vuex from 'vuex'
import { CounterModule, CounterState } from './modules/counter'

// ______________________________________________________
//
// @ Types

export interface StoreState {
  counter: CounterState
}
export interface Store {
  state: StoreState
  commit: Function
  dispatch: Function
}
export interface BoundsStore {
  $store: Store
}

// ______________________________________________________

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    counter: CounterModule({ name: 'COUNTER' })
  }
})
