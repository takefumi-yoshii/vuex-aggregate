import { mapActions } from 'vuex'
import { Types, MapHelperOption, KeyMap } from '../typings/utils.d'
import {
  Actions,
  Dispatchers,
  ProxyMapActions,
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
  const dispatchers: KeyMap = {}
  Object.keys(actions).forEach(key => {
    const type = `${namespace}/${key}`
    actionTypes[key] = type
    dispatchers[key] = (dispatch: Function, payload?: any) => {
      return dispatch(type, payload, { root: true })
    }
  })
  function proxyMapActions<O extends MapHelperOption<T>>(mapHelperOption: O) {
    const mapper = mapActions as any
    return mapper(namespace, mapHelperOption)
  }
  return {
    actionTypes: actionTypes as Types<T>,
    dispatchers: dispatchers as Dispatchers<T>,
    proxyMapActions: proxyMapActions as ProxyMapActions<T>
  }
}

export { fromActions }
