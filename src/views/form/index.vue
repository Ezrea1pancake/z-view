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
      <z-form-item label="多选框" prop="check">
        <z-checkbox v-model="formValidate.check" trueValue="1" falseValue="0"></z-checkbox>
      </z-form-item>
      <z-form-item label="多选框组" prop="checkGroup">
        <z-checkbox-group v-model="formValidate.checkGroup">
          <template v-for="(item, index) in checkGroupList">
            <z-checkbox
              :key="index"
              :value="item.value"
              :label="item.label"
            ></z-checkbox>
          </template>
        </z-checkbox-group>
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
import zCheckboxGroup from '@/components/checkbox/checkbox-group.vue'
import zCheckbox from '@/components/checkbox/checkbox.vue'

export default {
  components: { zForm, zFormItem, zInput, zCheckboxGroup, zCheckbox },
  data () {
    return {
      formValidate: {
        name: '',
        mail: '',
        check: '',
        checkGroup: []
      },
      checkGroupList: [
        {
          label: '选项1',
          value: 'a'
        },
        {
          label: '选项2',
          value: 'b'
        },
        {
          label: '选项3',
          value: 'c'
        }
      ],
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空' },
          { type: 'email', message: '邮箱格式不正确' }
        ],
        check: [
          { required: true, message: '多选框不能为空' }
        ],
        checkGroup: [
          { required: true, message: '多选框组不能为空' }
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
