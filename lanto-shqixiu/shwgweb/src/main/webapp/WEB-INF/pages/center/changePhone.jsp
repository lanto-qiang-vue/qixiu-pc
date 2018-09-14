<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
</head>
<body>
	<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
	<div class="Government archives">
		<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
		<div class="zhengwu_r">
			<div class="zhengwu_t">
				<span class="sp_zw">更换手机号码</span> <span class="sp_wz">您所在位置：<a
					href="${ctx}/center/userInfo">车主中心</a> > <span>更换手机号码</span></span>
			</div>
			<div class="user-info">
				<div class="layui-form layui-form-pane" id="passForm">
					<div class="layui-form-item">
						<label class="layui-form-label">原手机号码</label>
						<div class="layui-input-inline userid" style="padding:10px;border: 1px dashed #e6e6e6;">
						</div>
						<!--  <div class="layui-form-mid layui-word-aux">请填写6到12位密码</div>-->
					</div>

					<div class="layui-form-item">
						<label class="layui-form-label">图形验证码</label>
						<div class="layui-input-inline">
							<input type="text" name="VALIDCODE" id="VALIDCODE" lay-verify="VALIDCODE" maxlength="4" placeholder="请输入图形验证码" autocomplete="off" class="layui-input">
						</div>
						<img class="code_img"style="width: 74px;"><input type="hidden" id="cid">
					</div>

					<div class="layui-form-item">
						<label class="layui-form-label">新手机号码</label>
						<div class="layui-input-inline">
							<input type="text" name="newTelphone" id="newTelphone" lay-verify="phone" placeholder="请输入新手机号码" autocomplete="off" class="layui-input">
						</div>
						<a class="layui-btn layui-btn-normal"  id="getrandcodebtn">获取验证码</a>
					</div>
					
					<div class="layui-form-item">
						<label class="layui-form-label">手机验证码</label>
						<div class="layui-input-inline">
							<input type="text" name="randCode" lay-verify="required" placeholder="请输入验证码" autocomplete="off" class="layui-input randCode">
						</div>
					</div>
					
					<div class="layui-form-item">
						<label class="layui-form-label">登录密码</label>
						<div class="layui-input-inline">
							<input type="password" name="userPass" lay-verify="pass" placeholder="请输入密码" autocomplete="new-password" class="layui-input password">
						</div>
						<div class="layui-form-mid layui-word-aux">请填写6到18位密码</div>
					</div>
					
					<div class="layui-form-item">
					    <div class="layui-input-block">
					      <button class="layui-btn layui-btn-normal" lay-filter="changePhoneSubmit" id="submitBtn"><i class="layui-icon">&#xe642;</i> 确认修改</button>
					    </div>
					  </div>
				</div>
			</div>
		</div>
	</div>
	<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
    $(function () {
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

        var userinfo = JSON.parse(localStorage.getItem('USERINFO'))
        $('.userid').text(userinfo.telphone)
		$('.randCode').val("")
		$('.password').val("")
    })


  $("#getrandcodebtn").click(function(){

      var validcode = $('#VALIDCODE').val();

      if(validcode.length!=4){
          layer.msg('请输入图形验证码！', {time: 5000, icon:5});
          return ;
      }

      //校验图形验证码

	  var newTelphone = $("#newTelphone").val();
	  if(!newTelphone || newTelphone == ""){
		  console.log(1111);
		  layer.msg('请输入新手机号码');
		  return ;
	  }
	  var systemToken = ""
	  var getSysT = {
		  "device": "PC",
		  "password": "k5pg8kkN",
		  "username": "pcqixiu"
	  }
	  accessPost(baseu + '/system/terminalsystem/login', JSON.stringify(getSysT), function (res) {
		  handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
		  console.log('res',res)
		  if(res.code=='000000'){
			  systemToken =  res.data.systemToken;
			  console.log('systemToken',systemToken)
		  }
		  var param = {
			  systemToken:systemToken,
			  businessType: "03",
			  mobile: $('#newTelphone').val(),
              cid:$("#cid").val(),
              code:validcode
		  }
		  console.log('param',param)
//               accessPost(baseu + '/message/sms/sendsmscaptcha-whenmobilenotexist', JSON.stringify(param), function (res) {
		  accessPost(baseu + '/message/sms/sendsmscaptcha', JSON.stringify(param), function (res) {
			  handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
			  console.log('res',res)
              if( res.code == '000000' ) {
                  layer.msg('短信验证码发送成功', {time: 2000, icon:1});
              }else {
				  layer.msg(res.status);
			  }

		  })

	  })



	 });
    $("#submitBtn").click(function(){
        var userInfo = JSON.parse(localStorage.getItem('USERINFO'))
        var newTelphone = $("#newTelphone").val();
        var randCode = $(".randCode").val();
        var userPass = $(".password").val();
        if(!newTelphone || newTelphone == ""){
            console.log(1111);
            layer.msg('请输入新手机号码');
            return ;
        }
        if(!randCode || randCode == ""){
            layer.msg('请输入验证码');
            return ;
        }
        if(!userPass || userPass == ""){
            layer.msg('请输入原始密码');
            return ;
        }
            var param = {
                accessToken: localStorage.getItem("ACCESSTOKEN"),
                newTelphone: newTelphone,
                randCode: randCode,
                userPass: userPass,
                userId:userInfo && userInfo.userId
            }
            console.log('param111111',param)
            accessPost(baseu + '/user/telPhone/changeTelPhone', JSON.stringify(param), function (res) {
                handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                console.log('res',res)
                if(res.code == '1300215'){
                    layer.msg('修改手机号码成功,将自动跳转到登录页面，请用新手机号重新登录');
                    setTimeout(function () {
                        window.location.href = '${ctx}/toLogin';
                    }, 2000)


                }else {
                    layer.msg(res.status);
                }

            })

	})

</script>
</html>
