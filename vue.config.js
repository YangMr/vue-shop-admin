const { defineConfig } = require('@vue/cli-service')
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

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
    host: 'localhost',
    proxy: {
      // 跨域配置 --- 多个配置跨域代理
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
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
