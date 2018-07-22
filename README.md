# <img src='./logo.svg' width='267' height='60' alt='vuex-aggregate' />

[![Latest Version](https://img.shields.io/badge/npm-vuex_aggregate-C12127.svg)](https://www.npmjs.com/package/vuex-aggregate)
[![CircleCI](https://circleci.com/gh/takefumi-yoshii/vuex-aggregate.svg?style=svg)](https://circleci.com/gh/takefumi-yoshii/vuex-aggregate)

Inferred types helper module for Vuex.(Required TypeScript2.8 or higher) 
Generated committers provide `store.commit` proxy, and 
Generated dispatchers provide `store.dispatch` proxy with inferred types. 
Let's reconfirm the vulnerability of Flux pattern at the beginning.

### Try refactor mutation name.

refactor payload schema @ `examples/src/store/modules/counter.ts`

```javascript
increment(state: CounterState): void {
  state.count++
}
```
Let's change the above mutation as follows.  
Did you find various errors?  
You can see that even SFC is reacting.  

```javascript
addCount(state: CounterState): void {
  state.count++
}
```

### Try refactor mutation payload schema.

refactor payload schema @ `examples/src/store/modules/counter.ts`

```javascript
setName(state: CounterState, name: string): void {
  state.name = name
}
```
Change the Payload type of the above mutation as follows.  
Try convert it to another type ex:)number.  
You can reconfirm the need for a Types.  

```javascript
setName(state: CounterState, payload: { name: string }): void {
  state.name = payload.name
}
```

### Try refactor action payload schema.

refactor payload schema @ `examples/src/store/modules/counter.ts`

```javascript
async asyncIncrement({ commit }: { commit: Function }, duration: number) {
  await wait(duration)
  committers.increment(commit)
}
```
Even if you do not need a payload, an error will occur if given payload.  
According to specifications, actions expect to return Promise and inferred types return Promise.  

```javascript
async asyncIncrement({ commit }: { commit: Function }) {
  await wait()
  committers.increment(commit)
}
```


# Usage

Wrap your mutations and actions with unique namespace by vuex-aggregate provided APIs.
`fromMutations` is for mutations, `fromActions` is for actions.
`namespace` must to be align modulename.

```javascript
import { fromMutations, fromActions } from 'vuex-aggregate'

export const namespace = 'counter'

// ______________________________________________________
//
// @ Mutations

const mutations = {
  increment(state: CounterState): void {
    state.count++
  }
}
export const { committers, mutationTypes } = fromMutations(mutations, namespace)

// ______________________________________________________
//
// @ Actions

const actions = {
  async asyncIncrement({ commit }: { commit: Function }, duration: number) {
    await wait(duration)
    committers.increment(commit)
  }
}
export const { dispatchers, actionTypes } = fromActions(actions, namespace)

```
vuex-aggregate assumed to use shallow modules.
Please specify `namespaced: true` at module.

```javascript
export const CounterModule = (injects?: Injects<CounterState>) => ({
  namespaced: true, // Required
  state: CounterModel(injects),
  mutations,
  actions
})

export const store = new Vuex.Store({
  modules: {
    // It is necessary to match the module name to a defined namespace such as `counter '.
    counter: CounterModule({ name: 'COUNTER' })
  }
})

```
