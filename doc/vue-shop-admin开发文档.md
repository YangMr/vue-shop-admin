# vue-shop-admin开发文档

## 一、项目介绍

http://shop.2yuecloud.com



## 二、创建项目

```shell
vue create vue-shop-admin
```



## 三、使用Git对项目进行版本控制

### 3.1 将本地仓库和远程仓库建立连接

```shell
git remote add origin git@github.com:YangMr/vue-shop-admin.git
```

### 3.2 将本地仓库的代码推送到远程仓库

```shell
git push origin main
```



## 四、代码规范

### 4.1 集成editorconfig配置

![image-20230406132152964](./assets/image-20230406132152964.png)

EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。

```shell
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

![image-20230406132223074](./assets/image-20230406132223074.png)

VSCode需要安装一个插件：EditorConfig for VS Code

![image-20230406130913001](./assets/image-20230406130913001.png)



### 4.2 使用prettier工具

Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

#### 4.2.1 VSCode需要安装prettier的插件

![image-20230406132800821](./assets/image-20230406132800821.png)

#### 4.2.2 安装prettier

```shell
npm install prettier -D
```

#### 4.2.3 配置.prettierrc文件：

![image-20230406135317023](./assets/image-20230406135317023.png)

* useTabs：使用tab缩进还是空格缩进，选择false；
* tabWidth：tab是空格的情况下，是几个空格，选择2个；
* printWidth：当行字符的长度，推荐80，也有人喜欢100或者120；
* singleQuote：使用单引号还是双引号，选择true，使用单引号；
* trailingComma：在多行输入的尾逗号是否添加，设置为 `none`；
* semi：语句末尾是否要加分号，默认值true，选择false表示不加；

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

#### 4.2.4 创建.prettierignore忽略文件

![image-20230406135539554](./assets/image-20230406135539554.png)

```shell
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

#### 4.2.5 测试prettier是否生效

* 测试一：在代码中保存代码；
* 测试二：配置一次性修改的命令；

在package.json中配置一个scripts：

```json
"prettier": "prettier --write ."
```

![image-20230406135941718](./assets/image-20230406135941718.png)

### 4.3 使用ESLint检测

#### 4.3.1 什么是eslint?

ESLint是一个开源的JavaScript代码检查工具，它可以帮助开发者在编写代码时发现和修复代码错误、维护一致的代码风格、避免潜在的问题等。ESLint支持在命令行中运行，也可以集成到各种开发工具中，如编辑器、集成开发环境等。通过配置ESLint，开发者可以自定义检查规则和限制，以满足项目的需求和约定.

#### 4.3.2 如何使用eslint?

1. 在前面创建项目的时候，我们就选择了ESLint，所以Vue会默认帮助我们配置需要的ESLint环境。

2. VSCode需要安装ESLint插件：

   ![image-20230406140351623](./assets/image-20230406140351623.png)

3. 解决eslint和prettier冲突的问题

   安装插件：（vue在创建项目时，如果选择prettier，那么这两个插件会自动安装）

   ```shell
   npm i eslint-plugin-prettier eslint-config-prettier -D
   ```

   添加prettier插件：

   ```shell
     extends: [
       "plugin:vue/vue3-essential",
       "eslint:recommended",
       "@vue/typescript/recommended",
       "@vue/prettier",
       "@vue/prettier/@typescript-eslint",
       'plugin:prettier/recommended'
     ],
   ```

### 4.4 git Husky和eslint

虽然我们已经要求项目使用eslint了，但是不能保证组员提交代码之前都将eslint中的问题解决掉了：

* 也就是我们希望保证代码仓库中的代码都是符合eslint规范的；

* 那么我们需要在组员执行 `git commit ` 命令的时候对其进行校验，如果不符合eslint规范，那么自动通过规范进行修复

那么如何做到这一点呢？可以通过Husky工具：

* husky是一个git hook工具，可以帮助我们触发git提交的各个阶段：pre-commit、commit-msg、pre-push

如何使用husky呢？

这里我们可以使用自动配置命令：

```shell
npx husky-init && npm install
```

这里会做三件事：

1. 安装husky相关的依赖：
   ![image-20230406141352101](./assets/image-20230406141352101.png)
2. 在项目目录下创建 `.husky` 文件夹：

```shell
npx huksy install
```

![image-20230406141715103](./assets/image-20230406141715103.png)

3. 在package.json中添加一个脚本：

![image-20230406141800649](./assets/image-20230406141800649.png)

4. 接下来，我们需要去完成一个操作：在进行commit时，执行lint脚本：

![image-20230406141819247](./assets/image-20230406141819247.png)

5. 这个时候我们执行git commit的时候会自动对代码进行lint校验。



### 4.5 git commit规范

#### 4.5.1 代码提交风格

通常我们的git commit会按照统一的风格来提交，这样可以快速定位每次提交的内容，方便之后对版本进行控制。

![image-20230406143256376](./assets/image-20230406143256376.png)

但是如果每次手动来编写这些是比较麻烦的事情，我们可以使用一个工具：Commitizen

- Commitizen 是一个帮助我们编写规范 commit message 的工具；

1. 安装Commitizen

```shell
npm install commitizen -D
```

2. 安装cz-conventional-changelog，并且初始化cz-conventional-changelog：

```
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

这个命令会帮助我们安装cz-conventional-changelog：

![image-20230406143331040](./assets/image-20230406143331040.png)

并且在package.json中进行配置：

![image-20230406143341161](./assets/image-20230406143341161.png)

这个时候我们提交代码需要使用 `npx cz`：

- 第一步是选择type，本次更新的类型

| Type     | 作用                                                         |
| -------- | ------------------------------------------------------------ |
| feat     | 新增特性 (feature)                                           |
| fix      | 修复 Bug(bug fix)                                            |
| docs     | 修改文档 (documentation)                                     |
| style    | 代码格式修改(white-space, formatting, missing semi colons, etc) |
| refactor | 代码重构(refactor)                                           |
| perf     | 改善性能(A code change that improves performance)            |
| test     | 测试(when adding missing tests)                              |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等） |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具(比如更改测试环境)                     |
| revert   | 代码回退                                                     |

- 第二步选择本次修改的范围（作用域）

![image-20230406143618548](./assets/image-20230406143618548.png)

- 第三步选择提交的信息

![image-20230406144120504](./assets/image-20230406144120504.png)

- 第四步提交详细的描述信息

![image-20230406144132554](./assets/image-20230406144132554.png)

- 第五步是否是一次重大的更改

![image-20230406144143077](./assets/image-20230406144143077.png)

- 第六步是否影响某个open issue

![image-20230406144156108](./assets/image-20230406144156108.png)

我们也可以在scripts中构建一个命令来执行 cz：

#### 4.5.2 代码提交验证

如果我们按照cz来规范了提交风格，但是依然有同事通过 `git commit` 按照不规范的格式提交应该怎么办呢？

- 我们可以通过commitlint来限制提交；

1. 安装 @commitlint/config-conventional 和 @commitlint/cli

```shell
npm i @commitlint/config-conventional @commitlint/cli -D
```

2. 在根目录创建commitlint.config.js文件，配置commitlint

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

3. 使用husky生成commit-msg文件，验证提交信息：

```shell
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```



## 五、第三方库集成

### 5.1  vue.config.js配置

vue.config.js有三种配置方式：

* 方式一：直接通过CLI提供给我们的选项来配置：
  * 比如publicPath：配置应用程序部署的子目录（默认是 `/`，相当于部署在 `https://www.my-app.com/`）；
  * 比如outputDir：修改输出的文件夹；
* 方式二：通过configureWebpack修改webpack的配置：
  * 可以是一个对象，直接会被合并；
  * 可以是一个函数，会接收一个config，可以通过config来修改配置；
* 方式三：通过chainWebpack修改webpack的配置：
  * 是一个函数，会接收一个基于  [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 的config对象，可以对配置进行修改；

```javascript
const path = require('path')

module.exports = {
  // 方式一: 默认配置
  outputDir: './build',
  // 配置方式二: 将现有的配置合并到webpack中
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       views: '@/views'
  //     }
  //   }
  // }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },
  // 配置方式三: 支持链式调用三
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('views', '@/views')
  }
}
```

### 5.2 vue-router集成

安装vue-router的最新版本：

```shell
npm install vue-router@next
```

创建router对象：

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: () => import('../views/main/main.vue')
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
```

引入router：

```javascript
import router from './router'

createApp(App).use(router).mount('#app')
```

在App.vue中配置跳转：

```html
<template>
  <div id="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>
    <router-view></router-view>
  </div>
</template>
```

### 5.3  vuex集成

安装vuex：

```shell
npm install vuex@next
```

创建store对象：

```ts
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      name: 'coderwhy'
    }
  }
})

export default store
```

安装store：

```ts
createApp(App).use(router).use(store).mount('#app')
```

在App.vue中使用：

```html
<h2>{{ $store.state.name }}</h2>
```

### 5.4 element-plus集成

Element Plus，一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的桌面端组件库：

* 相信很多同学在Vue2中都使用过element-ui，而element-plus正是element-ui针对于vue3开发的一个UI组件库；
* 它的使用方式和很多其他的组件库是一样的，所以学会element-plus，其他类似于ant-design-vue、NaiveUI、VantUI都是差不多的；

安装element-plus

```shell
npm install element-plus
```

#### 5.4.1 全局引入

一种引入element-plus的方式是全局引入，代表的含义是所有的组件和插件都会被自动注册：

```js
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import router from './router'
import store from './store'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
```

#### 5.4.2 按需引入

也就是在开发中用到某个组件对某个组件进行引入：

```vue
<template>
  <div id="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>
    <router-view></router-view>

    <h2>{{ $store.state.name }}</h2>

    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'App',
  components: {
    ElButton
  }
})
</script>

<style lang="less">
</style>
```



但是我们会发现是没有对应的样式的，引入样式有两种方式：

* 全局引用样式（像之前做的那样）；
* 局部引用样式；

1.首先你需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```shell
npm install -D unplugin-vue-components unplugin-auto-import
```

2.配置vue.config.js

```js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // ...
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
```

![image-20230408104645031](./assets/image-20230408104645031.png)



### 5.5 axios集成

安装axios：

```shell
npm install axios
```

封装axios：

```ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Result } from './types'
import { useUserStore } from '/@/store/modules/user'

class HYRequest {
  private instance: AxiosInstance

  private readonly options: AxiosRequestConfig

  constructor(options: AxiosRequestConfig) {
    this.options = options
    this.instance = axios.create(options)

    this.instance.interceptors.request.use(
      (config) => {
        const token = useUserStore().getToken
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 拦截响应的数据
        if (res.data.code === 0) {
          return res.data.data
        }
        return res.data
      },
      (err) => {
        return err
      }
    )
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse<Result<T>>>(config)
        .then((res) => {
          resolve((res as unknown) as Promise<T>)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  patch<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
}

export default HYRequest
```



## 六、项目基础配置

### 6.1 引入windicss工具库和配置

#### 6.1.1 访问windicss工具库官网

- 英文官网: https://windicss.org/

- 中文官网: https://cn.windicss.org/

#### 6.1.2  安装windicss

```shell
npm i -D windicss-webpack-plugin
```

#### 6.1.3 引入windicss插件

`vue.config.js`

```javascript
const { defineConfig } = require('@vue/cli-service')
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  // 方式一: 使用vue-cli的选项来进行配置
  publicPath: './',
  // 方式二:
  configureWebpack: {
    resolve: {
      alias: {
        com: '@/components'
      }
    },
    plugins: [
      new WindiCSSWebpackPlugin(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src/components')
  //   }
  // },
  // 方法三:
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('views', path.resolve(__dirname, 'src/views'))
  // },
  outputDir: 'build',
  devServer: {
    // 设置端口号 8888
    port: 8888,
    // 是否自动打开浏览器并运行
    open: true,
    // 设置主机名
    host: 'localhost'
  },
  // 关闭eslint
  lintOnSave: false
})
// 4.0 5.0
// 1. 处理跨域
// 2. 文件是干嘛的?
// 3. webpack --- 打包构建 --- nodejs
// 4. 同源策略? 域名、 协议、端口号  同源   跨域
// 跨域 只存在浏览器端
// 后端 没有
// nodejs   ---- 服务端  ---    第三方接口的数据  -》 接口
// vue-cli webpack5.0
// 不想用它
// 9999
// webpack   非常     vite
// process.env.NODE_ENV development production
// development 开发环境 开发模式
// production 生产环境 线上环境

```

`main.js`

```javascript
import 'windi.css'
```

注: 在`app.use(ElementPlus)`下面引入

#### 6.1.4 vscode中安装windicss插件

插件中搜索`windicss`



### 6.2 windicss小案例和@apply简化代码

#### 6.2.1 windicss小案例

1.1 先创建一个普通按钮

```vue
<button>按钮</button>
```

1.2 使用windicss提供的样式

设置按钮背景颜色

```vue
<button class=" bg-purple-500">按钮</button>
```

设置字体颜色

```vue
<button class=" bg-purple-500 text-indigo-50">按钮</button>
```

设置按钮间距

```vue
<button class=" bg-purple-500 text-indigo-50 px-4 py-2">按钮</button>
```

设置按钮圆角

```vue
<button class=" bg-purple-500 text-indigo-50 px-4 py-2 rounded">按钮</button>
```

鼠标移入颜色变深

```vue
<button class=" bg-purple-500 text-indigo-50 px-4 py-2 rounded hover:( bg-purple-900)">按钮</button>
```

鼠标移入颜色变深时希望有动画效果

```vue
<button class=" bg-purple-500 text-indigo-50 px-4 py-2 rounded transition-all hover:( bg-purple-900) ">按钮</button>
```

延长动画过渡时间

```vue
<button class=" bg-purple-500 text-indigo-50 px-4 py-2 rounded duration-150 transition-all hover:( bg-purple-900) ">按钮</button>
```

点击按钮时希望有轮廓

```vue
<button class=" bg-purple-500 text-indigo-50 px-4 py-2 rounded duration-150 transition-all hover:( bg-purple-900) focus:(ring-8)">按钮</button>
```

设置点击按钮时轮廓颜色

```vue
<button class=" bg-purple-500 text-indigo-50 px-4 py-2 rounded duration-150 transition-all hover:( bg-purple-900) focus:(ring-8 ring-yellow-500)">按钮</button>
```

#### 6.2.2 抽离所有类名

剪切刚才定义的所有类名, 重新定一个类名为`btn`

```vue
<button class="btn">按钮</button>
```

在style中使用`@apply`方法抽离类名

```css
<style>
.btn{
  @apply bg-purple-500 text-indigo-50 px-4 py-2 rounded duration-150 transition-all hover:( bg-purple-900) focus:(ring-8 ring-yellow-500);
}
</style>
```

在浏览器中预览

最后,大家就会这样写我们的代码结构就非常简洁了,并且页大大的提高了代码的可读性,以及可维护性



### 6.3 路由配置和404页面捕获

#### 6.3.1 创建后台首页页面

在src目录下创建`pages目录,在pages目录下创建index.vue文件`

`index.vue`

```vue
<template>
	<div>
  	后台首页
	</div>
</template>
```



#### 6.3.2 配置首页路由

`router/index.js`

```javascript
import Index from "~/pages/index.vue"

const routes = [
  {
    path : "/",
    component : Index
  }
]
```

`App.vue`

```vue
<template>
	<router-view></router-view>
</template>
```



#### 6.3.3 创建about页面

`在pages目录下创建about.vue文件`

`about.vue`

```vue
<template>
	<div>
  	关于我们
	</div>
</template>
```



#### 6.3.4 配置about页面路由

`router/index.js`

```javascript
import Index from "~/pages/index.vue"
import About from "~/pages/about.vue"

const routes = [
  {
    path : "/",
    component : Index
  },
  {
    path : "/about",
    component : About
  }
]
```



#### 6.3.5 创建404页面

`在pages目录下创建404.vue文件`

```vue
<template>
	<div>
  	404
	</div>
</template>
```



#### 6.3.6 配置404页面路由

404路由配置参考文档:

https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E6%8D%95%E8%8E%B7%E6%89%80%E6%9C%89%E8%B7%AF%E7%94%B1%E6%88%96-404-not-found-%E8%B7%AF%E7%94%B1

`router/index.js`

```javascript
import Index from "~/pages/index.vue"
import About from "~/pages/about.vue"
import NotFound from "~/pages/404.vue"

const routes = [
  {
    path : "/",
    component : Index
  },
  {
    path : "/about",
    component : About
  },
  { 
    path: '/:pathMatch(.*)*', 
   	name: 'NotFound', 
   	component: NotFound 
  }
]
```



#### 6.3.7 实现404页面布局

`404.vue`

```vue
<template>
	<div>
  	<el-result
        icon="warning"
        title="404提示"
        sub-title="你找的页面走丢了~"
      >
        <template #extra>
          <el-button type="primary">回到首页</el-button>
        </template>
      </el-result>
	</div>
</template>
```



#### 6.3.8 点击回到首页按钮跳转到首页

```vue
<template>
	<div>
  	<el-result
        icon="warning"
        title="404提示"
        sub-title="你找的页面走丢了~"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
        </template>
      </el-result>
	</div>
</template>
```

