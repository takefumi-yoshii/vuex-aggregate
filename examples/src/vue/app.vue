<template>
  <div>
    <p>rootName = {{rootName}}</p>
    <p>rootNameLabel = {{rootNameLabel}}</p>
    <p>count = {{count}}</p>
    <p>double = {{double}}</p>
    <p>expo2 = {{expo2}}</p>
    <p>countLabel = {{countLabel}}</p>
    <p>isRunningAutoIncrement = {{autoIncrementLabel}}</p>
    <p>name = {{nameLabel}}</p>
    <div>
      <button @click="increment()">+1</button>
      <button @click="decrement()">-1</button>
      <button @click="asyncIncrement()">asyncIncrement</button>
      <button @click="toggleAutoIncrement(100)">toggleAutoIncrement</button>
    </div>
    <div>
      <input @change="e => setName(e.target.value)" />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import * as Root from '../store/root'
import * as Counter from '../store/modules/counter'

const computed = {
  ...Root.mapState({ rootName: 'name' }),
  ...Root.mapGetters({ rootNameLabel: 'nameLabel' }),
  ...Counter.mapState(['count']),
  ...Counter.mapState({ double: state => state.count * 2 }),
  ...Counter.mapGetters(['nameLabel', 'autoIncrementLabel']),
  countLabel() {
    return Counter.getters.countLabel('pt')
  },
  expo2() {
    return Counter.getters.expo(2)
  }
}

const methods = {
  ...Counter.mapMutations(['increment', 'decrement']),
  ...Counter.mapActions(['asyncIncrement']),
  setName(value: string) {
    Counter.commits.setName(value)
  },
  toggleAutoIncrement(duration: number) {
    Counter.dispatches.toggleAutoIncrement({ duration })
  }
}

export default Vue.extend({ computed, methods })
</script>
