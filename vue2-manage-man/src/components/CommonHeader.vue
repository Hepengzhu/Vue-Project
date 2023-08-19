<template>
  <div class="header-container">
    <div class="l-content">
        <el-button style="margin-right:20px" @click="handleMenu" icon="el-icon-menu" size='mini'></el-button>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: `${item.path}` }" v-for="item in tabsList" :key="item.name">{{item.label}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <div class="r-content">
        <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
            <img class="user" src="../assets/images/user.png" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >个人中心</el-dropdown-item>
            <!-- divided 有线条 -->
            <!-- @command="handleClick"   command="logout" element-ui的点击事件 根据command标识判断哪个下拉框点击 -->
            <!-- 也可以使用 @click.native -->
            <el-dropdown-item divided command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>        
    </div>

  </div>
</template>

<script>
import tab from '@/store/tab';
import {mapState} from 'vuex'
import Cookie from 'js-cookie';
export default {
    methods:{
        handleMenu(){
            // 模块化写法 使用 commit调用 mutations里面定义的方法 多个模块时需要加  模块名/
            this.$store.commit('tab/collapseMenu')
        },
        handleClick(command){
            if (command === 'logout') {
                //清除cookie中的token信息
                Cookie.remove('token')
                // 清除cookie 的menu信息
                Cookie.remove('menu')
                // 跳转到登录页面
                this.$router.push('/login')
            }
        },
/*         // 退出登录 
        logout(){
            
            //  清除cookie信息
            Cookie.remove('token')
        } */
    },
    computed:{
        /* 
        // 分类查找(需配置 namespaced为true)  否则只能 countAbout.sum 这样使用
		...mapState('countAbout',['sum','name','age']),
		...mapState('personAbout',['personList']),
        */
        ...mapState('tab',['tabsList'])
    },
}
</script>

<style lang="less" scoped>
    .header-container {
        padding: 0 20px;
        background-color: #333;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 20px;
    }
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .l-content {
        display: flex;
        align-items: center;
        //  /deep/ 样式穿刺 针对于 scoped 来
        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner{
                &.is-link{
                    color: #666;
                }    
            }
            &:last-child {
                .el-breadcrumb__inner {
                    color: #fff;
                }
            }
        }
        
    }
</style>