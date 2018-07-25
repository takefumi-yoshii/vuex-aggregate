import { mapActions } from 'vuex'
import { store } from './utils'
import { Types, MapHelperOption, KeyMap } from '../typings/utils.d'
import {
  Actions,
  InferDispatches,
  InferMapActions,
  FromActionsReturn
} from '../typings/fromActions.d'

const namespaced: KeyMap = {}

function fromActions<T extends KeyMap & Actions<T>>(
  actions: T,
  namespace: string
): FromActionsReturn<T> {
  if (
    namespaced[namespace] !== undefined &&
    process.env.NODE_ENV !== 'development'
  ) {
    throw new Error(
      `vuex-aggregate: conflict fromActions namespace -> ${namespace}`
    )
  } else {
    namespaced[namespace] = namespace
  }
  const actionTypes: KeyMap = {}
  const inferDispatches: KeyMap = {}
  Object.keys(actions).forEach(key => {
    const type = `${namespace}/${key}`
    actionTypes[key] = type
    inferDispatches[key] = (payload?: any) => {
      return store.dispatch(type, payload, { root: true })
    }
  })
  function inferMapActions<O extends MapHelperOption<T>>(mapHelperOption: O) {
    const mapper = mapActions as any
    return mapper(namespace, mapHelperOption)
  }
  return {
    actionTypes: actionTypes as Types<T>,
    inferDispatches: inferDispatches as InferDispatches<T>,
    inferMapActions: inferMapActions as InferMapActions<T>
  }
}

export { fromActions }
