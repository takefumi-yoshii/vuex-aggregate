import { KeyMap, RA1, R, RR, Types, MapHelperOption } from './utils.d'

// ______________________________________________________
//
// @ fromGetters

// IN
type GT<T> = (contextGetters?: any) => any
type GTR<T> = (contextGetters?: any) => (args: any) => any
type Getter<T> = GT<T> | GTR<T>
type Getters<T> = { [K in keyof T]: Getter<T[K]> }

// OUT
type PGT<T> = () => R<T>
type PGTR<T> = (args: RA1<T>) => RR<T>
type ProxyGetter<T> = T extends GTR<T> ? PGTR<T> : PGT<T>
type InferGetters<T> = { readonly [K in keyof T]: ProxyGetter<T[K]> }
type InferMapGetters<T> = (mapHelperOption: MapHelperOption<T>) => any

interface FromGettersReturn<G> {
  readonly inferGetters: InferGetters<G>
  readonly inferMapGetters: InferMapGetters<G>
}

// DECL
declare function fromGetters<T extends KeyMap & Getters<T>>(
  getters: T,
  namespace: string
): FromGettersReturn<T>

// ______________________________________________________
//
// @ exports

export {
  Getters,
  InferGetters,
  InferMapGetters,
  FromGettersReturn,
  fromGetters
}
