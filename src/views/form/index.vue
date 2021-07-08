<template>
  <div>
    <h3>具有数据校验功能的表单组件——Form</h3>
    <z-form ref="form" :model="formValidate" :rules="ruleValidate">
      <z-form-item label="用户名" prop="name">
        <z-input v-model="formValidate.name"></z-input>
      </z-form-item>
      <z-form-item label="邮箱" prop="mail">
        <z-input v-model="formValidate.mail"></z-input>
      </z-form-item>
    </z-form>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>
<script>
import zForm from '@/components/form/form.vue'
import zFormItem from '@/components/form/form-item.vue'
import zInput from '@/components/input/input.vue'

export default {
  components: { zForm, zFormItem, zInput },
  data () {
    return {
      formValidate: {
        name: '',
        mail: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('提交成功')
        } else {
          console.log('表单校验失败')
        }
      })
    },
    handleReset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>
