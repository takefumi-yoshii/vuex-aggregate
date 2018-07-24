import { KeyMap, RA1, R, RR, Types } from './utils.d'

// ______________________________________________________
//
// @ fromGetters

// IN
type GT<T> = (getters: any) => any
type GTR<T> = (getters: any) => (args: any) => any
type Getter<T> = GT<T> | GTR<T>
type Getters<T> = { [K in keyof T]: Getter<T[K]> }

// OUT
type PGT<T> = (getters: any) => R<T>
type PGTR<T> = (getters: any, args: RA1<T>) => RR<T>
type ProxyGetter<T> = T extends GTR<T> ? PGTR<T> : PGT<T>
type ProxyGetters<T> = { readonly [K in keyof T]: ProxyGetter<T[K]> }
interface FromGettersReturn<G> {
  readonly proxyGetters: ProxyGetters<G>
}

// DECL
declare function fromGetters<T extends KeyMap & Getters<T>>(
  getters: T,
  namespace: string
): FromGettersReturn<T>

// ______________________________________________________
//
// @ exports

export { Getters, ProxyGetters, FromGettersReturn, fromGetters }
