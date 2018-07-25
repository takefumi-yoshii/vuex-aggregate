// ______________________________________________________
//
// @ fromState

type StateGetter<T> = (state: T) => any
type MapStateOption<T> =
  | Array<keyof T>
  | { [k: string]: keyof T | StateGetter<T> }

type MapState<T> = (mapStateOption: MapStateOption<T>) => any

interface FromStateReturn<T> {
  readonly mapState: MapState<T>
}

// DECL
declare function fromState<T>(state: T, namespace: string): FromStateReturn<T>

// ______________________________________________________
//
// @ exports

export { MapStateOption, MapState, FromStateReturn, fromState }
