<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width=" $store.state.isCollapse? 'auto' : '190px'">
        <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <el-header>
          <CommonHeader></CommonHeader>
          <CommonTab></CommonTab>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTab from '../components/CommonTab.vue'
// import {setup} from 'vue'
import {useStore} from 'vuex'

export default {
  name:'Main',
  components:{CommonHeader,CommonAside,CommonTab},
  setup() {
    const store = useStore()
    return {
      // store
    }
  }

}
</script>

<style lang="less" scoped>
  .el-header {
    padding: 0px;
    // margin-bottom: 10px;
  }
  .el-main{
    padding: 0px 20px 20px;
    margin-top: 20px;
  }
</style>