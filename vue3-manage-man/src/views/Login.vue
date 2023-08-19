<template>
    <el-card class="box-card">
        <el-form :inline="true" :model="userForm" :rules="rules" class="form" ref="form">
            <h3 class="login_title">系统登录</h3>
            <el-form-item label="账号" prop="username">
                <el-input v-model="userForm.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="userForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <br>
            <el-form-item>
                <el-button @click="login" type="primary" class="login_button">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { reactive } from 'vue'
import api from '../api/api'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    name:"Login",
    setup(){
        const store = useStore()
        const router = useRouter()
        let userForm = reactive({
            username:'',
            password:''
        })
        let login = async()=>{
            const res = await api.getMenu(userForm)
            // 将路由信息写入
            store.commit('setMenu',res.menu)
            // 读取菜单 和动态注册路由
            store.commit('addMenu',router)
            //设置 token
            store.commit('setToken',res.token)
            // 路由跳转
            if(res.message == '获取成功') {
                router.push('/home')
            }
            else {
                ElMessage.error('账号或密码错误！')
            }
        }
        return {
            userForm,
            login
        }
    }
}
</script>

<style lang="less" scoped>
    .box-card {
        margin: 180px auto;
        width: 400px;
        .form  {
            width: 100%;
            padding-left: 40px;
            // display: flex;
            // justify-content: center;
            // align-items: center;      
            margin: 10px auto;  
            .login_title {
                width: 100px;
                margin-left: 110px;
                margin-bottom: 10px;
            }
            .login_button {
                width: 200px;
                margin-top: 5px;
                margin-left: 37px;
            }    
        }

    }

</style>