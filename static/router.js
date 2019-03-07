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
    path: '/appointment',
    component: resolve('center/public-service/appointment.vue'),
    meta: {
      needLogin: true
    }
  },{
    path: '/visit-service',
    component: resolve('center/public-service/visit-service.vue'),
    meta: {
      needLogin: true
    }
  },{
    path: '/menu0',
    alias: '/center',
    meta: {
      icon: '',
      title: '0级',
      accessId: 'root',
    },
    component: Main,
    children: [
      {
        path: 'gov-home',
        meta: {
          icon: '',
          title: '管理中心首页',
          accessId: '/center/gov-home',

        },
        component: resolve('center/home/government-home.vue'),
      },
      {
        path: 'company-home',
        meta: {
          icon: '',
          title: '企业中心首页',
          accessId: '/center/company-home',

        },
        component: resolve('center/home/company-home.vue'),
      },
      {
        path: 'operator-home',
        meta: {
          icon: '',
          title: '运营中心首页',
          accessId: '/center/operator-home',

        },
        component: resolve('center/home/operator-home.vue'),
      },

      {
        path: 'shandong-map',
        meta: {
          icon: '',
          title: '山东热力图',
          accessId: '/center/shandong-map',
        },
        component: resolve('center/hotmap/shandong-hotmap.vue'),
      },
      {
        path: 'my-car-record',
        meta: {
          icon: '',
          title: '爱车档案',
          accessId: '/center/my-car-record',
        },
        component: resolve('center/repairInfo/repair-info.vue'),
      },
      {
        path: 'repair-info-detail',
        meta: {
          icon: '',
          title: '电子健康档案详情',
          accessId: '/center/repair-info-detail',
          hideMenu: true
        },
        component: resolve('center/repairInfo/repair-info-detail.vue'),
      },

      {
        path: 'answer-questions',
        meta: {
          icon: '',
          title: '车大夫回答问题(专家)',
          accessId: '/center/answer-questions',
        },
        component: resolve('center/car-doctor/car-doctor-manage.vue'),
      },


      {
        path: 'user-login-list',
        meta: {
          icon: '',
          title: '用户行为日志列表(运营商)',
          accessId: '/center/user-login-list',
        },
        component: resolve('center/operate/user-login-list.vue'),
      },



      {
        path: 'unaccess',
        meta: {
          icon: '',
          title: '无权限',
          accessId: 999,
        },
        component: resolve('center/index.vue'),
      },

    ]
  },
  {
    path: '/menumy',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '我的',
      accessId: '/menumy',
    },
    component: Main,
    children: [
      {
        path: 'my-questions',
        meta: {
          icon: '',
          title: '我的咨询',
          accessId: '/center/my-questions',
        },
        component: resolve('center/my/my-questions.vue'),
      },
      {
        path: 'my-visit',
        meta: {
          icon: '',
          title: '我的上门服务',
          accessId: '/center/my-visit',
        },
        component: resolve('center/my/my-visit.vue'),
      },
      {
        path: 'my-order',
        meta: {
          icon: '',
          title: '我的预约服务',
          accessId: '/center/my-order',
        },
        component: resolve('center/my/my-order.vue'),
      },
      {
        path: 'my-review',
        meta: {
          icon: '',
          title: '我的点评',
          accessId: '/center/my-review',
        },
        component: resolve('center/my/my-review.vue'),
      },
      {
        path: 'my-complaint',
        meta: {
          icon: '',
          title: '我的反馈',
          accessId: '/center/my-complaint',
        },
        component: resolve('center/my/my-complaint.vue'),
      },
      {
        path: 'my-notes',
        meta: {
          icon: '',
          title: '我的通知',
          accessId: '/center/my-notes',
        },
        component: resolve('center/my/my-notes.vue'),
      },
      {
        path: 'account-info',
        meta: {
          icon: '',
          title: '账号信息',
          accessId: '/center/account-info',
        },
        component: resolve('center/account/account-info.vue'),
      },
      {
        path: 'change-password',
        meta: {
          icon: '',
          title: '修改密码',
          accessId: '/center/updatePass',
        },
        component: resolve('center/account/change-password.vue'),
      },
      {
        path: 'change-phone',
        meta: {
          icon: '',
          title: '修改手机',
          accessId: '/center/change-phone',
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
      accessId: '/menu15',
    },
    component: Main,
    children: [
      {
        path: 'menu-manage',
        meta: {
          icon: '',
          title: '菜单管理',
          accessId: '/center/menu-manage',
        },
        component: resolve('center/system/menu-manage.vue'),
      },
      {
        path: 'function-manage',
        meta: {
          icon: '',
          title: '功能管理',
          accessId: '/center/function-manage',
        },
        component: resolve('center/system/function-manage.vue'),
      },
      {
        path: 'role-manage',
        meta: {
          icon: '',
          title: '角色管理',
          accessId: '/center/role-manage',
        },
        component: resolve('center/system/role-manage.vue'),
      },
      {
        path: 'user-manage',
        meta: {
          icon: '',
          title: '用户管理',
          accessId:'/center/user-manage',
        },
        component: resolve('center/system/user-manage.vue'),
      },
      {
        path: 'system-type-manage',
        meta: {
          icon: '',
          title: '业务系统管理',
          accessId: '/center/system-type-manage',
        },
        component: resolve('center/system/system-type-manage.vue'),
      },
      {
        path: 'article-type',
        meta: {
          icon: '',
          title: '文章类别',
          accessId: '/center/article-type',
        },
        component: resolve('center/articles/article-type-list.vue'),
      },
    ]
  },


  {
    path: '/menu31',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '服务管理（企业）',
      accessId: '/menu31',
    },
    component: Main,
    children: [
      {
        path: 'visit-company',
        meta: {
          icon: '',
          title: '上门服务订单',
          accessId: '/center/visit-company',
        },
        component: resolve('center/operate/visit-manage.vue'),
      },
      {
        path: 'order-company',
        meta: {
          icon: '',
          title: '预约服务订单',
          accessId: '/center/order-company',
        },
        component: resolve('center/operate/order-manage.vue'),
      },
      {
        path: 'complaint-manage',
        meta: {

          icon: '',
          title: '反馈管理',
          accessId: '/center/complaint-manage',
        },
        component: resolve('center/company/complaint-manage.vue'),
      },
      {
        path: 'company-note-manage',
        meta: {
          icon: '',
          title: '通知管理',
          accessId: '/center/company-note-manage',
        },
        component: resolve('center/company/company-note-manage.vue'),
      },
    ]
  },
  {
    path: '/menu17',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '企业信息管理',
      accessId: '/menu17',
    },
    component: Main,
    children: [
      {
        path: 'com-edit-info',
        meta: {
          icon: '',
          title: '企业信息维护',
          accessId: '/center/com-edit-info',
        },
        component: resolve('center/company/com-edit-info.vue'),
      },
      {
        path: 'staff-query',
        meta: {
          icon: '',
          title: '企业员工管理',
          accessId: '/center/staff-query',
        },
        component: resolve('center/company/staff-query.vue'),
      },
      {
        path: 'staff-detail',
        meta: {
          icon: '',
          title: '企业员工详情',
          accessId: '/center/staff-detail',
          hideMenu: true
        },
        component: resolve('center/company/staff-detail.vue'),
      },
      {
        path: 'quality-manage',
        meta: {
          icon: '',
          title: '质量信誉考核管理',
          accessId: '/center/quality-manage',
        },
        component: resolve('center/company-info/quality-manage.vue'),
      },
      {
        path: 'company-repair-qualify',
        meta: {
          icon: '',
          title: '企业合格证使用信息登记',
          accessId: '/center/company-repair-qualify',
        },
        component: resolve('center/company/company-repair-qualify.vue'),
      },
      {
        path: 'repored',
        meta: {
          icon: '',
          title: '维修数据上报查询',
          accessId: '/center/repored',
        },
        component: resolve('center/company/repored.vue'),
      },


    ]
  },
  // {
  //   path: '/menu18',
  //   alias: '/center',
  //   meta: {
  //     icon: 'logo-buffer',
  //     title: '运输管理',
  //     accessId: '/menu18',
  //   },
  //   component: Main,
  //   children: [
  //
  //      {
  //       path: 'maintain-report-manage',
  //       meta: {
  //         icon: '',
  //         title: '维修数据上报管理',
  //         accessId: '',
  //       },
  //       component: resolve('center/operate/maintain-report-manage.vue'),
  //     },
  //     {
  //       path: 'for-you-service',
  //       meta: {
  //         icon: '',
  //         title: '为您服务管理',
  //         accessId: 410,
  //       },
  //       component: resolve('center/operate/for-you-service.vue'),
  //     },
  //   ]
  // },


  //管理中心
  {
    path: '/menu21',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '日常监管',
      accessId: '/menu21',
    },
    component: Main,
    children: [
      {
        path: 'record-company',
        meta: {
          icon: '',
          title: '维修记录管理(按企业)',
          accessId: '/center/record-company',
          keepAlive: true
        },
        component: resolve('center/manage-service/record-company.vue'),
      },
      {
        path: 'record-repair',
        meta: {
          icon: '',
          title: '维修记录管理',
          accessId: '/center/record-repair',
          keepAlive: true
        },
        component: resolve('center/manage-service/record-repair.vue'),
      },
      {
        path: 'maintain-data-manage',
        meta: {
          icon: '',
          title: '上传监控',
          accessId: '/center/maintain-data-manage',
        },
        component: resolve('center/logininfo/maintain-data-manage.vue'),
      },
      {
        path: 'enterprise-sign',
        meta: {
          icon: '',
          title: '企业签到监管',
          accessId: '/center/enterprise-sign',

        },
        component: resolve('center/logininfo/enterprise-sign.vue'),
      },
      {
        path: 'manage-sign',
        meta: {
          icon: '',
          title: '管理部门登录情况',
          accessId: '/center/manage-sign',

        },
        component: resolve('center/logininfo/manage-sign.vue'),
      },

      {
        path: 'repair-upload-error',
        meta: {
          icon: '',
          title: '维修记录上传错误情况',
          accessId: '/center/repair-upload-error',
          hideMenu: true
        },
        component: resolve('center/operate/repair-upload-error.vue'),
      },
      {
        path: 'repair-upload',
        meta: {
          icon: '',
          title: '维修记录未上传情况',
          accessId: '/center/repair-upload',
          hideMenu: true
        },
        component: resolve('center/operate/repair-upload-error.vue'),
      },
      {
        path: 'repair-upload-noread',
        meta: {
          icon: '',
          title: '维修记录未上传情况未读企业',
          accessId: '/center/repair-upload-noread',
          hideMenu: true
        },
        component: resolve('center/operate/repair-upload-error.vue'),
      },
      {
        path: 'repair-error-noread',
        meta: {
          icon: '',
          title: '维修记录上传错误情况未读企业',
          accessId: '/center/repair-error-noread',
          hideMenu: true
        },
        component: resolve('center/operate/repair-upload-error.vue'),
      },
    ]
  },
  {
    path: '/menu22',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '管理服务',
      accessId: '/menu22',
    },
    component: Main,
    children: [
      {
        path: 'note-manage',
        meta: {
          icon: '',
          title: '通知管理',
          accessId: '/center/note-manage',
        },
        component: resolve('center/manage-service/note-manage.vue'),
      },
      {
        path: 'note-audit',
        meta: {
          icon: '',
          title: '通知审核',
          accessId: '/center/note-audit',
        },
        component: resolve('center/manage-service/note-audit.vue'),
      },
      {
        path: 'review-manage',
        meta: {
          icon: '',
          title: '反馈管理',
          accessId: '/center/review-manage',
        },
        component: resolve('center/manage-service/review-manage.vue'),
      },
      {
        path: 'file-manage',
        meta: {
          icon: '',
          title: '文件管理',
          accessId: '/center/file-manage',
        },
        component: resolve('center/logininfo/file-manage.vue'),
      },


    ]
  },

  {
    path: '/menu24',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '企业信息(管理端)',
      accessId: '/menu24',
    },
    component: Main,
    children: [
      {
        path: 'company-info-manage',
        meta: {
          icon: '',
          title: '维修企业信息管理',
          accessId: '/center/company-info-manage',
        },
        component: resolve('center/company-info/company-info-manage.vue'),
        // component: resolve('center/operate/repair-company-manage.vue'),
      },
      {
        path: 'quality-manage',
        meta: {
          icon: '',
          title: '质量信誉考核管理',
          accessId: '/center/quality-manage',
        },
        component: resolve('center/company-info/quality-manage.vue'),
      },
      {
        path: 'company-qualify-manage',
        meta: {
          icon: '',
          title: '企业合格证使用信息管理(管理部门)',
          accessId: '/center/company-qualify-manage',
        },
        component: resolve('center/company-info/company-qualify-manage.vue'),
      },
      {
        path: 'by-company',
        meta: {
          icon: '',
          title: '按企业查询员工',
          accessId: '/center/by-company',
        },
        component: resolve('center/company/by-company.vue'),
      },
      {
        path: 'employees-query',
        meta: {
          icon: '',
          title: '查询全部员工',
          accessId: '/center/employees-query',
        },
        component: resolve('center/company/staff-query.vue'),
      },
      {
        path: 'employees-detail',
        meta: {
          icon: '',
          title: '企业员工详情',
          accessId: '/center/employees-detail',
          hideMenu: true
        },
        component: resolve('center/company/staff-detail.vue'),
      },
    ]
  },
  {
    path: '/com-info-operate',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '企业信息管理(运营)',
      accessId: '/com-info-operate',
    },
    component: Main,
    children: [
      {
        path: 'repair-company-manage',
        meta: {
          icon: '',
          title: '维修企业信息管理(运营)',
          accessId: '/center/repair-company-manage',
        },
        component: resolve('center/operate/repair-company-manage.vue'),
      },
      {
        path: 'school-info',
        meta: {
          icon: '',
          title: '驾校信息管理',
          accessId: '/center/school-info-list',
        },
        component: resolve('center/driving-school/school-info-list.vue'),
      },{
        path: 'base-list',
        meta: {
          icon: '',
          title: '驾校基地管理',
          accessId: '/center/base-list',
        },
        component: resolve('center/driving-school/school-base-list.vue'),
      },
      {
        path: 'rescue-company',
        meta: {
          icon: '',
          title: '清障施救牵引企业信息管理',
          accessId: '/center/rescue-company',
        },
        component: resolve('center/operate/rescue-company.vue'),
      },
      {
        path: 'company-white-list',
        meta: {
          icon: '',
          title: '白名单管理',
          accessId: '/center/company-white-list',
        },
        component: resolve('center/operate/company-white-list.vue'),
      },
      {
        path: 'transportationCompany-manage',
        meta: {
          icon: '',
          title: '运输企业信息管理',
          accessId: '/center/transportationCompany-manage',
        },
        component: resolve('center/operate/transportationCompany-manage.vue'),
      },
      {
        path: 'transportationCompany-record',
        meta: {
          icon: '',
          title: '运输车辆技术档案',
          accessId: '/center/transportationCompany-record',
        },
        component: resolve('center/operate/transportationCompany-record.vue'),
      },
    ]
  },
  {
    path: '/serve-operate',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '服务管理(运营)',
      accessId: '/serve-operate',
    },
    component: Main,
    children: [
      {
        path: 'visit-manage',
        meta: {
          icon: '',
          title: '上门服务管理',
          accessId: '/center/visit-manage',
        },
        component: resolve('center/operate/visit-manage.vue'),
      },
      {
        path: 'order-manage',
        meta: {
          icon: '',
          title: '预约服务管理',
          accessId: '/center/order-manage',
        },
        component: resolve('center/operate/order-manage.vue'),
      },
      {
        path: 'operate-complaint',
        meta: {
          icon: '',
          title: '反馈管理(运营)',
          accessId: '/center/operate-complaint',
        },
        component: resolve('center/operate/operate-complaint.vue'),
      },
      {
        path: 'apply-list',
        meta: {
          icon: '',
          title: '驾校报名管理',
          accessId: '/center/apply-list',
        },
        component: resolve('center/driving-school/school-apply-list.vue'),
      },
    ]
  },
  {
    path: '/audit-operate',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '审核管理',
      accessId: '/audit-operate',
    },
    component: Main,
    children: [
      {
      path: 'carDoctor-manage',
      meta: {
        icon: '',
        title: '车大夫专家管理',
        accessId: '/center/carDoctor-manage',
      },
      component: resolve('center/operate/carDoctor-manage.vue'),
    },
      {
        path: 'carDoctor-question-manage',
        meta: {
          icon: '',
          title: '车大夫问题管理',
          accessId: '/center/carDoctor-question-manage',
        },
        component: resolve('center/operate/carDoctor-question-manage.vue'),
      },
      {
        path: 'carDoctor-answer-manage',
        meta: {
          icon: '',
          title: '车大夫回答管理',
          accessId:  '/center/carDoctor-answer-manage',
        },
        component: resolve('center/operate/carDoctor-answer-manage.vue'),
      },
      {
        path: 'bind-car-audit',
        meta: {
          icon: '',
          title: '绑定车辆审核',
          accessId: '/center/bind-car-audit',
        },
        component: resolve('center/operate/bind-car-audit.vue'),
      },
    ]
  },
  {
    path: '/matter-operate',
    alias: '/center',
    meta: {
      icon: 'logo-buffer',
      title: '内容运营',
      accessId: '/matter-operate',
    },
    component: Main,
    children: [
      {
        path: 'article-manage',
        meta: {
          icon: '',
          title: '文章管理',
          accessId: '/center/article-manage',
        },
        component: resolve('center/articles/article-list.vue'),
      },
      {
        path: 'article-manage/detail',
        meta: {
          icon: '',
          title: '文章详情',
        },
        component: resolve('center/articles/article-detail.vue'),
      },
      {
        path: 'banner-manage',
        meta: {
          icon: '',
          title: '广告管理',
          accessId:'/center/banner-manage',
        },
        component: resolve('center/system/banner-manage.vue'),
      },
    ]
  },

]
