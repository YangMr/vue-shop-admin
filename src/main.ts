import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// import 'normalize.css'
import 'windi.css'
import 'nprogress/nprogress.css'

import './style/index.scss'

app.use(router)
app.use(store)

import './permissions'
app.mount('#app')
