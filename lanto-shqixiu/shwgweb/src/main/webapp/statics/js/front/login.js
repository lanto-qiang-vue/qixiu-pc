// JavaScript Document

var login_is_remeber = "c_i_r";
var login_rember = "c_r";
var cid=''
var openid=''
var loginMethod=''

$(function(){
	console.log(getUrlParam('reUrl')?(getUrlParam('reUrl').split('reUrl=')[1]||getUrlParam('reUrl')):'')
	// if(getUrlParam('type')=='register'){
     //    $(".huiyuan .zhuce").show();
     //    $(".huiyuan .dianlu").hide();
	// }

    $(".zhuce_in .p01").click(function(e) {
		$("#TELPHONE").val("")
		$("#VALIDCODE").val("")
		$("#RANDCODE").val("")
		$("#PASSWORD").val("")
		$("#PASSWORD_").val("")
        $(".huiyuan .zhuce").show();
        $(".huiyuan .dianlu").hide();
        $(".reg").show()
		$(".zd").text("验证码登录")
    });

    $(".zhuce_in .p02").click(function(e) {
        $(".huiyuan .zhuce").hide();
        $(".huiyuan .dianlu").show();
        $(".reg").hide()
        $(".zd").text("密码登录")
    });


    getimagecaptcha()

	//换验证码3
    $(".code_img").click(function(){
        getimagecaptcha()
    });

	$('#doRegisterbtn').click(function(){
		doRegister($(this));
	});

//	$('#doLoginbtn').click(function(){
//		doLogin($(this));
//	});

	$('#getRandCodeBtn').click(function(){
		getRandCode('#TELPHONE');
	});

    $('#form .checkcode-btn').click(function(){
        getRandCode('#form .username');
    });

	layui.use('form', function(){
		  var form = layui.form;
        form.verify({
		    pass: [/(.+){6,18}$/, '密码必须6到18位']
		  });

        form.on('submit(loginSubmit)', function(data){
			  	var params = data.field;
//			  	if(!/^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/.test(params.telphone) ){
//					layer.msg('手机号码格式不正确！', {time: 5000, icon:5});
//					return false;
//				}

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


              //
              simplePost(baseu+'/system/terminalsystem/login',JSON.stringify(param),function(res){
                  params.systemToken = res.data.systemToken

                  //登录
                  simplePost(baseu+"/user/useraccount/login", JSON.stringify(params), function (res) {
						if(res.code=='000000'){
							var userinfo= res.data
                            userinfo.showRole= res.data.userRoleId
                            localStorage.setItem("ACCESSTOKEN",res.data.accessToken)
                            localStorage.setItem('USERINFO',JSON.stringify(userinfo))
                            var reUrl =getUrlParam('reUrl')?(getUrlParam('reUrl').split('reUrl=')[1]||getUrlParam('reUrl')):'/index';
                            window.location.href = ctx + "/loginSuccess?reUrl=" + reUrl;
						}else{
                            layer.msg(res.status, {time: 2000, icon:5});
						}


                  })

              });


			  	// var url = ctx + '/login.do';
				// ajaxLoading(url,params,$('#doLoginbtn'),'正在登录中...',function(ret){
				// 	var reUrl = $("#reUrl").html();
				// 	window.location.href = ctx + "/loginSuccess?reUrl=" + reUrl;
				// });
			    return false;
		  });
		  form.on('checkbox(checkTest)', function(data){
		    //layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
		  	 if(this.checked){
		  	 	setCookie(login_is_remeber,"1",365);
		  	 }else{
		  	 	setCookie(login_is_remeber,"0",365);
		  	 }
		  });
		  var isRember = getCookieValue(login_is_remeber);
		  if(isRember){
		  	if(isRember == '1'){
		  		$(":checkbox[name=rember]").attr("checked",true);
		  	}else{
		  		$(":checkbox[name=rember]").attr("checked",false);
		  	}
		  }

		form.render();
	});

	var reUrl = $("#reUrl").html();
	if(reUrl != null && reUrl != ''){
		layer.msg('请登录！');
	}

    $("#showform").click(function () {
        layer.open({
            type: 1,
            content: $('#form'),
            title: "绑定手机号",
            area: ['400px', '600px'],
            cancel: function () {
                $("#form").hide()
            }
        });
    })
	
	$(".registersumbit").click(function () {
        systemCall(function (systok) {
        	var params={
                captcha: $(".sms-code").val(),
                loginMethod: 'code',
                systemToken: systok,
                usertel: $(".username").val()
			}
            simplePost(baseu+"/user/useraccount/register/login", JSON.stringify(params), function (res) {
				console.log(res)
                if(res.code=='000000'){
                    var userinfo= res.data
                    userinfo.showRole= res.data.userRoleId
                    localStorage.setItem("ACCESSTOKEN",res.data.accessToken)
                    localStorage.setItem('USERINFO',JSON.stringify(userinfo))
                    var reUrl = getUrlParam('reUrl')?(getUrlParam('reUrl').split('reUrl=')[1]||getUrlParam('reUrl')):'/index'
                    window.location.href = ctx + "/loginSuccess?reUrl=" + reUrl;
                }else{
                    layer.msg(res.status, {time: 2000, icon:5});
                }
			})
        })
    })

	$(".openidBind").click(function () {
		var tel= $("#form .username").val(), randCode= $(".openid-sms-code").val();
        if(!tel){
            layer.msg('请输入手机号码！', {time: 2000, icon:5});
            return ;
        }
        if( !/^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/.test(tel) ){
            layer.msg('手机号码格式不正确！', {time: 2000, icon:5});
            return;
        }
        if(!randCode){
            layer.msg('请输入验证码！', {time: 2000, icon:5});
            return ;
        }

        systemCall(function (systok) {
            var params = {
                loginMethod: loginMethod,
                account: openid,
                usertel: tel,
                captcha: randCode,
                systemToken: systok
            }
            simplePost(baseu+"/user/useraccount/register/login", JSON.stringify(params), function (res) {
                if(res.code=='000000'){
                    var userinfo= res.data
                    userinfo.showRole= res.data.userRoleId
                    localStorage.setItem("ACCESSTOKEN",res.data.accessToken)
                    localStorage.setItem('USERINFO',JSON.stringify(userinfo))
                    var reUrl = getUrlParam('reUrl')?(getUrlParam('reUrl').split('reUrl=')[1]||getUrlParam('reUrl')):'/index'
                    window.location.href = ctx + "/loginSuccess?reUrl=" + reUrl;
                }else{
                    layer.msg(res.status, {time: 2000, icon:5});
                }
            })
        })
    })
	
	//联合登录
	console.log(encodeURIComponent(location.origin))
	$('.unitelogin .qq').click(function () {
		location.href='https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101467137&redirect_uri='+ encodeURIComponent(location.origin)+'%2FtoLogin&state=qq'
    })
    $('.unitelogin .wx').click(function () {
    	location.href='https://open.weixin.qq.com/connect/qrconnect?appid=wx9ae88a5a9e1b4cd1&redirect_uri='+encodeURIComponent(location.origin)+'%2FtoLogin&response_type=code&scope=snsapi_login&state=weixin#wechat_redirect'
	})
    $('.unitelogin .zfb').click(function () {
    	location.href='https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2018042002584289&scope=auth_user&redirect_uri='+encodeURIComponent(location.origin)+'%2FtoLogin&state=ali'
	})

	if(getUrlParam('state')=='qq'){
        loginMethod='qq'
		layer.load()
		systemCall(function (tok) {
			var param={
                systemToken: tok,
                platform: 'QQ',
                redirectUri: encodeURIComponent(location.origin)+'%2FtoLogin',
                state: 'qq',
                code: getUrlParam('code')
			}
            simplePost(baseu+'/user/useraccount/access/openid', JSON.stringify(param), function (res) {
				if(res.code=='000000'){
					console.log(JSON.parse(res.openId.openId).openid)
                    openid = JSON.parse(res.openId.openId).openid
                    openidLogin('qq', openid, tok)
				}else{
                    layer.msg(res.status+'，登录失败', {time: 2000});
				}
                layer.closeAll('loading')
            })
        })
	}else if(getUrlParam('state')=='weixin'){
        loginMethod='wx'
        layer.load()
        systemCall(function (tok) {
            var param={
                systemToken: tok,
                platform: 'WX',
                redirectUri: encodeURIComponent(location.origin)+'%2FtoLogin',
                state: 'wx',
                code: getUrlParam('code'),
                // workOn: 'pDev'
            }
            simplePost(baseu+'/user/useraccount/access/openid', JSON.stringify(param), function (res) {
                if(res.code=='000000'){
                    console.log(res.openId.openId)
                    openid = res.openId.openId
                    openidLogin('wx', openid, tok)
                }else{
                    layer.msg(res.status+'，登录失败', {time: 2000});
                }
                layer.closeAll('loading')
            })
        })
	}else if(getUrlParam('state')=='ali'){
        loginMethod='ali'
        layer.load()
        systemCall(function (tok) {
            var param={
                systemToken: tok,
                platform: 'ALI',
                redirectUri: encodeURIComponent(location.origin)+'%2FtoLogin',
                state: 'ali',
                code: getUrlParam('auth_code'),
                // workOn: 'pDev'
            }
            simplePost(baseu+'/user/useraccount/access/openid', JSON.stringify(param), function (res) {
                if(res.code=='000000'){
                    console.log(res.openId.openId)
                    openid = res.openId.openId
                    openidLogin('ali', openid, tok)
                }else{
                    layer.msg(res.status+'，登录失败', {time: 2000});
                }
                layer.closeAll('loading')
            })
        })
	}

});

function openidLogin(loginMethod,openid, stok) {
    layer.load()
	var param={
        loginMethod: loginMethod,
        account: openid,
        systemToken: stok
	}
    simplePost(baseu + '/user/useraccount/register/login', JSON.stringify(param), function (res) {
		console.log(res)
		if(res.code=='000000'){
            var userinfo= res.data
            userinfo.showRole= res.data.userRoleId
            localStorage.setItem("ACCESSTOKEN",res.data.accessToken)
            localStorage.setItem('USERINFO',JSON.stringify(userinfo))
            window.location.href = '/index'
		}else if(res.code=='141010'){
            layer.open({
                type: 1,
                content: $('#form'),
                title: "绑定手机号",
                area: ['400px', '300px'],
                cancel: function () {
                    $("#form").hide()
                }
            });
		}
		layer.closeAll('loading')
    })
}

function getimagecaptcha() {
    $.ajax({
        url : baseu+'/message/image/getimagecaptcha',
        type : "get",
        dataType:"json",
        headers: headers,
        contentType:"application/json",
        success : function(e) {
            var param = e.data.image;
            $(".code_img").attr("src",param);
            cid = e.data.imageToken;
            $("#cid").val(cid);
        },
        error: function () {
            layer.msg('系统繁忙！', {time: 2000, icon:5});
        }
    })
}

function doLogin(obj){
	var telPhone = $('#telphone2').val();
	var userPass = $('#userpass').val();
	var userType = $('#usertype').val();

	if(telPhone == telphone.defaultValue){
		layer.msg('请输入手机号码！', {time: 5000, icon:5});
		return ;
	}
	if(userPass == userpass.defaultValue){
		layer.msg('请输入密码！', {time: 5000, icon:5});
		return ;
	}

	var params = {
		telphone:telPhone,
		userPass:userPass,
		userType:userType
	};
	var url = ctx + '/login.do';
	ajaxLoading(url,params,obj,'正在登录中...',function(ret){
		var reUrl = getUrlParam('reUrl').split('reUrl=')[1]||getUrlParam('reUrl')
		window.location.href = ctx + "/loginSuccess?reUrl=" + reUrl;
	});

}

function doRegister(obj){
	var password = $('#PASSWORD').val();
	var password_ = $('#PASSWORD_').val();
	var telPhone = $('#TELPHONE').val();
	var randCode = $('#RANDCODE').val();
	var userType= $('#USERTYPE').val();

	if(telPhone == TELPHONE.defaultValue){
		layer.msg('请输入手机号码！', {time: 5000, icon:5});
		return ;
	}
	if( !/^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/.test(telPhone) ){
		layer.msg('手机号码格式不正确！', {time: 5000, icon:5});
		return;
	}
	if(randCode == RANDCODE.defaultValue){
		layer.msg('请输入验证码！', {time: 5000, icon:5});
		return ;
	}
	if(password == PASSWORD.defaultValue){
		layer.msg('请输入密码！', {time: 5000, icon:5});
		return ;
	}
    var numasc = 0;
    var charasc = 0;
    var otherasc = 0;
    if(0==password.length){
        layer.alert("新密码不能为空", {
            time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
        });
        return
    }else if(password.length<6||password.length>18){
        layer.alert("密码至少6个字符,最多18个字符", {
            time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
        });
        return
    }else{
        for (var i = 0; i < password.length; i++) {
            var asciiNumber = password.substr(i, 1).charCodeAt();
            if (asciiNumber >= 48 && asciiNumber <= 57) {
                numasc += 1;
            }
            if ((asciiNumber >= 65 && asciiNumber <= 90)||(asciiNumber >= 97 && asciiNumber <= 122)) {
                charasc += 1;
            }
            if ((asciiNumber >= 33 && asciiNumber <= 47)||(asciiNumber >= 58 && asciiNumber <= 64)||(asciiNumber >= 91 && asciiNumber <= 96)||(asciiNumber >= 123 && asciiNumber <= 126)) {
                otherasc += 1;
            }
        }
        if(0==numasc) {
            layer.alert("密码必须含有数字", {
                time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
            });
            return
        }else if(0==charasc){
            layer.alert("密码必须含有字母", {
                time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
            });
            return
        }else if(0==otherasc){
            // layer.alert("密码必须含有特殊字符", {
            //     time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
            // });
            // return
        }
    }
	if(password_ == PASSWORD_.defaultValue){
		layer.msg('请输入确认密码！', {time: 5000, icon:5});
		return ;
	}
	if(password != password_){
		layer.msg('密码和确认密码不一致！', {time: 5000, icon:5});
		return ;
	}

	var params = {
        userpassword:password,
        usertel:telPhone,
        captcha:randCode
	};
	// var url = ctx + '/register.do';
	// ajaxLoading(url,params,obj,'正在注册中...',function(ret){
	// 	window.location.href = ctx + "/loginSuccess?tag=register";
	// });
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

    $('#getRandCodeBtn').unbind('click');
    //
    simplePost(baseu+'/system/terminalsystem/login',JSON.stringify(param),function(res){
        params.systemToken = res.data.systemToken
        simplePost(baseu+"/user/useraccount/register", JSON.stringify(params), function (res) {
        	if(res.code=='000000'){
                layer.msg('注册成功', {time:3000, icon:1},function () {
					$(".zhuce").hide()
					$(".dianlu").show()
                });
			}else{
                layer.msg(res.status, {time: 5000, icon:5});
			}
            // if(res.code.charAt(res.code.length-1)=='1'){
            //     layer.msg(res.status, {time: 5000, icon:5});
            // }else{
            //     layer.msg('注册成功', {time:3000, icon:1},function () {
            //         window.location.href= ctx + '/toLogin'
            //     });
            //
            // }

        })
    })



}



function getRandCode(telClass) {
	if(count > 0){
		 return;
	 }
	 if(ajaxTag > 0){
		 return;
	 }
	 ajaxTag = 5;
	 setTimeout(function(){
		 ajaxTag = 0;
	 },5000);
	var telPhone = $(telClass).val();


	if(!telPhone ){
		layer.msg('请输入手机号码！', {time: 5000, icon:5});
		return ;
	}


	if(!/^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/.test(telPhone) ){
		layer.msg('手机号码格式不正确！', {time: 2000, icon:5});
		return;
	}

    // var validcode = $('#VALIDCODE').val();

    // if(!validcode){
    //     layer.msg('请输入图形验证码！', {time: 2000, icon:5});
    //     return ;
    // }

    //校验图形验证码

	var uuid= localStorage.getItem('UUID')
	if(!uuid){
		uuid = crandom(32)
		localStorage.setItem('UUID',uuid)
	}

	var params = {
		device:uuid,
		password: 'k5pg8kkN',
		username: 'pcqixiu'
	};

	//发送验证码
	simplePost(baseu+'/system/terminalsystem/login',JSON.stringify(params),function(res){
		var systemToken= res.data.systemToken
		var param={
			systemToken: systemToken,
			mobile: telPhone,
			businessType:'10',
            cid:cid,
            code:''
		}
		// console.log(param)
		simplePost(baseu+'/message/sms/sendsmscaptcha', JSON.stringify(param), function(res){
			if( res.code == '000000' ) {
                layer.msg('短信验证码发送成功', {time: 2000, icon:1});
                count = 60;
                timmer = setInterval(clock, 1000);
			}else if(res.code == '000002' ){
                layer.msg('获取失败，请重试', {time: 2000, icon:5});
                getimagecaptcha()
			}
			else{
                layer.msg(res.status, {time: 2000, icon:5});
			}

		})

	});


	// console.log(params);
	// var url = baseu + '';
	// ajaxEvent(url,params,function(ret){
	// 	count = 60;
	// 	timmer = setInterval("clock();", 1000);
	// });
}




var ajaxTag = 0;
var count = 0;
var timmer;
function clock() {
	if (count > 0) {
		$('.checkcode-btn').html(count);
		$('.checkcode-btn').css({"color":"#777", 'background-color': '#d0d0d0'});

	} else {
		$('.checkcode-btn').html("获取验证码");
		$('.checkcode-btn').css({"color":"white", 'background-color': '#3a9dff'});
        // window.clearInterval(timmer);
        // $('.checkcode-btn').click(function(){
        //     getRandCode(telClass);
        // });
	}
	count--;
}





















