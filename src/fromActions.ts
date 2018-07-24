import { mapActions } from 'vuex'
import { Types, MapHelperOption, KeyMap } from '../typings/utils.d'
import {
  Actions,
  InferDispatch,
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
  const inferDispatch: KeyMap = {}
  Object.keys(actions).forEach(key => {
    const type = `${namespace}/${key}`
    actionTypes[key] = type
    inferDispatch[key] = (dispatch: Function, payload?: any) => {
      return dispatch(type, payload, { root: true })
    }
  })
  function inferMapActions<O extends MapHelperOption<T>>(mapHelperOption: O) {
    const mapper = mapActions as any
    return mapper(namespace, mapHelperOption)
  }
  return {
    actionTypes: actionTypes as Types<T>,
    inferDispatch: inferDispatch as InferDispatch<T>,
    inferMapActions: inferMapActions as InferMapActions<T>
  }
}

export { fromActions }
