//打包编译环境配置
const prodConfig={
  //端口号
  port: '3000',
  //接口地址
  // apiUrl: 'http://212.64.5.54:8888/',
  apiUrl: 'http://gateway.qixiu.lanto.com/',
  //查修接口地址
  repairUrl: 'http://corp.search.shanghaiqixiu.org/',
  // repairUrl: 'http://129.211.14.78:7210/',

  socketUrl: 'https://www.shanghaiqixiu.org/heatmap/socket',
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
  apiUrl: 'http://192.168.169.208:8888/',
  // apiUrl: 'https://www.test.shanghaiqixiu.org/proxy/',

  // apiUrl: 'http://192.168.169.117:8888/',

  repairUrl: 'https://www.shanghaiqixiu.org/repair/',
  // repairUrl: 'http://192.168.169.230:7210/',

  socketUrl: 'https://www.shanghaiqixiu.org/heatmap/socket',
  shandongSocket: 'https://www.shandongqixiu.com/heatmap/socket',

  articlePath: 'http://download.image.lanto.com/',
  workOn: 'pDev',

}

let baseConf= process.env.NODE_ENV==='development'? devConfig: prodConfig
let allConf={
  ...baseConf,
  area: {
    name:'shanghai'
  },
  shanghai:{
    areaKey: '310'
  },
  shandong:{
    areaKey: '370'
  }
}

export default allConf


