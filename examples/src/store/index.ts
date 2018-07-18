import Vue from 'vue'
import Vuex from 'vuex'
import { CounterModule, CounterState } from './modules/counter'

// ______________________________________________________
//
// @ Types

export interface StoreState {
  counter: CounterState
}
export interface BoundsStore {
  $store: {
    state: StoreState
    commit: (type: string, payload?: any) => void
  }
}

// ______________________________________________________

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    counter: CounterModule({ name: 'COUNTER' })
  }
})
