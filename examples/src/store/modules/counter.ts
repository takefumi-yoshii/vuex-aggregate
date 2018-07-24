import {
  fromState,
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

interface State {
  count: number
  name: string
  isRunningAutoIncrement: boolean
}
const Model: Modeler<State> = injects => ({
  count: 0,
  name: 'unknown',
  isRunningAutoIncrement: false,
  ...injects
})
const { proxyMapState } = fromState(Model(), namespace)

// ______________________________________________________
//
// @ Getters

const getters = {
  nameLabel(state: State): string {
    return `my name is ${state.name}`
  },
  autoIncrementLabel(state: State): string {
    const flag = state.isRunningAutoIncrement
    return flag ? 'true' : 'false'
  },
  countLabel(state: State): (unit: string) => string {
    return unit => {
      return `${state.count} ${unit}`
    }
  },
  expo(state: State): (amount: number) => number {
    return amount => {
      return state.count ** amount
    }
  }
}
const { proxyGetters, proxyMapGetters } = fromGetters(getters, namespace)

// ______________________________________________________
//
// @ Mutations

const mutations = {
  increment(state: State): void {
    state.count++
  },
  decrement(state: State): void {
    state.count--
  },
  setCount(state: State, count: number): void {
    state.count = count
  },
  setName(state: State, name: string): void {
    state.name = name
  },
  setRunningAutoIncrement(state: State, flag: boolean): void {
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
    { commit, state }: { commit: Function; state: State },
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

const moduleFactory = (injects?: Injects<State>) => ({
  namespaced: true, // Required
  state: Model(injects),
  getters,
  mutations,
  actions
})

export {
  State,
  namespace,
  moduleFactory,
  mutationTypes,
  actionTypes,
  committers,
  dispatchers,
  proxyMapState,
  proxyGetters,
  proxyMapGetters,
  proxyMapMutations,
  proxyMapActions
}
