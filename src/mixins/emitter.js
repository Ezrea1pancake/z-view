function boardcast (componentName, eventName, params) {
  // 判断当前节点是否拥有子节点
  if (!this.$children || !this.$children.length) return

  // 遍历子节点
  this.$children.forEach(child => {
    const name = child.$options.name

    if (name && name === componentName) {
      child.$emit.apply(child, [eventName].concat([params]))
    } else {
      // 递归遍历子节点
      boardcast.call(child, componentName, eventName, params)
    }
  })
}

export default {
  methods: {
    dispatch (componentName, eventName, params) {
      // 首先获取当前组件的父节点
      let parent = this.$parent || this.$root
      let name = parent.$options.name

      // 递归向上寻找匹配的父节点
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.name
        }
      }

      if (parent) {
        parent.$emit.apply(parent, [eventName].concat([params]))
      }
    },
    boardcast (componentName, eventName, params) {
      boardcast.call(this, componentName, eventName, params)
    }
  }
}
