// import Main from '../components/main.vue'
const resolve = require('path').resolve

export default [
  {
    path: '/user',
    redirect: '/user/home',
    meta: {
      icon: 'logo-buffer',
      title: '维修服务',
      id: '0',
    },
    component: resolve('components/main.vue'),
    children: [
      {
        path: 'home',
        meta: {
          icon: 'md-funnel',
          title: '爱车档案',
          id: '1',
        },
        component: resolve('center/index.vue'),
      },
      {
        path: 'my-questions',
        meta: {
          icon: 'md-funnel',
          title: '我的咨询',
          id: '2',
        },
        component: resolve('center/index.vue'),
      },
      {
        path: 'unaccess',
        meta: {
          icon: 'md-funnel',
          title: '无权限',
          id: '999',
        },
        component: resolve('center/index.vue'),
      },
    ]
  },
  {
    path: '/user',
    redirect: '/user/home',
    meta: {
      icon: 'logo-buffer',
      title: '账号管理',
      id: '8',
    },
    component: resolve('components/main.vue'),
    children: [
      {
        path: 'info',
        meta: {
          icon: 'md-funnel',
          title: '账号信息',
          id: '9',
        },
        component: resolve('center/index.vue'),
      },
      {
        path: 'change-phone',
        meta: {
          icon: 'md-funnel',
          title: '更换手机号码',
          id: '9',
        },
        component: resolve('center/index.vue'),
      },
    ]
  }
]
