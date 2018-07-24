import { Types, MapHelperOption, KeyMap } from '../typings/utils.d'
import {
  Mutations,
  Committers,
  ProxyMapMutations,
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
  const committers: KeyMap = {}
  Object.keys(mutations).forEach(key => {
    const type = `${namespace}/${key}`
    mutationTypes[key] = type
    committers[key] = (commit: Function, payload?: any) => {
      return commit(type, payload, { root: true })
    }
  })
  function proxyMapMutations<H extends Function, O extends MapHelperOption<T>>(
    mapHelper: H,
    mapHelperOption: O
  ) {
    return mapHelper(namespace, mapHelperOption)
  }
  return {
    mutationTypes: mutationTypes as Types<T>,
    committers: committers as Committers<T>,
    proxyMapMutations: proxyMapMutations as ProxyMapMutations<T>
  }
}

export { fromMutations }
