import { fromMutations, fromActions, Injects, Modeler } from 'vuex-aggregate'
import { wait } from '../../utils/promise'

// ______________________________________________________
//
// @ Model

export const namespace = 'counter'

export interface CounterState {
  count: number
  name: string
}

const CounterModel: Modeler<CounterState> = injects => ({
  count: 0,
  name: 'my name',
  ...injects
})

// ______________________________________________________
//
// @ Mutations

const mutations = {
  increment(state: CounterState): void {
    state.count++
  },
  setCount(state: CounterState, count: number): void {
    state.count = count
  },
  setName(state: CounterState, name: string): void {
    state.name = name
  }
}

export const { committers, commitTypes } = fromMutations(mutations, namespace)

// ______________________________________________________
//
// @ Actions

const actions = {
  async asyncIncrement(store: any, duration: number) {
    await wait(duration)
    committers.increment(store)
  }
}

export const { dispatchers, dispatchTypes } = fromActions(actions, namespace)

// ______________________________________________________
//
// @ ModuleFactory

export const CounterModule = (injects?: Injects<CounterState>) => ({
  namespaced: true, // Required
  state: CounterModel(injects),
  mutations,
  actions
})
