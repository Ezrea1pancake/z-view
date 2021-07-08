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
  },

  methods: {
    // 重置表单全部数据
    resetFields () {
      this.fields.forEach(field => {
        field.resetField()
      })
    },
    // 全部校验数据
    validate (callback) {
      return new Promise((resolve, reject) => {
        let valid = true
        let count = 0
        this.fields.forEach(field => {
          field.validate('', error => {
            if (error) {
              valid = false
            }
            if (++count === this.fields.length) {
              // 支持promise方式
              resolve(valid)

              // 支持回调函数方式
              if (callback && typeof callback === 'function') {
                callback(valid)
              }
            }
          })
        })
      })
    }
  }
}

</script>

<style lang="less" scoped>

.container {

}

</style>
