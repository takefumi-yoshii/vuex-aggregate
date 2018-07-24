<template>
  <div>
    <p>count = {{countLabel}}</p>
    <p>expo2 = {{expo2}}</p>
    <p>isRunningAutoIncrement = {{autoIncrementLabel}}</p>
    <p>name = {{nameLabel}}</p>
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
import { committers, dispatchers, proxyGetters } from '../store/modules/counter'

const computed: ThisType<BoundsStore> = {
  countLabel () {
    return proxyGetters.countLabel(this.$store.getters, 'pt')
  },
  nameLabel () {
    return proxyGetters.nameLabel(this.$store.getters)
  },
  expo2 () {
    return proxyGetters.expo(this.$store.getters, 2)
  },
  autoIncrementLabel() {
    return proxyGetters.autoIncrementLabel(this.$store.getters)
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
