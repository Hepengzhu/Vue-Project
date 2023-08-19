<template>
    <el-card class="box-card">
        <el-form :inline="true" :model="form" :rules="rules" class="form" ref="form">
            <h3 class="login_title">系统登录</h3>
            <el-form-item label="账号" prop="username">
                <el-input v-model="form.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <br>
            <el-form-item>
                <el-button @click="submit" type="primary" class="login_button">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>

</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import {getMenu} from '../api'
    export default {
        name:'Login',
        data() {
            return {
                form:{
                    username:'',
                    password:''
                },
                rules:{
                    username:[
                        {required: true,trigger:'blur',message:"请输入用户名"}
                    ],
                    password:[
                        {required: true,trigger:'blur',message:"请输入密码"}
                    ]
                }
            }
        },
        methods:{
            // 登录
            submit(){
   /*              // token 信息
                const token = Mock.Random.guid()
                // 将token信息存入 cookie 用于不同页面的通信
                Cookie.set('token',token) */

                // 校验表单
                this.$refs.form.validate((valid)=>{
                    // 校验通过
                    if (valid) {
                        getMenu(this.form).then(({data})=>{
                            // console.log(data);
                            if (data.code === 20000) {//账号密码正确
                            // 用户token 存入Cookie
                            Cookie.set('token',data.data.token)

                            // 获取菜单数据 存入store
                            const menu = data.data.menu 
                            this.$store.commit('tab/setmenu',menu) 
                            // 动态注册路由  将路由实例传过去
                            this.$store.commit('tab/addMenu',this.$router)
                            // 跳转到首页
                            this.$router.push('/home')
                            }
                            else {
                                // this.$message.error('账号或密码错误！')
                                this.$message.error(data.data.message)
                            }
                        })
                    }
                })
                // 跳转到首页
                // this.$router.push('/home')
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
                margin: 5px 50px;
            }    
        }

    }
</style>