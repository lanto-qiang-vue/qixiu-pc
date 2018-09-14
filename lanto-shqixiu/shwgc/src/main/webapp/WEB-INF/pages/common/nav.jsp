<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<span id="check_is_login" style="display:none;">${loginFlag }</span>
<span id="reUrl" style="display:none;">${reUrl }</span>
<span id="memberUri" style="display:none;">${memberUri}</span>
<!--top-->
<c:choose>
	<c:when test="${loginFlag == 1 }">
		<div class="logo">
			<div class="logo_in">
		        <div class="wdcx">
		            <div class="car_t"><img src="${btx}/images/mycar.png" width="63" alt="33"></div>
		            <c:choose>
	        			<c:when test="${selectvehicle == null }">
	        				<span class="car_x">请选择您的车辆</span>
	        				<span id="changeVehTypeBtn">选择车辆</span>
	        			</c:when>
	        			<c:otherwise>
	        				<span class="car_x">${selectvehicle.plateNum }（${selectvehicle.vehicleBrand } ${selectvehicle.vehicleType } ${selectvehicle.vehicleCapacity } ${selectvehicle.productionYear }${(selectvehicle.productionYear != null && selectvehicle.productionYear != '' )?'年产':'' }）</span>
		            		<span id="changeVehTypeBtn">更换车辆</span>
	        			</c:otherwise>
	        		</c:choose>
		        </div>
		        <div class="grzx">
		            <span>欢迎您，<span id="nickName"></span></span>
		            <span><a href="${ctx}/center/userInfo">个人中心</a></span>
		            <span id = "logooutBtn">注销</span>
		        </div>
		
		    </div>
		</div>
	</c:when>
	<c:otherwise>
		<div class="logo2">
			<div class="logo_in">
		        <div class="xzcx">
		        	<form class="layui-form" id="indexLoginForm">
		                <p>您好，欢迎光临本站！</p>
		                <span><a href="${ctx}/toLogin">请登录</a><!--<button lay-submit="" lay-filter="indexLoginSubmit" class="loginbtn">请登录</button>-->&nbsp;&nbsp; | &nbsp;&nbsp;<a href="${ctx}/toRegister">快速注册</a></span>
		         	</form>
		        </div>
		        <div class="p">
		        	<input type="text" value="输入关键词查询" />
		        	<span>信息查询</span>
		        </div>
		    </div>
		</div>
	</c:otherwise>
</c:choose>

<div class="cbdw">
    <div class="cbdw_in">
    	<div class="lgbf">
    		<a href="${ctx}/index">
	        <div class="h1">
	            <img src="${btx}/images/logo1.png" alt="" />
	            <p>
	                <span class="logo_title_span">上海市机动车维修公共服务网</span>
	                <span class="logo_en_title_span">Shanghai Automobile Maintenance public Service  Website</span>
	            </p>
	        </div>
        	</a>
        	<div class="appdl">
            	<span class="app">手机APP下载</span>
            	<span class="vx">关注微信公众号</span>
        	</div>
        	<!-- 手机app与微信公众号的屏蔽 -->
        	<!--  <div id="app_in" class="span" style='display: none;'></div> -->
        	 <div id="vx_in" class="span" style='display: none;'></div> 
    	</div>
        
        <div class="danwei">
	    	<div class="z_in">上海市城市交通运输管理处</div>
	        <div class="z_in">上海市汽车维修行业协会</div>
	        <div class="z_in">上海蓝速汽车技术有限公司</div>
	        <div class="z_in">服务热线：<span>400-663-8210</span></div>
    	</div>
    </div>
</div>

<div class="nav_top">
	<div class="nav_in_top">
    	<ul class="nav_ul">
    		<li class="${nav_menu_index == 1?'dangqiande':'' }"><a href="${ctx}/index">首页</a></li>
    		<li class="${nav_menu_index == 2?'dangqiande':'' }"><a href="${ctx}/government/10281001">公共管理</a></li>
    		<li class="${nav_menu_index == 3?'dangqiande':'' }"><a href="${ctx}/archives">电子健康档案</a></li>
    		<li class="${nav_menu_index == 4?'dangqiande':'' }">
    			<a href="javascript:void(0);">公众监督</a>
    			<ul class="sub_nav" style="display:none;">
					<li><a href="${ctx}/supervision/questions">满意度调查</a></li>
					<li><a href="${ctx}/supervision/complain">投诉举报</a></li>
				</ul>
    		</li>
    		<li class="${nav_menu_index == 5?'dangqiande':'' }"><a href="${ctx}/assoinfo/summary">行业治理</a></li>
    		<li class="${nav_menu_index == 6?'dangqiande':'' }">
    			<a href="javascript:void(0);">公共服务</a>
    			<ul class="sub_nav" style="display:none;">
					<li><a href="${ctx}/maintain?flag=check">综合检测站</a></li>
					<li><a href="${ctx}/cdf">车大夫</a></li>
					<li><a href="${ctx}/maintain?flag=xny">新能源汽车维修</a></li>
					<li><a href="${ctx}/maintain?flag=qcjy">救援服务</a></li>
					<li><a href="${ctx}/maintain?flag=wyc">危险品运输车辆维修</a></li>
					<li><a href="${ctx}/center/apply">开业申请</a></li>
				</ul>
    		</li>
    		<li class="${nav_menu_index == 7?'dangqiande':'' }">
    			<a href="javascript:void(0);">在线商务</a>
    			<ul class="sub_nav" style="display:none;">
					<li><a href="javascript:void(0);">汽车后市场</a></li>
					<li><a href="javascript:void(0);">保险服务</a></li>
					<li><a href="javascript:void(0);">维修备件</a></li>
					<li><a href="javascript:void(0);">合作伙伴(广告)</a></li>
				</ul>
    		</li>
    		<li class="${nav_menu_index == 8?'dangqiande':'' }"><a href="${ctx}/aboutUs">关于我们</a></li>
    	</ul>
    </div>
</div>
<div class="clear"></div>
<script type="text/javascript">
    $(function () {
        var userInfo = JSON.parse(sessionStorage.getItem('USERINFO'));
        if (userInfo && userInfo.nickname) {
            $('#nickName').text(userInfo.nickname);
        } else {
            $('#nickName').text("");
		}
    })
</script>