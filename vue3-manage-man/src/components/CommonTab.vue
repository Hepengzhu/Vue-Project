<template>
  <div class="tags">
    <el-tag v-for="(tag,index) in tags" :key="tag.name"
        :closable="tag.name != 'home'"
        :disable-transitions="false"
        :effect="$route.name === tag.name ? 'dark' : 'plain'"
        @close="closeTag(tag,index)"
        @click="clickTag(tag)"
        >
    {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
    name:"Tab",
    setup(){
        const store = useStore()
        // 路由器
        const router = useRouter()
        // 路由
        const route = useRoute()
        let tags = computed(()=>{
            return store.state.tabList
        })
        //点击tag 实现跳转
        const clickTag = (tag)=>{
            router.push(tag.path)
        }
        // 关闭tag
        const closeTag = (tag,index)=>{
            // Vuex 删除tagList
            store.commit('closeTag',tag)
            // 判断 图表高亮显示处理
            // 1.如果删除的不是当前高亮显示的tag ，不处理
            if(route.name !== tag.name) {
                return
            }
            
            // 如果删除的是当前且是最后一个，则向前一个跳转 （注意tags使用了computed函数 需要用value值获取）
            if((tags.value.length) == index) {  
                router.push(tags.value[index-1].path)
            }
            // 如果不是最后一个，跳转到后一个
            else{
                router.push(tags.value[index].path)
            }
            
            
        }
        return {
            tags,
            clickTag,
            closeTag
        }
    }

}
</script>

<style lang="less" scoped>
.tags{
    padding: 10px;
    width: 100%;
    
    .el-tag {
        margin-right: 10px;
        cursor: pointer;
    }
}
</style>