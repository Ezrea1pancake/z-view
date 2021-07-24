<template>
  <div>
    <table-slot-component :columns="columns" :data="data">
      <template #name="{ row, rowIndex }">
        <input v-if="editIndex === rowIndex" type="text" v-model="editName" />
        <span v-else>{{ row.name }}</span>
      </template>
      <template #age="{ row, rowIndex }">
        <input v-if="editIndex === rowIndex" type="text" v-model="editAge" />
        <span v-else>{{ row.age }}</span>
      </template>
      <template #birthday="{ row, rowIndex }">
        <input v-if="editIndex === rowIndex" type="text" v-model="editBirthday" />
        <span v-else>{{ row.birthday | getBirthday }}</span>
      </template>
      <template #address="{ row, rowIndex }">
        <input v-if="editIndex === rowIndex" type="text" v-model="editAddress" />
        <span v-else>{{ row.address }}</span>
      </template>
      <template #action="{ row, rowIndex }">
        <div v-if="editIndex === rowIndex">
          <button @click="handleSave(rowIndex)">保存</button>
          <button @click="editIndex = -1">取消</button>
        </div>
        <div v-else>
          <button @click="handleEdit(row, rowIndex)">修改</button>
        </div>
      </template>
    </table-slot-component>
  </div>
</template>

<script>
import TableSlotComponent from '@/components/table-render-slot/table'

export default {
  name: 'tableSlotRender',

  components: { TableSlotComponent },

  data () {
    return {
      columns: [
        {
          title: '姓名',
          key: 'name',
          slot: 'name'
        },
        {
          title: '年龄',
          key: 'age',
          slot: 'age'
        },
        {
          title: '出生日期',
          key: 'birthday',
          slot: 'birthday'
        },
        {
          title: '地址',
          key: 'address',
          slot: 'address'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          birthday: '919526400000',
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          birthday: '696096000000',
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          birthday: '563472000000',
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          birthday: '687024000000',
          address: '深圳市南山区深南大道'
        }
      ],
      editIndex: -1,
      editName: '',
      editAge: '',
      editBirthday: '',
      editAddress: ''
    }
  },

  filters: {
    getBirthday (birthday) {
      const date = new Date(parseInt(birthday))
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      return `${year}-${month}-${day}`
    }
  },

  methods: {
    handleEdit (row, rowIndex) {
      this.editName = row.name
      this.editAge = row.age
      this.editAddress = row.address
      this.editBirthday = row.birthday
      this.editIndex = rowIndex
    },
    handleSave (rowIndex) {
      this.data[rowIndex].name = this.editName
      this.data[rowIndex].age = this.editAge
      this.data[rowIndex].birthday = this.editBirthday
      this.data[rowIndex].address = this.editAddress
      this.editIndex = -1
    }
  }
}
</script>
