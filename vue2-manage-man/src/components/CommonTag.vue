<template>
    <div class="tags">
        <!-- closable 是否可关闭 -->
        <el-tag
            v-for="(item,index) in tabsList"
            :key="item.name"
            :closable="item.name != 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain' "
            @click="changeMenu(item)"
            @close="handleClose(item,index)"
            size="small"
           >
            {{item.label}}
        </el-tag>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name:'CommonTag',
    data() {
        return {
        }
    },
    computed:{
        ...mapState('tab',['tabsList']),

    },
    methods: {
        // 点击tag跳转
        changeMenu(item){
            // 使用name属性跳转
            this.$router.push({name:item.name})
        },

        // 关闭tag
        ...mapMutations('tab',{closeTag:'closeTag'}),
        
        handleClose(item,index){
            this.closeTag(item)
            // 获取tabsList的长度
            const length = this.tabsList.length
            // 如果点击不是当前页面，高亮没有变化也不需要跳转 直接返回
            if(item.name !== this.$route.name) return
            // 如果是最后一个 向前一个移动
            if(index === length) {
                this.$router.push({
                    name:this.tabsList[index-1].name
                })
            }
            else {
                // 否则向后一个移动(被删除后后一个顶替上来，index不变)
                this.$router.push({
                    name:this.tabsList[index].name
                })                
            }
        }
    },

}
</script>
<style lang="less">
    .el-tag {
        margin:10px 5px;
    }
</style>