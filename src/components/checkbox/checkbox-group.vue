<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
import Emitter from '@/mixins/emitter'
import { findComponentsDownward } from '@/utils/assist'

export default {
  name: 'zCheckboxGroup',

  mixins: [Emitter],

  props: {
    value: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      currentValue: this.value,
      childrens: []
    }
  },

  mounted () {
    this.updateModel(true)
  },

  watch: {
    value () {
      this.updateModel(true)
    }
  },

  methods: {
    updateModel (update) {
      this.childrens = findComponentsDownward(this, 'zCheckbox')
      if (this.childrens.length) {
        const { value } = this
        this.childrens.forEach(child => {
          child.model = value

          if (update) {
            child.currentValue = value.includes(child.value)
            child.group = true
          }
        })
      }
    },
    handleChange (data) {
      this.currentValue = data
      this.$emit('input', data)
      this.$emit('on-change', data)
      this.dispatch('zFormItem', 'on-form-change', data)
    }
  }
}

</script>

<style lang="less" scoped>

.container {

}

</style>
