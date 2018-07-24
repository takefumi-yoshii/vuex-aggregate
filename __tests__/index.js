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
const { inferCommit, mutationTypes } = fromMutations(mutations, namespace)

const actions = {
  async asyncIncrement({ commit }, duration) {
    inferCommit.increment(commit)
    return 'asyncIncrement called'
  }
}
const { inferDispatch, actionTypes } = fromActions(actions, namespace)

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
    test('inferCommit has function', () => {
      expect(typeof inferCommit.increment === 'function').toBe(true)
    })
    test('inferDispatch has function', () => {
      expect(typeof inferDispatch.asyncIncrement === 'function').toBe(true)
    })
  })

  describe('committer works normally', () => {
    const store = createStore()
    test('count will be increment', () => {
      expect(store.state.counter.count).toEqual(0)
      inferCommit.increment(store.commit)
      expect(store.state.counter.count).toEqual(1)
    })
  })

  describe('committer return void', () => {
    const store = createStore()
    test('commiter will return undefined', () => {
      const commitReturn = inferCommit.increment(store.commit)
      expect(commitReturn).toEqual(undefined)
    })
  })

  describe('dispatcher works normally', () => {
    const store = createStore()
    test('count will be increment', () => {
      expect(store.state.counter.count).toEqual(0)
      inferDispatch.asyncIncrement(store.dispatch)
      expect(store.state.counter.count).toEqual(1)
    })
  })

  describe('dispatcher return Promise', () => {
    const store = createStore()
    test('promise resolve then return value', async () => {
      const dispatchReturn = await inferDispatch.asyncIncrement(store.dispatch)
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
