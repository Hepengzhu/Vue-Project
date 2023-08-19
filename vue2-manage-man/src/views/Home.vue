<template>
<!-- el-row 表示一行 -->
    <el-row>
        <!-- el-col 表示一行里面的元素 -->
        <!-- 一行是24  span=12  表示 一个占一半 -->
        <el-col :span="8" style="padding-right: 10px">
            <!-- 用户信息 -->
            <el-card class="box-card" shadow="hover">
                <div class="user">
                    <img src="../assets/images/user.png" alt="">
                    <div class="user-info">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>

                <div class="login-info">
                    <p>上次登录时间：<span>2023-7-20</span></p>
                    <p>上次登录地点：<span>广西</span></p>
                </div>
            </el-card>

            <!-- table表格 -->
            <el-card style="margin-top:20px;height:auto">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <!-- 遍历对象  得到 key value   循环得到表头-->
                    <el-table-column v-for="(value ,key) in tableLabel" :key="key" :prop="key" :label="value" />
                    <!-- <el-table-column
                        prop="todayBuy"
                        label="今日购买">
                    </el-table-column>
                    <el-table-column
                        prop="monthBuy"
                        label="本月购买">
                    </el-table-column>
                    <el-table-column
                        prop="totalBuy"
                        label="总购买">
                    </el-table-column> -->
                </el-table>
            </el-card>
        </el-col>

        <el-col :span="16" style="padding-left: 10px">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex',padding:0}">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
                    <div class="detail">
                        <p class="price">￥{{item.value}}</p>
                        <p class="desc">{{item.name}}</p>
                    </div>
                </el-card>
            </div>

            <!-- 折线图 -->
            <el-card style="height:250px">
                <div ref="line_chart" style="height:250px"></div>
            </el-card>

            <!-- 柱状图和饼图 -->
            <div class="graph">
                <el-card style="height:240px">
                    <div ref="bar_chart" style="height:240px"></div>
                </el-card>
                <el-card style="height:240px">
                    <div ref="pie_chart" style="height:210px"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import {getData} from '../api/index.js'
import * as echarts from 'echarts'
    export default {
        name:'Home',
        data() {
            return {
                tableData: [
                    {
                        name: 'oppo',
                        todayBuy: 500,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: 'vivo',
                        todayBuy: 500,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: '苹果',
                        todayBuy: 500,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: '小米',
                        todayBuy: 500,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: '三星',
                        todayBuy: 500,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: '魅族',
                        todayBuy: 500,
                        monthBuy: 300,
                        totalBuy: 800
                    }
            ],
                tableLabel:{
                    name:'品牌',
                    todayBuy:'今日购买',
                    monthBuy:'本月购买',
                    totalBuy:'总购买'
                },
                countData: [
                {
                name: "今日支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
                },
                {
                name: "今日收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
                },
                {
                name: "今日未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
                },
                {
                name: "本月支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
                },
                {
                name: "本月收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
                },
                {
                name: "本月未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
                },
            ],
        }
    },
    mounted() {
        getData().then(({data})=>{
            // console.log(data.data);
            // 解构
            const {tableData,userData,videoData} = data.data
            // table
            this.tableData = tableData
            // console.log(tableData);
            // console.log(res.data.data.tableData);

// 注意:这里可以直接使用 echarts 官网里面的代码,修改其中的数据及其他配置即可
            // 配置折线图
            const line_chart = echarts.init(this.$refs.line_chart)
            var line_chart_option = {}
            // 处理xAxis数据
            const {orderData} = data.data
            const xAxis = Object.keys(orderData.data[0])
            line_chart_option.xAxis = {data:orderData.date}
            line_chart_option.yAxis = {type: 'value'}
            line_chart_option.legend = {data:xAxis}
            let seriesData = []
            xAxis.forEach(key=>{
                // 向 series里面添加数据
                seriesData.push({
                    name:key,
                    data: orderData.data.map(item => item[key]),
                    type:'line'
                })
            })
            line_chart_option.series = seriesData
            line_chart_option.tooltip = {trigger: 'axis'} // 鼠标移动时的数据显示框
            line_chart.setOption(line_chart_option)// 显示图表

            // 柱状图
            const bar_chart = echarts.init(this.$refs.bar_chart)
            var bar_chart_option = {
                    legend: {
                        // 图例文字颜色
                        textStyle: {
                        color: "#333",
                        },
                    },
                    grid: {
                        left: "20%",
                    },
                    // 提示框
                    tooltip: {
                        trigger: "axis",
                    },
                    xAxis: {
                        type: "category", // 类目轴
                        data: userData.map(item=>item.date),
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
                    color: ["#2ec7c9", "#b6a2de"],
                    series: [
                        {
                            name:'新增用户',
                            data: userData.map(item=>item.new),
                            type:'bar'
                        },
                        {
                            name:'活跃用户',
                            data: userData.map(item=>item.active),
                            type:'bar'
                        }                        
                    ],
                    }
            bar_chart.setOption(bar_chart_option)
            // 饼状图
            const pie_chart = echarts.init(this.$refs.pie_chart)
            var pie_chart_option = {
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
                    series: [
                        {
                            data:videoData,
                            type:'pie'
                            }
                    ],
                    }
            pie_chart.setOption(pie_chart_option)
            },err=>{
                console.log(err);
            })
            
    },
    }
</script>

<style lang="less" scoped>
.user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    // justify-content: space-around;
    align-items: center;
    img {
        margin-right: 40px;
        width: 140px;
        height: 140px;
        border-radius: 50%;
    }
    .user-info {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }
        .access {
            color: #999999;
        }
    }
}
.login-info {
    p {
            line-height: 28px;
            font-size: 14px;
            color: #999999;
            span {
                color: #666666;
                margin-left: 60px;
            }
        }
}

.num {
    display: flex;
    flex-wrap: wrap;
    // 边缘贴边
    justify-content: space-between;
    .icon {
        width:60px;
        height: 60px;
        font-size: 30px;
        text-align: center;
        line-height: 60px;
        color: #fff;
    }
    .detail {
        margin-left: 30px;
        display: flex;
        // 更换主轴
        flex-direction: column;
        justify-content: center;

        .price {
            font-size: 25px;
            margin-bottom: 10px;
            height: 23px;
            line-height: 23x;

        }
        .desc {
            font-size: 10px;
            color: #999999;
            margin-bottom: 10px;
            text-align: center;
        }
    }
    .el-card {
        width: 32%;
        margin-bottom: 20px;
    }
}
.graph {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .el-card {
        width: 48%;     
    }
}
</style>