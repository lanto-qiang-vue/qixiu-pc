<%@page language="java" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp" %>
    <%@ include file="/WEB-INF/pages/common/head.jsp" %>
</head>
<body style="">

<span id="check_is_login" style="display:none;">0</span>
<span id="reUrl" style="display:none;"></span>
<span id="memberUri" style="display:none;">/government/10281009</span>
<!--top-->

<div class="logo" style="display: none">
    <div class="logo_in">
        <div class="grzx">
            <span><span>欢迎您，</span><span id="nickName"></span></span>

            <span class="user1" style="display: none"><a href="/center/userInfo">车主中心</a></span>

            <span class="user2" style="display: none">
						<a class="pass" style="display: none" href="/center/companyHome">企业中心</a>
						<a class="unpass" style="display: none" href="/center/companyEnter">企业中心</a>
					</span>

            <span class="user3" style="display: none"><a href="/center/manageHome">管理中心</a></span>
            <span class="user4" style="display: none"><a href="/center/companyVisit">运营商中心</a></span>
            <span class="user5" style="display: none"><a href="/cdf/question4Expert">专家中心</a></span>
            <span class="user6" style="display: none"><a href="/cdf/manageNotes">协会中心</a></span>

            <span class="user7" style="display: none"><a href="/center/manageHome">管理中心</a></span>

            <span id="logooutBtn">注销</span>
        </div>

    </div>
</div>
<div class="logo2" style="">
    <div class="logo_in">
        <div class="xzcx">
            <form class="layui-form" id="indexLoginForm">
                <p>您好，欢迎光临本站！</p>
                <span><a href="/toLogin">请登录</a><!--<button lay-submit="" lay-filter="indexLoginSubmit" class="loginbtn">请登录</button>-->&nbsp;&nbsp; | &nbsp;&nbsp;<a href="/toRegister">快速注册</a></span>
            </form>
        </div>
    </div>
</div>

<div class="cbdw">
    <div class="cbdw_in">
        <div class="lgbf">
            <a href="/index">
                <div class="h1">
                    <img src="/statics/images/logo1.png" alt="">
                    <p>
                        <span class="logo_title_span">上海市机动车维修公共服务平台</span>
                        <span class="logo_en_title_span">Shanghai Automobile Maintenance Public Service Platform</span>
                    </p>
                </div>
            </a>
            <div class="appdl">
                <span class="app">手机APP下载</span>
                <span class="vx">关注微信公众号</span>
            </div>
            <!-- 手机app与微信公众号的屏蔽 -->
            <!--  <div id="app_in" class="span" style='display: none;'></div> -->
            <div id="app_in" class="span" style="display: none;"></div>
            <div id="vx_in" class="span" style="display: none;"></div>
        </div>

        <div class="danwei">
            <div class="z_in">指导部门：上海市城市交通运输管理处</div>
            <div class="z_in">主办单位：上海市汽车维修行业协会</div>
            <div class="z_in">承办单位：上海蓝速汽车技术有限公司</div>
            <!-- 	        <div class="z_in">服务热线：<span>400-663-8210</span></div> -->
        </div>
    </div>
</div>

<div class="nav_top">
    <div class="nav_in_top">
        <ul class="nav_ul sf-js-enabled sf-arrows" style="touch-action: pan-y;">
            <li class=""><a href="/index">首页</a></li>
            <li class="dangqiande"><a href="/government/10281001">公共管理</a></li>
            <li class=""><a id="centerMenu" style="coursor: pointer">电子健康档案</a></li>
            <li class="">
                <a href="javascript:void(0);" class="sf-with-ul">公共服务</a>
                <ul class="sub_nav" style="display: none;">

                    <li><a href="/cdf">车大夫门诊</a></li>
                    <li><a href="/maintain/visit">上门服务</a></li>
                    <li><a href="/maintain/serviceForyou">为您服务</a></li>
                    <li><a href="/maintain/online">在线预约维修</a></li>







                    <li class="">
                        <a href="javascript:void(0);" class="sf-with-ul">维修相关产业服务</a>
                        <ul class="sub_nav" style="position: relative; left: 198px; top: -40px; display: none;">
                            <li class=""><a href="/business/parts">汽车配件</a></li>
                            <li class=""><a href="/business/equip">汽保设备</a></li>
                            <li class=""><a href="/business/insure">汽车保险</a></li>
                            <li class=""><a href="/business/sell">汽车销售</a></li>
                            <li class=""><a href="/business/train">相关培训</a></li>
                            <li class=""><a href="/business/consum">汽车用品</a></li>
                            <li class=""><a href="/business/books">汽车读物</a></li>
                        </ul>
                    </li>
                    <li><a href="/maintain?flag=check">专业检测、等级评定</a></li>


                    <li><a href="/maintain?flag=wyc">危险品运输车辆维修</a></li>
                    <li><a href="/maintain?flag=xny">新能源汽车维修</a></li>
                    <li><a href="/maintain?flag=qcjy">维修救援服务</a></li>


                </ul>
            </li>
            <li class=""><a href="/assoinfo/summary">协会治理</a></li>

            <li class="">
                <a href="javascript:void(0);" class="sf-with-ul">公众监督</a>
                <ul class="sub_nav" style="display: none;">
                    <li><a href="/supervision/questions">满意度调查</a></li>
                    <li><a href="/supervision/complain">维修反馈</a></li>

                </ul>
            </li>
            <li class="">
                <a href="javascript:void(0);" class="sf-with-ul">在线商务</a>
                <ul class="sub_nav" style="display: none;">
                    <li class=""><a href="/business/parts">汽车配件</a></li>
                    <li class=""><a href="/business/equip">汽保设备</a></li>
                    <li class=""><a href="/business/insure">汽车保险</a></li>
                    <li class=""><a href="/business/sell">汽车销售</a></li>
                    <li class=""><a href="/business/train">相关培训</a></li>
                    <li class=""><a href="/business/consum">汽车用品</a></li>
                    <li class=""><a href="/business/books">汽车读物</a></li>
                    <li class=""><a href="/business/wash">洗车美容</a></li>
                    <li class=""><a href="/business/check">车辆年检</a></li>
                    <li class=""><a href="/business/study">学驾推荐</a></li>
                    <li class=""><a href="/business/help">故障救援</a></li>
                    <li class=""><a href="/business/serve">我们来为您服务</a></li>
                </ul>
            </li>

            <li class=""><a href="/aboutUs">关于我们</a></li>
        </ul>
    </div>
</div>
<div class="clear"></div>
<script>
    $(function(){
        var userInfo = JSON.parse(localStorage.getItem('USERINFO'));

//    console.log(localStorage.getItem('USERINFO'))
        if(userInfo){
            if (userInfo.nickname) {
                $('#nickName').text(userInfo.nickname)
            } else {
                $('#nickName').text("")
            }
            var info= JSON.parse(localStorage.getItem('USERINFO'))
            $(".logo2").hide()
            $(".logo").show()
            $("#username").text(info.userName)
            $(".user"+info.userRoleId).show()

            if(!info.isdisabled){
                $(".user2 .pass").show()
            }else{
                $(".user2 .unpass").show()
            }
        }else{
            $('#nickName').text("")
            $(".logo2").show()
            $(".logo").hide()
        }

        $("#centerMenu").click(function () {
            if(!localStorage.getItem('ACCESSTOKEN')){
                window.location.href = '/toLogin?reUrl=' + '/government/10281009';
            }else{
//			    console.log(JSON.parse(localStorage.getItem("USERINFO")).userRoleId)
                switch (JSON.parse(localStorage.getItem("USERINFO")).userRoleId){
                    case 1:
                        window.location.href = '/center/applyList';
                        break;

                    case 2:
                        window.location.href = '/center/repairInfo';
                        break;
                    case 3:
                        window.location.href = '/center/recordCompInfo';
                        break;
                    case 4:
                        window.location.href = '/center/applyList';
                        break;
                    case 5:
                        window.location.href = '/center/applyList';
                        break;
                    case 6:
                        window.location.href = '/center/recordCompInfo';
                        break;
                    case 7:
                        window.location.href = '/center/recordCompInfo';
                        break;
                    default:

                }
            }
        })
    })
</script>

<div class="Government">
    <div class="zhengwu_l">
        <div class="zhengwu">公共管理</div>
        <ul class="zheng_ul">
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">政务公开</a></div>
                <ul>
                    <li class=""><a href="/government/10281001">法律法规</a></li>
                    <li class=""><a href="/government/10281002">管理规范</a></li>
                    <li class=""><a href="/government/10281003">行业政策</a></li>
                    <li class=""><a href="/government/10281004">技术标准</a></li>
                </ul>
            </li>
            <li class=""><a href="/government/10281005">办事指南</a></li>
            <li class=""><a href="/government/10281006">管理职责</a></li>
            <li class=""><a href="/government/10281007">行业概况</a></li>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">管理动态</a></div>
                <ul>
                    <li><a id="repairInfo" class="">电子维修档案</a></li>


                    <li><a id="companyCertificate">企业合格证使用信息管理</a></li>
                    <li class=""><a href="/government/10281016">质量信誉考核信息</a></li>
                    <li class=""><a href="/government/10281017">违法违规公告</a></li>
                </ul>
            </li>

            <li class="nav_menu open">
                <div><a href="javascript:void(0);">创先争优</a></div>
                <ul>
                    <li class="dangqiande"><a href="/government/10281009">优质企业</a></li>

                </ul>
            </li>
            <li class=""><a href="/government/10281010">行业文明创建</a></li>
        </ul>
    </div>
    <span id="infoType" style="display:none;">10281009</span>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">优质企业</span>
            <span class="sp_wz"><a href="">首页</a> &gt; <span>公共管理</span> &gt; <span>优质企业</span></span>
        </div>
        <ul class="zhengwu_c" id="dataBody">
            <li><a href='/government/detail/177'>2017年度全市机动车维修企业诚信考核等级AAA级企业</a></li>
            <li><a href='/government/detail/139'>2016年度全市机动车维修企业诚信考核等级AAA级企业</a></li>
            <li><a href="/government/detail/141">上海市获得2015—2016年度全国汽车维修行业诚信企业</a></li>
            <li><a href="/government/detail/140">上海名牌企业</a></li>
        </ul>
        <div id="pagebar" style="text-align:center;margin-top:5px;"><div class="layui-box layui-laypage layui-laypage-molv" id="layui-laypage-1"><a href="javascript:;" class="layui-laypage-prev layui-disabled" data-page="0">上一页</a><span class="layui-laypage-curr"><em class="layui-laypage-em" style="background-color:#4ba7f5;"></em><em>1</em></span><a href="javascript:;" class="layui-laypage-next layui-disabled" data-page="2">下一页</a></div></div>
    </div>
</div>


<div class="footer">
    <div class="footer_in">
        <div class="footer_l">
            <p class="yqlj">
                友情链接：<a href="http://www.mot.gov.cn/" target="_Blank">中华人民共和国交通运输部</a>
                |
                <a href="http://www.jt.sh.cn" target="_Blank">上海交通网</a>
                |
                <a href="http://www.shygc.net" target="_Blank">上海市城市交通运输管理处</a>
                <!--&nbsp&nbsp&nbsp&nbsp&nbsp|
                 <a href="http://www.samra.org.cn/jsp/index/indexList.jsp" target="_Blank">上海市汽车维修行业协会</a> -->
                |
                <a href="http://www.shjtzf.com/" target="_Blank">上海市交通委执法总队</a>
                |
                <a href="http://www.lantoev.com" target="_Blank">蓝途共享</a>
            </p>
            <p>copyright 2017 上海蓝速汽车技术有限公司 All rights reserved. 沪ICP备17039665号-1</p>

        </div>
    </div>
</div>
<script>
    $(function () {
        var info = JSON.parse(localStorage.getItem('USERINFO'));
        var roleId = info.userRoleId || '';

        if(roleId == '1'){
            //车主的情况

            //电子健康档案
            $("#repairInfo").attr('href', '/center/applyList');
            //企业合格证使用信息管理
            $("#companyCertificate").parent().hide();
        }

        if(roleId == '2'){
            //维修企业的情况

            //电子健康档案
            $("#repairInfo").attr('href', '/center/repairInfo');
            //企业合格证使用信息管理
            $("#companyCertificate").attr('href', '/center/repairQuality');
        }

        if(roleId == '3'){
            //管理部门的情况

            //电子健康档案
            $("#repairInfo").attr('href', '/center/recordCompInfo');
            //企业合格证使用信息管理
            $("#companyCertificate").attr('href', '/center/compInfoList');

        }

        if(roleId == '4'){
            //运营商的情况

            //电子健康档案
            $("#repairInfo").attr('href', '/center/applyList');
            //企业合格证使用信息管理
            $("#companyCertificate").parent().hide();
        }

        if(roleId == '5'){
            //专家的情况

            //电子健康档案
            $("#repairInfo").attr('href', '/center/applyList');
            //企业合格证使用信息管理
            $("#companyCertificate").parent().hide();
        }

        if(roleId == '6'){
            //协会的情况

            //电子健康档案
            $("#repairInfo").attr('href', '/center/recordCompInfo');
            //企业合格证使用信息管理
            $("#companyCertificate").parent().hide();
        }

        if(roleId == '7'){
            //管理部门领导的情况

            //电子健康档案
            $("#repairInfo").attr('href', '/center/recordCompInfo');
            //企业合格证使用信息管理
            $("#companyCertificate").attr('href', '/center/compInfoList');
        }

    })
</script>


</body>
</html>