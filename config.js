//打包编译环境配置
const prodConfig={
  //端口号
  port: '3000',
  //接口地址
  // apiUrl: 'http://212.64.5.54:8888/',
  apiUrl: 'http://gateway.qixiu.lanto.com/',
  //查修接口地址
  repairUrl: 'http://118.25.35.172:7210/',
  socketUrl: 'https://socket.shanghaiqixiu.org/micro/heatmap/socket',
  shandongSocket: 'https://www.shanghaiqixiu.org/heatmap/socket',
  articlePath: 'https://download.image.shanghaiqixiu.org/'
}


//开发测试环境配置
const devConfig={
  port: '3000',
  // apiUrl: 'http://192.168.169.233:8888/',
  // apiUrl: 'http://gateway.qixiu.lanto.com/',
  apiUrl: 'http://192.168.169.231:8888/',

  repairUrl: 'http://118.25.35.172:7210/',
  socketUrl: 'http://118.25.131.29:10001/micro/heatmap/socket',
  shandongSocket: 'http://118.25.13.140:10001/heatmap/socket',
  articlePath: 'http://download.image.lanto.com/'
}

export default process.env.NODE_ENV==='development'? devConfig: prodConfig


