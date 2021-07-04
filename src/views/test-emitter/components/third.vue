<template>
  <div class="container">
    <button @click="informFrist">通知父组件</button>
  </div>
</template>

<script>
import Emitter from '@/mixins/emitter'

export default {
  name: 'ComponentThird',

  mixins: [Emitter],

  mounted () {
    this.$on('informThird', (data) => {
      alert(data)
    })
  },

  methods: {
    informFrist () {
      this.dispatch('TestEmitter', 'informFrist', 'Hello Frist')
    }
  }
}

</script>

<style lang="less" scoped>

.container {

}

</style>
