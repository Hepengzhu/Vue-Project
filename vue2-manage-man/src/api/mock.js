import Mock from "mockjs";
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permission from "./mockServeData/permission";

// 定义mock 请求拦截
// 参数说明 ： 拦截请求地址,请求类型 , 拦截后的回调函数
// Mock.mock('/api/home/getData','get',function(){
//     // 拦截到后的处理逻辑
//     console.log('我是mock，我已经拦截到你的请求');
//     // 返回的数据
//     return {
//         name:'小米',
//         age:18
//     }
// })


// 对回调函数进行封装
Mock.mock('/api/home/getData','get',homeApi.getStatisticalData)

// 用户列表数据
Mock.mock(/api\/user\/getUser/,'get',user.getUserList) //获取用户信息   动态请求地址
Mock.mock('/api/user/add','post',user.createUser) //新增用户信息
Mock.mock('/api/user/edit','post',user.updateUser) //更新编辑用户信息
Mock.mock('/api/user/del','post',user.deleteUser) //删除用户信息
Mock.mock('/api/user/batchremove','post',user.batchremove) //批量删除用户信息

Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)
