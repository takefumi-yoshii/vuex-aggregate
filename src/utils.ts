type Injects<T> = { [P in keyof T]?: T[P] }
type StateFactory<T> = (injects?: Injects<T>) => T
interface Store {
  state: any
  commit: Function
  dispatch: Function
  getters: any
}
let store: Store = null
function use(_store: any) {
  store = _store as Store
}
export { Injects, StateFactory, use, store }
