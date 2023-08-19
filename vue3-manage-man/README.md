# Vue 3 + Vite + Element Plus + +Router + Vuex + axios +axios的二次分封装 + fast mock + echarts + 权限管理

# 一个通用的后台管理

# 总体展示 

1.登录
![image](https://github.com/Hepengzhu/Vue-Project/assets/120250850/658b437a-ff96-4891-b8bc-681e8d1ee47f)
2.首页
![image](https://github.com/Hepengzhu/Vue-Project/assets/120250850/0d7ea721-458a-4683-ab93-ac37fff80d64)
3.用户管理
![image](https://github.com/Hepengzhu/Vue-Project/assets/120250850/19c35613-97b8-4e40-9157-95cb57510663)
4.新增用户

![image](https://github.com/Hepengzhu/Vue-Project/assets/120250850/fb97cae0-291d-4ec7-8ea9-2310d2895835)
5.编辑用户

![image](https://github.com/Hepengzhu/Vue-Project/assets/120250850/a9de7511-2c9a-479b-802b-58754d5e9a6f)
6.删除用户

![image](https://github.com/Hepengzhu/Vue-Project/assets/120250850/727f506d-a12a-4c08-a090-1bd47f69eb89)

# 功能说明

使用fast mock 模拟后台接口

#1.支持两种用户角色登录，不同的角色登录权限不同
 后台根据角色返回对应的菜单数据，菜单数据由Vuex管理，依据数据渲染菜单和动态注册路由，为防止页面刷新Vuex的数据失效，还将数据存入本地浏览器中，做数据持久化处理。
	

```js
// 获取菜单
setMenu(state,val) {
  state.menu = val
  localStorage.setItem('menu',JSON.stringify(state.menu))
},
// 从本地读取菜单
addMenu(state,router) {
  if(!localStorage.getItem('menu')) return
  const menu = JSON.parse(localStorage.getItem('menu')) 
  state.menu = menu
  // 动态注册路由
  const menuArray = []
  menu.forEach(item => {
      if(item.children){
          item.children = item.children.map(item=>{
              let url = `../views/${item.url}.vue`
              // /* @vite-ignore */ 取消警告
              item.component = ()=>import(/* @vite-ignore */url)
              return item
          })
          menuArray.push(...item.children)
      }
      else{
          let url = `../views/${item.url}.vue`
          item.component = ()=>import(/* @vite-ignore */url)      
          menuArray.push(item)              
      }
  }); 
  menuArray.forEach(item=>{
      router.addRoute('home1',item)
  })
},

// 清除menu
cleanMenu(state,val){
  state.menu = []
  localStorage.removeItem('menu')
},
```

#2.axios的二次封装

```js
import axios from "axios";
import config from "../config";
import { ElMessage } from "element-plus";
const NETWORK_ERROE = '网络请求异常,请稍后再试'
// 对axios进行二次封装

// 创建axios实例对象
const service = axios.create({
    baseURL:config.baseApi
})

// 请求拦截器 (请求之前做一些事)
service.interceptors.request.use((req)=>{
    // 自定义header
    // jwt-token认证的时候
    return req
})

// 响应拦截器(请求之后做一些事)
service.interceptors.response.use((res)=>{
    // 对请求结果进行统一的处理  
    // 解构结果
    const {code,data,msg} = res.data
    if(code == 200) {
        return data
    }else{
        // 网络请求错误
        ElMessage.error(msg || NETWORK_ERROE)
        return Promise.reject(msg || NETWORK_ERROE)
    }
})

// 封装核心函数
function request(options) {
    /**
     * options:{
     *  method:'get',
     *  data:{
     *      相关参数
     *  },
     * mock:false
     * .....
     * }
     */
    options.method = options.method || 'get' //如果options.method为空 给个默认的请求方法get
    if(options.method.toLowerCase() == 'get') {
        options.params = options.data//参数
    }

    // 对mock的处理
    let isMock = config.mock //获取系统mock的开关(判断当前是否为mock模拟)
    if(typeof options.mock !== 'undefined') {
        //如果当前options 配置了mock  则使用配置的mock
        isMock = options.mock
    }

    // 对线上环境做处理
    if(config.evn == 'prod') {
        //如果是线上环境  直接设置 为线上的baseURL
        service.defaults.baseURL = config.baseApi
    }else {
        // 否则根据 mock的开关来决定
        service.defaults.baseURL = isMock? config.mockApi : config.baseApi
    }

    return service(options)
}

export default request
```

​	请求环境的统一配置文件

```js
// 获取当前环境
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
    // 开发
    development:{
        baseApi:'/api',
        mockApi:'https://www.fastmock.site/mock/ecfbecf5049ed67f09d20312b0b3380a/api'
    },
    // 测试
    test:{
        baseApi:'//test.hpz.com/api',
        mockApi:'https://www.fastmock.site/mock/ecfbecf5049ed67f09d20312b0b3380a/api'
    },
    // 线上
    pro:{
        baseApi:'//hpz.com/api',
        mockApi:'https://www.fastmock.site/mock/ecfbecf5049ed67f09d20312b0b3380a/api'
    },
}

export default {
    env,
    //mock的总开关
    mock:true,
    // 获取当前环境的配置项，并解构
    ...EnvConfig[env]
}

```

#3.路由守卫

​	（1）输入不正确或不存在的路径，返回当前页面。

​	（2）用户没有登录时跳转到登录页面

```js
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

```

#4.左边是菜单栏，根据角色的权限显示菜单，头部有面包屑和tag标签，以及折叠菜单栏的按钮
  数据由不同组件共享，同样由Vuex管理

#5.首页展示登录信息以及数据图表，图表主要是使用了echarts图表库



#6.用户管理

​	（1）可以新增，编辑，删除用户，通过用户名搜索用户

​    （2）通过分页展示用户信息
