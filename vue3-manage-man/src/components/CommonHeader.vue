<template>

  <div class="header">
    <!-- 菜单图标 -->
    <div class="l-content">
      <el-button @click="Collapse">
        <el-icon><Menu /></el-icon>
      </el-button>

      <!-- <span>首页</span>     -->
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!--  -->
        <el-breadcrumb-item :to="currentMenu.path" v-if="currentMenu">{{currentMenu.label}}</el-breadcrumb-item>

      </el-breadcrumb>      
    </div>

    <div class="r-content">
      <el-dropdown>
            <span class="el-dropdown-link img">
                <img :src="getImgsrc('user')" alt=""/>
            </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided @click="handleLoginout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown> 
    </div>
  </div>
  <!-- <el-divider class="line" /> -->
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex' // 引入useStore 方法
import { useRouter } from 'vue-router'
    export default {
      setup(){
        const store = useStore()  // 该方法用于返回store 实例
        const router = useRouter()
        const getImgsrc = (user)=>{
          // vue3 + vite 动态引入图片
          return new URL(`../assets/images/${user}.png`,import.meta.url).href
        }

        const Collapse = ()=>{
          console.log(store.state.isCollapse);
          store.commit('updateIsCollapse')
        }
        // 获取当前菜单
        const currentMenu = computed(()=>{
          return store.state.currentMenu
        })
        
        // 退出
        const handleLoginout = ()=>{
          store.commit('cleanMenu')
          router.push('/login')
          // 清除cookie
          store.commit('clearToken')
        }
        return {
          getImgsrc,
          Collapse,
          currentMenu,
          handleLoginout
        }
      }
    }
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    // background-color: #eee8e8;
    // border-bottom: 1px solid ;
    padding: 0px 10px;
    border-bottom: 1px solid #ccc;
    .l-content {
      display: flex;
      align-items: center;
     span {
       margin-left: 10px;
       font-size: 15px;
       font-weight: 500;
     }
     .bread :deep(span) {
      font-weight: 400;
      cursor: pointer;
     }
    }
    
    .r-content {
      .img {
      width: 40px;
      border-radius: 50%;
      img{
        width: 100%;    
        border-radius: 50%;
      }  
    }      
    }


  }
</style>