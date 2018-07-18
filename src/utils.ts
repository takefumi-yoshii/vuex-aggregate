type Injects<T> = { [P in keyof T]?: T[P] }
type Modeler<T> = (injects?: Injects<T>) => T

export { Injects, Modeler }
