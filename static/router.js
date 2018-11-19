const resolve = require('path').resolve
const Main= resolve('components/main.vue')

export default [
  {
    path: '/gov-article',
    component: resolve('center/public-article/article-menu-list.vue'),
    children: [
      {
        path: ':type',
        component: resolve('center/public-article/article-list.vue'),
        children: [
          {
            path: ':id',
            component: resolve('center/public-article/article-detail.vue'),
          },
        ]
      },
    ]
  },{
    path: '/guild-article',
    component: resolve('center/public-article/article-menu-list.vue'),
    children: [
      {
        path: ':type',
        component: resolve('center/public-article/article-list.vue'),
        children: [
          {
            path: ':id',
            component: resolve('center/public-article/article-detail.vue'),
          },
        ]
      },
    ]
  }, {
    path: '/article',
    component: resolve('center/public-article/single-article.vue'),
    children: [
      {
        path: ':id',
        component: resolve('center/public-article/article-detail.vue'),
      },
    ]
  },{
    path: '/menu0',
    alias: '/center',
    meta: {
      icon: '',
      title: '0级',
      accessId: 0,
    },
    component: Main,
    children: [
      {
        path: 'gov-home',
        meta: {
          icon: 'md-funnel',
          title: '管理中心首页',
          accessId: 33,
        },
        component: resolve('center/home/government-home.vue'),
      },
      {
        path: 'company-home',
        meta: {
          icon: 'md-funnel',
          title: '企业中心首页',
          accessId: 29,
        },
        component: resolve('center/home/company-home.vue'),
      },
      {
        path: 'company-home',
        meta: {
          icon: 'md-funnel',
          title: '运营中心首页',
          accessId: 29,
        },
        component: resolve('center/home/operator-home.vue'),
      },
      {
        path: 'my-car-record',
        meta: {
          icon: 'md-funnel',
          title: '爱车档案',
          accessId: 1,
        },
        component: resolve('center/repairInfo/repair-info.vue'),
      },
      {
        path: 'my-questions',
        meta: {
          icon: 'md-funnel',
          title: '我的咨询',
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
          title: '通知管理(车主)',
          accessId: 7,
        },
        component: resolve('center/my/my-notes.vue'),
      },
      {
        path: 'answer-questions',
        meta: {
          icon: 'md-funnel',
          title: '车大夫问答问题(专家)',
          accessId: 60,
        },
        component: resolve('center/car-doctor/car-doctor-manage.vue'),
      },
      {
        path: 'bind-car-audit',
        meta: {
          icon: 'md-funnel',
          title: '绑定车辆审核(运营商)',
          accessId: 34,
        },
        component: resolve('center/operate/bind-car-audit.vue'),
      },
      {
        path: 'repair-company-manage',
        meta: {
          icon: 'md-funnel',
          title: '维修企业信息管理(运营商)',
          accessId: 44,
        },
        component: resolve('center/operate/repair-company-manage.vue'),
      },
      {
        path: 'user-login-list',
        meta: {
          icon: 'md-funnel',
          title: '用户行为日志列表(运营商)',
          accessId: 45,
        },
        component: resolve('center/operate/user-login-list.vue'),
      },
      {
        path: 'company-qualify-manage',
        meta: {
          icon: 'md-funnel',
          title: '企业合格证使用信息管理(管理部门)',
          accessId: 61,
        },
        component: resolve('center/company-info/company-qualify-manage.vue'),
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
    component: Main,
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
    component: Main,
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
      {
        path: 'role-manage',
        meta: {
          icon: 'md-funnel',
          title: '角色管理',
          accessId: 18,
        },
        component: resolve('center/system/role-manage.vue'),
      },
      {
        path: 'user-manage',
        meta: {
          icon: 'md-funnel',
          title: '用户管理',
          accessId: 18,
        },
        component: resolve('center/system/user-manage.vue'),
      },
      {
        path: 'system-type-manage',
        meta: {
          icon: 'md-funnel',
          title: '业务系统管理',
          accessId: 24,
        },
        component: resolve('center/system/system-type-manage.vue'),
      },
    ]
  },
  {
    path: '/menu16',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '文章管理',
      accessId: 42,
    },
    component: Main,
    children: [
      {
        path: 'article-type',
        meta: {
          icon: 'md-funnel',
          title: '文章类别',
          accessId: 57,
        },
        component: resolve('center/articles/article-type-list.vue'),
      },
      {
        path: 'article-manage',
        meta: {
          icon: 'md-funnel',
          title: '文章列表',
          accessId: 58,
        },
        component: resolve('center/articles/article-list.vue'),
      },
      {
        path: 'article-manage/detail',
        meta: {
          icon: 'md-funnel',
          title: '文章详情',
          accessId: 59,
        },
        component: resolve('center/articles/article-detail.vue'),
      },
    ]
  },


//   {
//     path: '/menu16',
//     alias: '/center',
//     meta: {
//       icon: '',
//       title: '0级',
//       accessId: 0,
//     },
//     component: resolve('components/main.vue'),
//     children: [
//       {
//         path: 'company-index',
//         meta: {
//           icon: 'md-funnel',
//           title: '企业中心首页',
//           accessId: 101,
//         },
//         component: resolve('center/company/company-index.vue'),
//       },
// ]
//   },
  {
    path: '/menu17',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '企业信息管理',
      accessId: 30,
    },
    component: resolve('components/main.vue'),
    children: [
      {
        path: 'repored',
        meta: {
          icon: 'md-funnel',
          title: '维修数据上报查询',
          accessId: 31,
        },
        component: resolve('center/company/repored.vue'),
      },
      {
        path: 'company-repair-qualify',
        meta: {
          icon: 'md-funnel',
          title: '企业合格证使用信息登记',
          accessId: 32,
        },
        component: resolve('center/company/company-repair-qualify.vue'),
      },
    ]
  },

  {
    path: '/menu18',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '运输管理',
      accessId: 39,
    },
    component: resolve('components/main.vue'),
    children: [
      {
        path: 'transportationCompany-manage',
        meta: {
          icon: 'md-funnel',
          title: '运输企业信息管理',
          accessId: 40,
        },
        component: resolve('center/operate/transportationCompany-manage.vue'),
      },
      {
        path: 'transportationCompany-record',
        meta: {
          icon: 'md-funnel',
          title: '运输车辆技术档案',
          accessId: 41,
        },
        component: resolve('center/operate/transportationCompany-record.vue'),
      },



      // {
      //   path: 'for-you-service',
      //   meta: {
      //     icon: 'md-funnel',
      //     title: '为您服务管理',
      //     accessId: 410,
      //   },
      //   component: resolve('center/operate/for-you-service.vue'),
      // },
    ]
  },
  {
    path: '/menu19',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '车大夫管理(运营)',
      accessId: 35,
    },
    component: resolve('components/main.vue'),
    children: [{
      path: 'carDoctor-manage',
      meta: {
        icon: 'md-funnel',
        title: '车大夫专家管理',
        accessId: 36,
      },
      component: resolve('center/operate/carDoctor-manage.vue'),
    },
      {
        path: 'carDoctor-question-manage',
        meta: {
          icon: 'md-funnel',
          title: '车大夫问题管理',
          accessId: 37,
        },
        component: resolve('center/operate/carDoctor-question-manage.vue'),
      },
      {
        path: 'carDoctor-answer-manage',
        meta: {
          icon: 'md-funnel',
          title: '车大夫回答管理',
          accessId: 38,
        },
        component: resolve('center/operate/carDoctor-answer-manage.vue'),
      },
      {
        path: 'visit-manage',
        meta: {
          icon: 'md-funnel',
          title: '上门服务管理',
          accessId: 407,
        },
        component: resolve('center/operate/visit-manage.vue'),
      },
      {
        path: 'order-manage',
        meta: {
          icon: 'md-funnel',
          title: '预约服务管理',
          accessId: 408,
        },
        component: resolve('center/operate/order-manage.vue'),
      },
      {
        path: 'complaint-manage',
        meta: {
          icon: 'md-funnel',
          title: '反馈管理',
          accessId: 409,
        },
        component: resolve('center/company/complaint-manage.vue'),
      },
      {
        path: 'company-repair-data',
        meta: {
          icon: 'md-funnel',
          title: '反馈管理',
          accessId: 410,
        },
        component: resolve('center/company/company-repair-data.vue'),
      },
      ]
  },

  //管理中心
  {
    path: '/menu21',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '电子健康档案',
      accessId: 46,
    },
    component: resolve('components/main.vue'),
    children: [
      {
        path: 'record-company',
        meta: {
          icon: 'md-funnel',
          title: '根据维修企业查找',
          accessId: 47,
        },
        component: resolve('center/manage-service/record-company.vue'),
      },
      {
        path: 'record-repair',
        meta: {
          icon: 'md-funnel',
          title: '根据维修记录查找',
          accessId: 48,
        },
        component: resolve('center/manage-service/record-repair.vue'),
      },
    ]
  },
  {
    path: '/menu22',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '管理服务',
      accessId: 25,
    },
    component: resolve('components/main.vue'),
    children: [
      {
        path: 'note-manage',
        meta: {
          icon: 'md-funnel',
          title: '通知管理',
          accessId: 27,
        },
        component: resolve('center/manage-service/note-manage.vue'),
      },
      {
        path: 'note-audit',
        meta: {
          icon: 'md-funnel',
          title: '通知审核',
          accessId: 28,
        },
        component: resolve('center/manage-service/note-audit.vue'),
      },
      {
        path: 'file-manage',
        meta: {
          icon: 'md-funnel',
          title: '文件管理',
          accessId: 50,
        },
        component: resolve('center/logininfo/file-manage.vue'),
      },
      {
        path: 'review-manage',
        meta: {
          icon: 'md-funnel',
          title: '反馈管理',
          accessId: 49,
        },
        component: resolve('center/manage-service/review-manage.vue'),
      },
    ]
  },
  {
    path: '/menu23',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '登录信息',
      accessId: 51,
    },
    component: resolve('components/main.vue'),
    children: [
      {
        path: 'enterprise-sign',
        meta: {
          icon: 'md-funnel',
          title: '企业签到信息',
          accessId: 52,
        },
        component: resolve('center/logininfo/enterprise-sign.vue'),
      },
      {
        path: 'manage-sign',
        meta: {
          icon: 'md-funnel',
          title: '管理部门登录信息',
          accessId: 53,
        },
        component: resolve('center/logininfo/manage-sign.vue'),
      },

    ]
  },
  {
    path: '/menu24',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '企业资料',
      accessId: 54,
    },
    component: resolve('components/main.vue'),
    children: [
      {
        path: 'company-info-manage',
        meta: {
          icon: 'md-funnel',
          title: '维修企业信息管理',
          accessId: 55,
        },
        component: resolve('center/company-info/company-info-manage.vue'),
      },
      {
        path: 'quality-manage',
        meta: {
          icon: 'md-funnel',
          title: '质量信誉考核管理',
          accessId: 56,
        },
        component: resolve('center/company-info/quality-manage.vue'),
      },
    ]
  }

]
