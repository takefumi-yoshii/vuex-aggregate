import { mapState } from 'vuex'
import { KeyMap } from '../typings/utils.d'
import {
  FromStateReturn,
  ProxyMapState,
  MapStateHelperOption
} from '../typings/fromState.d'
declare module 'vuex' {
  export function mapState(
    namespace: string,
    mapHelperOption: MapStateHelperOption<any>
  ): void
}

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
  function proxyMapState<O extends MapStateHelperOption<T>>(
    mapHelperOption: O
  ) {
    return mapState(namespace, mapHelperOption)
  }
  return {
    proxyMapState: proxyMapState as ProxyMapState<T>
  }
}

export { fromState }
