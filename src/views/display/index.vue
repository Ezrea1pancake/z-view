<template>
  <div class="container">
    <z-display :code="showCode" />
  </div>
</template>

<script>
import zDisplay from '@/components/display/display'
import showCode from './showCode'

export default {
  name: 'display',

  components: {
    zDisplay
  },

  data () {
    return {
      showCode
    }
  }
}

</script>

<style lang="less" scoped>

.container {

}

</style>
