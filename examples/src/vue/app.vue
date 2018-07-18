<template>
  <div>
    <p>count = {{count}}</p>
    <p>name = {{name}}</p>
    <button @click="increment()">+1</button>
    <button @click="asyncIncrement(1000)">asyncIncrement</button>
    <input @change="e => setName(e.target.value)" />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { mapState } from 'vuex'
import { BoundsStore } from '../store/index'
import { committers, dispatchers } from '../store/modules/counter'

const computed: ThisType<BoundsStore> = {
  count () {
    return this.$store.state.counter.count
  },
  name () {
    return this.$store.state.counter.name
  }
}
const methods: ThisType<BoundsStore> = {
  increment () {
    committers.increment(this.$store)
  },
  setName (value: string) {
    committers.setName(this.$store, value)
  },
  asyncIncrement (duration: number) {
    dispatchers.asyncIncrement(this.$store, duration)
  }
}

export default Vue.extend({ computed, methods })
</script>
