import { KeyMap, RA1, R, RR, Types, MapOption } from './utils.d'

// ______________________________________________________
//
// @ fromGetters

// IN
type GT<T> = (state: any, getters?: any, rootState?: any, rootGetters?: any) => any
type GTR<T> = (state: any, getters?: any, rootState?: any, rootGetters?: any) => (args: any) => any
type Getter<T> = GT<T> | GTR<T>
type IGetters<T> = { [K in keyof T]: Getter<T[K]> }

// OUT
type PGT<T> = () => R<T>
type PGTR<T> = (args: RA1<T>) => RR<T>
type ProxyGetter<T> = T extends GTR<T> ? PGTR<T> : PGT<T>
type Getters<T> = { readonly [K in keyof T]: ProxyGetter<T[K]> }
type MapGetters<T> = (mapOption: MapOption<T>) => any

interface FromGettersReturn<G> {
  readonly getters: Getters<G>
  readonly mapGetters: MapGetters<G>
}

// DECL
declare function fromGetters<T extends KeyMap & IGetters<T>>(
  getters: T,
  namespace: string
): FromGettersReturn<T>

// ______________________________________________________
//
// @ exports

export { IGetters, Getters, MapGetters, FromGettersReturn, fromGetters }
