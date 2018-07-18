import { createAggregate, Injects, Modeler } from '../helper'

// ______________________________________________________
//
// @ Types

export interface CounterState {
  count: number;
  name: string;
}

// ______________________________________________________
//
// @ Model

const CounterModel: Modeler<CounterState> = injects => ({
  count: 0,
  name: 'my name',
  ...injects
})

const mutations = {
  increment (state: CounterState): void {
    state.count++
  },
  setCount (state: CounterState, count: number): void {
    state.count = count
  },
  setName (state: CounterState, name: string): void {
    state.name = name
  }
}

// ______________________________________________________
//
// @ ModuleFactory

export default (injects?: Injects<CounterState>) => ({
  namespaced: true, // Required
  state: CounterModel(injects),
  mutations
})

// Second arguments Required `${modulename}/`
export const { committers, types } = createAggregate(mutations, 'counter/')
