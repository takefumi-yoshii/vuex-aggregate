import {
  fromMutations,
  fromActions,
  fromGetters,
  Injects,
  Modeler
} from '../../../../src'
import { wait } from '../../utils/promise'

// ______________________________________________________
//
// @ Model

const namespace = 'counter'

interface CounterState {
  count: number
  name: string
  isRunningAutoIncrement: boolean
}

const CounterModel: Modeler<CounterState> = injects => ({
  count: 0,
  name: 'unknown',
  isRunningAutoIncrement: false,
  ...injects
})

// ______________________________________________________
//
// @ Getters

const getters = {
  countLabel(state: CounterState): (unit: string) => string {
    return (unit: string) => {
      return `${state.count} ${unit}`
    }
  },
  expo(state: CounterState): (amount: number) => number {
    return (amount: number) => {
      return state.count ** amount
    }
  },
  autoIncrementLabel(state: CounterState): string {
    const flag = state.isRunningAutoIncrement
    return flag ? 'true' : 'false'
  },
  nameLabel(state: CounterState): string {
    return `my name is ${state.name}`
  }
}
const { proxyGetters, proxyMapGetters } = fromGetters(getters, namespace)

// ______________________________________________________
//
// @ Mutations

const mutations = {
  increment(state: CounterState): void {
    state.count++
  },
  decrement(state: CounterState): void {
    state.count--
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
const { committers, mutationTypes, proxyMapMutations } = fromMutations(
  mutations,
  namespace
)

// ______________________________________________________
//
// @ Actions

const actions = {
  async asyncIncrement({ commit }: { commit: Function }, duration: number) {
    await wait(duration)
    committers.increment(commit)
  },
  async toggleAutoIncrement(
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
const { dispatchers, actionTypes, proxyMapActions } = fromActions(
  actions,
  namespace
)

// ______________________________________________________
//
// @ ModuleFactory

const CounterModule = (injects?: Injects<CounterState>) => ({
  namespaced: true, // Required
  state: CounterModel(injects),
  getters,
  mutations,
  actions
})

export {
  CounterState,
  CounterModule,
  mutationTypes,
  actionTypes,
  committers,
  dispatchers,
  proxyGetters,
  proxyMapGetters,
  proxyMapMutations,
  proxyMapActions
}
