## example installation

```
$ yarn install
$ yarn start
```

launched dev-server on http://localhost:1234/

## Try refactor mutation name.

refactor payload schema @ `src/store/modules/counter.ts`

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

refactor payload schema @ `src/store/modules/counter.ts`

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
