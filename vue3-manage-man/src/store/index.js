import Cookie from "js-cookie";
import { createStore } from "vuex";


export default createStore({
    state:{
        isCollapse:false,
        currentMenu:null,
        // tag 
        tabList:[
            {
                path:'/',
                name:"home",
                label:"首页",
                icon:'home'
            }
        ],

        // 菜单
        menu:[],
        token:''
    },
    mutations:{
        updateIsCollapse(state,value) {
            state.isCollapse = !state.isCollapse
        },

        // 面包屑 和tag
        selectMenu(state,val) {
            // 判断
            if(val.name == 'home'){
                state.currentMenu = null
            }
            else {
                state.currentMenu = val
                // 如果点击菜单没有在tabList里面，则添加
                if(state.tabList.findIndex((item=>item.name == val.name)) == -1) {
                    state.tabList.push(val)
                }
            }
        },
        // 关闭 tag
        closeTag(state,val) {
            // 获取关闭的元素索引
            let res = state.tabList.findIndex((item)=>item.name == val.name)
            state.tabList.splice(res,1)
        },

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
        
        // 设置token
        setToken(state,val){
            state.token = val
            Cookie.set('token',val)
        },
        // 清除
        clearToken(state){
            state.token = '',
            Cookie.remove('token')
        },
        // 获取
        getToken(state){
            state.token = state.token || Cookie.get('token')
        }


    }
})