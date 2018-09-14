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
			<span class="sp_zw">修改密码</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/userInfo">车主中心</a> > <span>修改密码</span></span>
		</div>
		<div class="user-info">
			<div class="layui-form layui-form-pane" id="passForm">
				<%--<div class="layui-form-item">--%>
				<%--<label class="layui-form-label">用户帐号</label>--%>
				<%--<div class="layui-input-inline" style="padding:10px;border: 1px dashed #e6e6e6;">--%>
				<%--${loginInfo.userCode }--%>
				<%--</div>--%>
				<%--<!--  <div class="layui-form-mid layui-word-aux">请填写6到12位密码</div>-->--%>
				<%--</div>--%>

				<div class="layui-form-item">
					<label class="layui-form-label">旧密码</label>
					<div class="layui-input-inline">
						<input type="password" name="oldPass" id="textOldPass" lay-verify="required" placeholder="请输入旧密码" autocomplete="off" class="layui-input">
					</div>
				</div>

				<div class="layui-form-item">
					<label class="layui-form-label">新密码</label>
					<div class="layui-input-inline">
						<input type="password" name="newPass" id="textNewPass" lay-verify="pass" placeholder="请输入新密码" autocomplete="off" class="layui-input">
					</div>
					<div class="layui-form-mid layui-word-aux">请填写8到18位密码</div>
				</div>

				<div class="layui-form-item">
					<label class="layui-form-label">确认新密码</label>
					<div class="layui-input-inline">
						<input type="password" name="cofPass" id="textCofPass" lay-verify="pass" placeholder="请输入确认新密码" autocomplete="off" class="layui-input">
					</div>
					<div class="layui-form-mid layui-word-aux">请填写6到18位密码</div>
				</div>

				<div class="layui-form-item">
					<div class="layui-input-block">
						<button class="layui-btn layui-btn-normal" lay-filter="" onclick="updatePass()"><i class="layui-icon">&#xe642;</i> 确认修改</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
    function updatePass() {
        console.log("11=========")
        var textOldPass= $("#textOldPass").val();
        if(!textOldPass){
            layer.alert("请输入旧密码", {
                time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
            });
            return
        }
        var textNewPass= $("#textNewPass").val();
        var textCofPass= $("#textCofPass").val();
        if(!textNewPass ){
            layer.alert("新密码不能为空", {
                time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
            });
            return
        }
        if(!textCofPass ){
            layer.alert("确认新密码不能为空", {
                time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
            });
            return
        }
        var numasc = 0;
        var charasc = 0;
        var otherasc = 0;
        if(0==textNewPass.length){
            layer.alert("新密码不能为空", {
                time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
            });
            return
        }else if(textNewPass.length<6||textNewPass.length>18){
            layer.alert("密码至少6个字符,最多18个字符", {
                time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
            });
            return
        }else{
            for (var i = 0; i < textNewPass.length; i++) {
                var asciiNumber = textNewPass.substr(i, 1).charCodeAt();
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
//                layer.alert("密码必须含有特殊字符", {
//                    time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
//                });
//                return
            }
        }
        var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            oldpassword: $("#textOldPass").val(),
            newpassword:$("#textNewPass").val(),
            confirmpassword:$("#textCofPass").val(),
        };
        accessPost(baseu+ '/user/password/changeForget', JSON.stringify(param), function (res) {
            console.log(res)
            if(res.status == "用户密码修改成功"){
                layer.msg('用户密码修改成功!');
                var token= localStorage.getItem('ACCESSTOKEN')
                simpleGet(baseu+ '/user/useraccount/logout/'+ token, function(res){
                    localStorage.removeItem('ACCESSTOKEN')
                    localStorage.removeItem('USERINFO')
                    window.location.href = ctx + "/toLogin";
                })
            }
            if(res.status == "请输出正确的原始密码"){
                layer.msg('请输出正确的原始密码!');
            }
            if(res.status == "请检查两次密码是否相等"){
                layer.msg('请检查两次密码是否相等!');
            }
            if(res.status == "用户密码不能为空且长度必须处于6-18位之间"){
                layer.msg('用户密码不能为空且长度必须处于6-18位之间!');
            }
        })
    }
    //layui.use('upload', function(){
    <%--layui.upload({--%>
    <%--url: '${ctx}/center/upload.do',--%>
    <%--success: function(res,inp){ //上传成功后的回调--%>
    <%--console.log(res);--%>
    <%--if(res.success){--%>
    <%--layer.msg('上传成功!');--%>
    <%--$("#userpicture").attr('src',"/attach/" + res.data);--%>
    <%--}else{--%>
    <%--layer.msg('上传失败！', {time: 3000, icon:5});--%>
    <%--}--%>
    <%--}--%>
    <%--});--%>

    //自定义验证规则
    <%--layui.form().verify({--%>
    <%--pass: [/(.+){6,18}$/, '密码必须6到18位']--%>
    <%--});--%>
    <%----%>
    <%--layui.form().on('submit(userpasssubmit)', function(data){--%>
    <%--var params = data.field;--%>
    <%--if(params.newPass == params.oldPass){--%>
    <%--layer.msg('新密码与旧密码不能一致！', {time: 2000, icon:5});--%>
    <%--return false;--%>
    <%--}--%>
    <%--if(params.newPass != params.cofPass){--%>
    <%--layer.msg('新密码与确认密码不一致！', {time: 2000, icon:5});--%>
    <%--return false;--%>
    <%--}--%>
    <%--layer.confirm('确认要修改吗？', {--%>
    <%--icon:3,--%>
    <%--btn : ['确定', '取消']--%>
    <%--}, function() {--%>
    <%--ajaxLoading("${ctx}/center/submitPass.do",data.field,$("#submitBtn"),'正在修改中...',function(ret){--%>
    <%--layer.msg('修改成功!', {--%>
    <%--icon: 1,--%>
    <%--time: 1500 //1.5秒关闭（如果不配置，默认是3秒）--%>
    <%--}, function(){--%>
    <%--window.location.reload();--%>
    <%--}); --%>
    <%--});--%>
    <%--});--%>
    <%--return false;--%>
    <%--});--%>
    //});
</script>
</html>
