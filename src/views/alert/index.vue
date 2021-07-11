<template>
  <div class="container">
    <button @click="notice('提示1')">提示1</button>
    <button @click="notice('提示2')">提示2</button>
  </div>
</template>

<script>

export default {
  methods: {
    notice (content) {
      this.$alert.info({
        content,
        duration: 10
      })
    }
  }
}

</script>

<style lang="less" scoped>

.container {

}

</style>
