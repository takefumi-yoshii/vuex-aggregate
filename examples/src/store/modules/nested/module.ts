import {
  fromState,
  fromMutations,
  fromGetters,
  Injects,
  StateFactory
} from 'vuex-aggregate'

// ______________________________________________________
//
// @ State

const namespace = 'nested/module' // Nested module like nameSpace.

interface State {
  name: string
}
const state = {
  name: 'unknown',
}
const stateFactory: StateFactory<State> = injects => ({ ...state, ...injects })
const { mapState } = fromState(state, namespace)

// ______________________________________________________
//
// @ Getters

const _getters = {
  nameLabel(state: State): string {
    return `nested module name is ${state.name}`
  }
}
const { getters, mapGetters } = fromGetters(_getters, namespace)

// ______________________________________________________
//
// @ Mutations

const mutations = {
  setName(state: State, name: string): void {
    state.name = name
  }
}
const { commits, mutationTypes, mapMutations } = fromMutations(
  mutations,
  namespace
)

// ______________________________________________________
//
// @ RootFactory

const moduleFactory = (injects?: Injects<State>) => ({
  namespaced: true, // Required
  state: stateFactory(injects),
  getters: _getters,
  mutations,
  // modules: Don't use nested modules. if you need them, resolve in file namespace.
})

export {
  State,
  state,
  stateFactory,
  namespace,
  moduleFactory,
  mutationTypes,
  commits,
  mapState,
  getters,
  mapGetters,
  mapMutations
}
