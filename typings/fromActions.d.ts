import { KeyMap, A2, Types, MapHelperOption } from './utils.d'

// ______________________________________________________
//
// @ fromActions

// IN
type AC<T> = (context: any) => Promise<any>
type ACPL<T> = (context: any, payload: A2<T>) => Promise<any>
type Action<T> = AC<T> | ACPL<T>
type Actions<T> = { [K in keyof T]: Action<T[K]> }

// OUT
type DP<T> = (diapatch: Function) => Promise<any>
type DPPL<T> = (diapatch: Function, payload: A2<T>) => Promise<any>
type Dispatcher<T> = T extends AC<T> ? DP<T> : DPPL<T>
type Dispatchers<T> = { readonly [K in keyof T]: Dispatcher<T[K]> }
type ProxyMapActions<T> = (mapHelperOption: MapHelperOption<T>) => any
interface FromActionsReturn<A> {
  readonly actionTypes: Types<A>
  readonly dispatchers: Dispatchers<A>
  readonly proxyMapActions: ProxyMapActions<A>
}

// DECL
declare function fromActions<T extends KeyMap & Actions<T>>(
  actions: T,
  namespace: string
): FromActionsReturn<T>

// ______________________________________________________
//
// @ exports

export { Actions, Dispatchers, ProxyMapActions, FromActionsReturn, fromActions }
