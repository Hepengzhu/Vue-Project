<template>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse = isCollapse
        :collapse-transition="false"
        style="height:98vh"
      >
        <h4 v-show="!isCollapse">后台管理系统</h4>
        <el-menu-item :index="item.path" v-for="item in noChildren()" :key="item.path"
            @click="clickMenu(item)">
            <!-- Vue3 动态图标 -->
            <component :is="item.icon" class="icons"></component>
            <template #title>{{item.label}}</template>
        </el-menu-item>  

        <el-sub-menu :index="item.path" v-for="item in hasChildren()" :key="item.path">
          <template #title>
            <component :is="item.icon" class="icons"></component>
            <span>{{item.label}}</span>
          </template>
          <!-- 子菜单 -->
          <el-menu-item-group v-for="sub_item in item.children" :key="sub_item.path">
            <el-menu-item :index="sub_item.path" @click="clickMenu(sub_item)">
                <component :is="sub_item.icon" class="icons"></component>
                <span>{{ sub_item.label}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>    
          
      </el-menu>        


</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex' // 引入useStore 方法
import {useRouter} from 'vue-router'
    export default {
        setup(props) {
            const store = useStore()  // 该方法用于返回store 实例
            const router = useRouter()
            let isCollapse = computed(()=>{
               return store.state.isCollapse
            }) //是否折叠
            
            const list = [
            {
            path: '/',
            name: 'home',
            label: '首页',
            icon: 'HomeFilled',
            url: 'Home/Home'
            },
            {
            path: '/mall',
            name: 'mall',
            label: '商品管理',
            icon: 'ShoppingCart',
            url: 'MallManage/MallManage'
            },
            {
            path: '/user',
            name: 'user',
            label: '用户管理',
            icon: 'user',
            url: 'UserManage/UserManage'
            },
            {
            label: '其他',
            icon: 'More',
            children: [
                {
                path: '/page1',
                name: 'page1',
                label: '页面1',
                icon: 'setting',
                url: 'Other/PageOne'
                },
                {
                path: '/page2',
                name: 'page2',
                label: '页面2',
                icon: 'setting',
                url: 'Other/PageTwo'
                }
            ]
            }
            ]
            const asyncList = store.state.menu
            // 有子菜单
            const hasChildren = ()=>{
                return asyncList.filter(item => item.children)
            }
            // 没有子菜单
            const noChildren = ()=>{
                return asyncList.filter(item=>!item.children)
            }
            // 菜单点击路由跳转事件
            const clickMenu = (item)=>{
                router.push(item.path)

                // vux管理面包屑
                store.commit('selectMenu',item)


            }


        return {
            isCollapse,
            hasChildren,
            noChildren,
            clickMenu
        }
        }
        
    }
</script>

<style lang="less">
    .el-menu {
        width: 100%;
        text-align: center;
        line-height: 50px;

    }
    .icons{
        width: 18px;
        height: 18px;
        margin-right: 10px;
    }
</style>