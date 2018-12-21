// import Cookies from 'js-cookie'
// cookie保存的天数
// import config from '@/config'
import { forEach, hasOneOf } from './tools'
import router from '~/static/router'
export const TOKEN_KEY = 'ACCESSTOKEN'
export const USERINFO_KEY = 'USERINFO'
export const ACCESSMENU_KEY = 'ACCESSMENU'
export const DICT_KEY = 'DICT'
export const TENANT_KEY = 'Tenant';
export const OUTSTATUS = 'outStatus'
export const setOutStatus = (type) =>{
  localStorage.setItem(OUTSTATUS,type || 0)
}
export const getOutStatus = () =>{
  const outStatus = localStorage.getItem(OUTSTATUS)
  return outStatus || 0;
}
export const setToken = (token) => {
  // Cookies.set(TOKEN_KEY, token, {expires: config.cookieExpires || 1})

  localStorage.setItem(TOKEN_KEY, token || '')
}
export const setTenant = (info)=>{
  localStorage.setItem(TENANT_KEY, info ? JSON.stringify(info) : '')
}
export const getTenant = () => {
  const tean = localStorage.getItem(TENANT_KEY)
  return tean ? JSON.parse(tean) : false
}
export const getToken = () => {
  // const token = Cookies.get(TOKEN_KEY)
  const token = localStorage.getItem(TOKEN_KEY)
  return token || false
}
export const setUser = (info) => {
  localStorage.setItem(USERINFO_KEY, info ? JSON.stringify(info) : '')
}
export const getUser = () => {
  let val = localStorage.getItem(USERINFO_KEY)
  return val ? JSON.parse(val) : false
}
export const setMenu = (info) => {
  localStorage.setItem(ACCESSMENU_KEY, info ? JSON.stringify(info) : '')
}
export const getMenu = () => {
  const val = localStorage.getItem(ACCESSMENU_KEY)
  return val ? JSON.parse(val) : false
}
export const setDict = (info) => {
  localStorage.setItem(DICT_KEY, info ? JSON.stringify(info) : '')
}
export const getDict = () => {
  const val = localStorage.getItem(DICT_KEY)
  return val ? JSON.parse(val) : false
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

const matchMenu = (access, menu) => {
  let flag = false
  for (let i in menu) {
    if (menu[i].id == access) {
      flag = menu[i]
      break
    } else if (menu[i].children) {
      flag = matchMenu(access, menu[i].children)
      if (flag) break
    }
  }
  return flag
}

//判断权限菜单可见
export const showThisMenuEle = (item, access) => {
  // if (item.meta && item.meta.access && item.meta.access.length) {
  //   if (hasOneOf(item.meta.access, access)) return true
  //   else return false
  // } else return true

  if (!access.accessMenu || !access.userInfo) return false
  if (item.meta && item.meta.lgType && item.meta.access) {
    let lgType = access.userInfo.user.lgType, menu = access.accessMenu
    if (item.meta.lgType == lgType && matchMenu(item.meta.access, menu)) return true
    else return false
  } else return true
}

//获取图标
export const getIcon = (item, access) => {
  let lgType = access.userInfo.user.lgType, menuItem , icon=''
  if (item.meta && item.meta.lgType && item.meta.access) {
    menuItem = matchMenu(item.meta.access, access.accessMenu)
    if (item.meta.lgType == lgType && menuItem) {
      if(menuItem.iconFont) icon= 'fa '+ menuItem.iconFont
    }
    else if(item.children) icon= getIcon(item.children, access)
  }
  return icon
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (router, accessMenu) => {
  let res = []
  forEach(router, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      let accessShow= showThisMenuEle(item, accessMenu)
      if ((hasChild(item) || (item.meta && item.meta.showAlways)) && accessShow) {
        obj.children = getMenuByRouter(item.children, accessMenu)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (accessShow) {
        obj.custom= getIcon(item, accessMenu)
        // console.log('custom',obj.custom)
        res.push(obj)
      }
    }
  })
  return res
}
export const getMenuByRouter2 = (  routers, accessMenu) => {
  let res = []
  for(let i in accessMenu)  {
    let menuItem = accessMenu[i];

    if( menuItem.uri && menuItem.uri.indexOf('http')>=0){
      let meta= deepClone(menuItem)
      meta.title= menuItem.name
      meta.href= menuItem.uri
      res.push({
        meta: meta,
        path: menuItem.uri
      })
    }

    for(let j in routers)  {
      let route = routers[j]
      if(route.meta&& route.meta.accessId!= undefined){
        //如果route文件有设置权限
        if( !menuItem.children.length && route.meta.accessId== 'root'){
          //如果是一级
          res= res.concat(matchItem(route.children, menuItem, route.alias))
        }

        if( route.meta.accessId== menuItem.uri){
          let item={}
          item.meta= deepClone(menuItem)
          for( let key in route.meta){
            item.meta[key]= route.meta[key]
          }
          item.meta.title= menuItem.name
          item.children= matchList(route.children, menuItem.children, route.alias)
          res.push(item)
        }
      }

    }

  }
  // console.log(res)
  return res
}

export const matchItem = ( routers, menuItem, path) => {
  let arr= []
  for(let i in routers)  {
    let route= routers[i], item={}
    if(route.meta.accessId== menuItem.uri){
      item.meta= deepClone(menuItem)
      for( let key in route.meta){
        item.meta[key]= route.meta[key]
      }
      item.meta.title= menuItem.name
      item.path= (route.path.indexOf('/')!=0 && path)? (path+'/'+ route.path) : route.path
      arr.push(item)
    }
  }
  // if(!arr.length && menuItem.uri && menuItem.uri.indexOf('http')>=0){
  //   arr.push({
  //     meta: {
  //       title: menuItem.name
  //     },
  //     path: menuItem.uri
  //   })
  // }
  // console.log('matchItem',arr)
  return arr
}

export const matchList = ( routers, accessMenu, path) => {
  let arr= []
  for(let i in accessMenu) {
    let menuItem = accessMenu[i];
    if (menuItem.uri && menuItem.uri.indexOf('http') >= 0) {
      let meta= deepClone(menuItem)
      meta.title= menuItem.name
      meta.href= menuItem.uri
      arr.push({
        meta: meta,
        path: menuItem.uri
      })
    }
    for (let j in routers) {
      let route = routers[j], item={}
      if(route.meta.accessId== menuItem.uri){
        item.meta= deepClone(menuItem)
        for( let key in route.meta){
          item.meta[key]= route.meta[key]
        }
        item.meta.title= menuItem.name
        item.path= (route.path.indexOf('/')!=0 && path)? (path+'/'+ route.path) : route.path
        arr.push(item)
      }
    }
  }
  return arr
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (routeMetched, homeRoute) => {
  let res = routeMetched.filter(item => {
    return item.meta === undefined || !item.meta.hide
  }).map(item => {
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: item.meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })
  return [Object.assign(homeRoute, { to: homeRoute.path }), ...res]
}

export const showTitle = (item, vm) => vm.$config.useI18n ? vm.$t(item.name) : ((item.meta && item.meta.title) || item.name)

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  localStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList
  return list ? JSON.parse(list) : []
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = routers => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children)
      if (res.name) return res
    } else {
      // console.log('getUser',getUser())
      if (!getUser()) return false
      if (item.name === (getUser().user.lgType==='1002' ? 'home' : 'admin-home')) homeRoute = item
    }
  }
  return homeRoute
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute
  let newList = [...list]
  if (newList.findIndex(item => item.name === name) >= 0) return newList
  else newList.push({ name, path, meta })
  return newList
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
  else return true
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }

  return routePermissionJudge(routes)
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextName = (list, name) => {
  let res = ''
  if (list.length === 2) {
    res = 'home'
  } else {
    if (list.findIndex(item => item.name === name) === list.length - 1) res = list[list.length - 2].name
    else res = list[list.findIndex(item => item.name === name) + 1].name
  }
  return res
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback()
  }
}

/**
 * @param {Object} file 从上传组件得到的文件对象
 * @returns {Promise} resolve参数是解析后的二维数组
 * @description 从Csv文件中解析出表格，解析成二维数组
 */
export const getArrayFromFile = (file) => {
  let nameSplit = file.name.split('.')
  let format = nameSplit[nameSplit.length - 1]
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsText(file) // 以文本格式读取
    let arr = []
    reader.onload = function (evt) {
      let data = evt.target.result // 读到的数据
      let pasteData = data.trim()
      arr = pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
        return row.split('\t')
      }).map(item => {
        return item[0].split(',')
      })
      if (format === 'csv') resolve(arr)
      else reject(new Error('[Format Error]:你上传的不是Csv文件'))
    }
  })
}

/**
 * @param {Array} array 表格数据二维数组
 * @returns {Object} { columns, tableData }
 * @description 从二维数组中获取表头和表格数据，将第一行作为表头，用于在iView的表格中展示数据
 */
export const getTableDataFromArray = (array) => {
  let columns = []
  let tableData = []
  if (array.length > 1) {
    let titles = array.shift()
    columns = titles.map(item => {
      return {
        title: item,
        key: item
      }
    })
    tableData = array.map(item => {
      let res = {}
      item.forEach((col, i) => {
        res[titles[i]] = col
      })
      return res
    })
  }
  return {
    columns,
    tableData
  }
}

export const findNodeUpper = (ele, tag) => {
  if (ele.parentNode) {
    if (ele.parentNode.tagName === tag.toUpperCase()) {
      return ele.parentNode
    } else {
      return findNodeUpper(ele.parentNode, tag)
    }
  }
}

export const findNodeDownward = (ele, tag) => {
  const tagName = tag.toUpperCase()
  if (ele.childNodes.length) {
    let i = -1
    let len = ele.childNodes.length
    while (++i < len) {
      let child = ele.childNodes[i]
      if (child.tagName === tagName) return child
      else return findNodeDownward(child, tag)
    }
  }
}

export const showByAccess = (access, canViewAccess) => {
  return hasOneOf(canViewAccess, access)
}

export const getName = (arr, code) => {
  for (let i in arr){
    if(arr[i].code==code)
      return arr[i].name
  }
}
export const getCreate = (arr,code) =>{
for(let i in arr){
if(arr[i].USER_ID ==code){
return arr[i].USER_NAME
}
}
}
export const getDictGroup = (arr, group) => {
  let res= []
  for (let i in arr){
    if(arr[i].group==group)
      res.push(arr[i])
  }
  return res
}

export const getUserInfo = (arr, group) => {
  for (let i in arr){
    if(arr[i].PARAM_ID==group)
      return arr[i].PARAM_VALUE
  }

}

export const getBtns = (access, menu) => {
    let btnAction = ''
    for (let i in menu) {
      if (menu[i].id == access) {
        btnAction = menu[i].btnAction
        break
      } else if (menu[i].children) {
        btnAction = getBtns(access, menu[i].children)
        if (btnAction) break
      }
    }
    return btnAction
}
/**
 * @param {obj} 任意参数
 * @returns {String}
 * @description 判断参数类型
 */
export const getType = (obj) => {
  //tostring会返回对应不同的标签的构造函数
  let toString = Object.prototype.toString;
  let map = {
    '[object Boolean]'  : 'boolean',
    '[object Number]'   : 'number',
    '[object String]'   : 'string',
    '[object Function]' : 'function',
    '[object Array]'    : 'array',
    '[object Date]'     : 'date',
    '[object RegExp]'   : 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null',
    '[object Object]'   : 'object'
  };
  // if(obj instanceof Element) {
  //   return 'element';
  // }
  return map[toString.call(obj)];
}

/**
 * @param {data} 任意参数
 * @returns {Object}
 * @description 任意数据深拷贝
 */
export const deepClone = (data) => {
  let type = getType(data);
  let obj;
  if(type === 'array'){
    obj = [];
  } else if(type === 'object'){
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if(type === 'array'){
    for(let i = 0, len = data.length; i < len; i++){
      obj.push(deepClone(data[i]));
    }
  } else if(type === 'object'){
    for(let key in data){
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
}

/**
 * @param {thisfile} 图片文件
 * @param {callBack} 回调函数
 * @returns {base64, filename}
 * @description 图片压缩并转base64
 */
export const imgToBase64 = (thisfile, callBack) => {
  // var file= $(domName).get(0).files[0]
  var file= thisfile
  var reader = new FileReader();
  reader.readAsDataURL(file)
  reader.onload = function (e) {
    var image = new Image();
    var self= this
    image.src= e.target.result;
    image.onload=function(){
      var width = image.width;
      var height = image.height;
      _compress(self.result,
        {width: width, height:height, quality: 0.6, type: file.type} ,
        file.name,
        callBack
      )
    };
  }
}
export const _compress = (path, obj, name, callBack) => {
  var img = new Image();
  img.src = path;
  img.onload = function () {
    var that = this;
    // 默认按比例压缩
    var w = that.width,
      h = that.height,
      scale = w / h;
    w = obj.width || w;
    h = obj.height || (w / scale);
    var quality = 0.7;  // 默认图片质量为0.7
    //生成canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    // 创建属性节点
    var anw = document.createAttribute("width");
    anw.nodeValue = w;
    var anh = document.createAttribute("height");
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);
    ctx.drawImage(that, 0, 0, w, h);
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality;
    }
    // quality值越小，所绘制出的图像越模糊
    var base64 = canvas.toDataURL(obj.type|| 'image/png', quality);
    // console.log(base64)
    // 返回base64的值
    callBack(base64, name )
  }

}

export const  base64ToBlob= (dataurl) => {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

export const  haveRight = (menuList, id) =>{
  let flag= false
  if(id){
    for( let i in menuList){
      if(menuList[i].meta.accessId== id){
        flag= true
        break
      }else if(menuList[i].children && menuList[i].children.length){
        flag= haveRight(menuList[i].children, id)
        if (flag) break
      }
    }
  }else flag= true
  return flag
}

export const checkAuth = ({ route, store},redirect, error) =>{
  if (process.client) {
    let meta= route.matched.length>0? route.matched[route.matched.length-1].meta: {}
    if(store.state.user.token){
      let list= getMenuByRouter2(router, store.state.user.accessMenu)
      if(!haveRight(list, meta.accessId)){
        error()
      }else{
        // console.log('有权限')
      }
    }else{
      // console.log('not login')
      if(meta && (meta.accessId || meta.needLogin)){
        // redirect({
        //   path: '/login',
        //   query: { redirect: route.fullPath }
        // })
        redirect()
      }
    }
  }
}

export const signIn = ({ route, store, $axios, Message, Modal, Spin},toRedirect) =>{
  if (process.client) {
    let userInfo= store.state.user.userInfo, isComp= false
    if( userInfo && userInfo.roles){
      for(let i in userInfo.roles){
        if(userInfo.roles[i].code== 'weixiuqiye') isComp= true
      }
    }
    if(route.fullPath.indexOf('/center')>=0 && isComp){
      Spin.show()
      $axios.$get('/company/ischeckin').then((res)=>{
        if(!res.item){
          Modal.confirm({
            title: '每日签到',
            content: '是否签到？',
            onOk:()=>{
              $axios.$post('/company/checkin', {}).then((res)=>{
                if(res.code==='0') Message.success('签到成功')
              })
            },
            onCancel:()=>{
              toRedirect()
            },
          })
        }
        Spin.hide()
      })
    }
  }
}
