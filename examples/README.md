## example installation

```
$ yarn install
$ yarn start
```

launched dev-server on http://localhost:1234/

### Try refactor mutation name.

refactor payload schema @ `src/store/modules/counter.ts`

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

refactor payload schema @ `src/store/modules/counter.ts`

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

refactor payload schema @ `src/store/modules/counter.ts`

```javascript
async asyncIncrement(store: any, duration: number) {
  await wait(duration)
  committers.increment(store)
}
```
Even if you do not need a payload, an error will occur if given payload.  
According to specifications, actions expect to return Promise and inferred types return Promise.  

```javascript
async asyncIncrement(store: any) {
  await wait()
  committers.increment(store)
}
```
