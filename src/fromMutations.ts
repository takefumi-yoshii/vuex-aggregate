import {
  KeyMap,
  Mutations,
  Types,
  Committers,
  FromMutationsReturn
} from '../typings/index.d'

const namespaced: KeyMap = {}

function fromMutations<M extends KeyMap & Mutations<M>>(
  mutations: M,
  namespace: string
): FromMutationsReturn<M> {
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
  const committers: KeyMap = {}
  Object.keys(mutations).forEach(key => {
    const type = `${namespace}/${key}`
    mutationTypes[key] = type
    committers[key] = (commit: Function, payload?: any) => {
      return commit(type, payload, { root: true })
    }
  })
  return {
    mutationTypes: mutationTypes as Types<M>,
    committers: committers as Committers<M>
  }
}

export { fromMutations }
