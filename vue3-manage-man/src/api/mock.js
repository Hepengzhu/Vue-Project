import Mock from "mockjs";
import homeApi from "./mockData/home";
import userApi from "./mockData/user"
import permissionApi from "./mockData/permission";
// 拦截请求  (拦截请求地址，拦截后的回调函数)
Mock.mock('/home/getData',homeApi.getHomeData)


// 本地user数据获取
Mock.mock(/user\/getUser/,'get',userApi.getUserList)

// 新增用户
Mock.mock(/user\/addUser/,'post',userApi.createUser)

// 编辑用户
Mock.mock(/user\/edit/,'post',userApi.updateUser)

// 删除用户
Mock.mock(/user\/delete/,'post',userApi.deleteUser)

// 登录
Mock.mock(/permission\/getmenu/,'post',permissionApi.getMenu)
