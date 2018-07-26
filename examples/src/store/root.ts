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

const namespace = '' // Root NameSpace required blank.

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
    return `root name is ${state.name}`
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

const rootFactory = (injects?: Injects<State>) => ({
  state: stateFactory(injects),
  getters: _getters,
  mutations
})

export {
  State,
  state,
  stateFactory,
  namespace,
  rootFactory,
  mutationTypes,
  commits,
  mapState,
  getters,
  mapGetters,
  mapMutations
}
