import Vue from 'vue'
import Vuex from 'vuex'
import { fromMutations, fromActions } from '../dist/index'
Vue.use(Vuex)

// ______________________________________________________
//
// @ Define Modules

const namespace = 'counter'

const CounterModel = injects => ({
  count: 0,
  name: 'my name',
  ...injects
})

const mutations = {
  increment(state) {
    state.count++
  },
  decrement(state) {
    state.count--
  },
  setCount(state, count) {
    state.count = count
  },
  setName(state, name) {
    state.name = name
  }
}
const { committers, mutationTypes } = fromMutations(mutations, namespace)

const actions = {
  async asyncIncrement(store, duration) {
    committers.increment(store)
  }
}
const { dispatchers, actionTypes } = fromActions(actions, namespace)

const CounterModule = injects => ({
  namespaced: true,
  state: CounterModel(injects),
  mutations,
  actions
})

function createStore () {
  return new Vuex.Store({
    modules: {
      counter: CounterModule({ name: 'COUNTER' })
    }
  })
}

// ______________________________________________________
//
// @ Tests

describe('vuex-aggregate', () => {

  describe('generated modules properties', () => {
    test('mutation types has namespaced value', () => {
      expect(mutationTypes.increment).toEqual(`${namespace}/increment`)
    })
    test('action types has namespaced value', () => {
      expect(actionTypes.asyncIncrement).toEqual(`${namespace}/asyncIncrement`)
    })
    test('committers has function', () => {
      expect(typeof committers.increment === 'function').toBe(true)
    })
    test('dispatchers has function', () => {
      expect(typeof dispatchers.asyncIncrement === 'function').toBe(true)
    })
  })

  describe('committers', () => {
    const store = createStore()
    test('generated committer behavior', () => {
      expect(store.state.counter.count).toEqual(0)
      committers.increment(store)
      expect(store.state.counter.count).toEqual(1)
      committers.decrement(store)
      expect(store.state.counter.count).toEqual(0)
    })
  })

  describe('dispatchers', () => {
    test('generated dispatcher behavior', () => {
      const store = createStore()
      expect(store.state.counter.count).toEqual(0)
      dispatchers.asyncIncrement(store)
      expect(store.state.counter.count).toEqual(1)
    })
  })

  describe('raise error', () => {
    test('conflict namespace', () => {
      const conflictHandler = () => fromMutations(mutations, namespace)
      expect(conflictHandler).toThrow()
    })
  })
})
