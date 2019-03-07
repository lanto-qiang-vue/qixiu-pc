const prod={
  port: '3000',
  workOn: 'pPro',
}
const dev={
  port: '3333',
  workOn: 'pDev',
}

const shanghai={
  zhName: '上海',
  areaName:'shanghai',
  areaKey:'310000'
}

const shandong={
  zhName: '山东',
  areaName:'shandong',
  areaKey:'370000'
}

//打包编译环境配置
const prodConfig={

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

  ...prod,
  ...shanghai,
}


//开发测试环境配置
const devConfig={
  port: '3333',
  // apiUrl: 'http://212.64.5.54:8888/',
  // apiUrl: 'http://gateway.qixiu.lanto.com/',
  apiUrl: 'http://192.168.169.231:8888/',
  // apiUrl: 'https://www.test.shanghaiqixiu.org/proxy/',

  // apiUrl: 'http://192.168.169.117:8888/',

  repairUrl: 'https://www.shanghaiqixiu.org/repair/',
  // repairUrl: 'http://192.168.169.230:7210/',

  socketUrl: 'https://www.shanghaiqixiu.org/heatmap/socket',
  shandongSocket: 'https://www.shandongqixiu.com/heatmap/socket',

  articlePath: 'http://download.image.lanto.com/',
  workOn: 'pDev',

  ...dev,
  ...shanghai,

}

const shanghaiConf= process.env.NODE_ENV==='development'? devConfig: prodConfig

const conf={
  shanghai: shanghaiConf,
  dev_shandong: {

    apiUrl: 'http://192.168.169.208:8888/',
    // apiUrl: 'https://www.shanghaiqixiu.org/proxy/',

    repairUrl: 'https://www.shanghaiqixiu.org/repair/',

    socketUrl: 'https://www.shanghaiqixiu.org/heatmap/socket',
    shandongSocket: 'https://www.shandongqixiu.com/heatmap/socket',

    articlePath: 'http://download.image.lanto.com/',

    ...dev,
    ...shandong,

  }
}

export default conf


