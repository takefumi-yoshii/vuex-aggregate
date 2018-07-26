# <img src='https://user-images.githubusercontent.com/22139818/43042404-e9fcf9ea-8db7-11e8-82ea-832cea6db527.png' width='267' height='60' alt='vuex-aggregate' />

[![Latest Version](https://img.shields.io/badge/npm-vuex_aggregate-C12127.svg)](https://www.npmjs.com/package/vuex-aggregate)
[![CircleCI](https://circleci.com/gh/takefumi-yoshii/vuex-aggregate.svg?style=svg)](https://circleci.com/gh/takefumi-yoshii/vuex-aggregate)

Inferred types helper module for Vuex.(Required TypeScript2.8 or higher) 

### Why need TypeScript on Vuex?

refactor State schema @ `examples/src/store/modules/counter.ts`

```javascript
interface State {
  count: number
  name: string
  isRunningAutoIncrement: boolean
}
const state = {
  count: 0,
  name: 'unknown',
  isRunningAutoIncrement: false
}
```
Let's change the above state as follows.  
**With vuex-aggretate, you can raise errors up to mapHelper on SFC.**

```javascript
interface State {
  amount: number // here
  name: string
  isRunningAutoIncrement: boolean
}
const state = {
  amount: 0, // here
  name: 'unknown',
  isRunningAutoIncrement: false
}
```

# Usage

Wrap your module parts with unique namespace by vuex-aggregate provided APIs.  
`fromState` is for state,`fromMutations` is for mutations,`fromActions` is for actions,`fromGetters` is for getters.  
`namespace` must to be match modulename.

```javascript
import {
  fromState,
  fromMutations,
  fromActions,
  fromGetters,
  Injects,
  StateFactory
} from 'vuex-aggregate'
import { wait } from '../../utils/promise'

// ______________________________________________________
//
// @ State

const namespace = 'counter'

interface State {
  count: number
  name: string
  isRunningAutoIncrement: boolean
}
const state = {
  count: 0,
  name: 'unknown',
  isRunningAutoIncrement: false
}
const { mapState } = fromState(state, namespace)

// ______________________________________________________
//
// @ Getters

const _getters = {
  nameLabel(state: State): string {
    return `my name is ${state.name}`
  },
  autoIncrementLabel(state: State): string {
    const flag = state.isRunningAutoIncrement
    return flag ? 'true' : 'false'
  },
  countLabel(state: State): (unit: string) => string {
    return unit => {
      return `${state.count} ${unit}`
    }
  },
  expo(state: State): (amount: number) => number {
    return amount => {
      return state.count ** amount
    }
  }
}
const { getters, mapGetters } = fromGetters(_getters, namespace)

// ______________________________________________________
//
// @ Mutations

const mutations = {
  increment(state: State): void {
    state.count++
  },
  decrement(state: State): void {
    state.count--
  },
  setCount(state: State, count: number): void {
    state.count = count
  },
  setName(state: State, name: string): void {
    state.name = name
  },
  setRunningAutoIncrement(state: State, flag: boolean): void {
    state.isRunningAutoIncrement = flag
  }
}
const { commits, mutationTypes, mapMutations } = fromMutations(
  mutations,
  namespace
)

// ______________________________________________________
//
// @ Actions

const actions = {
  async asyncIncrement() {
    await wait(1000)
    commits.increment()
  },
  async toggleAutoIncrement(
    { state }: { state: State },
    { duration }: { duration: number }
  ) {
    const flag = !state.isRunningAutoIncrement
    commits.setRunningAutoIncrement(flag)
    while (true) {
      if (!state.isRunningAutoIncrement) break
      await wait(duration)
      commits.increment()
    }
  }
}
const { dispatches, actionTypes, mapActions } = fromActions(actions, namespace)
```
vuex-aggregate assumed to use shallow modules.
Please specify `namespaced: true` at module.
Finaly, declare `VuexAggregate.use(store)`.

```javascript
// ______________________________________________________
//
// @ ModuleFactory

const moduleFactory = (injects?: Injects<State>) => ({
  namespaced: true, // Required
  state: stateFactory(injects),
  getters,
  mutations,
  actions
})
```
```javascript
import Vuex from 'vuex'
import * as Counter from './modules/counter'
import * as VuexAggregate from 'vuex-aggregate'

// ______________________________________________________
//
// @ Store

Vue.use(Vuex)
export const store = new Vuex.Store({
  modules: {
    [Counter.namespace]: Counter.moduleFactory({ name: 'COUNTER' })
  }
})
VuexAggregate.use(store) // Required

```
