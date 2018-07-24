// ______________________________________________________
//
// @ utils

type KeyMap = { [K: string]: any }
type R<T> = T extends (...rest: any[]) => infer I ? I : never
type RR<T> = T extends (...rest: any[]) => (...rest: any[]) => infer I
  ? I
  : never

type A1<T> = T extends (a1: infer I, ...rest: any[]) => any ? I : never
type A2<T> = T extends (a1: any, a2: infer I, ...rest: any[]) => any ? I : never
type RA1<T> = T extends (...rest: any[]) => (a1: infer I) => any ? I : never

type Types<T> = { readonly [K in keyof T]: string }
type Injects<T> = { [P in keyof T]?: T[P] }
type Modeler<T> = (injects?: Injects<T>) => T

// ______________________________________________________
//
// @ exports

export { KeyMap, R, A1, A2, RR, RA1, Types, Injects, Modeler }
