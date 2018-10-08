// import Main from '../components/main.vue'
const resolve = require('path').resolve

export default [
  {
    path: '/manage',
    redirect: '/manage/home',
    meta: {
      icon: 'logo-buffer',
      title: '维修服务',
      lgType: "1002",
      access: '1001',
    },
    component: resolve('components/main.vue'),
    children: [
      {
        path: 'home',
        meta: {
          icon: 'md-funnel',
          title: '主页',
          lgType: "1002",
          access: '100101',
        },
        component: resolve('center/index.vue'),
      },
    ]
  }
]
