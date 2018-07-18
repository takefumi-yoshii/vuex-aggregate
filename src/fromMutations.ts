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
  const commitTypes: KeyMap = {}
  const committers: KeyMap = {}
  Object.keys(mutations).forEach(key => {
    const type = `${namespace}/${key}`
    commitTypes[key] = type
    committers[key] = (store: any, payload?: any) => {
      store.commit(type, payload, { root: true })
    }
  })
  return {
    commitTypes: commitTypes as Types<M>,
    committers: committers as Committers<M>
  }
}

export { fromMutations }
