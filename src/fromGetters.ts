import { KeyMap, MapHelperOption } from '../typings/utils.d'
import {
  Getters,
  ProxyGetters,
  ProxyMapGetters,
  FromGettersReturn
} from '../typings/fromGetters.d'

const namespaced: KeyMap = {}

function fromGetters<T extends KeyMap & Getters<T>>(
  getters: T,
  namespace: string
): FromGettersReturn<T> {
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
  function proxyMapGetters<H extends Function, O extends MapHelperOption<T>>(
    mapHelper: H,
    mapHelperOption: O
  ) {
    return mapHelper(namespace, mapHelperOption)
  }
  return {
    proxyGetters: proxyGetters as ProxyGetters<T>,
    proxyMapGetters: proxyMapGetters as ProxyMapGetters<T>
  }
}

export { fromGetters }
