<template>
  <div class="container">
    <component-third />
  </div>
</template>

<script>
import ComponentThird from './Third'

export default {
  name: 'ComponentSecond',

  components: {
    ComponentThird
  }

}
</script>

<style lang="less" scoped>

.container {

}

</style>
