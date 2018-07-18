# vuex-aggregate
[![Latest Version](https://img.shields.io/badge/npm-vuex_aggregate-C12127.svg)](https://www.npmjs.com/package/vuex-aggregate)

Inferred types helper module for Vuex.(Required TypeScript2.8 or higher)  
Generated committers provide `store.commit` proxy, and  
Generated dispatchers provide `store.dispatch` proxy with inferred types.  

## Try refactor mutations payload schema.

refactor payload schema @ `examples/src/store/modules/counter.ts`

```javascript
setCount (state: CounterState, count: number): void
```

...to

```javascript
setCount (state: CounterState, payload: { count: number }): void
```

## Try refactor actions payload schema.

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
