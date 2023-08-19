<template>
    <div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" 
        @open="handleOpen" 
        @close="handleClose" 
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">  

            <h3>{{ isCollapse ? '后台': '通用后台管理系统'}}</h3>
            <el-menu-item @click="clickMenu(item)" v-for="item in noChild" :key="item.name" :index="item.name">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>  

            <el-submenu v-for="item in hasChild" :key="item.label" :index="item.label">
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{item.label}}</span>
                </template>
                <el-menu-item-group v-for="subitem in item.children" :key="subitem.path">
                    <el-menu-item @click="clickMenu(subitem)" :index="subitem.path">{{subitem.label}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import Cookie from 'js-cookie'
  export default {
    data() {
      return {
      //   menuData: [
      //   {
      //     path: "/",
      //     name: "home",
      //     label: "首页",
      //     icon: "s-home",
      //     url: "Home/Home",
      //   },
      //   {
      //     path: "/mall",
      //     name: "mall",
      //     label: "商品管理",
      //     icon: "video-play",
      //     url: "MallManage/MallManage",
      //   },
      //   {
      //     path: "/user",
      //     name: "user",
      //     label: "用户管理",
      //     icon: "user",
      //     url: "UserManage/UserManage",
      //   },
      //   {
      //     label: "其他",
      //     icon: "location",
      //     children: [
      //       {
      //         path: "/page1",
      //         name: "page1",
      //         label: "页面一",
      //         icon: "setting",
      //         url: "Other/PageOne",
      //       },
      //       {
      //         path: "/page2",
      //         name: "page2",
      //         label: "页面二",
      //         icon: "setting",
      //         url: "Other/PageTwo",
      //       },  
      //     ],
      //   },
      // ]

      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      // 使用push方法跳转
      clickMenu(item){
        // 当前路由与跳转路由不一致时，才允许跳转
        if(this.$route.path != item.path && !(this.$route.path == '/home' && item.path == '/')) {
          this.$router.push(item.path)
        }
        this.$store.commit('tab/selectMenu',item)
      },

    },
    computed:{
      // 没有子菜单
      noChild(){
        return this.menuData.filter(item=>!item.children)
      },
      // 有子菜单
      hasChild(){
        return this.menuData.filter(item=>item.children)
      },
      // 从vuex中的state的数据
      isCollapse(){
        // 模块化写法 tab模块里面的
        return this.$store.state.tab.isCollapse
      },
      menuData(){
        return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
      }
      
    }
  }
</script>

<style lang="less">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    height: 100vh;
    overflow: hidden;
    border-right: none;

    h3 {
      color: #fff;
      text-align: center;
      line-height: 48px;
      font-size: 14px;
      font-weight: 400;
    }
  }
</style>  