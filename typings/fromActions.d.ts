import { KeyMap, A2, Types, MapOption } from './utils.d'

// ______________________________________________________
//
// @ fromActions

// IN
type AC<T> = (context: any) => Promise<any>
type ACPL<T> = (context: any, payload: A2<T>) => Promise<any>
type Action<T> = AC<T> | ACPL<T>
type Actions<T> = { [K in keyof T]: Action<T[K]> }

// OUT
type DP<T> = () => Promise<any>
type DPPL<T> = (payload: A2<T>) => Promise<any>
type Dispatcher<T> = T extends AC<T> ? DP<T> : DPPL<T>
type Dispatches<T> = { readonly [K in keyof T]: Dispatcher<T[K]> }
type MapActions<T> = (mapOption: MapOption<T>) => any
interface FromActionsReturn<A> {
  readonly actionTypes: Types<A>
  readonly dispatches: Dispatches<A>
  readonly mapActions: MapActions<A>
}

// DECL
declare function fromActions<T extends KeyMap & Actions<T>>(
  actions: T,
  namespace: string
): FromActionsReturn<T>

// ______________________________________________________
//
// @ exports

export {
  Actions,
  Dispatches,
  MapActions,
  FromActionsReturn,
  fromActions
}
