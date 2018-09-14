<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<script src="${btx}/js/front/login.js?time=2018041101"></script>
</head>
<body>
	<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
	<div class="huangyin">
		<div class="zd">验证码登录</div>
		<div class="huiyuan">
			<%--<div class="zhuce" style="text-align: center">--%>
				<%--<div>--%>
					<%--<span>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机</span> <input--%>
						<%--type="text" id="TELPHONE"  placeholder="建议使用常用手机"--%>
						<%-->--%>
				<%--</div>--%>
				<%--<div>--%>
					<%--<span>验&nbsp;&nbsp;证&nbsp;&nbsp;码</span> <input type="text"--%>
						<%--id="VALIDCODE"  maxlength="4" placeholder="输入图形验证码"--%>
						<%--style="width: 90px;"><span><img class="code_img"--%>
						<%--style="width: 72px;margin-top: -5px;"></span>--%>
					<%--<input type="hidden" id="cid">--%>
				<%--</div>--%>
				<%--<div>--%>
					<%--<span>验&nbsp;&nbsp;证&nbsp;&nbsp;码</span> <input type="text"--%>
						<%--id="RANDCODE"  placeholder="输入短信验证码"--%>
						<%--style="width: 90px;"> <span><a--%>
						<%--href="javascript:void(0);" id="getRandCodeBtn">获取验证码</a></span>--%>
				<%--</div>--%>
				<%--<div>--%>
					<%--<span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</span> <input--%>
						<%--type="password" id="PASSWORD"  placeholder="请输入密码"--%>
						<%-->--%>
				<%--</div>--%>
				<%--<div>--%>
					<%--<span>确认密码</span> <input type="password" id="PASSWORD_"--%>
						 <%--placeholder="请确认密码"--%>
						<%-->--%>
				<%--</div>--%>

				<%--&lt;%&ndash;<form class="layui-form layui-form-pane" style="width: 300px;margin: auto">&ndash;%&gt;--%>
					<%--&lt;%&ndash;<div class="layui-form-item" pane="" style="margin-top: 25px;border: 0;">&ndash;%&gt;--%>
						<%--&lt;%&ndash;<label class="layui-form-label"&ndash;%&gt;--%>
						       <%--&lt;%&ndash;style="padding: 8px 0px; width: 70px;border: 1px solid #e6e6e6;">注册类别</label>&ndash;%&gt;--%>
						<%--&lt;%&ndash;<div class="layui-input-block" style="margin-left: 70px;">&ndash;%&gt;--%>
							<%--&lt;%&ndash;<select name="userType" lay-verify="" id="USERTYPE">&ndash;%&gt;--%>
								<%--&lt;%&ndash;<option value="1" selected>车主注册</option>&ndash;%&gt;--%>
								<%--&lt;%&ndash;<option value="2" >企业注册</option>&ndash;%&gt;--%>
								<%--&lt;%&ndash;<option value="3" >管理注册</option>&ndash;%&gt;--%>
							<%--&lt;%&ndash;</select>&ndash;%&gt;--%>
						<%--&lt;%&ndash;</div>&ndash;%&gt;--%>
					<%--&lt;%&ndash;</div>&ndash;%&gt;--%>
				<%--&lt;%&ndash;</form>&ndash;%&gt;--%>

				<%--<input type="radio" name="agreement" value="1"  checked>--%>
				<%--<span>同意<a href="/phone/agreement" target="_blank" style="color: red">《上海汽修平台协议》</a></span>--%>


				<%--<div class="ljzc">--%>
					<%--<button class="layui-btn layui-btn-big layui-btn-normal"--%>
						<%--id="doRegisterbtn" style="width: 300px;">立即注册</button>--%>
				<%--</div>--%>

			<%--</div>--%>

			<div class="lrr-panel reg">
				<div class="form">
					<div class="filed">
						<label class="icon i-user"></label>
						<input type="text" id="TELPHONE" class="is-text username" placeholder="手机号" name="username" >
					</div>
					<div id="verify"></div>
					<%--<div class="filed"><label class="icon i-img"></label>--%>
						<%--<input type="text" id="VALIDCODE" class="is-text img-code" placeholder="图形验证码" maxlength="6" >--%>
						<%--<img class="code_img">--%>
						<%--<input type="hidden" id="cid">--%>
					<%--</div>--%>
					<div class="filed"><label class="icon i-checkcode"></label>
						<input type="text" class="is-text sms-code checkcode-text" placeholder="短信验证码" maxlength="6" >
						<a href="#" class="checkcode-btn" id="getRandCodeBtn">获取验证码</a>
					</div>

					<a class="btn registersumbit" style="margin: 30px 0 20px 0">验证并登录</a>
					<%--<input type="radio" name="agreement" value="1"  checked>--%>
					<p style="font-weight: 400">新用户登录即完成注册，代表同意</p><a href="/phone/agreement" target="_blank" style="color: #1E9FFF">《上海汽修平台用户协议》</a>

				</div>
			</div>

			<div class="dianlu">
				<form class="layui-form layui-form-pane" id="loginForm"
					style="padding: 20px 140px;">
					<div class="layui-form-item" style="margin-top: 20px;">
						<label class="layui-form-label"
							style="background: #F3F3F3 url(${btx}/images/zh.png) no-repeat center center;width: 70px;"></label>
						<div class="layui-input-block" style="margin-left: 70px;">
							<input type="text" name="loginaccount" id="telphone2"
								lay-verify="required" placeholder="请输入帐号" autocomplete="off"
								class="layui-input">
						</div>
					</div>
					<div class="layui-form-item" style="margin-top: 25px;">
						<label class="layui-form-label"
							style="background: #F3F3F3 url(${btx}/images/mm.png) no-repeat center center;width:70px;"></label>
						<div class="layui-input-block" style="margin-left: 70px;">
							<input type="password" name="userpassword" lay-verify="pass"
								placeholder="请输入密码" autocomplete="off" class="layui-input">
						</div>
					</div>

					<%--<div class="layui-form-item" pane="" style="margin-top: 25px;border: 0;">--%>
						<%--<label class="layui-form-label"--%>
							<%--style="padding: 8px 0px; width: 70px;border: 1px solid #e6e6e6;">登录类别</label>--%>
						<%--<div class="layui-input-block" style="margin-left: 70px;">--%>
							<%--<select name="userRoleId" lay-verify="">--%>
								<%--<option value="1" selected>车主登录</option>--%>
								<%--<option value="2" >企业登录</option>--%>
								<%--<option value="3" >管理登录</option>--%>
							<%--</select>--%>
						<%--</div>--%>
					<%--</div>--%>

					<div class="dllb">
						<%--<input type="checkbox" name="rember" title="一周内自动登录" lay-skin="primary" lay-filter="checkTest" checked> --%>
						<a href="${ctx }/forgetPass">忘记密码？</a>
					</div>

					<div class="dllb">
						<button class="layui-btn layui-btn-big layui-btn-normal"
							lay-submit=""
							style="width: 300px; margin-left: 10px; margin-top: 20px;"
							lay-filter="loginSubmit">
							<i class="layui-icon"></i> 登 录
						</button>
					</div>
				</form>
			</div>

			<%--<div class="unitelogin">--%>
				<%--<span>使用其他方式登录：</span>--%>
				<%--<a href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101467137&redirect_uri=http%3A%2F%2Fwww.devsz.shanghaiqixiu.org%3a8080%2FtoLogin&state=qq"><img  src="${btx}/img/qq_logo.png" style="width: 20px"></a>--%>
				<%--<a href="https://open.weixin.qq.com/connect/qrconnect?appid=wx9ae88a5a9e1b4cd1&redirect_uri=https%3A%2F%2Fwww.shanghaiqixiu.org%2FtoLogin&response_type=code&scope=snsapi_login&state=weixin#wechat_redirect"><img src="${btx}/img/wx_logo.png" style="width: 28px"></a>--%>
				<%--<a href="https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2018042002584289&scope=auth_user&redirect_uri=http%3A%2F%2Fwww.devsz.shanghaiqixiu.org%3a8080%2FtoLogin&state=ali" ><img  src="${btx}/img/zhifu_logo.png" style="width: 25px"></a>--%>
			<%--</div>--%>
			<div class="unitelogin">
				<span>使用其他方式登录：</span>
				<img class="qq" src="${btx}/img/qq_logo.png" style="width: 20px">
				<img class="wx" src="${btx}/img/wx_logo.png" style="width: 28px">
				<img class="zfb" src="${btx}/img/zhifu_logo.png" style="width: 25px">
			</div>

			<div class="zhuce_in">
				<p class="p01">验证码登录</p>
				<p class="p02">密码登录</p>
				<%--<p class="p02" id="showform">显示弹窗</p>--%>
			</div>
		</div>
	</div>

	<div id="form" class="lrr-panel bind" style="display: none;width: 100%;height: auto">
		<div class="form">
			<div class="filed">
				<label class="icon i-user"></label>
				<input type="text"  class="is-text username" placeholder="手机号" name="username" >
			</div>
			<div class="filed"><label class="icon i-checkcode"></label>
				<input type="text" class="is-text openid-sms-code checkcode-text" placeholder="短信验证码" maxlength="6" >
				<a href="#" class="checkcode-btn" >获取验证码</a>
			</div>
			<a class="btn openidBind">绑定</a>
		</div>
	</div>
	<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
</html>
