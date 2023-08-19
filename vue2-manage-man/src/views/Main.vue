<template>
    <div>
        <el-container>
            <!-- 宽度自适应 -->
            <el-aside width="auto">
                <Common-Asid/>
            </el-aside>
            <el-container>
                <el-header>
                    <CommonHeader/>
                </el-header>
                <!-- tag -->
                <CommonTag/>
                <el-main>    
                    <!-- 路由出口 -->
                    <!-- 路由匹配到的结果将渲染到这里 -->
                    <router-view></router-view>                    
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonAsid from '@/components/CommonAsid.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTag from '@/components/CommonTag.vue'
    export default {
        name:'Main',
        components:{
            CommonAsid,
            CommonHeader,
            CommonTag
        },
        data() {
            return {
                
            }
        },
    }
</script>

<style>
.el-aside{
    overflow: hidden;
}
.el-header{
    padding: 0;
}
</style>