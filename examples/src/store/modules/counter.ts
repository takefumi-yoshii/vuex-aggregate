import { fromMutations, fromActions, Injects, Modeler } from '../../../../src'
import { wait } from '../../utils/promise'

// ______________________________________________________
//
// @ Model

export const namespace = 'counter'

export interface CounterState {
  count: number
  name: string
  isRunningAutoIncrement: boolean
}

const CounterModel: Modeler<CounterState> = injects => ({
  count: 0,
  name: 'my name',
  isRunningAutoIncrement: false,
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
  },
  setRunningAutoIncrement(state: CounterState, flag: boolean): void {
    state.isRunningAutoIncrement = flag
  }
}

export const { committers, mutationTypes } = fromMutations(mutations, namespace)

// ______________________________________________________
//
// @ Actions

const actions = {
  async asyncIncrement({ commit }: { commit: Function }, duration: number) {
    await wait(duration)
    committers.increment(commit)
  },
  async startAutoIncrement(
    { commit, state }: { commit: Function; state: CounterState },
    { duration, flag }: { duration: number; flag: boolean }
  ) {
    committers.setRunningAutoIncrement(commit, flag)
    while (true) {
      if (!state.isRunningAutoIncrement) break
      await wait(duration)
      committers.increment(commit)
    }
  }
}

export const { dispatchers, actionTypes } = fromActions(actions, namespace)

// ______________________________________________________
//
// @ ModuleFactory

export const CounterModule = (injects?: Injects<CounterState>) => ({
  namespaced: true, // Required
  state: CounterModel(injects),
  mutations,
  actions
})
