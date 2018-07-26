## example installation

```
$ yarn install
$ yarn start
```

launched dev-server on http://localhost:1234/

### Try refactor state.

refactor State schema @ `src/store/modules/counter.ts`

```javascript
interface State {
  number: number
  name: string
  isRunningAutoIncrement: boolean
}
const stateFactory: StateFactory<State> = injects => ({
  number: 0,
  name: 'unknown',
  isRunningAutoIncrement: false,
  ...injects
})
```
Let's change the above state as follows.  
**With vuex-aggretate, you can raise errors up to mapHelper on SFC.**

```javascript
interface State {
  amount: number // here
  name: string
  isRunningAutoIncrement: boolean
}
const stateFactory: StateFactory<State> = injects => ({
  amount: 0, // here
  name: 'unknown',
  isRunningAutoIncrement: false,
  ...injects
})
```

### Try refactor mutation name.

refactor payload schema @ `src/store/modules/counter.ts`

```javascript
increment(state: State): void {
  state.count++
}
```
Let's change the above mutation as follows.  
Did you find various errors?  
You can see that even SFC is reacting.  

```javascript
addCount(state: State): void {
  state.count++
}
```

### Try refactor mutation payload schema.

refactor payload schema @ `src/store/modules/counter.ts`

```javascript
setName(state: State, name: string): void {
  state.name = name
}
```
Change the Payload type of the above mutation as follows.  
Try convert it to another type ex:)number.  
You can reconfirm the need for a Types.  

```javascript
setName(state: State, payload: { name: string }): void {
  state.name = payload.name
}
```

### Try refactor action payload schema.

refactor payload schema @ `src/store/modules/counter.ts`

```javascript
async toggleAutoIncrement(
  { state }: { state: State },
  { duration }: { duration: number }
) {
```
Even if you do not need a payload, an error will occur if given payload.  
According to specifications, actions expect to return Promise and inferred types return Promise.  

```javascript
async toggleAutoIncrement(
  { state }: { state: State }
) {
```
