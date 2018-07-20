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
  async asyncIncrement({ commit }, duration) {
    committers.increment(commit)
    return 'asyncIncrement called'
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

  describe('committer works normally', () => {
    const store = createStore()
    test('count will be increment', () => {
      expect(store.state.counter.count).toEqual(0)
      committers.increment(store.commit)
      expect(store.state.counter.count).toEqual(1)
    })
  })

  describe('committer return void', () => {
    const store = createStore()
    test('commiter will return undefined', () => {
      const commitReturn = committers.increment(store.commit)
      expect(commitReturn).toEqual(undefined)
    })
  })

  describe('dispatcher works normally', () => {
    const store = createStore()
    test('count will be increment', () => {
      expect(store.state.counter.count).toEqual(0)
      dispatchers.asyncIncrement(store.dispatch)
      expect(store.state.counter.count).toEqual(1)
    })
  })

  describe('dispatcher return Promise', () => {
    const store = createStore()
    test('promise resolve then return value', async () => {
      const dispatchReturn = await dispatchers.asyncIncrement(store.dispatch)
      expect(dispatchReturn).toEqual('asyncIncrement called')
    })
  })

  describe('raise error', () => {
    test('conflict namespace', () => {
      const conflictHandler = () => fromMutations(mutations, namespace)
      expect(conflictHandler).toThrow()
    })
  })
})
