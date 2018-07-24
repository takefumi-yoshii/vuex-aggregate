import { mapMutations } from 'vuex'
import { Types, MapHelperOption, KeyMap } from '../typings/utils.d'
import {
  Mutations,
  InferCommit,
  InferMapMutations,
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
  const inferCommit: KeyMap = {}
  Object.keys(mutations).forEach(key => {
    const type = `${namespace}/${key}`
    mutationTypes[key] = type
    inferCommit[key] = (commit: Function, payload?: any) => {
      return commit(type, payload, { root: true })
    }
  })
  function inferMapMutations<O extends MapHelperOption<T>>(mapHelperOption: O) {
    const mapper = mapMutations as any
    return mapper(namespace, mapHelperOption)
  }
  return {
    mutationTypes: mutationTypes as Types<T>,
    inferCommit: inferCommit as InferCommit<T>,
    inferMapMutations: inferMapMutations as InferMapMutations<T>
  }
}

export { fromMutations }
