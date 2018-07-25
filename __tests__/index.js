import Vue from 'vue'
import Vuex from 'vuex'
import { fromMutations, fromActions, use } from '../dist/index'
Vue.use(Vuex)

// ______________________________________________________
//
// @ Define Modules

const namespace = 'counter'

const stateFactory = injects => ({
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
const { commits, mutationTypes } = fromMutations(mutations, namespace)

const actions = {
  async asyncIncrement() {
    commits.increment()
    return 'asyncIncrement called'
  }
}
const { dispatches, actionTypes } = fromActions(actions, namespace)

const moduleFactory = injects => ({
  namespaced: true,
  state: stateFactory(injects),
  mutations,
  actions
})

const store = new Vuex.Store({
  modules: {
    counter: moduleFactory({ name: 'COUNTER' })
  }
})
use(store)


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
    test('commits has function', () => {
      expect(typeof commits.increment === 'function').toBe(true)
    })
    test('dispatches has function', () => {
      expect(typeof dispatches.asyncIncrement === 'function').toBe(true)
    })
  })

  describe('committer works normally', () => {
    test('count will be increment', () => {
      expect(store.state.counter.count).toEqual(0)
      commits.increment()
      expect(store.state.counter.count).toEqual(1)
    })
  })

  describe('committer return void', () => {
    test('commiter will return undefined', () => {
      const commitReturn = commits.increment()
      expect(commitReturn).toEqual(undefined)
    })
  })

  describe('dispatcher works normally', () => {
    test('count will be increment', () => {
      expect(store.state.counter.count).toEqual(2)
      dispatches.asyncIncrement()
      expect(store.state.counter.count).toEqual(3)
    })
  })

  describe('dispatcher return Promise', () => {
    test('promise resolve then return value', async () => {
      const dispatchReturn = await dispatches.asyncIncrement()
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
