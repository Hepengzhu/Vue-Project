import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router/index'
import './less/index.less'
// 引入element 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store/index'
// 引入mock.js
import './api/mock.js'
import api from './api/api'


// 创建app实例
const app = createApp(App)
// 加载动态路由 (注意需要放到前面的位置)
store.commit('addMenu',router)

function checkRouter(path) {
  // 获取匹配路径的个数，若不为零 则说明有该路径
  let hasCheck = router.getRoutes().filter(route=>route.path == path).length
  if(hasCheck) return true
  return false
}

// 路由守卫
router.beforeEach((to,from,next) =>{
  store.commit('getToken')
  const token = store.state.token
  // 如果token为空，且跳转到非登录页面，则需要登录
  if(!token && to.name != 'login') {
    next({
      name:'login'
    })
  }else if(!checkRouter(to.path)) {
    // 如果没有该路径 则退回原来的页面
    next({
      name:from.name
    })
  }else {
    next()
  }
  
})



app.use(router).use(store)
// 在app 上挂载 api
app.config.globalProperties.$api = api
// 使用elementPlus插件
// app.use(ElementPlus)
// 注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 挂载实例对象
app.mount('#app')


/* 
1.安装插件 npm install -D unplugin-vue-components unplugin-auto-import-import
2.vite.config里面配置
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})

 element plus 按需引入只需安装插件后在配置文件配置相关配置，无需在main.js里面配置，使用方法和全局引入一样
*/
