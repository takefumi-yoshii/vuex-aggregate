import { mapMutations } from 'vuex'
import { store } from './utils'
import { Types, MapOption, KeyMap } from '../typings/utils.d'
import {
  Mutations,
  Commits,
  MapMutations,
  FromMutationsReturn
} from '../typings/fromMutations.d'

const namespaced: KeyMap = {}

function fromMutations<T extends KeyMap & Mutations<T>>(
  mutations: T,
  namespace: string
): FromMutationsReturn<T> {
  if (
    namespaced[namespace] !== undefined &&
    process.env.NODE_ENV !== 'development'
  ) {
    throw new Error(
      `vuex-aggregate: conflict fromMutations namespace -> ${namespace}`
    )
  } else {
    namespaced[namespace] = namespace
  }
  const mutationTypes: KeyMap = {}
  const commits: KeyMap = {}
  Object.keys(mutations).forEach(key => {
    const type = namespace === '' ? key : `${namespace}/${key}`
    mutationTypes[key] = type
    commits[key] = (payload?: any) => {
      return store.commit(type, payload, { root: true })
    }
  })
  function _mapMutations<O extends MapOption<T>>(mapOption: O) {
    const mapper = mapMutations as any
    return namespace === '' ? mapper(mapOption) : mapper(namespace, mapOption)
  }
  return {
    mutationTypes: mutationTypes as Types<T>,
    commits: commits as Commits<T>,
    mapMutations: _mapMutations as MapMutations<T>
  }
}

export { fromMutations }
