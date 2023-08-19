/**
 * 整个项目 api的管理
 * 
 *  */ 

import { mock } from "mockjs";
import request from "./request";
export default {
    // home组件 左侧表格数据获取
    getTableData(params){
        return request({
            url:'/home/getTableData',
            method:'get',
            data:params,
            // 开启mock模拟
            mock:true
        })
    },
    getCountData() {
        return request({
            url:'/home/getCountData',
            method:'get',
            mock:true
        })
    },

    getEchartsData() {
        return request({
            url:"/home/getEchartsData",
            method:"get",
            mock:true
        })
    },

    // 本地user 数据获取
    getUserData(params) {
        return request({
            url:'/user/getUser',
            method:'get',
            mock:false,
            data:params
        })
    },

    // 新增用户
    addUser(params) {
        return request({
            url:'/user/addUser',
            method:'post',
            mock:false,
            data:params
        })
    },
    // 编辑用户
    editUser(params) {
        return request({
            url:'/user/edit',
            method:'post',
            mock:false,
            data:params

        })
    },

    // 删除用户
    deleteUser(params) {
        return request({
            url:'/user/delete',
            method:'post',
            mock:false,
            data:params

        })
    },
    //登录 并返回对应的菜单列表
    getMenu(params) {
        return request({
            url:'/permission/getmenu',
            method:'post',
            mock:false,
            data:params           
        })
    }

    
}