## example installation

```
$ yarn install
$ yarn start
```

launched dev-server on http://localhost:1234/

## Try refactor payload schema

refactor payload schema @ `src/store/modules/counter.ts`

```javascript
setCount (state: CounterState, count: number): void
```

...to

```javascript
setCount (state: CounterState, payload: { count: number }): void
```

Did you receive an error at SFC?
