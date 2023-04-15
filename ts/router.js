// 前端自定义的路由表
// const asyncRoutes = [
//   {
//     path: '/',

const { routerKey } = require('vue-router')

//     meta: {
//       title: '后台首页'
//     }
//   },
//   {
//     path: '/goods/list',

//     meta: {
//       title: '商品管理'
//     }
//   },
//   {
//     path: '/category/list',

//     meta: {
//       title: '分类管理'
//     }
//   },
//   {
//     path: '/skus/list',

//     meta: {
//       title: '规格管理'
//     }
//   }
// ]

// 模拟后台返回的权限数据
// const menus = [
//   {
//     id: 1,
//     path: '/',
//     name: '后台首页'
//   },
//   {
//     id: 1,
//     path: '/goods/list',
//     name: '商品管理'
//   }
// ]

const arr = [
  {
    id: 1,
    name: 'jack',
    child: [
      {
        id: 11,
        name: 'dog'
      },
      {
        id: 11,
        name: 'cat'
      }
    ]
  },
  {
    id: 2,
    name: 'rose'
  },
  {
    id: 3,
    name: 'nick'
  },
  {
    id: 4,
    name: 'tom'
  }
]
const newArr = [
  {
    id: 1,
    name: 'jack',
    child: [
      {
        id: 11,
        name: 'cat'
      }
    ]
  },
  {
    id: 3,
    name: 'nick'
  }
]

// es6 find findIndex
// hasRoute 用来判断当前要添加的路由是否存在与已注册的路由表中
newArr.forEach((item) => {
  // const t = arr.find((m) => m.id === item.id)
  // if(t && !router.hasRoute(t.path)){
  //   router.addRoute("admin",item)
  // }
  // const t = arr.find((m) => {
  //   if (m.id === item.id) {
  //     if (item.child && item.child.length > 0) {
  //       item.child.forEach((p) => {
  //         if (m.child && m.child.length > 0) {
  //           const a = m.child.find((c) => c.id === p.id)
  //           m.child = [a]
  //         }
  //       })
  //       return m.child
  //     } else {
  //       return m
  //     }
  //   }
  // })
  // console.log(t)
})

// const data = newArr.filter((item) => {
//   const a = arr.filter((m) => {
//     if (m.id === item.id) {
//       return m
//     }
//   })
//   return a
// })
// console.log(data)

// 系统
// you    girl
// 0      100

// num++
// num++
// num++
// num++
// num++
// console.log(num)

// for (let i = 0; i < 100; i++) {
//   num += 1
// }

// console.log(num)
// 递归 : 函数自身调用函数自身, 必须要有结束的条件, 会造成盏溢出 (死循环)
// let num = 0
// function step() {
//   num += 1
//   console.log(num)
//   if (num < 100) {
//     step()
//   }
// }

// step()
//
// function getNumbert(num) {
//   if (num <= 5) {
//     // 0 + 1
//     // 1 + 2
//     // 2 + 3
//     // 3 + 4
//     // 4 + 5
//     // 5 + 6
//     return num + getNumbert(num + 1)
//   }
//   return 0
// }
// console.log(getNumbert(0))
var data = [
  {
    name: 'IT互联网',
    child: [
      {
        name: '编辑语言',
        child: [
          { name: 'java' },
          { name: 'c#/.net' },
          { name: 'python' },
          {
            name: '前端开发',
            child: [{ name: 'jq' }, { name: 'vue' }, { name: 'react' }]
          }
        ]
      },
      {
        name: '移动开发',
        child: [{ name: 'android开发' }, { name: 'IOS开发' }]
      },
      {
        name: '游戏开发',
        child: [
          { name: 'phaser游戏开发' },
          {
            name: 'webGL游戏开发',
            child: [{ name: '3D游戏' }, { name: '2D游戏' }]
          }
        ]
      }
    ]
  },
  {
    name: '设计创作',
    child: [
      {
        name: '平面设计',
        child: [
          { name: '电商美工' },
          { name: '综合平面设计' },
          { name: '摄 影后期' }
        ]
      },
      {
        name: 'UI设计',
        child: [
          { name: '交互设计' },
          { name: 'webUI设计' },
          { name: '游戏UI 设计' }
        ]
      },
      { name: '软件设计' }
    ]
  },
  {
    name: '升学考研',
    child: [
      { name: '考研' },
      { name: '大学' },
      { name: '高中' },
      { name: '初中' }
    ]
  },
  {
    name: '职企考证',
    child: [
      { name: '公务员', child: [{ name: '教师考试' }, { name: '建筑工程' }] }
    ]
  }
]

let arr1 = []
for (var i = 0; i < data.length; i++) {
  let obj = { name: data[i].name }
  arr1.push(obj)
  for
}

console.log(arr1)
