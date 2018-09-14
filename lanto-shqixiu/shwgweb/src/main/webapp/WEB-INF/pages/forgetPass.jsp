<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<script src="${btx}/js/front/forgetPass.js"></script>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="huangyin">
	<div class="zd">忘记密码</div>
    <div class="huiyuan">
    	<div class="zhuce" style="display: block;">
    		<div>
            	<span>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机</span>
                <input type="text" id="TELPHONE" value="输入手机号码" onfocus="if(value==defaultValue){value='';this.style.color='#000'}" onblur="if(!value){value=defaultValue;this.style.color='#CCC'}" >
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
            	<span>验&nbsp;&nbsp;证&nbsp;&nbsp;码</span>
                <input type="text" id="RANDCODE" value="输入短信验证码" onfocus="if(value==defaultValue){value='';this.style.color='#000'}" onblur="if(!value){value=defaultValue;this.style.color='#CCC'}" style="width:90px;">
                <span><a href="javascript:void(0);" id="getRandCodeBtn">获取验证码</a></span>
            </div>
        	<div>
            	<span>新&nbsp;&nbsp;密&nbsp;&nbsp;码</span>
                <input type="password" id="PASSWORD" value="" placeholder="请输入新密码">
            </div>
         	<div>
             	<span>确认密码</span>
                 <input type="password" id="PASSWORD_" value="" placeholder="请再次输入新密码">
             </div>
            <div class="ljzc" ><button class="layui-btn layui-btn-big layui-btn-normal" id="doSubmitbtn" style="width:300px;">修改密码</button>  </div>
	  		 
        </div>
        <div class="zhuce_in">
        	<p class="p01">忘记密码</p>
        </div>
    </div>
</div>

<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
</html>
