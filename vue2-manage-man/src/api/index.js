import http from "@/utils/request";

// 请求首页数据的接口
export const getData = () => {
    // 返回一个Promise对象
    return http.get('/home/getData')
}

// 请求用户信息
export const getUser = (params) => {
    return http.get('/user/getUser',params)
}

// 增加用户信息
export const addUser = (data) => {
    return http.post('/user/add',data)
}

// 编辑用户信息
export const editUser = (data) => {
    return http.post('/user/edit',data)
}

// 删除用户信息
export const deltUser = (data) => {
    return http.post('/user/del',data)
}

// 
export const getMenu = (data) => {
    return http.post('/permission/getMenu',data)
}