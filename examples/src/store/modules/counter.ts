import {
  fromState,
  fromMutations,
  fromActions,
  fromGetters,
  Injects,
  StateFactory
} from '../../../../src'
import { wait } from '../../utils/promise'
import * as Root from '../root'

// ______________________________________________________
//
// @ State

const namespace = 'counter'

interface State {
  count: number
  name: string
  isRunningAutoIncrement: boolean
}
const stateFactory: StateFactory<State> = injects => ({
  count: 0,
  name: 'unknown',
  isRunningAutoIncrement: false,
  ...injects
})
const { mapState } = fromState(stateFactory(), namespace)

// ______________________________________________________
//
// @ Getters

const _getters = {
  nameLabel(
    state: State,
    getters: any,
    rootState = Root.state, // initial props for InferredType
    rootGetters = Root.getters // initial props for InferredType
  ): string {
    console.log(`root name is ${rootState.name}. rootGetters nameLabel = ${rootGetters.nameLabel}`)
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
const { getters, mapGetters } = fromGetters(_getters, namespace)

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
const { commits, mutationTypes, mapMutations } = fromMutations(
  mutations,
  namespace
)

// ______________________________________________________
//
// @ Actions

const actions = {
  async asyncIncrement() {
    await wait(1000)
    commits.increment()
  },
  async toggleAutoIncrement(
    { state }: { state: State },
    { duration }: { duration: number }
  ) {
    const flag = !state.isRunningAutoIncrement
    commits.setRunningAutoIncrement(flag)
    while (true) {
      if (!state.isRunningAutoIncrement) break
      await wait(duration)
      commits.increment()
    }
  }
}
const { dispatches, actionTypes, mapActions } = fromActions(actions, namespace)

// ______________________________________________________
//
// @ ModuleFactory

const moduleFactory = (injects?: Injects<State>) => ({
  namespaced: true, // Required
  state: stateFactory(injects),
  getters: _getters,
  mutations,
  actions,
  // modules: Don't use nested modules. if you need them, resolve in file namespace.
})

export {
  State,
  namespace,
  moduleFactory,
  mutationTypes,
  actionTypes,
  commits,
  dispatches,
  mapState,
  getters,
  mapGetters,
  mapMutations,
  mapActions
}
