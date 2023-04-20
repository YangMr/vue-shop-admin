import store from '../store'

/**
 * 按钮权限实现的思路
 * 自定义指令
 * 按钮权限数据
 *
 *
 * 1. 用户登录并且获取到用户信息之后, 将按钮权限的数据存储到vuex中
 * 2. 创建全局自定义指令
 * 3. 给按钮绑定当前按钮所拥有的权限
 * 4. 在自定义指令内部获取到当前按钮所绑定的权限
 * 5. 在自定义指令内部获取到vuex中后台所返回的按钮权限数据
 * 6. 判断当前按钮权限的数据是否在后台所返回的按钮权限列表数据中
 * 7. 如果不存在,则找到当前元素的父节点,并移除当前元素
 *
 */

const hasPermission = (el: any, binding: any) => {
  // 1. 先获取到当前按钮所绑定的权限
  const value = binding.value

  // 2. 获取到后台返回的按钮权限列表
  // const buttonPermission = ['remove', 'edit', 'query']
  const buttonPermission = store.state.ruleName
  console.log(buttonPermission)

  // 3. 判断当前按钮所绑定的权限是否存在于后台返回的按钮权限列表中
  const hasPermissionStatus =
    value.findIndex((v: never) => buttonPermission.includes(v)) !== -1

  // 4. 如果不存在,则让当前的按钮移除
  if (el && !hasPermissionStatus) {
    el.parentNode.removeChild(el)
  }
}

export default {
  install(app: any) {
    app.directive('permission', {
      mounted(el: any, binding: any) {
        hasPermission(el, binding)
      }
    })
  }
}
