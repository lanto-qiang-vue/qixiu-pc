<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<span id="check_is_login" style="display:none;">${loginFlag }</span>
<span id="reUrl" style="display:none;">${reUrl }</span>
<span id="memberUri" style="display:none;">${memberUri}</span>
<link rel="stylesheet" href="${btx}/css/menu.css">
<!--top-->
<%--<c:choose>--%>
<%--<c:when test="${loginFlag == 1 }">--%>
<%--<div class="logo">--%>
<%--<div class="logo_in">--%>
<%--<div class="grzx">--%>
<%--<span>欢迎您，${loginInfo.userName }</span>--%>
<%--<c:choose>--%>
<%--<c:when test="${loginInfo.userType == 0 }">--%>
<%--<span><a href="${ctx}/center/userInfo">个人中心</a></span>--%>
<%--</c:when>--%>
<%--<c:when test="${loginInfo.userType == 1 }">--%>
<%--<span><a href="${ctx}/center/companyHome">企业中心</a></span>--%>
<%--</c:when>--%>
<%--<c:when test="${loginInfo.userType == 2 }">--%>
<%--<span><a href="${ctx}/center/manageHome">管理中心</a></span>--%>
<%--</c:when>--%>
<%--</c:choose>--%>
<%--<span id = "logooutBtn">注销</span>--%>
<%--</div>--%>
<%----%>
<%--</div>--%>
<%--</div>--%>
<%--</c:when>--%>
<%--<c:otherwise>--%>
<%--<div class="logo2">--%>
<%--<div class="logo_in">--%>
<%--<div class="xzcx">--%>
<%--<form class="layui-form" id="indexLoginForm">--%>
<%--<p>您好，欢迎光临本站！</p>--%>
<%--<span><a href="${ctx}/toLogin">请登录</a><!--<button lay-submit="" lay-filter="indexLoginSubmit" class="loginbtn">请登录</button>-->&nbsp;&nbsp; | &nbsp;&nbsp;<a href="${ctx}/toRegister">快速注册</a></span>--%>
<%--</form>--%>
<%--</div>--%>
<%--</div>--%>
<%--</div>--%>
<%--</c:otherwise>--%>
<%--</c:choose>--%>
<div class="top center">
    <a class="title" href="/index">
        <img src="${btx}/img/logo.png"/>
        <div style="text-align: left;">
            <h1 style="font-size: 32px">上海市机动车维修公共服务平台</h1>
            <span style="font-size: 16px">Shanghai Automobile Maintenance Public Service Platform</span>
        </div>
    </a>
    <div class="login unLogin" style="font-size: 16px">
        <span style="color: black;">您好，欢迎光临本站！</span><a href="/toLogin">登录</a>|<a href="/toLogin?type=register">注册</a>
    </div>
    <div class="login isLogin" style="display: none;font-size: 16px">
        <span class="nickName" style="color: black;"></span>
        <div class="switch">
            <a href="${ctx}/toLogin" class="loginButton show"></a>
            <a href="/center/repairInfo?role_id=1" class="goOwner">车主中心</a>
        </div>
        |<span onclick="logout()" style="cursor: pointer;margin-left: 10px">注销</span>
    </div>
</div>

<%--<div class="cbdw">--%>
<%--<div class="cbdw_in">--%>
<%--<div class="lgbf">--%>
<%--<a href="${ctx}/index">--%>
<%--<div class="h1">--%>
<%--<img src="${btx}/images/logo1.png" alt=""/>--%>
<%--<p>--%>
<%--<span class="logo_title_span">上海市机动车维修公共服务平台</span>--%>
<%--<span class="logo_en_title_span">Shanghai Automobile Maintenance Public Service Platform</span>--%>
<%--</p>--%>
<%--</div>--%>
<%--</a>--%>
<%--<div class="appdl">--%>
<%--<span class="app">手机APP下载</span>--%>
<%--<span class="vx">关注微信公众号</span>--%>
<%--</div>--%>
<%--<!-- 手机app与微信公众号的屏蔽 -->--%>
<%--<!--  <div id="app_in" class="span" style='display: none;'></div> -->--%>
<%--<div id="app_in" class="span" style='display: none;'></div>--%>
<%--<div id="vx_in" class="span" style='display: none;'></div>--%>
<%--</div>--%>

<%--<div class="danwei">--%>
<%--<div class="z_in">指导部门：上海市城市交通运输管理处</div>--%>
<%--<div class="z_in">主办单位：上海市汽车维修行业协会</div>--%>
<%--<div class="z_in">承办单位：上海蓝速汽车技术有限公司</div>--%>
<%--<!-- 	        <div class="z_in">服务热线：<span>400-663-8210</span></div> -->--%>
<%--</div>--%>
<%--</div>--%>
<%--</div>--%>

<div class="nav_top">
    <div class="nav_in_top">
        <%--<ul class="nav_ul">--%>
        <%--<li class="${nav_menu_index == 1?'dangqiande':'' }"><a href="${ctx}/index">首页</a></li>--%>
        <%--<li class="${nav_menu_index == 2?'dangqiande':'' }"><a href="${ctx}/government/10281001">公共管理</a></li>--%>
        <%--<li class="${nav_menu_index == 3?'dangqiande':'' }"><a id="centerMenu" style="coursor: pointer">电子健康档案</a></li>--%>
        <%--<li class="${nav_menu_index == 6?'dangqiande':'' }">--%>
        <%--<a href="javascript:void(0);">公共服务</a>--%>
        <%--<ul class="sub_nav" style="display:none;">--%>
        <%--&lt;%&ndash;<li><a href="${ctx}/maintain?flag=corp">维修服务查选</a></li>&ndash;%&gt;--%>
        <%--<li><a href="${ctx}/cdf">车大夫门诊</a></li>--%>
        <%--<li><a href="${ctx}/maintain/visit">上门服务</a></li>--%>
        <%--<li><a href="${ctx}/maintain/serviceForyou">为您服务</a></li>--%>
        <%--<li><a href="${ctx}/maintain/online">在线预约维修</a></li>--%>
        <%--&lt;%&ndash;<li class="">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<a href="javascript:void(0);">在线维修</a>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<ul class="sub_nav" style="display:none;position: relative;left: 198px;top:-40px">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<li><a href="${ctx}/maintain/visit">在线预约维修</a></li>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<li><a>维修进度查询</a></li>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</ul>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</li>&ndash;%&gt;--%>
        <%--<li class="">--%>
        <%--<a href="javascript:void(0);">维修相关产业服务</a>--%>
        <%--<ul class="sub_nav" style="display:none;position: relative;left: 198px;top:-40px">--%>
        <%--<li class=""><a href="${ctx}/business/parts">汽车配件</a></li>--%>
        <%--<li class=""><a href="${ctx}/business/equip">汽保设备</a></li>--%>
        <%--<li class=""><a href="${ctx}/business/insure">汽车保险</a></li>--%>
        <%--<li class=""><a href="${ctx}/business/sell">汽车销售</a></li>--%>
        <%--<li class=""><a href="${ctx}/business/train">相关培训</a></li>--%>
        <%--<li class=""><a href="${ctx}/business/consum">汽车用品</a></li>--%>
        <%--<li class=""><a href="${ctx}/business/books">汽车读物</a></li>--%>
        <%--</ul>--%>
        <%--</li>--%>
        <%--<li><a href="${ctx}/maintain?flag=check">专业检测、等级评定</a></li>--%>


        <%--<li><a href="${ctx}/maintain?flag=wyc">危险品运输车辆维修</a></li>--%>
        <%--<li><a href="${ctx}/maintain?flag=xny">新能源汽车维修</a></li>--%>
        <%--<li><a href="${ctx}/maintain?flag=qcjy">维修救援服务</a></li>--%>

        <%--&lt;%&ndash; 					<li><a href="${ctx}/center/apply">开业申请</a></li> &ndash;%&gt;--%>
        <%--</ul>--%>
        <%--</li>--%>
        <%--<li class="${nav_menu_index == 5?'dangqiande':'' }"><a href="${ctx}/assoinfo/summary">协会治理</a></li>--%>
        <%----%>
        <%--<li class="${nav_menu_index == 4?'dangqiande':'' }">--%>
        <%--<a href="javascript:void(0);">公众监督</a>--%>
        <%--<ul class="sub_nav" style="display:none;">--%>
        <%--<li><a href="${ctx}/supervision/questions">满意度调查</a></li>--%>
        <%--<li><a href="${ctx}/supervision/complain">维修投诉</a></li>--%>
        <%--&lt;%&ndash;<li><a href="javascript:void(0);">曝光平台</a></li>&ndash;%&gt;--%>
        <%--</ul>--%>
        <%--</li>--%>
        <%--<li class="${nav_menu_index == 7?'dangqiande':'' }">--%>
        <%--<a href="javascript:void(0);">在线商务</a>--%>
        <%--<ul class="sub_nav" style="display:none;">--%>
        <%--<li class=""><a href="${ctx}/business/parts">汽车配件</a></li>--%>
        <%--<li class=""><a href="${ctx}/business/equip">汽保设备</a></li>--%>
        <%--<li class=""><a href="${ctx}/business/insure">汽车保险</a></li>--%>
        <%--<li class=""><a href="${ctx}/business/sell">汽车销售</a></li>--%>
        <%--<li class=""><a href="${ctx}/business/train">相关培训</a></li>--%>
        <%--<li class=""><a href="${ctx}/business/consum">汽车用品</a></li>--%>
        <%--<li class=""><a href="${ctx}/business/books">汽车读物</a></li>--%>
        <%--<li class=""><a href="${ctx}/business/wash">洗车美容</a></li>--%>
        <%--<li class=""><a href="${ctx}/business/check">车辆年检</a></li>--%>
        <%--<li class=""><a href="${ctx}/business/study">学驾推荐</a></li>--%>
        <%--<li class=""><a href="${ctx}/business/help">故障救援</a></li>--%>
        <%--<li class=""><a href="${ctx}/business/serve">我们来为您服务</a></li>--%>
        <%--</ul>--%>
        <%--</li>--%>
        <%--&lt;%&ndash;<li class="${nav_menu_index == 9?'dangqiande':'' }"><a href="${ctx}/adver">商务广告</a></li>&ndash;%&gt;--%>
        <%--<li class="${nav_menu_index == 8?'dangqiande':'' }"><a href="${ctx}/aboutUs">关于我们</a></li>--%>
        <%--</ul>--%>
        <ul class="menu">
            <li><a href="${ctx}/index">首页</a></li>
            <li class="service">服务中心</li>
            <li><a href="javascript:void(0)" onclick="goToPage('/center/repairInfo')">电子健康档案系统</a></li>
            <li><a href="/cdf">车大夫门诊</a></li>
            <li><a href="javascript:void(0)" onclick="goToPage('${ctx}/maintain/visit')">上门服务</a></li>
            <li><a href="javascript:void(0)" onclick="goToPage('${ctx}/queryRepairCompany')">预约维修</a></li>
            <%--<li><a href="${ctx}/supervision/questions">满意度调查</a></li>--%>
            <li><a href="${ctx}/supervision/complain">维修反馈</a></li>
            <%--<li><a href="${ctx}/center/companyPost">人才需求</a></li>--%>
            <%--<li><a href="${ctx}/center/resumeSearch">简历搜索</a></li>--%>
            <%--<li><a href="${ctx}/recommend">优质企业推荐</a></li>--%>
        </ul>
        <ul class="parentmenu">
            <li class="healthcare-record"><a href="#" onclick="goToPage('/center/repairInfo')">电子健康档案系统</a></li>
            <li class="owner-center"><a href="#">车主服务中心</a></li>
            <li class="com-center"><a href="#">汽修企业服务中心</a></li>
            <li class="gover-center"><a href="#">政务服务中心</a></li>
            <li class="association-center"><a href="#">协会服务中心</a></li>
            <li class="talent-center"><a href="#">人才服务中心</a></li>
            <li class="relate-center"><a href="#">汽修相关产业服务中心</a></li>
            <li class="business-center"><a href="#">商务服务中心</a></li>
            <li class="supervise-center"><a href="#">公众监督服务中心</a></li>
            <li class="data-center"><a href="#">大数据服务中心</a></li>
        </ul>
        <div class="submenu owner-center_menu">
            <a href="#" onclick="goToPage('/center/applyList', false, [1])"><img src="${btx}/img/menu_icon/爱车档案.png">
                <p>爱车档案</p></a>
            <a href="#" onclick="goToPage('${ctx}/queryRepairCompany', true)"><img src="${btx}/img/menu_icon/维修服务查选.png">
                <p>维修服务查询</p></a>
            <a href="#" onclick="goToPage('${ctx}/cdf', true)"><img src="${btx}/img/menu_icon/车大夫门诊.png">
                <p>车大夫门诊</p></a>
            <a href="#" onclick="goToPage('${ctx}/maintain/visit', false, [1,2,3,4,5,6,7])"><img src="${btx}/img/menu_icon/上门服务.png">
                <p>上门服务</p></a>
            <a href="#" onclick="goToPage('${ctx}/queryRepairCompany', false, [1,2,3,4,5,6,7])"><img src="${btx}/img/menu_icon/预约服务.png">
                <p>预约服务</p></a>
            <a href="#" onclick="goToPage('${ctx}/business/help', true)"><img src="${btx}/img/menu_icon/道路救援.png">
                <p>道路救援</p></a>
            <a href="#" onclick="goToPage('${ctx}/business/insure', true)"><img src="${btx}/img/menu_icon/车辆保险.png">
                <p>车辆保险</p></a>
            <a href="#" onclick="goToPage('${ctx}/business/check', true)"><img src="${btx}/img/menu_icon/年检服务.png">
                <p>年检服务</p></a>
            <%--<a href="http://hxx.refineit.cn:2000/index.php/dq/Goods/goodsList/id/894.html" target="_blank"><img src="${btx}/img/menu_icon/二手车市场.png">--%>
            <%--<p>二手车市场</p></a>--%>
            <%--<a href="http://hxx.refineit.cn:2000/index.php/dq/Goods/goodsList/id/889.html" target="_blank"><img src="${btx}/img/menu_icon/美容清洁.png">--%>
            <%--<p>美容清洁</p></a>--%>
            <%--<a href="#"><img src="${btx}/img/menu_icon/违章查询.png">--%>
            <%--<p>违章查询</p></a>--%>
            <a href="#" onclick="goToPage('${ctx}/maintain?flag=check', true)"><img src="${btx}/img/menu_icon/检测站.png">
                <p>综合检测站</p></a>
            <a href="#" onclick="goToPage('${ctx}/maintain?flag=wyc', true)"><img src="${btx}/img/menu_icon/危运车辆维修.png">
                <p>危运车辆维修</p></a>
            <a href="#" onclick="goToPage('${ctx}/maintain?flag=xny', true)"><img src="${btx}/img/menu_icon/新能源汽车维修.png">
                <p>新能源汽车维修</p></a>
            <a href="#" onclick="goToPage('${ctx}/maintain?flag=qcjy', true)"><img src="${btx}/img/menu_icon/道路救援.png">
                <p>施救牵引企业</p></a>
            <%--<a href="#" onclick="goToPage('${ctx}/center/resumeCenter', false, [1])"><img src="${btx}/img/menu_icon/简历管理.png">--%>
                <%--<p>简历管理</p></a>--%>
            <a href="#" onclick="goToPage('${ctx}/business/study', true)"><img src="${btx}/img/menu_icon/推介服务.png">
                <p>推介服务</p></a>
            <a href="/statics/tips.pdf" target="_blank"><img src="${btx}/img/menu_icon/行业概况.png">
                <p>爱车小贴士</p></a>
        </div>
        <div class="submenu com-center_menu">
            <a href="#" onclick="goToPage('http://hxx.hoxiuxiu.com', true)"><img style="width: 36px" src="${btx}/img/menu_icon/门店管理.png">
                <p>门店管理</p></a>
            <a href="#" onclick="goToPage('/center/repairInfo', false, [2])"><img src="${btx}/img/menu_icon/电子健康档案上传情况.png">
                <p>维修记录</p></a>
            <a href="#" onclick="goToPage('${ctx}/center/repairQuality', false, [2])"><img src="${btx}/img/menu_icon/维修合格证.png">
                <p>维修合格证</p></a>
            <%--<a href="#" onclick="goToPage('${ctx}/center/companyPost', false, [2])"><img src="${btx}/img/menu_icon/人才需求.png">--%>
                <%--<p>人才招聘</p></a>--%>
            <a href="#" onclick="goToPage('${ctx}/government/10281005', true)"><img src="${btx}/img/menu_icon/开业停业咨询.png">
                <p>开业/停业咨询</p></a>
            <a href="#" onclick="goToPage('${ctx}/business/parts', true)"><img src="${btx}/img/menu_icon/配件需求.png">
                <p>配件需求</p></a>
            <a href="#" onclick="goToPage('${ctx}/business/equip', true)"><img src="${btx}/img/menu_icon/汽保设备需求.png">
                <p>汽保设备需求</p></a>
            <a href="/cdf" target="_blank"><img src="${btx}/img/menu_icon/技术信息.png">
                <p>技术信息</p></a>
        </div>
        <div class="submenu gover-center_menu">
            <a href="#" onclick="goToPage('${ctx}/center/recordCompInfo', false, [3,7])"><img src="${btx}/img/menu_icon/电子健康档案.png">
                <p>电子健康档案</p></a>
            <a href="#" onclick="goToPage('${ctx}/government/10281001', true)"><img src="${btx}/img/menu_icon/法律法规.png">
                <p>法律法规</p></a>
            <a href="#" onclick="goToPage('${ctx}/government/10281002', true)"><img src="${btx}/img/menu_icon/管理规范.png">
                <p>管理规范</p></a>
            <a href="#" onclick="goToPage('${ctx}/government/10281003', true)"><img src="${btx}/img/menu_icon/行业政策.png">
                <p>行业政策</p></a>
            <a href="#" onclick="goToPage('${ctx}/government/10281004', true)"><img src="${btx}/img/menu_icon/技术标准.png">
                <p>技术标准</p></a>
            <a href="#" onclick="goToPage('${ctx}/government/10281005', true)"><img src="${btx}/img/menu_icon/办事指南.png">
                <p>办事指南</p></a>
            <a href="#" onclick="goToPage('${ctx}/government/10281006', true)"><img src="${btx}/img/menu_icon/管理职责.png">
                <p>管理职责</p></a>
            <a href="#" onclick="goToPage('${ctx}/government/10281007', true)"><img src="${btx}/img/menu_icon/行业概况.png">
                <p>行业概况</p></a>
            <a href="#" onclick="goToPage('${ctx}/government/10281010', true)"><img src="${btx}/img/menu_icon/行业文明建设.png">
                <p>行业文明建设</p></a>
            <a href="#" onclick="goToPage('${ctx}/government/10281009', true)"><img src="${btx}/img/menu_icon/优质企业.png">
                <p>优质企业</p></a>
            <a href="#" onclick="goToPage('${ctx}/government/10281017', true)"><img src="${btx}/img/menu_icon/违法违规公告.png">
                <p>违法违规公告</p></a>
            <a href="#" onclick="goToPage('${ctx}/government/10281016', true)"><img src="${btx}/img/menu_icon/质量信誉考核.png">
                <p>质量信誉考核</p></a>
        </div>
        <div class="submenu association-center_menu">
            <a href="#" onclick="goToPage('${ctx}/assoinfo/summary', true)"><img src="${btx}/img/menu_icon/协会简介.png">
                <p>协会简介</p></a>
            <a href="#" onclick="goToPage('${ctx}/assoinfo/function', true)"><img src="${btx}/img/menu_icon/协会职能.png">
                <p>协会职能</p></a>
            <a href="#" onclick="goToPage('${ctx}/industry/10281013', true)"><img src="${btx}/img/menu_icon/工作动态.png">
                <p>工作动态</p></a>
            <a href="#" onclick="goToPage('${ctx}/industry/10281014', true)"><img src="${btx}/img/menu_icon/行业风采.png">
                <p>行业风采</p></a>
            <a href="#" onclick="goToPage('${ctx}/industry/10281008', true)"><img src="${btx}/img/menu_icon/行业能手.png">
                <p>行业能手</p></a>
            <a href="#" onclick="goToPage('${ctx}/industry/10281015', true)"><img src="${btx}/img/menu_icon/行业党建.png">
                <p>行业党建</p></a>
            <a href="#" onclick="goToPage('${ctx}/specialist', true)"><img src="${btx}/img/menu_icon/专家组.png">
                <p>专家组</p></a>
        </div>
        <div class="submenu talent-center_menu">
            <%--<a href="#" onclick="goToPage('${ctx}/center/searchJobsByCondition', false, [1])"><img src="${btx}/img/menu_icon/投放简历.png">--%>
                <%--<p>找工作</p></a>--%>
            <%--<a href="#" onclick="goToPage('${ctx}/center/companyPost', false, [2])"><img src="${btx}/img/menu_icon/人才需求.png">--%>
                <%--<p>岗位发布</p></a>--%>
            <%--<a href="#" onclick="goToPage('${ctx}/center/resumeSearch', false, [2])"><img src="${btx}/img/menu_icon/简历搜索.png">--%>
                <%--<p>简历搜索</p></a>--%>
            <a href="#" onclick="goToPage('${ctx}/business/train', true)"><img src="${btx}/img/menu_icon/培训需求.png">
                <p>培训需求</p></a>
            <%--<a href="#" onclick="goToPage('${ctx}/recommend', true)"><img src="${btx}/img/menu_icon/优质企业推荐.png">--%>
            <%--<p>优质企业推荐</p></a>--%>
        </div>
        <div class="submenu relate-center_menu">
            <a href="#" onclick="goToPage('${ctx}/business/parts', true)"><img src="${btx}/img/menu_icon/汽车配件.png">
                <p>汽车配件</p></a>
            <a href="#" onclick="goToPage('${ctx}/center/companyPost', false, [2])"><img src="${btx}/img/menu_icon/人才需求.png">
                <p>人才需求</p></a>
            <a href="#" onclick="goToPage('${ctx}/business/train', true)"><img src="${btx}/img/menu_icon/相关培训.png">
                <p>相关培训</p></a>
            <%--<a href="#" onclick="goToPage('${ctx}/cooperate')"><img src="${btx}/img/menu_icon/商务合作.png">--%>
            <a href="#" onclick="goToPage('${ctx}/partner', true)"><img src="${btx}/img/menu_icon/商务合作.png">
                <p>商务合作</p></a>
            <a href="#" onclick="goToPage('${ctx}/partner', true)"><img src="${btx}/img/menu_icon/数据需求.png">
                <p>数据需求</p></a>
            <a href="#" onclick="goToPage('${ctx}/business/books', true)"><img src="${btx}/img/menu_icon/汽车读物.png">
                <p>汽车读物</p></a>
            <a href="#" onclick="goToPage('${ctx}/business/insure', true)"><img src="${btx}/img/menu_icon/汽车保险.png">
                <p>汽车保险</p></a>
            <a href="#" onclick="goToPage('${ctx}/business/consum', true)"><img src="${btx}/img/menu_icon/汽车用品.png">
                <p>汽车用品</p></a>
            <a href="#" onclick="goToPage('${ctx}/business/equip', true)"><img src="${btx}/img/menu_icon/汽保设备.png">
                <p>汽保设备</p></a>
            <a href="#" onclick="goToPage('${ctx}/business/sell', true)"><img src="${btx}/img/menu_icon/汽车销售.png">
                <p>汽车销售</p></a>
        </div>
        <div class="submenu business-center_menu">
            <%--<a href="#" onclick="goToPage('${ctx}/cooperate')"><img src="${btx}/img/menu_icon/在线商务.png">--%>
            <a href="#" onclick="goToPage('${ctx}/partner', true)"><img src="${btx}/img/menu_icon/在线商务.png">
                <p>在线商务</p></a>
            <%--<a href="#" onclick="goToPage('${ctx}/cooperate')"><img src="${btx}/img/menu_icon/商务合作.png">--%>
            <a href="#" onclick="goToPage('${ctx}/partner', true)"><img src="${btx}/img/menu_icon/商务合作.png">
                <p>商务合作</p></a>
        </div>
        <div class="submenu supervise-center_menu">
            <a href="#" onclick="goToPage('${ctx}/supervision/questions', true)"><img src="${btx}/img/menu_icon/满意度调查.png">
                <p>满意度调查</p></a>
            <a href="#" onclick="goToPage('${ctx}/supervision/complain', true)"><img src="${btx}/img/menu_icon/维修投诉.png">
                <p>维修反馈</p></a>
        </div>
        <div class="submenu data-center_menu">
            <%--<a href="#" onclick="goToPage('${ctx}/cooperate')"><img src="${btx}/img/menu_icon/在线商务.png">--%>
            <%--<a href="#" onclick=""><img src="${btx}/img/menu_icon/在线商务.png">--%>
            <%--<p>在线商务</p></a>--%>
            <%--&lt;%&ndash;<a href="#" onclick="goToPage('${ctx}/cooperate')"><img src="${btx}/img/menu_icon/商务合作.png">&ndash;%&gt;--%>
            <%--<a href="#" onclick="goToPage('${ctx}/partner', true)"><img src="${btx}/img/menu_icon/商务合作.png">--%>
            <%--<p>商务合作</p></a>--%>
            <a href="/partner" target="_blank"><img src="${btx}/img/menu_icon/二手车市场.png">
                <p>二手车服务</p></a>
            <a href="/partner" target="_blank"><img src="${btx}/img/menu_icon/车辆保险.png">
                <p>保险数据服务</p></a>
        </div>
    </div>
</div>
<div class="clear"></div>
<script>
    $(function () {
        var userInfo = JSON.parse(localStorage.getItem('USERINFO'));

//    console.log(localStorage.getItem('USERINFO'))
        if (userInfo) {
            if (userInfo.nickname) {
                $('#nickName').text(userInfo.nickname)
            } else {
                $('#nickName').text("")
            }
            var info = JSON.parse(localStorage.getItem('USERINFO'))
            $(".logo2").hide()
            $(".logo").show()
            $("#username").text(info.userName)
            $(".user" + info.userRoleId).show()

            if (!info.isdisabled) {
                $(".user2 .pass").show()
            } else {
                $(".user2 .unpass").show()
            }
        } else {
            $('#nickName').text("")
            $(".logo2").show()
            $(".logo").hide()
        }

        $("#centerMenu").click(function () {
            if (!localStorage.getItem('ACCESSTOKEN')) {
                window.location.href = '${ctx}/toLogin?reUrl=' + '${memberUri}';
            } else {
//			    console.log(JSON.parse(localStorage.getItem("USERINFO")).userRoleId)
                switch (JSON.parse(localStorage.getItem("USERINFO")).userRoleId) {
                    case 1:
                        window.location.href = '${ctx}/center/applyList';
                        break;
                    <%--case 2: window.location.href = '${ctx}/center/companyRecord';break--%>
                    case 2:
                        window.location.href = '${ctx}/center/repairInfo';
                        break;
                    case 3:
                        window.location.href = '${ctx}/center/recordCompInfo';
                        break;
                    case 4:
                        window.location.href = '${ctx}/center/applyList';
                        break;
                    case 5:
                        window.location.href = '${ctx}/center/applyList';
                        break;
                    case 6:
                        window.location.href = '${ctx}/center/recordCompInfo';
                        break;
                    case 7:
                        window.location.href = '${ctx}/center/recordCompInfo';
                        break;
                    default:

                }
            }
        })


        $(".nav_top .menu .service, .nav_top .parentmenu, .nav_top .submenu").hover(function () {
            $(".nav_top .parentmenu").show()
        })
        $(".nav_top .menu .service, .nav_top .parentmenu, .nav_top .submenu").mouseleave(function () {
            $(".nav_top .parentmenu").hide()
        })

        menuHover(".owner-center")
        menuHover(".com-center")
        menuHover(".gover-center")
        menuHover(".association-center")
        menuHover(".talent-center")
        menuHover(".relate-center")
        menuHover(".business-center")
        menuHover(".supervise-center")
        menuHover(".data-center")
        menuHover(".healthcare-record")

        function menuHover(className) {
            $(className + ", " + className + "_menu").hover(function () {
                $(className + ", " + className + "_menu").addClass("active")
            })
            $(className + ", " + className + "_menu").mouseleave(function () {
                $(".nav_top .parentmenu li, .submenu").removeClass("active")
            })
        }

        var info = JSON.parse(localStorage.getItem('USERINFO'));
        if(info) {
            $('.nickName').text(info.nickname||'');
            $('.unLogin').hide();
            $('.isLogin').show();

            if(info.userRoleId==1){
                $(".goOwner").remove()
            }
            else if (info.showRole==1){
                $(".login .switch a").removeClass("show")
                $(".goOwner").addClass("show")
            }
            $(".login .switch a").click(function () {

                if($(this).hasClass("goOwner")){
                    info.showRole= 1
                }else{
                    info.showRole= info.userRoleId
                }
                localStorage.setItem('USERINFO', JSON.stringify(info))
            })

            if(info.userRoleId == 1) {
                $('.loginButton').attr('href', '${ctx}/center/userInfo');
                $('.loginButton').text('车主中心');
            }
            if(info.userRoleId == 2) {
                if(!info.isdisabled){
                    $('.loginButton').attr('href', '${ctx}/center/companyHome');
                }else{
                    $('.loginButton').attr('href', '${ctx}/center/companyEnter');
                }
                $('.loginButton').text('企业中心');
            }
            if(info.userRoleId == 3) {
                $('.loginButton').attr('href', '${ctx}/center/manageHome');
                $('.loginButton').text('管理中心');
            }
            if(info.userRoleId == 4) {
                $('.loginButton').attr('href', '${ctx}/center/runHome');
                $('.loginButton').text('运营商中心');
            }
            if(info.userRoleId == 5) {
                $('.loginButton').attr('href', '${ctx}/cdf/question4Expert');
                $('.loginButton').text('专家中心');
            }
            if(info.userRoleId == 6) {
                $('.loginButton').attr('href', '${ctx}/center/manageNotes');
                $('.loginButton').text('协会中心');
            }
            if(info.userRoleId == 7) {
                $('.loginButton').attr('href', '${ctx}/center/manageHome');
                $('.loginButton').text('管理中心');
            }
        } else {
            $('.unLogin').show();
            $('.isLogin').hide();
        }

    })

    function logout(){
        layer.confirm('确认要退出登录吗？', {
            icon:3,
            btn : ['确定', '取消']
        }, function() {
            var token= localStorage.getItem('ACCESSTOKEN')
            simpleGet(baseu+ '/user/useraccount/logout/'+ token, function(res){
                localStorage.removeItem('ACCESSTOKEN')
                localStorage.removeItem('USERINFO')
                window.location.href = "${ctx}" + "/toLogin?reUrl=" + window.location.pathname;
            })
        });
    }
</script>