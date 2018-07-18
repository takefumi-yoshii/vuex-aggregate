# vuex-aggregate
Inferred types for Vuex mutations.
Generated committers provide store commit proxy, and guard for payload schema type.

## installation

```
$ yarn install
$ yarn start
```

launched dev-server on http://localhost:1234/

## Try refactor schema

refactor payload schema @ `src/store/modules/counter.ts`

```javascript
setCount (state: CounterState, count: number): void
```

...to

```javascript
setCount (state: CounterState, payload: { count: number }): void
```

Did you receive an error at SFC?
