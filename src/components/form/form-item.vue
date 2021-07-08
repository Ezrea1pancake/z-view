<template>
  <div>
    <label v-if="label" :class="{'z-form-item-label-reqiured': isRequired}">{{label}}</label>
    <div>
      <slot />
      <div v-if="validateState === 'error'" class="z-form-item-message">{{ validateMessage }}</div>
    </div>
  </div>
</template>

<script>
import Emitter from '@/mixins/emitter'
import AsyncValidator from 'async-validator'

export default {
  name: 'zFormItem',

  mixins: [Emitter],

  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    }
  },

  inject: ['form'],

  data () {
    return {
      isRequired: false,
      initialValue: '',
      // 校验状态
      validateState: '',
      // 校验不通过信息
      validateMessage: ''
    }
  },

  computed: {
    fieldValue () {
      return this.form.model[this.prop]
    }
  },

  mounted () {
    // 如果没有传入prop，则无需校验
    if (!this.prop) return
    this.dispatch('zForm', 'on-form-item-add', this)

    this.initialValue = this.fieldValue

    this.setRules()
  },

  beforeDestroy () {
    if (!this.prop) return
    this.dispatch('zForm', 'on-form-item-remove', this)
  },

  methods: {
    setRules () {
      const rules = this.getRules()
      if (rules.length) {
        rules.every(rule => {
          this.isRequired = rule.required
        })
      }

      this.$on('on-form-change', this.onFieldChange)
      this.$on('on-form-blur', this.onFieldBlur)
    },
    // 从form中获取校验规则
    getRules () {
      let rules = this.form.rules
      rules = rules ? rules[this.prop] : []
      return [].concat(rules)
    },
    // 只支持blur和change的校验规则，过滤出有效的rule规则
    getFilterRule (trigger) {
      const rules = this.getRules()
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },
    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 校验完成回调函数
     */
    validate (trigger, callback = () => {}) {
      const rules = this.getFilterRule(trigger)

      if (!rules || rules.length === 0) {
        return true
      }

      // 设置状态为校验中
      this.validateState = 'validating'

      // 以下为 async-validator 库的调用方法
      const descriptor = {}
      descriptor[this.prop] = rules

      const validator = new AsyncValidator(descriptor)
      const model = {}

      model[this.prop] = this.fieldValue

      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''

        callback(this.validateMessage)
      })
    },
    onFieldBlur () {
      this.validate('blur')
    },
    onFieldChange () {
      this.validate('change')
    },
    // 重置校验数据
    resetField () {
      this.validateState = ''
      this.validateMessage = ''

      this.form.model[this.prop] = this.initialValue
    }
  }
}

</script>

<style lang="less" scoped>

.z-form-item-label-required:before {
  content: '*';
  color: red;
}
.z-form-item-message {
  color: red;
}

</style>
