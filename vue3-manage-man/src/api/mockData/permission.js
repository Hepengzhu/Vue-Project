import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 'HomeFilled',
              url: 'home/Home'
              },
              {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'ShoppingCart',
              url: 'mall/Mall'
              },
              {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'user/User'
              },
              {
              label: '其他',
              icon: 'More',
              children: [
                  {
                  path: '/page1',
                  name: 'page1',
                  label: '页面1',
                  icon: 'setting',
                  url: 'others/PageOne'
                  },
                  {
                  path: '/page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'setting',
                  url: 'others/PageTwo'
                  }
              ]
              }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 'HomeFilled',
              url: 'home/Home'
            },
            {
              path: '/video',
              name: 'video',
              label: '商品管理',
              icon: 'ShoppingCart',
              url: 'mall/Mall'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: 200,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}