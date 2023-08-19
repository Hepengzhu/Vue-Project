import VueRouter from 'vue-router'
import Vue from 'vue'
import Cookie from 'js-cookie'
Vue.use(VueRouter) 

import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'



// 1.创建路由组件
// 2.将路由与组件进行映射
// 3.创建router实例

// 注册路由
const routes = [
    {
        path:'/',
        component:Main,
        name:'Main',
        redirect:'/home', //重定向  当路径为/时，跳转到 /home
        // 子路由
        children:[
            // {path:'home', name:"home", component:Home},//首页组件
            // {path:'user',name:"user", component:User},//用户组件
            // {path:'mall',name:"mall", component:Mall},//商品组件
            // {path:'page1',name:"page1", component:PageOne},//页面1
            // {path:'page2',name:"page2", component:PageTwo},//页面2
        ]
    },
    {
        path:'/login',
        name:'login',
        component:Login
    }
    
]

const router = new VueRouter({
    routes //缩写 相当于 routes:routes
})

// 路由前置守卫
router.beforeEach((to,from,next)=>{
    // 获取cookie中的token
    const token = Cookie.get('token')
    // 如果token不存在，且没有在登录页面 ，说明没有登录，应该跳转登录页面
    if(!token && to.name !== 'login') {
        next({name:'login'})
    }
    else if(token && to.name === 'login') {//如果token存在 还跳转登录 应该退出在登录，所以应该返回首页
        next({name:'home'})
    }else {
        next()
    }
})

// 向外暴露
export default router