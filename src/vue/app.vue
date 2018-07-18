<template>
  <div>
    <p>count = {{count}}</p>
    <p>name = {{name}}</p>
    <button @click="increment()">+1</button>
    <input @change="e => setName(e.target.value)" />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { mapState } from 'vuex'
import { VuexBounds } from '../store/index'
import { committers } from '../store/modules/counter'

const computed: ThisType<VuexBounds> = {
  count () {
    return this.$store.state.counter.count
  },
  name () {
    return this.$store.state.counter.name
  }
}
const methods: ThisType<VuexBounds> = {
  increment () {
    committers.increment(this.$store)
  },
  setName (value: string) {
    committers.setName(this.$store, value)
  }
}

export default Vue.extend({ computed, methods })
</script>
