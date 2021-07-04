<template>
  <div class="test-emitter">
    <button @click="informThird">通知子组件</button>
    <component-second />
  </div>
</template>

<script>
import Emitter from '@/mixins/emitter'
import ComponentSecond from './components/second'

export default {
  name: 'TestEmitter',

  mixins: [Emitter],

  components: {
    ComponentSecond
  },

  mounted () {
    this.$on('informFrist', (data) => {
      alert(data)
    })
  },

  methods: {
    informThird () {
      this.boardcast('ComponentThird', 'informThird', 'Hello Third')
    }
  }
}
</script>

<style lang="less" scoped>

.test-emitter {

}

</style>
