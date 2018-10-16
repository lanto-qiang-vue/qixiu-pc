//

import Vue from 'vue';

const TOKEN_KEY = 'ACCESSTOKEN'
const USERINFO_KEY = 'USERINFO'
const ACCESSMENU_KEY = 'ACCESSMENU'

const util={
  setToken : (token) => {
    localStorage.setItem(TOKEN_KEY, token || '')
  },
  getToken : () => {
    const token = localStorage.getItem(TOKEN_KEY)
    return token || false
  },
  setUser : (info) => {
    localStorage.setItem(USERINFO_KEY, info ? JSON.stringify(info) : '')
  },
  getUser : () => {
    const val = localStorage.getItem(USERINFO_KEY)
    return val ? JSON.parse(val) : false
  },
  setMenu : (info) => {
    localStorage.setItem(ACCESSMENU_KEY, info ? JSON.stringify(info) : '')
  },
  getMenu : () => {
    const val = localStorage.getItem(ACCESSMENU_KEY)
    return val ? JSON.parse(val) : false
  },
  imgToBase64: imgToBase64
}

let MyPlugin ={
  install (Vue, options) {
    // 1. 添加全局方法或属性
    Vue.prototype.util = util
  }
}

Vue.use(MyPlugin)

/**
 * @param {thisfile} 图片文件
 * @param {callBack} 回调函数
 * @returns {base64, filename}
 * @description 图片压缩并转base64
 */
function imgToBase64 (thisfile, callBack) {
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
        callBack,
      )
    };
  }
}
function _compress (path, obj, name, callBack) {
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
