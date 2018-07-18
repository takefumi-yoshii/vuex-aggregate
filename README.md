# vuex-aggregate
[![Latest Version](https://img.shields.io/badge/npm-vuex_aggregate-C12127.svg)](https://www.npmjs.com/package/vuex-aggregate)

Inferred types helper module for Vuex.(Required TypeScript2.8 or higher)  
Generated committers provide `store.commit` proxy, and  
Generated dispatchers provide `store.dispatch` proxy with inferred types.  

## Try refactor mutation name.

refactor payload schema @ `examples/src/store/modules/counter.ts`

```javascript
increment(state: CounterState): void {
  state.count++
}
```

...to

```javascript
addCount(state: CounterState): void {
  state.count++
}
```

## Try refactor mutation payload schema.

refactor payload schema @ `examples/src/store/modules/counter.ts`

```javascript
setName(state: CounterState, name: string): void {
  state.name = name
}
```

...to

```javascript
setName(state: CounterState, payload: { name: string }): void {
  state.name = payload.name
}
```

## Try refactor action payload schema.

refactor payload schema @ `examples/src/store/modules/counter.ts`

```javascript
async asyncIncrement(store: any, duration: number) {
  await wait(duration)
  committers.increment(store)
}
```

...to

```javascript
async asyncIncrement(store: any) {
  await wait()
  committers.increment(store)
}
```
