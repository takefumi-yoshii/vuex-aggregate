import { mapState } from 'vuex'
import { KeyMap } from '../typings/utils.d'
import {
  FromStateReturn,
  InferMapState,
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
  function inferMapState<O extends MapStateHelperOption<T>>(
    mapHelperOption: O
  ) {
    const mapper = mapState as any
    return mapper(namespace, mapHelperOption)
  }
  return {
    inferMapState: inferMapState as InferMapState<T>
  }
}

export { fromState }
