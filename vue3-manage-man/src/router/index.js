import {createRouter,createWebHashHistory} from 'vue-router'
 
const routes = [
    {
    path:'/',
    component:()=>import('../views/Main.vue'),
    name:'home1',
    redirect:'/home',//重定向
    // children:[
    //     {
    //         path:'/home',
    //         name:'home',
    //         component:()=>import('../views/home/Home.vue')
    //     },
    //     {
    //         path:'/user',
    //         name:'user',
    //         component:()=>import('../views/user/User.vue')
    //     },
    //     {
    //         path:'/mall',
    //         name:'mall',
    //         component:()=>import('../views/mall/Mall.vue')
    //     },
    //     {
    //         path:'/page1',
    //         name:'page1',
    //         component:()=>import('../views/others/PageOne.vue')
    //     },
    //     {
    //         path:'/page2',
    //         name:'page2',
    //         component:()=>import('../views/others/PageTwo.vue')
    //     }
    // ]
    children:[]
    },
    {
        path:"/login",
        name:"login",
        component:()=>import('../views/Login.vue')
    }

]

// 创建路由实例
const router = createRouter({
    history:createWebHashHistory(),
    routes
})

// 导出路由
export default router
