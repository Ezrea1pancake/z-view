<template>
  <input
    type="text"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
import Emitter from '@/mixins/emitter'

export default {
  name: 'zInput',

  mixins: [Emitter],

  props: {
    value: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      currentValue: this.value
    }
  },

  methods: {
    handleInput (e) {
      const value = e.target.value
      this.currentValue = value
      this.$emit('input', value)
      this.dispatch('zFormItem', 'on-form-change', value)
    },

    handleBlur () {
      this.dispatch('zFormItem', 'on-form-blur', this.currentValue)
    }
  }
}

</script>

<style lang="less" scoped>

.container {

}

</style>
