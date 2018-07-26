import { mapState } from 'vuex'
import { KeyMap } from '../typings/utils.d'
import {
  FromStateReturn,
  MapState,
  MapStateOption
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
  function _mapState<O extends MapStateOption<T>>(mapOption: O) {
    const mapper = mapState as any
    return namespace === '' ? mapper(mapOption) : mapper(namespace, mapOption)
  }
  return {
    mapState: _mapState as MapState<T>
  }
}

export { fromState }
