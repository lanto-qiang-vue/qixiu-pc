<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<script src="${btx}/js/front/login.js"></script>
</head>
<body>
	<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
	<div class="huangyin">
		<div class="zd">会员注册/登录</div>
		<div class="huiyuan">
			<div class="zhuce" style="display: block;">
				<div>
					<span>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机</span> <input
						type="text" id="TELPHONE" value="建议使用常用手机"
						onfocus="if(value==defaultValue){value='';this.style.color='#000'}"
						onblur="if(!value){value=defaultValue;this.style.color='#CCC'}">
				</div>
				<div>
					<span>验&nbsp;&nbsp;证&nbsp;&nbsp;码</span> <input type="text"
						 id="VALIDCODE" value="输入图形验证码" maxlength="4"
						onfocus="if(value==defaultValue){value='';this.style.color='#000'}"
						onblur="if(!value){value=defaultValue;this.style.color='#CCC'}"
						style="width: 90px;"><span><img class="code_img"
						style="width: 72px;margin-top: -5px;"></span>
					<input type="hidden" id="cid">
				</div>
				<div>
					<span>验&nbsp;&nbsp;证&nbsp;&nbsp;码</span> <input type="text"
						id="RANDCODE" value="输入短信验证码"
						onfocus="if(value==defaultValue){value='';this.style.color='#000'}"
						onblur="if(!value){value=defaultValue;this.style.color='#CCC'}"
						style="width: 90px;"> <span><a
						href="javascript:void(0);" id="getRandCodeBtn">获取验证码</a></span>
				</div>
				<div>
					<span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</span> <input
						type="password" id="PASSWORD" value="请输入密码"
						onfocus="if(value==defaultValue){value='';this.style.color='#000'}"
						onblur="if(!value){value=defaultValue;this.style.color='#CCC'}">
				</div>
				<div>
					<span>确认密码</span> <input type="password" id="PASSWORD_"
						value="请输入确认密码"
						onfocus="if(value==defaultValue){value='';this.style.color='#000'}"
						onblur="if(!value){value=defaultValue;this.style.color='#CCC'}">
				</div>

				<%--<form class="layui-form layui-form-pane" style="width: 300px;margin: auto">--%>
				<%--<div class="layui-form-item" pane="" style="margin-top: 25px;border: 0;">--%>
					<%--<label class="layui-form-label"--%>
					       <%--style="padding: 8px 0px; width: 70px;border: 1px solid #e6e6e6;">注册类别</label>--%>
					<%--<div class="layui-input-block" style="margin-left: 70px;">--%>
						<%--<select name="userType" lay-verify="" id="USERTYPE">--%>
							<%--<option value="1" selected>车主注册</option>--%>
							<%--<option value="2" >企业注册</option>--%>
							<%--<option value="3" >管理注册</option>--%>
						<%--</select>--%>
					<%--</div>--%>
				<%--</div>--%>
				<%--</form>--%>

				<div class="ljzc" id="doRegisterbtn">
					<button class="layui-btn layui-btn-big layui-btn-normal"
						id="doRegisterbtn" style="width: 300px;">立即注册</button>
				</div>
			</div>
			<div class="zhuce_in">
				<a href="${ctx}/toRegister"><p class="p01">注册</p></a> <a
					href="${ctx}/toLogin"><p class="p02">登录</p></a>
			</div>
		</div>
	</div>
	<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
</html>
