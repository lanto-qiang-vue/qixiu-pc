//发布生产环境配置
const prodConfig={
  //端口号
  port: '3000',
  //接口地址
  apiUrl: 'http://212.64.5.54:8888/',

  //查修接口地址
  repairUrl: 'http://115.159.101.204:7210/',
}


//开发测试环境配置
const devConfig={
  port: '3000',
  apiUrl: 'http://192.168.169.190:8888/',
  repairUrl: 'http://115.159.101.204:7210/',
}

export default process.env.NODE_ENV==='development'? devConfig: prodConfig


