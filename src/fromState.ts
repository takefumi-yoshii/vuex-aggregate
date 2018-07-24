import { KeyMap } from '../typings/utils.d'
import {
  FromStateReturn,
  ProxyMapState,
  MapStateHelperOption
} from '../typings/fromState.d'

const namespaced: KeyMap = {}

function fromState<T>(state: T, namespace: string): FromStateReturn<T> {
  if (
    namespaced[namespace] !== undefined &&
    process.env.NODE_ENV !== 'development'
  ) {
    throw new Error(
      `vuex-aggregate: conflict fromState namespace -> ${namespace}${state}`
    )
  } else {
    namespaced[namespace] = namespace
  }
  function proxyMapState<H extends Function, O extends MapStateHelperOption<T>>(
    mapHelper: H,
    mapHelperOption: O
  ) {
    return mapHelper(namespace, mapHelperOption)
  }
  return {
    proxyMapState: proxyMapState as ProxyMapState<T>
  }
}

export { fromState }
