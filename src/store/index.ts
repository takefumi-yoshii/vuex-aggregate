import Vue from 'vue'
import Vuex from 'vuex'
import counter, { CounterState } from './modules/counter'

// ______________________________________________________
//
// @ Types

export interface StoreState {
  counter: CounterState
}
export interface VuexBounds {
  $store: {
    state: StoreState
    commit: (type: string, payload?: any) => void
  }
}

// ______________________________________________________

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    counter: counter({ name: 'COUNTER' })
  }
})
