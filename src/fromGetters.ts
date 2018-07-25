import { mapGetters } from 'vuex'
import { store } from './utils'
import { KeyMap, MapOption } from '../typings/utils.d'
import {
  IGetters,
  Getters,
  MapGetters,
  FromGettersReturn
} from '../typings/fromGetters.d'

const namespaced: KeyMap = {}

function fromGetters<T extends KeyMap & IGetters<T>>(
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
  const _getters: KeyMap = {}
  Object.keys(getters).forEach(key => {
    const getterKey = `${namespace}/${key}`
    _getters[key] = (args?: any) => {
      if (typeof store.getters[getterKey] !== 'function')
        return store.getters[getterKey]
      return store.getters[getterKey](args)
    }
  })
  function _mapGetters<O extends MapOption<T>>(mapOption: O) {
    const mapper = mapGetters as any
    return mapper(namespace, mapOption)
  }
  return {
    getters: _getters as Getters<T>,
    mapGetters: _mapGetters as MapGetters<T>
  }
}

export { fromGetters }
