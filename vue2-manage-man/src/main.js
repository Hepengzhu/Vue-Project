import Vue from 'vue'
import router from './router'
// import {Button,Row,Container,Aside,Main,Header} from 'element-ui'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index';
// 引入mock 拦截axios请求
import './api/mock'

import App from './App.vue'
Vue.config.productionTip = false

Vue.use(ElementUI)

// 按需引入
// Vue.use(Button)
// Vue.use(Row)
// Vue.use(Container)
// Vue.use(Aside)
// Vue.use(Main)
// Vue.use(Header)


new Vue({
  
  render: h => h(App),
  // 向vue实例上面 添加router
  router,
  store,
  // 调用addMenu 创建路由组件  (解决刷新后页面空白问题)
  created(){
    store.commit('tab/addMenu',router)
  }
}).$mount('#app')
