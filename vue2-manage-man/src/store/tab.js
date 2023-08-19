import Cookie from "js-cookie"
export default {
    namespaced:true,
    state:{
        isCollapse:false, //控制菜单的展开还是收起
        tabsList:[
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }
        ], // 面包屑的内容

        // 动态显示菜单栏  菜单栏权限管理
        menu:[]
    },
    mutations:{
        // 修改菜单的状态()
        collapseMenu(state,value){
            // 状态取反
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑内容
        selectMenu(state,value){
            // 如果是home则不需要进行任何操作，因为home是默认第一个不需要添加
            if (value.name != 'home') {
                // 如果点击路径不在在面包屑中，则添加      findIndex 未找到返回 -1  使用大括号需要return 表达式
                const index = state.tabsList.findIndex(item =>{return item.name === value.name} )
                if( index === -1) {
                    state.tabsList.push(value)
                } 
            }
            
        },
        // 关闭tag标签
        closeTag(state,value) {
            // 获取当前点击tag的索引
            const index = state.tabsList.findIndex(val=>val.name === value.name)
            // 删除该索引的值
            state.tabsList.splice(index,1)
        },
        // 获取菜单
        setmenu(state,value) {
            state.menu = value
            // 缓存菜单  如果只读取 state 里面的数据刷新后就没了
            Cookie.set('menu',JSON.stringify(value))
        },
        // 动态注册路由（根据用户身份返回的数据，动态注册路由组件，决定用户可以访问哪些菜单）
        addMenu(state,router){
            // 判断缓存中是否有数据
            if(!Cookie.get('menu')) return  //没有数据直接返回
            const menu = JSON.parse(Cookie.get('menu')) //如果有，获取数据
            state.menu = menu
            // 动态组装路由数据
            const menuArry = []
            // 遍历菜单数据,要根据返回的菜单数据结构
            menu.forEach(item => {
                // 如果该菜单有子菜单
                if(item.children) {
                    // 添加路由的子路由（children  覆盖重写item的children属性）
                    item.children = item.children.map(item=>{
                        // 添加component属性  （是引入的组件  路由懒加载，动态引入）
                        item.component = () =>import(`../views/${item.url}`)
                        return item
                    })
                    menuArry.push(...item.children)
                }else {
                    item.component = ()=>import(`../views/${item.url}`)
                    menuArry.push(item)
                }
            });
            console.log(menuArry);
            // 路由的动态添加
            menuArry.forEach(item=>{
                // 通过addRoute 添加路由  在Main级路由下添加
                router.addRoute('Main',item)
            })
        }
    }

}