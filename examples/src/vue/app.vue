<template>
  <div>
    <p>count = {{count}}</p>
    <p>double = {{double}}</p>
    <p>expo2 = {{expo2}}</p>
    <p>countLabel = {{countLabel}}</p>
    <p>isRunningAutoIncrement = {{autoIncrementLabel}}</p>
    <p>name = {{nameLabel}}</p>
    <div>
      <button @click="increment()">+1</button>
      <button @click="decrement()">-1</button>
      <button @click="asyncIncrement(1000)">asyncIncrement</button>
      <button @click="toggleAutoIncrement(100)">toggleAutoIncrement</button>
    </div>
    <div>
      <input @change="e => setName(e.target.value)" />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { BoundsStore } from '../store/index'
import * as Counter from '../store/modules/counter'

const computed: ThisType<BoundsStore> = {
  ...Counter.mapState(['count']),
  ...Counter.mapState({
    double: state => state.count * 2
  }),
  ...Counter.mapGetters(['nameLabel', 'autoIncrementLabel']),
  countLabel() {
    return Counter.getters.countLabel(this.$store.getters, 'pt')
  },
  expo2() {
    return Counter.getters.expo(this.$store.getters, 2)
  }
}

const methods: ThisType<BoundsStore> = {
  ...Counter.mapMutations(['increment', 'decrement']),
  ...Counter.mapActions(['asyncIncrement']),
  setName(value: string) {
    Counter.commits.setName(this.$store.commit, value)
  },
  toggleAutoIncrement(duration: number) {
    const flag = !this.$store.state.counter.isRunningAutoIncrement
    Counter.dispatches.toggleAutoIncrement(this.$store.dispatch, {
      duration,
      flag
    })
  }
}

export default Vue.extend({ computed, methods })
</script>
