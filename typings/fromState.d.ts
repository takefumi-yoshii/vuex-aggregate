// ______________________________________________________
//
// @ fromState

type StateGetter<T> = (state: T) => any
type MapStateHelperOption<T> =
  | Array<keyof T>
  | { [k: string]: keyof T | StateGetter<T> }

type ProxyMapState<T> = (
  mapState: Function,
  mapStateHelperOption: MapStateHelperOption<T>
) => any

interface FromStateReturn<T> {
  readonly proxyMapState: ProxyMapState<T>
}

// DECL
declare function fromState<T>(state: T, namespace: string): FromStateReturn<T>

// ______________________________________________________
//
// @ exports

export { MapStateHelperOption, ProxyMapState, FromStateReturn, fromState }
