import { KeyMap, A1, A2, Types, MapHelperOption } from './utils.d'

// ______________________________________________________
//
// @ fromMutations

// IN
type MT<T> = (state: A1<T>) => void
type MTPL<T> = (state: A1<T>, payload: A2<T>) => void
type Mutation<T> = MT<T> | MTPL<T>
type Mutations<T> = { [K in keyof T]: Mutation<T[K]> }

// OUT
type CM<T> = (commit: Function) => void
type CMPL<T> = (commit: Function, payload: A2<T>) => void
type Committer<T> = T extends MT<T> ? CM<T> : CMPL<T>
type InferCommits<T> = { readonly [K in keyof T]: Committer<T[K]> }
type InferMapMutations<T> = (mapHelperOption: MapHelperOption<T>) => any
interface FromMutationsReturn<T> {
  readonly mutationTypes: Types<T>
  readonly inferCommits: InferCommits<T>
  readonly inferMapMutations: InferMapMutations<T>
}

// DECL
declare function fromMutations<T extends KeyMap & Mutations<T>>(
  mutations: T,
  namespace: string
): FromMutationsReturn<T>

// ______________________________________________________
//
// @ exports

export {
  Mutations,
  InferCommits,
  InferMapMutations,
  FromMutationsReturn,
  fromMutations
}
