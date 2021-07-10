<template>
  <label>
    <span>
      <input
        v-if="group"
        type="checkbox"
        :disabled="disabled"
        :value="value"
        v-model="model"
        @change="handleChange"
        @blur="handleBlur"
      />
      <input
        v-else
        type="checkbox"
        :disabled="disabled"
        :checked="currentValue"
        @change="handleChange"
        @blur="handleBlur"
      />
    </span>
    <slot>
      <span v-if="label">{{label}}</span>
    </slot>
  </label>
</template>

<script>
import Emitter from '@/mixins/emitter'
import { findComponentUpward } from '@/utils/assist'

export default {
  name: 'zCheckbox',

  mixins: [Emitter],

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Boolean, String, Number]
    },
    label: {
      type: [Boolean, String, Number]
    },
    trueValue: {
      type: [Boolean, String, Number],
      default: true
    },
    falseValue: {
      type: [Boolean, String, Number],
      default: false
    }
  },

  data () {
    return {
      currentValue: '',
      group: false,
      model: [],
      parent: null
    }
  },

  watch: {
    value: {
      handler () {
        this.updateModel()
        // if (value === this.trueValue || value === this.falseValue) {
        //   this.updateModel()
        // } else {
        //   console.log('Value should be trueValue or falseValue.')
        // }
      },
      immediate: true
    }
  },

  mounted () {
    this.parent = findComponentUpward(this, 'zCheckboxGroup')
    if (this.parent) this.group = true

    if (this.group) {
      this.parent.updateModel(true)
    } else {
      this.updateModel()
    }
  },

  methods: {
    updateModel () {
      this.currentValue = this.value === this.trueValue
    },

    handleChange (e) {
      if (this.disabled) return

      const checked = e.target.checked
      this.currentValue = checked

      const value = checked ? this.trueValue : this.falseValue
      this.$emit('input', value)

      if (this.group) {
        this.parent.handleChange(this.model)
      } else {
        this.$emit('on-change', value)
        this.dispatch('zFormItem', 'on-form-change', value)
      }
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
