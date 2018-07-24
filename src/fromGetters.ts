import { KeyMap } from '../typings/utils.d'
import {
  Getters,
  ProxyGetters,
  FromGettersReturn
} from '../typings/fromGetters.d'

const namespaced: KeyMap = {}

function fromGetters<G extends KeyMap & Getters<G>>(
  getters: G,
  namespace: string
): FromGettersReturn<G> {
  if (
    namespaced[namespace] !== undefined &&
    process.env.NODE_ENV !== 'development'
  ) {
    throw new Error(
      `vuex-aggregate: conflict fromGetters namespace -> ${namespace}`
    )
  } else {
    namespaced[namespace] = namespace
  }
  const proxyGetters: KeyMap = {}
  Object.keys(getters).forEach(key => {
    const getterKey = `${namespace}/${key}`
    proxyGetters[key] = (state: KeyMap, args?: any) => {
      if (typeof state[getterKey] !== 'function') return state[getterKey]
      return state[getterKey](args)
    }
  })
  return {
    proxyGetters: proxyGetters as ProxyGetters<G>
  }
}

export { fromGetters }
