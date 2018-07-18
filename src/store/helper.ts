type A1<T> = T extends (a1: infer I, ...rest: any[]) => any ? I : never
type A2<T> = T extends (a1: any, a2: infer I, ...rest: any[]) => any ? I : never
type MT<T> = (state: A1<T>) => void
type MTPL<T> = (state: A1<T>, payload: A2<T>) => void
type CM = (store) => void
type CMPL<T> = (store, payload: A2<T>) => void
type Mutation<T> = MT<T> | MTPL<T>
type Committer<T> = T extends MT<T> ? CM : CMPL<T>
type Types<T> = { readonly [K in keyof T]: string }
type Mutations<T> = { readonly [K in keyof T]: Mutation<T[K]> }
type Committers<T> = { readonly [K in keyof T]: Committer<T[K]> }
type KeyMap = { [K: string]: any }
interface Aggregate<M> {
  readonly types: Types<M>
  readonly committers: Committers<M>
}

const namespaced: KeyMap = {}

function createAggregate<M extends KeyMap & Mutations<M>>(
  mutations: M,
  namespace: string
): Aggregate<M> {
  if (
    namespaced[namespace] !== undefined &&
    process.env.NODE_ENV !== 'development'
  ) {
    throw new Error(`vuex-aggregate: conflict namespace -> ${namespace}`)
  } else {
    namespaced[namespace] = namespace
  }
  const types: KeyMap = {}
  const committers: KeyMap = {}
  Object.keys(mutations).forEach(mutationKey => {
    const type = `${namespace}${mutationKey}`
    types[mutationKey] = type
    committers[mutationKey] = (store: any, payload?: any) => {
      store.commit(type, payload)
    }
  })
  return {
    types: types as Types<M>,
    committers: committers as Committers<M>
  }
}

type Injects<T> = { [P in keyof T]?: T[P] }
type Modeler<T> = (injects?: Injects<T>) => T

export { createAggregate, Injects, Modeler }
