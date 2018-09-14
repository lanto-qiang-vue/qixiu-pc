// JavaScript Document


$(function(){

    $.ajax({
        url : baseu+'/message/image/getimagecaptcha',
        type : "get",
        dataType:"json",
        headers: headers,
        contentType:"application/json",
        success : function(e) {
            var param = e.data.image;
            $(".code_img").attr("src",param);
            var cid = e.data.imageToken;
            $("#cid").val(cid);
        },
        error: function () {
            layer.msg('系统繁忙！', {time: 2000, icon:5});
        }
    })

    //换验证码3
    $(".code_img").click(function(){
        $.ajax({
            url : baseu+'/message/image/getimagecaptcha',
            type : "get",
            dataType:"json",
            headers: headers,
            contentType:"application/json",
            success : function(e) {
                var param = e.data.image;
                $(".code_img").attr("src",param);
                var cid = e.data.imageToken;
                $("#cid").val(cid);
            },
            error: function () {
                layer.msg('系统繁忙！', {time: 2000, icon:5});
            }
        })
    });

    var systemToken = ''
    var getSysT = {
        "device": "PC",
        "password": "k5pg8kkN",
        "username": "pcqixiu"
    }
    accessPost(baseu + '/system/terminalsystem/login', JSON.stringify(getSysT), function (res) {
        console.log("systemToken", res.data.systemToken);
    	if(res.code=='000000'){
            systemToken =  res.data.systemToken;
        }
    })
	$('#doSubmitbtn').click(function(){
		// doRegister($(this));
        doChangePwd(systemToken);
	});
	
//	$('#doLoginbtn').click(function(){
//		doLogin($(this));
//	});
	
	$('#getRandCodeBtn').click(function(){
		getRandCode(systemToken);
	});
	
});

function doChangePwd(systemToken) {
    var mobile = $('#TELPHONE').val();
    var randCode = $('#RANDCODE').val();
	var pwd = $('#PASSWORD').val();
	var confirmPwd = $('#PASSWORD_').val();

    if(mobile == ''){
        layer.msg('请输入手机号码！', {time: 3000, icon:5});
        return ;
    }
    if( !/^1[3,4,5,7,8][0-9]{9}$/.test(mobile) ){
        layer.msg('手机号码格式不正确！', {time: 3000, icon:5});
        return;
    }
    if(randCode == RANDCODE.defaultValue){
        layer.msg('请输入验证码！', {time: 3000, icon:5});
        return ;
    }
    if(pwd == ''){
        layer.msg('请输入密码！', {time: 3000, icon:5});
        return ;
    }
    var numasc = 0;
    var charasc = 0;
    var otherasc = 0;
    if(0==pwd.length){
        layer.alert("新密码不能为空", {
            time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
        });
        return
    }else if(pwd.length<6||pwd.length>18){
        layer.alert("密码至少6个字符,最多18个字符", {
            time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
        });
        return
    }else{
        for (var i = 0; i < pwd.length; i++) {
            var asciiNumber = pwd.substr(i, 1).charCodeAt();
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
            layer.alert("密码必须含有特殊字符", {
                time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
            });
            return
        }
    }
    if(confirmPwd == ''){
        layer.msg('请输入确认密码！', {time: 3000, icon:5});
        return ;
    }
    if (pwd != confirmPwd) {
        layer.msg('两次输入的密码不一致！', {time: 3000, icon:5});
        return ;
    }
    var load = layer.load();
	var params = {
        systemToken: systemToken,
        telphone : mobile.trim(),
        newpassword : pwd.trim(),
        randCode : randCode
	}
    accessPost(baseu + '/submitForget',JSON.stringify(params), function (res) {
        if(res.code=='000000'){
            layer.msg('密码修改成功,将自动跳转到登录页面',{time: 2000, icon:1});
            setTimeout(function () {
                window.location.href = ctx + '/toLogin';
            }, 2000)
        }else if(res.code !='' && res.code != null){
            layer.msg(res.status);
        } else {
            layer.msg("密码修改失败！",{time: 5000, icon:5});
		}
        layer.closeAll('loading');
    })

}
function doRegister(obj){
	var password = $('#PASSWORD').val();
//	var password_ = $('#PASSWORD_').val();
	var telPhone = $('#TELPHONE').val();
	var randCode = $('#RANDCODE').val();
	
	if(telPhone == TELPHONE.defaultValue){
		layer.msg('请输入手机号码！', {time: 3000, icon:5});
		return ;
	}
	if( !/^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/.test(telPhone) ){
		layer.msg('手机号码格式不正确！', {time: 3000, icon:5});
		return;
	}
	// if(randCode == RANDCODE.defaultValue){
	// 	layer.msg('请输入验证码！', {time: 3000, icon:5});
	// 	return ;
	// }
	if(password == PASSWORD.defaultValue){
		layer.msg('请输入密码！', {time: 3000, icon:5});
		return ;
	}

//	if(password_ == PASSWORD_.defaultValue){
//		layer.msg('请输入确认密码！', {time: 3000, icon:5});
//		return ;
//	}
//	if(password != password_){
//		layer.msg('密码和确认密码不一致！', {time: 3000, icon:5});
//		return ;
//	}
	
	var params = {
		password:password,
		telphone:telPhone,
		randCode:randCode
	};
	var url = ctx + '/submitForget.do';
	ajaxLoading(url,params,obj,'正在提交中...',function(ret){
		layer.msg('修改成功!', {
		  icon: 1,
		  time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
		}, function(){
			window.location.href = ctx + "/toLogin";
		}); 
	});
	
}



function getRandCode(systemToken) {
	// if(count > 0){
	// 	 return;
	//  }
	//  if(ajaxTag > 0){
	// 	 return;
	//  }
	//  ajaxTag = 5;
	//  setTimeout(function(){
	// 	 ajaxTag = 0;
	//  },3000);
	var telPhone = $('#TELPHONE').val();
	
	if(telPhone == ''){
		layer.msg('请输入手机号码！', {time: 2000, icon:5});
		return ;
	}
    if( !/^1[3,4,5,7,8][0-9]{9}$/.test(telPhone) ){
		layer.msg('手机号码格式不正确！', {time: 3000, icon:5});
		return;
	}

    var validcode = $('#VALIDCODE').val();

    if(validcode.length!=4){
        layer.msg('请输入图形验证码！', {time: 5000, icon:5});
        return ;
    }

    //校验图形验证码

    var param = {
        systemToken:systemToken,
        businessType: "02",
        mobile:telPhone,
        cid:$("#cid").val(),
        code:validcode
    };
    console.log("获取验证码参数",param);
    // var url = ctx + '/getForgetRandCode.do';
    // ajaxEvent(url,params,function(ret){
    // 	count = 60;
    // 	timmer = setInterval("clock();", 1000);
    // });
    accessPost(baseu + '/message/sms/sendsmscaptcha',JSON.stringify(param), function (res) {
        console.log("获取验证码：",res)
        if( res.code == '000000' ) {
            layer.msg('短信验证码发送成功', {time: 2000, icon:1});
        }else {
            layer.msg(res.status);
        }

        layer.closeAll('loading');
    })


}




var ajaxTag = 0;
var count = 0;
var timmer;
function clock() {
	if (count > 0) {
		$('#getRandCodeBtn').html("获取验证码(" + count + ")");
		$('#getRandCodeBtn').css("color","#777");
	} else {
		$('#getRandCodeBtn').html("获取验证码");
		$('#getRandCodeBtn').css("color","#333");
		window.clearInterval(timmer);
	}
	count--;
}





















