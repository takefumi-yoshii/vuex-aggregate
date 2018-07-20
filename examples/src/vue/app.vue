<template>
  <div>
    <p>count = {{count}}</p>
    <p>isRunningAutoIncrement = {{autoIncrementLabel}}</p>
    <p>name = {{name}}</p>
    <div>
      <button @click="increment()">+1</button>
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
import { committers, dispatchers } from '../store/modules/counter'

const computed: ThisType<BoundsStore> = {
  count () {
    return this.$store.state.counter.count
  },
  name () {
    return this.$store.state.counter.name
  },
  autoIncrementLabel() {
    const flag = this.$store.state.counter.isRunningAutoIncrement
    return flag ? 'true' : 'false'
  }
}
const methods: ThisType<BoundsStore> = {
  increment () {
    committers.increment(this.$store.commit)
  },
  setName (value: string) {
    committers.setName(this.$store.commit, value)
  },
  asyncIncrement (duration: number) {
    dispatchers.asyncIncrement(this.$store.dispatch, duration)
  },
  toggleAutoIncrement (duration: number) {
    const flag = !this.$store.state.counter.isRunningAutoIncrement
    dispatchers.toggleAutoIncrement(this.$store.dispatch, { duration, flag })
  }
}

export default Vue.extend({ computed, methods })
</script>
