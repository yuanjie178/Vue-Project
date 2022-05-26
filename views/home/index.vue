<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top:20px">
            <!-- 用户卡片 -->
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImg"/>
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2021-7-19</span></p>
                    <p>上次登录地点：<span>北京</span></p>
                </div>
            </el-card>
            <!-- 列表数据卡片 -->
            <el-card style="margin-top:20px;height:460px;">
                <el-table :data="tableData">
                    <el-table-column 
                    v-for="(val,key) in tableLabel"
                    :key="key"
                    :prop="key"
                    :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col style="magin-top:20px" :span="16">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flax',padding:0}">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                    <div class="detail">
                        <p class="num">￥{{item.value}}</p>
                        <p class="text">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height:280px">
                <!-- 折线图 -->
                <!-- <div style="height:280px" ref="echarts"></div> -->
                <echart style="height:280px" :chartData="echartData.order"  />
            </el-card>
            <div class="graph">
                <el-card style="height:260px">
                    <!-- 条形图 -->
                    <!-- <div style="height:240px" ref="userEcharts"></div> -->
                    <echart :chartData="echartData.user" style="height:240px" />
                </el-card>
                <el-card style="height:260px">
                    <!-- 饼图 -->
                    <!-- <div style="height:240px" ref="videoEcharts"></div> -->
                    <echart :chartData="echartData.video" :isAxisChart="false" style="height:240px" />
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import {getData} from'../../api/data.js'
// import * as echarts from 'echarts'
import Echart from '../../src/components/Echarts.vue'

export default{
    name:'home',
    components:{
        Echart
    },
    data(){
        return{
            userImg: require('../../src/assets/images/user.png'),
            tableData:[
            {
                name: 'oppo',
                todayBuy: 100,
                monthBuy: 300,
                totalBuy: 800
            },
            {
                name: 'vivo',
                todayBuy: 100,
                monthBuy: 300,
                totalBuy: 800
            },
            {
                name: '苹果',
                todayBuy: 100,
                monthBuy: 300,
                totalBuy: 800
            },
            {
                name: '小米',
                todayBuy: 100,
                monthBuy: 300,
                totalBuy: 800
            },
            {
                name: '三星',
                todayBuy: 100,
                monthBuy: 300,
                totalBuy: 800
            },
            {
                name: '魅族',
                todayBuy: 100,
                monthBuy: 300,
                totalBuy: 800
            }
            ],
            tableLabel:{
                name:'课程',
                totalBuy:'今日购买',
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
            echartData:{
                order:{
                    xData:[],
                    series:[]
                },
                user:{
                    xData:[],
                    series:[]
                },
                video:{
                    series:[]
                }
            }
        }
    },
    mounted(){
        getData().then(res => {
            const{code,data} = res.data
            if(code === 20000) {
                this.tableData = data.tableData
                const order = data.orderData
                const xData = order.date
                const keyArray = Object.keys(order.data[0])
                const series = []
                keyArray.forEach(key => {
                    series.push({
                        name:key,
                        data:order.data.map(item => item[key]),
                        type:'line'
                    })
                })
                this.echartData.order.xData = xData
                this.echartData.order.series = series

                this.echartData.user.xData = data.userData.map(item => item.date)
                this.echartData.user.series = [
                        {
                            name: '新增用户',
                            data: data.userData.map(item=>item.new),
                            type: 'bar'
                        },
                        {
                            name: '活跃用户',
                            data: data.userData.map(item=>item.active),
                            type: 'bar'
                        }
                    ]

                this.echartData.video.series = [
                    {
                        data: data.videoData,
                        type: 'pie'
                    }
                ]
            }
             console.log(res)
        })
    }
}
</script>