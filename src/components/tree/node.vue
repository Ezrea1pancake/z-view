<template>
  <ul class="tree-ul">
    <li class="tree-li">
      <span class="tree-expand" @click="handleExpand">
        <span v-if="data.children && data.children.length && !data.expand">+</span>
        <span v-if="data.children && data.children.length && data.expand">-</span>
      </span>
      <z-checkbox
        v-if="showCheckbox"
        :value="data.checked"
        @input="handleCheck"
      ></z-checkbox>
      <span>{{ data.title }}</span>
      <template v-if="data.expand">
        <tree-node
          v-for="(item, index) in data.children"
          :key="index"
          :data="item"
          :show-checkbox="showCheckbox"
        />
      </template>
    </li>
  </ul>
</template>

<script>
import zCheckbox from '@/components/checkbox/checkbox'
import { findComponentUpward } from '@/utils/assist'

export default {
  name: 'TreeNode',

  components: {
    zCheckbox
  },

  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      tree: findComponentUpward(this, 'Tree')
    }
  },

  watch: {
    'data.children': {
      handler (children) {
        if (children && children.length) {
          const checked = children.every(item => item.checked)
          this.$set(this.data, 'checked', checked)
        }
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    handleExpand () {
      this.$set(this.data, 'expand', !this.data.expand)

      if (this.tree) this.tree.emitEvent('on-toggle-expand', this.data)
    },
    handleCheck (checked) {
      this.updateTreeDown(this.data, checked)

      if (this.tree) this.tree.emitEvent('on-check-change', this.data)
    },
    updateTreeDown (data, checked) {
      this.$set(data, 'checked', checked)

      if (data.children && data.children.length) {
        data.children.forEach(item => {
          this.updateTreeDown(item, checked)
        })
      }
    }
  }
}

</script>

<style lang="less" scoped>

.tree-ul, .tree-li{
  list-style: none;
  padding-left: 10px;
}

.tree-expand{
  cursor: pointer;
}

</style>
