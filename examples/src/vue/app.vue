<template>
  <div>
    <p>count = {{countLabel}}</p>
    <p>expo2 = {{expo2}}</p>
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { BoundsStore } from '../store/index'
import {
  dispatchers,
  committers,
  proxyGetters,
  proxyMapGetters,
  proxyMapMutations,
  proxyMapActions
} from '../store/modules/counter'

const computed: ThisType<BoundsStore> = {
  countLabel() {
    return proxyGetters.countLabel(this.$store.getters, 'pt')
  },
  expo2() {
    return proxyGetters.expo(this.$store.getters, 2)
  },
  ...proxyMapGetters(mapGetters, ['nameLabel', 'autoIncrementLabel'])
}

const methods: ThisType<BoundsStore> = {
  ...proxyMapMutations(mapMutations, ['increment', 'decrement']),
  setName(value: string) {
    committers.setName(this.$store.commit, value)
  },
  ...proxyMapActions(mapActions, ['asyncIncrement']),
  toggleAutoIncrement(duration: number) {
    const flag = !this.$store.state.counter.isRunningAutoIncrement
    dispatchers.toggleAutoIncrement(this.$store.dispatch, { duration, flag })
  }
}

export default Vue.extend({ computed, methods })
</script>
