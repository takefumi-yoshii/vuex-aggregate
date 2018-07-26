import { mapActions } from 'vuex'
import { store } from './utils'
import { Types, MapOption, KeyMap } from '../typings/utils.d'
import {
  Actions,
  Dispatches,
  MapActions,
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
  const dispatches: KeyMap = {}
  Object.keys(actions).forEach(key => {
    const type = namespace === '' ? key : `${namespace}/${key}`
    actionTypes[key] = type
    dispatches[key] = (payload?: any) => {
      return store.dispatch(type, payload, { root: true })
    }
  })
  function _mapActions<O extends MapOption<T>>(mapOption: O) {
    const mapper = mapActions as any
    return namespace === '' ? mapper(mapOption) : mapper(namespace, mapOption)
  }
  return {
    actionTypes: actionTypes as Types<T>,
    dispatches: dispatches as Dispatches<T>,
    mapActions: _mapActions as MapActions<T>
  }
}

export { fromActions }
