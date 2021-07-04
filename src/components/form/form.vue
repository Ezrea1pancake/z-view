<template>
  <form>
    <slot />
  </form>
</template>

<script>

export default {
  name: 'zForm',

  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },

  provide () {
    return {
      form: this
    }
  },

  data () {
    return {
      fields: []
    }
  },

  created () {
    this.$on('on-form-item-add', field => {
      if (field) this.fields.push(field)
    })
    this.$on('on-form-item-remove', field => {
      this.fields.splice(this.fields.indexOf(field, 1))
    })
  }
}

</script>

<style lang="less" scoped>

.container {

}

</style>
