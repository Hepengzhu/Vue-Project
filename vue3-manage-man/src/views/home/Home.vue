<template>
  <!-- gutter  设置col之间的间距 -->
  <el-row class="home" :gutter="20">
    <!-- home 左侧部分 占比8/24 -->
    <el-col :span="8" style="margin-top: 15px">
      <!-- 用户信息 -->
      <el-card shadow="hover">
        <div class="user">
          <img src="src\assets\images\user.png" alt="" class="img" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>

        <div class="login-info">
          <p>上次登录时间:<span>2023-8-4</span></p>
          <p>上次登录地点:<span>广西</span></p>
        </div>
      </el-card>

      <!-- 表格 -->
      <el-card style="margin-top: 20px; height: 380px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(value, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="value"
          />
        </el-table>
      </el-card>
    </el-col>

    <!-- home 右侧 -->
    <el-col :span="16" style="margin-top: 15px">
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <!-- 图标 -->
          <component
            :is="item.icon"
            :style="{ background: item.color }"
            class="icons"
          ></component>
          <div class="details">
            <p class="number">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <el-card style="margin-top: 0px; height: 250px">
        <div ref="lineChart" style="height: 250px"></div>
      </el-card>
      <div class="graph" style="height: 225px">
        <el-card>
          <div ref="barChart" style="height: 225px"></div>
        </el-card>
        <el-card>
          <div ref="pieChart" style="height: 200px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
// 单独引入
import api from "../../api/api";
import * as echarts from 'echarts';
export default {
  name: "Home",
  setup(props) {
    const { proxy } = getCurrentInstance(); //porxy 相当于 vue2 的this
    // let tableData = [
    //   {
    //     name: "oppo",
    //     todayBuy: 100,
    //     monthBuy: 300,
    //     totalBuy: 800,
    //   },
    //   {
    //     name: "vivo",
    //     todayBuy: 100,
    //     monthBuy: 300,
    //     totalBuy: 800,
    //   },
    //   {
    //     name: "苹果",
    //     todayBuy: 100,
    //     monthBuy: 300,
    //     totalBuy: 800,
    //   },
    //   {
    //     name: "小米",
    //     todayBuy: 100,
    //     monthBuy: 300,
    //     totalBuy: 800,
    //   },
    //   {
    //     name: "三星",
    //     todayBuy: 100,
    //     monthBuy: 300,
    //     totalBuy: 800,
    //   },
    //   {
    //     name: "魅族",
    //     todayBuy: 100,
    //     monthBuy: 300,
    //     totalBuy: 800,
    //   },
    // ];
    let tableData = ref([]); //左侧表格
    let countData = ref([]); //右侧上方
    let tableLabel = {
      name: "品牌",
      todayBuy: "今日购买",
      monthBuy: "本月购买",
      totalBuy: "总购买",
    };

    const getTableList = async () => {
      //  在线mock数据模拟  (注意判断 code 状态码 )
      // 网址：https://www.fastmock.site/#/project/ecfbecf5049ed67f09d20312b0b3380a
      //         await axios.get('https://www.fastmock.site/mock/ecfbecf5049ed67f09d20312b0b3380a/api/home/getTableData').then((res)=>{
      //          console.log(res);
      //          tableData.value = res.data.data
      // })
      tableData.value = await proxy.$api.getTableData();
    };

    const getCountList = async () => {
      countData.value = await api.getCountData();
    };

    // echarts 图表部分
    let xOptions = reactive({
      legend: {
        // 图例文字颜色
        textStyle: {
          color: "#333",
        },
      },
      // grid: {
      //   left: "15%",
      // },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      series: [],
    });
    let pieOptions = reactive({
      tooltip: {
        trigger: "item",
      },
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      series: [],
    });

    let orderData = reactive({
      xData: [],
      series: [],
    });

    let userData = reactive({
      xData: [],
      series: [],
    });

    let videoData = reactive({
      series:[]
    })
    const getEchartsList = async () => {
      // 解构出所需要的数据
      let result = await api.getEchartsData();
      // console.log(result);
      let res = result.orderData;
      let userRes = result.userData;
      let videoRes = result.videoData;
      orderData.xData = res.date;
      const keyArray = Object.keys(res.data[0]);
      const series = [];
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: res.data.map((item) => item[key]),
          type: "line",
        });
      });
      orderData.series = series
      xOptions.xAxis.data = orderData.xData
      xOptions.series = orderData.series
      // 渲染(折线图)
      let lineChart = echarts.init(proxy.$refs.lineChart)
      lineChart.setOption(xOptions)

      // 柱状图渲染
      userData.xData = userRes.map(item=>item.date)
      userData.series = [
        {
          name:'新增用户',
          data:userRes.map(item=>item.new),
          type:'bar'
        },
        {
          name:'活跃用户',
          data:userRes.map(item=>item.active),
          type:'bar'
        }        
      ]
      xOptions.xAxis.data = userData.xData
      xOptions.series = userData.series
      let barChart = echarts.init(proxy.$refs.barChart)
      barChart.setOption(xOptions)

      // 饼图
      videoData.series = [
        {
          data:videoRes,
          type:'pie'
        }
      ]
      pieOptions.series = videoData.series
      echarts.init(proxy.$refs.pieChart).setOption(pieOptions)

    };
    // axios 请求
    onMounted(() => {
      getTableList(), getCountList(), getEchartsList();
    });

    return {
      tableData,
      tableLabel,
      countData,
    };
  },
};
</script>

<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    img {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      margin-right: 40px;
    }
  }
  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 40px;
      }
    }
  }

  // 右上
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;

      .icons {
        width: 60px;
        height: 65px;
        // margin-right: 20px;
        line-height: 65px;
        color: #fff;
      }

      .details {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .number {
          font-size: 25px;
          margin-bottom: 5px;
        }
        .txt {
          font-size: 10px;
          text-align: center;
          color: #999;
        }
      }
    }
  }
  //右下
  .graph{
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .el-card{
      width: 49%;
    }
  }
}
</style>