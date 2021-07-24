// 向上找到最近的指定的组件
function findComponentUpward (context, componentName) {
  let parent = context.$parent
  let name = parent.$options.name

  while (parent && (!name || componentName !== name)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }

  return parent
}

// 向上找到所有的指定的组件
function findComponentsUpward (context, componentName) {
  const parents = []
  const parent = context.$parent

  if (parent) {
    if (componentName === parent.$options.name) parents.push(parent)
    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return []
  }
}

// 向下找到最近的指定的组件
function findComponentDownward (context, componentName) {
  const childrens = context.children
  let children = null

  if (!children.length) return
  for (let i = 0; i < childrens.length; i++) {
    const child = childrens[i]
    if (child.$options.name === componentName) {
      children = child
      break
    } else {
      children = findComponentDownward(child, componentName)
      if (children) break
    }
  }

  return children
}

// 向下找到所有的指定的组件
function findComponentsDownward (context, componentName) {
  // const childrens = context.children
  // const children = []

  // if (!children.length) return []
  // for (let i = 0; i < childrens.length; i++) {
  //   const child = childrens[i]
  //   if (child.$options.name === componentName) {
  //     children.push(child)
  //     children.concat(findComponentsDownward(child, componentName))
  //   }
  // }

  // return children
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    return components.concat(findComponentsDownward(child, componentName))
  }, [])
}

// 在兄弟组件中找到指定的组件
function findBrotherComponents (context, componentName, exceptSelf) {
  const brother = context.$parent.$children.filter(item => item.$options.name === componentName)
  // 根据uid找到组件自身
  const index = brother.findIndex(item => item.uid === context.uid)
  if (exceptSelf) brother.splice(index, 1)

  return brother
}

function typeOf (obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

// deepCopy
function deepCopy (data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (const i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

export {
  findComponentUpward,
  findComponentsUpward,
  findComponentDownward,
  findComponentsDownward,
  findBrotherComponents,
  deepCopy
}
