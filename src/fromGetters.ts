import { mapGetters } from 'vuex'
import { KeyMap, MapHelperOption } from '../typings/utils.d'
import {
  Getters,
  InferGetters,
  InferMapGetters,
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
  const inferGetters: KeyMap = {}
  Object.keys(getters).forEach(key => {
    const getterKey = `${namespace}/${key}`
    inferGetters[key] = (state: KeyMap, args?: any) => {
      if (typeof state[getterKey] !== 'function') return state[getterKey]
      return state[getterKey](args)
    }
  })
  function inferMapGetters<O extends MapHelperOption<T>>(mapHelperOption: O) {
    const mapper = mapGetters as any
    return mapper(namespace, mapHelperOption)
  }
  return {
    inferGetters: inferGetters as InferGetters<T>,
    inferMapGetters: inferMapGetters as InferMapGetters<T>
  }
}

export { fromGetters }
