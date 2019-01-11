//打包编译环境配置
const prodConfig={
  //端口号
  port: '3000',
  //接口地址
  // apiUrl: 'http://212.64.5.54:8888/',
  apiUrl: 'http://gateway.qixiu.lanto.com/',
  //查修接口地址
  repairUrl: 'http://corp.search.shanghaiqixiu.org/',

  socketUrl: 'https://www.test.shanghaiqixiu.org/heatmap/socket',
  shandongSocket: 'https://www.shandongqixiu.com/heatmap/socket',

  articlePath: 'https://download.image.shanghaiqixiu.org/',
  // articlePath: 'http://download.image.lanto.com/'
  workOn: 'pPro'
}


//开发测试环境配置
const devConfig={
  port: '3333',
  // apiUrl: 'http://212.64.5.54:8888/',
  // apiUrl: 'http://gateway.qixiu.lanto.com/',
  apiUrl: 'http://192.168.169.231:8888/',
  // apiUrl: 'http://192.168.169.114:8481/',

  // repairUrl: 'http://118.25.35.172:7210/',
  repairUrl: 'http://192.168.169.230:7210/',

  socketUrl: 'https://www.shanghaiqixiu.org/heatmap/socket',
  shandongSocket: 'https://www.shandongqixiu.com/heatmap/socket',

  articlePath: 'http://download.image.lanto.com/',
  workOn: 'pDev'
}

export default process.env.NODE_ENV==='development'? devConfig: prodConfig


