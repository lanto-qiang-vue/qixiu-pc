// import Main from '../components/main.vue'
const resolve = require('path').resolve

export default [
  {
    path: '/menu0',
    alias: '/center',
    meta: {
      icon: '',
      title: '0级',
      accessId: 0,
    },
    component: resolve('components/main.vue'),
    children: [
      {
        path: 'my-car-record',
        meta: {
          icon: 'md-funnel',
          title: '爱车档案1',
          accessId: 1,
        },
        component: resolve('center/repairInfo/repair-info.vue'),
      },
      {
        path: 'my-questions',
        meta: {
          icon: 'md-funnel',
          title: '我的咨询1',
          accessId: 2,
        },
        component: resolve('center/my/my-questions.vue'),
      },
      {
        path: 'my-visit',
        meta: {
          icon: 'md-funnel',
          title: '我的上门服务',
          accessId: 3,
        },
        component: resolve('center/my/my-visit.vue'),
      },
      {
        path: 'my-order',
        meta: {
          icon: 'md-funnel',
          title: '我的预约服务',
          accessId: 4,
        },
        component: resolve('center/my/my-order.vue'),
      },
      {
        path: 'my-review',
        meta: {
          icon: 'md-funnel',
          title: '我的点评',
          accessId: 5,
        },
        component: resolve('center/my/my-review.vue'),
      },
      {
        path: 'my-complaint',
        meta: {
          icon: 'md-funnel',
          title: '我的反馈',
          accessId: 6,
        },
        component: resolve('center/my/my-complaint.vue'),
      },
      {
        path: 'my-notes',
        meta: {
          icon: 'md-funnel',
          title: '通知管理',
          accessId: 7,
        },
        component: resolve('center/my/my-notes.vue'),
      },
      {
        path: 'unaccess',
        meta: {
          icon: 'md-funnel',
          title: '无权限',
          accessId: 999,
        },
        component: resolve('center/index.vue'),
      },


    ]
  },
  {
    path: '/menu8',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '账号管理',
      accessId: 8,
    },
    component: resolve('components/main.vue'),
    children: [
      {
        path: 'account-info',
        meta: {
          icon: 'md-funnel',
          title: '账号信息',
          accessId: 9,
        },
        component: resolve('center/account/account-info.vue'),
      },
      {
        path: 'change-phone',
        meta: {
          icon: 'md-funnel',
          title: '更换手机号码',
          accessId: 10,
        },
        component: resolve('center/account/change-phone.vue'),
      },
    ]
  },
  {
    path: '/menu15',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '系统管理',
      accessId: 15,
    },
    component: resolve('components/main.vue'),
    children: [
      {
        path: 'menu-manage',
        meta: {
          icon: 'md-funnel',
          title: '菜单管理',
          accessId: 16,
        },
        component: resolve('center/system/menu-manage.vue'),
      },
      {
        path: 'function-manage',
        meta: {
          icon: 'md-funnel',
          title: '功能管理',
          accessId: 17,
        },
        component: resolve('center/system/function-manage.vue'),
      },
    ]
  },
  //维修企业
  {
    path: '/menu16',
    alias: '/center',
    meta: {
      icon: '',
      title: '0级',
      accessId: 0,
    },
    component: resolve('components/main.vue'),
    children: [
      {
        path: 'company-index',
        meta: {
          icon: 'md-funnel',
          title: '首页',
          accessId: 101,
        },
        component: resolve('center/company/company-index.vue'),
      },
]
  },
  {
    path: '/menu17',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '信息管理',
      accessId: 107,
    },
    component: resolve('components/main.vue'),
    children: [
      {
        path: 'repored',
        meta: {
          icon: 'md-funnel',
          title: '维修数据上报查询',
          accessId: 108,
        },
        component: resolve('center/company/repored.vue'),
      },
      {
        path: 'change-phone',
        meta: {
          icon: 'md-funnel',
          title: '更换手机号码',
          accessId: 10,
        },
        component: resolve('center/account/change-phone.vue'),
      },
    ]
  }
]
