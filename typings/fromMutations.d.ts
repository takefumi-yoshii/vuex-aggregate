import { KeyMap, A1, A2, Types, MapOption } from './utils.d'

// ______________________________________________________
//
// @ fromMutations

// IN
type MT<T> = (state: A1<T>) => void
type MTPL<T> = (state: A1<T>, payload: A2<T>) => void
type Mutation<T> = MT<T> | MTPL<T>
type Mutations<T> = { [K in keyof T]: Mutation<T[K]> }

// OUT
type CM<T> = () => void
type CMPL<T> = (payload: A2<T>) => void
type Committer<T> = T extends MT<T> ? CM<T> : CMPL<T>
type Commits<T> = { readonly [K in keyof T]: Committer<T[K]> }
type MapMutations<T> = (mapOption: MapOption<T>) => any
interface FromMutationsReturn<T> {
  readonly mutationTypes: Types<T>
  readonly commits: Commits<T>
  readonly mapMutations: MapMutations<T>
}

// DECL
declare function fromMutations<T extends KeyMap & Mutations<T>>(
  mutations: T,
  namespace: string
): FromMutationsReturn<T>

// ______________________________________________________
//
// @ exports

export { Mutations, Commits, MapMutations, FromMutationsReturn, fromMutations }
