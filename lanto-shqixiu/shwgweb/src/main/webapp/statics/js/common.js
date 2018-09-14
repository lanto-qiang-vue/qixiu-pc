// JavaScript Document
var baseu= 'http://api.test.shanghaiqixiu.org'
// var baseu= 'http://192.168.169.109:8000'
// var baseu= 'https://api.shanghaiqixiu.org'

var socketu= "http://118.25.131.29:10001/micro/heatmap/socket"

var accessToken = localStorage.getItem('ACCESSTOKEN');
var headers = {};
if(accessToken !== null) {
    headers.Authorization = 'Bearer ' + accessToken;
    headers.access_token = accessToken
}
var layer = layui.layer

var laypage = layui.laypage;




function simpleGet(url,  callback) {
    $.ajax({
        url : url,
        type : "get",
        dataType:"json",
        headers: headers,
        contentType:"application/json",
        success : function(e) {
                responseMessageMaker(e, '')
                callback(e);


        },
        error: function () {
            layer.msg('系统繁忙！', {time: 2000, icon:5});
            layer.closeAll('loading');
        }
    })
}

function simplePost(url, param, callback) {
    $.ajax({
        url : url,
        data : param,
        headers: headers,
        // xhrFields: {withCredentials: true},
        type : "post",
        dataType:"json",
        contentType:"application/json",
        success : function(e) {
                responseMessageMaker(e, '')
                callback(e)


        },
        error: function () {
            layer.msg('系统繁忙！', {time: 2000, icon:5});
            layer.closeAll('loading');
        }
    })
}

function normalPost(url, param, callback) {
    $.ajax({
        url : url,
        data : param,
        headers: headers,
        type : "post",
        dataType:"json",
        // contentType:"application/json",
        success : function(e) {
            responseMessageMaker(e, '')
            callback(e)


        },
        error: function () {
            layer.msg('系统繁忙！', {time: 2000, icon:5});
            layer.closeAll('loading');
        }
    })
}

function filePost(url, param, callback) {
    $.ajax({
        url : url,
        data : param,
        headers: headers,
        type : "post",
        dataType:"json",
        // contentType:"application/json",
        contentType: false,
        processData: false,
        success : function(e) {
            responseMessageMaker(e, '')
            callback(e)


        },
        error: function () {
            layer.msg('系统繁忙！', {time: 2000, icon:5});
            layer.closeAll('loading');
        }
    })
}

function systemGet(url, callback) {
    var device=localStorage.getItem('UUID')
    if(!device){
        device = uuid()
        localStorage.setItem('UUID',device)
    }
    var param = {
        device:device,
        password: 'k5pg8kkN',
        username: 'pcqixiu'
    };
    simplePost(baseu+'/system/terminalsystem/login',JSON.stringify(param),function(res){
        var systemToken = res.data.systemToken
        simpleGet(url+'/'+systemToken, function (res) {
            callback(res)
        })
    })
}

function systemCall(callback) {
    var device=localStorage.getItem('UUID')
    if(!device){
        device = uuid()
        localStorage.setItem('UUID',device)
    }
    var param = {
        device:device,
        password: 'k5pg8kkN',
        username: 'pcqixiu'
    };
    simplePost(baseu+'/system/terminalsystem/login',JSON.stringify(param),function(res){
        var systemToken = res.data.systemToken
        callback(systemToken)
    })
}

function accessPost(url, param, callback) {
    $.ajax({
        url : url,
        data : param,
        type : "post",
        headers: headers,
        // xhrFields: {withCredentials: true},
        dataType:"json",
        contentType:"application/json",
        success : function(e) {

            responseMessageMaker(e, '')
            callback(e)
        },
        error: function () {
            layer.msg('系统繁忙！', {time: 2000, icon:5});
            layer.closeAll('loading');
        }
    })
}

function accessPatch(url, param, callback) {

    $.ajax({
        url : url,
        data : param,
        type : "patch",
        headers: headers,
        dataType:"json",
        contentType:"application/json",
        success : function(e) {

            responseMessageMaker(e, '')
            callback(e)
        },
        error: function () {
            layer.msg('系统繁忙！', {time: 2000, icon:5});
            layer.closeAll('loading');
        }
    })
}

function accessGet(url, callback) {
    $.ajax({
        url : url,
        type : "get",
        dataType:"json",
        headers: headers,
        contentType:"application/json",
        success : function(e) {

            responseMessageMaker(e, '')
            callback(e)
        },
        error: function () {
            layer.msg('系统繁忙！', {time: 2000, icon:5});
            layer.closeAll('loading');
        }
    })
}

function ajaxEvent(c, d, b,isLoading) {
	try {
		var index = null;
		if(isLoading){
			index = layer.load(1,{shade:[0.3, '#000']});
		}
		$.ajax({
			url : c + "?random=" + Math.random(),
			data : d,
			type : "post",
            headers: headers,
			timeout:600000,
			//dataType : a,   改于2017-03-20
			dataType : "text",
			async : true,
			success : function(e) {
				e = eval("("+e+")");
				if (e.success) {
					if (b != null) {
						b(e);
					}
				} else {
					// layer.msg(e.title, {time: 5000, icon:5});
				}
				if(index){
					layer.close(index);
				}
			},
			error : function(err) {
				var rsp = err.getResponseHeader("sessionstatus");
				if(rsp == 'timeout'){
					timeOutToLogin('登录已超时，请重新登录！');
				}else{
					layer.msg("非法请求或登录已超时", {time: 5000, icon:5});
				}
				if(index){
					layer.close(index);
				}
			},
			timeout : function() {
				layer.msg("请求超时,请重试", {time: 5000, icon:5});
				if(index){
					layer.close(index);
				}
			}
		});
	} catch (f) {
		layer.msg("非法请求", {time: 5000, icon:5});
	}
}

function ajaxLoading(c, d, btn,tip,b) {
	var oldTip = btn.find('span').text();
	var oldIconCls = btn.find('i').text();
	btn.addClass('layui-btn-disabled').attr('disabled',true).find('span').text(tip);
	btn.find('i').removeClass('layui-icon').addClass('icon-refresh icon-spinner icon-spin').text('');
	try {
		$.ajax({
			url : c + "?random=" + Math.random(),
			data : d,
			type : "post",
            headers: headers,
			timeout:600000,
			//dataType : a,   改于2017-03-20
			dataType : "text",
			async : true,
			success : function(e) {
				btn.removeClass('layui-btn-disabled').removeAttr('disabled').find('span').text(oldTip);
				btn.find('i').removeClass('icon-refresh icon-spinner icon-spin').addClass('layui-icon').text(oldIconCls);
				e = eval("("+e+")");
				if (e.success) {
					if (b != null) {
						b(e);
					}
				} else {
					layer.msg(e.title, {time: 5000, icon:5});
				}
				console.log(e);
			},
			error : function(err) {
				btn.removeClass('layui-btn-disabled').removeAttr('disabled').find('span').text(oldTip);
				btn.find('i').removeClass('icon-refresh icon-spinner icon-spin').addClass('layui-icon').text(oldIconCls);
				var rsp = err.getResponseHeader("sessionstatus");
				if(rsp == 'timeout'){
					timeOutToLogin('登录已超时，请重新登录！');
				}else{
					layer.msg("非法请求或登录已超时", {time: 5000, icon:5});
				}
			},
			timeout : function() {
				btn.removeClass('layui-btn-disabled').removeAttr('disabled').find('span').text(oldTip);
				btn.find('i').removeClass('icon-refresh icon-spinner icon-spin').addClass('layui-icon').text(oldIconCls);
				layer.msg("请求超时,请重试", {time: 5000, icon:5});
			}
		});
	} catch (f) {
		layer.msg("非法请求", {time: 5000, icon:5});
	}
}

function timeOutToLogin(msg){
	var memberUri = $("#memberUri").html();
	layer.msg(msg, {
	  icon: 5,
	  time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
	}, function(){
	  	window.location.href = ctx + "/toLogin?reUrl=" + memberUri;
	}); 
}

function toLogin(){
	var memberUri = $("#memberUri").html();
	window.location.href = ctx + "/toLogin?reUrl=" + memberUri;
}


function logout(){
	layer.confirm('确认要退出登录吗？', {
	icon:3,
	btn : ['确定', '取消']
	}, function() {
        var token= localStorage.getItem('ACCESSTOKEN')
        simpleGet(baseu+ '/user/useraccount/logout/'+ token, function(res){
            localStorage.removeItem('ACCESSTOKEN')
            localStorage.removeItem('USERINFO')
            // window.location.reload();
            var memberUri = $("#memberUri").html();
            window.location.href = ctx + "/toLogin?reUrl=" + memberUri;
        })

		// var url = ctx + '/logout.do';
		// ajaxEvent(url,null,function(ret){
		// 	window.location.reload();
		// });
	});
	
}

function getCookieValue(name) {
		var cookies = document.cookie.split('; '), i = cookies.length, cookie, value;

		while (i--) {
			cookie = cookies[i].split('=');
			if (cookie[0] === name) {
				value = cookie[1];
			}
		}

		return value;
	}
	

function setCookie(name,value,time) {
	var d = new Date(new Date().getTime() + time * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + value + "; expires="+ d.toGMTString();
}

function crandom(len){
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    // s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    // if(r!=null)return  unescape(r[2]); return null;
    if(r!=null)return r[2];
    return null;
}

function formatDate(value, format){
    if (value != null && value != '') {
        value = new Date(value);
        var o = {
            "M+": value.getMonth() + 1, //month
            "d+": value.getDate(),    //day
            "h+": value.getHours(),   //hour
            "m+": value.getMinutes(), //minute
            "s+": value.getSeconds(), //second
            "q+": Math.floor((value.getMonth() + 3) / 3),  //quarter
            "S": value.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (value.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    } else {
        return '';
    }
};

function formatArea(key) {
	var name=''
	switch (key){
		case '310000': name= '沪市'; break
		case '310112': name= '沪闵'; break
		case '310113': name= '沪宝'; break
		case '310114': name= '沪嘉'; break
		case '310115': name= '沪浦'; break
		case '310116': name= '沪金'; break
		case '310117': name= '沪松'; break
		case '310118': name= '沪青'; break
		case '310120': name= '沪奉'; break
		case '310130': name= '沪崇'; break
	}
	return name
}


function responseMessageMaker(res, ctx){
// console.log('responseMessageMaker',res.code)
	var message = '';

	// var loginUrl = ctx + '/toLogin?reUrl=/shwgweb/toJump'
	var loginUrl = ctx + '/toLogin?reUrl=' + window.location.pathname;
	if(!res.code){
        // localStorage.removeItem('USERINFO')
		// window.location.href = loginUrl;
	}
	switch(res.code){
		case "130405":

		case "130406":

		case "130407":

		case "130408":

		case "130409":

		case "130410":

		case "130411":

		case "130412":
            goLogin(res.status, loginUrl)
			break;
		default:
			message = res.status;
	}

	return message;
}

function goLogin(err, url) {
    // layer.msg(err, {time: 2000},function () {
    //     localStorage.removeItem('USERINFO')
    //     var u = navigator.userAgent;
    //     var android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    //     var ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //     if(android){
    //         window.JSInterface.loginByJs(window.location.origin+'/'+url)
    //         return 'android'
    //     }else if(ios){
    //         loginByJs(window.location.origin+'/'+url)
    //         return 'ios'
    //     }else{
    //         window.location.href = '/toLogin?reUrl=/'+url
    //         return 'pc'
    //     }
        if(typeof loginByJs == "function"){
            loginByJs(window.location.origin+'/'+url)
            return 'ios'
		}else if(window.JSInterface && typeof window.JSInterface.loginByJs == "function"){
            window.JSInterface.loginByJs(window.location.origin+'/'+url)
            return 'android'
		}else{
            window.location.href = '/toLogin?reUrl=/'+url
            return 'pc'
		}

    // })
}

function handleIfUserNeedToLoginIn(res, ctx, reUrl){
    // return
	console.log('ctx: ', ctx);
	var loginUrl = ctx + '/toLogin?reUrl=' + reUrl;

	if(!res.code){
		window.location.href = loginUrl;
	}
	if(!localStorage.getItem('USERINFO')){
		window.location.href = loginUrl;
	}
	switch(res.code){
		case "130405":
			window.location.href = loginUrl;
			break;
		case "130406":
			window.location.href = loginUrl;
			break;
		case "130407":
			window.location.href = loginUrl;
			break;
		case "130408":
			window.location.href = loginUrl;
			break;
		case "130409":
			window.location.href = loginUrl;
			break;
        case "130410":
            window.location.href = loginUrl;
            break;
		case "130411":
			window.location.href = loginUrl;
			break;
		case "130412":
			window.location.href = loginUrl;
			break;
		default:
	}
}

function goToPage (url, doNotCheck, roleIdList) {
	if(doNotCheck){
        window.open(url,"_blank");
		// window.location.href = url;
		return;
	}

	if( !localStorage.getItem('USERINFO')) {
		var ctx;
		try{
			ctx = "/" + url.split("/")[1];
		}catch(e){
			console.log('e: ', e);
		}
		console.log('url: ', url);

		// window.location.href = ctx + "/toLogin?reUrl=" + url;
		window.open( "/toLogin?reUrl=" + url,"_blank" );
        // window.location.href = "/toLogin?reUrl=" + url;
	} else {
		var info= JSON.parse(localStorage.getItem('USERINFO'))


		if(roleIdList && roleIdList.length > 0){
			for(var i = 0; i < roleIdList.length; i++){
				if(roleIdList[i] == info.userRoleId){
                    goRepairInfo(url, info)
                    // window.open(url,"_blank");
					// window.location.href = url;
					return;
				}
			}
            layer.msg("对不起，您没有权限访问此功能。")

		}else{
            goRepairInfo(url, info)
			return
            // window.open(url,"_blank");
			// window.location.href = url;
		}
	}

}

function goRepairInfo(url, info) {
    if(url=='/center/repairInfo'||url=='/center/applyList'){
        window.open("/center/repairInfo?role_id="+ (info.showRole || '') , "_blank");
    }else{
        window.open(url,"_blank");
	}
}


//判断是否登录并跳转各自设备
function equipLogin(reurl) {
    if (localStorage.getItem('ACCESSTOKEN')) {
        return 'login'
    } else{
        var u = navigator.userAgent;
        var android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(android){
            window.JSInterface.loginByJs(window.location.origin+'/'+reurl)
            return 'android'
        }else if(ios){
            loginByJs(window.location.origin+'/'+reurl)
            return 'ios'
        }else{
            window.location.href = '/toLogin?reUrl=/'+reurl
            return 'pc'
        }
    }
}

function uploadImg(thisfile, successCallBack, failCallBack){
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
                successCallBack, failCallBack
			)
        };
    }
}
function _compress(path, obj, name, successCallBack, failCallBack){
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
        _pushImg(base64, name, successCallBack, failCallBack)
    }

}
function _pushImg(base64, name, successCallBack, failCallBack) {
    layer.load();
    var formdata = new FormData();
    formdata.append('file' , _base64ToBlob(base64), name);
    filePost(baseu + '/image/add/'+ accessToken , formdata, function (res) {
        console.log(res)
        if(res.code=='000000'){
            layer.msg('图片上传成功');
            successCallBack(res.data.picPath, res)
        }else{
            layer.msg(res.status, {icon: 5, time: 2000 });
            failCallBack(res)
        }
        layer.closeAll('loading');
    })
}
function _base64ToBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}