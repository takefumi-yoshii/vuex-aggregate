## example installation

```
$ yarn install
$ yarn start
```

launched dev-server on http://localhost:1234/

## Try refactor mutations payload schema.

refactor payload schema @ `src/store/modules/counter.ts`

```javascript
setCount(state: CounterState, count: number): void
```

...to

```javascript
setCount(state: CounterState, payload: { count: number }): void
```

## Try refactor actions payload schema.

refactor payload schema @ `src/store/modules/counter.ts`

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

Did you receive an error at SFC?
