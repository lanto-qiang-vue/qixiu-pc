<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<div class="zhengwu_l" style="${menuCode=='apply'?'height:900px;':'' }">

    <%--<c:choose>--%>
    <%--普通登录--%>
    <%--<c:when test="${loginInfo.userType == 0 }">--%>
    <div class="usermenu1 lmenu" style="display: none">
        <div class="zhengwu">车主中心</div>
        <ul class="zheng_ul">
            <li class="${menuid==5 || menuid==51 || menuid==17 ?'dangqiande':'' }"><a href="/center/repairInfo?role_id=1">爱车档案</a></li>
            <%--<li class="${menuid==6?'dangqiande':'' }"><a href="/center/myBindCar">绑定车辆</a></li>--%>
            <li class="${menuid==4?'dangqiande':'' }"><a href="/center/myQuestions">我的咨询</a></li>
            <li class="${menuid==8?'dangqiande':'' }"><a href="/center/myOnsites">我的上门服务</a></li>
            <li class="${menuid==9?'dangqiande':'' }"><a href="/center/myOrders">我的预约服务</a></li>
            <li class="${menuid==19?'dangqiande':'' }"><a href="/center/myComment">我的点评</a></li>
            <li class="${menuid==20?'dangqiande':'' }"><a href="/center/myComplaint">我的反馈</a></li>
            <li class="${menuid==18?'dangqiande':'' }"><a href="/center/myNotes">通知管理</a></li>
            <%--<li class="nav_menu open">--%>
                <%--<div><a href="javascript:void(0);">简历管理</a></div>--%>
                <%--<ul>--%>
                    <%--&lt;%&ndash;<li class="${menuid==101?'dangqiande':'' }"><a href="/center/addResume">新增简历</a></li>&ndash;%&gt;--%>
                    <%--<li class="${menuid==1000?'dangqiande':'' }"><a href="/center/resumeCenter">简历中心</a></li>--%>
                <%--</ul>--%>
                <%--<ul>--%>
                    <%--<li class="${menuid==21?'dangqiande':'' }"><a href="/resumebrowe/seeMeList">谁看过我</a></li>--%>
                <%--</ul>--%>
                <%--<ul>--%>
                    <%--<li class="${menuid==111?'dangqiande':'' }"><a href="/center/myApplication">我的申请</a></li>--%>
                <%--</ul>--%>
                <%--<ul>--%>
                    <%--<li class="${menuid==68?'dangqiande':'' }"><a href="/center/searchJobsByCondition">搜索工作</a>--%>
                    <%--</li>--%>
                <%--</ul>--%>
            <%--</li>--%>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">账号管理</a></div>
                <ul><li class="${menuid==1?'dangqiande':'' }"><a href="/center/userInfo">账号信息</a></li></ul>
                <ul><li class="${menuid==2?'dangqiande':'' }"><a href="/center/changePhone">更换手机号码</a></li></ul>
                <ul><li class="${menuid==3?'dangqiande':'' }"><a href="/center/updatePass">修改密码</a></li></ul>
                <ul><li class="${menuid==7?'dangqiande':'' }"><a href="javascript:logout();">退出登录</a></li></ul>
            </li>
        </ul>
    </div>
    <%--</c:when>--%>

    <%--企业登录--%>
    <%--<c:when test="${loginInfo.userType == 1 }">--%>
    <div class="usermenu2 lmenu" style="display: none">
        <div class="zhengwu">企业中心</div>
        <ul class="zheng_ul unpass" style="display: none">
            <li class="${menuid==16?'dangqiande':'' }"><a href="/center/companyEnter">企业详细信息填写</a></li>
        </ul>
        <ul class="zheng_ul pass" style="display: none">
            <li class="${menuid==10?'dangqiande':'' }"><a href="/center/companyHome">首页</a></li>

            <%--<li class="${menuid==4?'dangqiande':'' }"><a href="/center/toAnswer">回答问题</a></li>--%>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">信息管理</a></div>
                <ul>
                    <%--<li class="${menuid==21?'dangqiande':'' }"><a href="/center/companyInfo">企业信息维护</a></li>--%>
                    <li class="${menuid==15?'dangqiande':'' }"><a href="/center/companyUpload">维修数据上报查询</a></li>
                    <li class="${menuid==61?'dangqiande':'' }"><a href="/center/companyEmployeeList">企业员工查询</a></li>
                    <li class="${menuid==60?'dangqiande':'' }"><a href="/center/companyEmployee">企业员工信息登记</a></li>
                    <li class="${menuid==56?'dangqiande':'' }"><a href="/center/repairQuality">企业合格证使用信息登记</a></li>
                    <%--<li class="${menuid==11?'dangqiande':'' }"><a href="/center/companyVisit">上门服务管理</a></li>--%>
                    <%--<li class="${menuid==12?'dangqiande':'' }"><a href="/center/companyAppoint">预约维修管理</a></li>--%>
                    <li class="${menuid==13?'dangqiande':'' }"><a href="/center/companyNotify">通知管理</a></li>
                    <li class="${menuid==14?'dangqiande':'' }"><a href="/center/companyComplain">反馈管理</a><span id="companyComplainCount"></span></li>
                    <li class="${menuid==20?'dangqiande':'' }"><a href="/center/companyQualCheck">质量信誉考核管理</a>
                    </li>
                </ul>
            </li>
            <%--<li class="nav_menu open">--%>
                <%--<div><a href="javascript:void(0);">企业员工人才管理</a></div>--%>
                <%--<ul>--%>
                    <%--<li class="${menuid==61?'dangqiande':'' }"><a href="/center/companyEmployeeList">企业员工查询</a>--%>
                    <%--</li>--%>
                    <%--<li class="${menuid==60?'dangqiande':'' }"><a href="/center/companyEmployee">企业员工信息登记</a></li>--%>
                <%--</ul>--%>
            <%--</li>--%>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">预约上门管理</a></div>
                <ul>
                    <li class="${menuid==11?'dangqiande':'' }"><a href="/center/companyVisit">上门服务管理</a></li>
                    <li class="${menuid==12?'dangqiande':'' }"><a href="/center/companyAppoint">预约维修管理</a></li>
                </ul>
            </li>

            <%--<li class="${menuid==17?'dangqiande':'' }"><a href="/center/repairInfo">电子健康档案</a></li>--%>

            <li class="nav_menu open">
                <div><a href="javascript:void(0);">业务系统</a></div>
                <ul>

                    <li><a href="http://218.242.195.69:3320/hytjglxt/login.vm" target="_blank">行业报表申报系统</a></li>
                    <%--<li class="${menuid==10?'dangqiande':'' }"><a href="/center/readRecord">配件管理</a></li>--%>
                    <%--<li class="${menuid==10?'dangqiande':'' }"><a href="/center/readRecord">维修项目管理</a></li>--%>
                    <%--<li class="${menuid==10?'dangqiande':'' }"><a href="/center/readRecord">工位管理</a></li>--%>
                    <%--<li class="${menuid==10?'dangqiande':'' }"><a href="/center/readRecord">质量信誉考核</a></li>--%>

                </ul>
            </li>
            <%--<li class="nav_menu open">--%>
                <%--<div><a href="javascript:void(0);">招聘管理</a></div>--%>
                <%--<ul>--%>
                    <%--<li class="${menuid==81?'dangqiande':'' }"><a href="/center/companyPost">岗位管理</a></li>--%>
                    <%--<li class="${menuid==82?'dangqiande':'' }"><a href="/center/resumeSearch">简历搜索</a></li>--%>
                <%--</ul>--%>
            <%--</li>--%>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">账号管理</a></div>
                <ul>
                    <li class="${menuid==1?'dangqiande':'' }"><a href="/center/userInfo">账号信息</a></li>
                    <li class="${menuid==3?'dangqiande':'' }"><a href="/center/updatePass">修改密码</a></li>
                    <li class="${menuid==7?'dangqiande':'' }"><a href="javascript:logout()">退出登录</a></li>
                </ul>
            </li>
        </ul>
    </div>
    <%--</c:when>--%>

    <%--管理登录--%>
    <%--<c:when test="${loginInfo.userType == 2 }">--%>
    <div class="usermenu3 lmenu" style="display: none">
        <div class="zhengwu">管理中心</div>
        <ul class="zheng_ul">
            <li class="${menuid==30?'dangqiande':'' }"><a href="/center/manageHome">首页</a></li>
            <li class="${menuid==44?'dangqiande':'' }"><a href="/center/recordCompInfo">电子健康档案</a></li>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">管理服务</a></div>
                <ul>
                    <li class="${menuid==32?'dangqiande':'' }"><a href="/center/manageNotify">通知发布</a></li>
                    <li class="${menuid==39?'dangqiande':'' }"><a href="/center/manageNotes">通知管理</a></li>
                    <li class="${menuid==50?'dangqiande':'' }"><a href="/center/manageReview">通知审核</a></li>
                    <li class="${menuid==33?'dangqiande':'' }"><a href="/center/manageComplain">反馈管理</a></li>
                    <li class="${menuid==34?'dangqiande':'' }"><a href="/center/manageSurvey">问卷调查</a></li>
                    <li><a href="http://218.242.195.69:3320/hytjglxt/login.vm" target="_blank">统计报表</a></li>
                    <li class="${menuid==43?'dangqiande':'' }"><a href="/center/downloadCenter">文件下载</a></li>
                </ul>
            </li>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">企业员工人才管理</a></div>
                <ul>
                    <li class="${menuid==62?'dangqiande':'' }"><a href="/center/recordCompEmpInfo">按维修企业查询</a>
                    </li>
                    <li class="${menuid==61?'dangqiande':'' }"><a href="/center/companyEmployeeList">按维修企业员工查询</a>
                    </li>
                </ul>
            </li>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">企业资料</a></div>
                <ul>
                    <li class="${menuid==58?'dangqiande':'' }"><a href="/center/manageLoginInfo">企业登录信息</a></li>
                    <%--<li class="${menuid==35?'dangqiande':'' }"><a href="/center/manageDataButt">维修企业数据对接管理</a></li>--%>
                    <li class="${menuid==36?'dangqiande':'' }"><a href="/center/manageCompInfo">维修企业信息管理</a></li>
                    <%--<li class="${menuid==11?'dangqiande':'' }"><a href="/center/companyList">入网管理</a></li>--%>
                    <%--<li class="${menuid==11?'dangqiande':'' }"><a href="/center/companyList">运输企业信息管理</a></li>--%>
                    <%--<li class="${menuid==11?'dangqiande':'' }"><a href="/center/companyList">监测站信息管理</a></li>--%>
                    <%--<li class="${menuid==11?'dangqiande':'' }"><a href="/center/companyList">企业视频监控</a></li>--%>
                    <li class="${menuid==37?'dangqiande':'' }"><a href="/center/manageQualCheck">质量信誉考核管理</a></li>
                    <%--<li class="${menuid==38?'dangqiande':'' }"><a href="/center/manageCheckSet">质量信誉考核项目设置</a></li>--%>
                    <%--<li class="${menuid==11?'dangqiande':'' }"><a href="/center/companyList">从业人员管理</a></li>--%>
                    <%--<li class="${menuid==11?'dangqiande':'' }"><a href="/center/companyList">专家库管理</a></li>--%>
                    <%--<li class="${menuid==11?'dangqiande':'' }"><a href="/center/companyList">等级评定逾期报警</a></li>--%>
                </ul>

            </li>
            <li class="${menuid==45 || menuid==46 ?'dangqiande':'' }"><a
                    href="/center/compInfoList">企业合格证使用信息管理</a></li>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">账号管理</a></div>
                <ul>
                    <li class="${menuid==1?'dangqiande':'' }"><a href="/center/userInfo">基本信息一览</a></li>
                    <li class="${menuid==3?'dangqiande':'' }"><a href="/center/updatePass">修改密码</a></li>
                    <li class="${menuid==7?'dangqiande':'' }"><a href="javascript:logout()">退出登录</a></li>
                </ul>
            </li>

        </ul>
    </div>
    <%--</c:when>--%>
    <%--</c:choose>--%>

    <div class="usermenu4 lmenu" style="display: none">
        <div class="zhengwu">运营商中心</div>
        <ul class="zheng_ul">
            <li class="${menuid==30?'dangqiande':'' } rule1"><a href="/center/runHome">首页</a></li>
            <li class="${menuid==66 ?'dangqiande':'' }"><a href="/center/suggestList">意见反馈</a></li>
            <li class="${menuid==5 || menuid==51 || menuid==17 ?'dangqiande':'' }"><a href="/center/repairInfo?role_id=4">爱车档案</a></li>
            <li class="${menuid==72 ?'dangqiande':'' }"><a href="/center/bindCarAudit">绑定车辆审核</a></li>

            <%--<li class="${menuid==6?'dangqiande':'' }"><a href="/center/myBindCar">绑定车辆</a></li>--%>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">服务管理</a></div>
                <ul>
                    <li class="${menuid==11?'dangqiande':'' }"><a href="/center/companyVisit">上门服务管理</a></li>
                    <li class="${menuid==12?'dangqiande':'' }"><a href="/center/companyAppoint">预约服务管理</a></li>
                    <li class="${menuid==13?'dangqiande':'' }"><a href="/center/companyServiceForyou">为您服务管理</a>
                    </li>
                </ul>
            </li>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">车大夫管理</a></div>
                <ul>
                    <li class="${menuid==100?'dangqiande':'' }"><a href="/cdf/managerExamine">车大夫管理</a></li>
                    <li class="${menuid==21?'dangqiande':'' }"><a href="/cdf/questionExamine">车大夫问题管理</a></li>
                    <li class="${menuid==22?'dangqiande':'' }"><a href="/cdf/answerExamine">车大夫回答管理</a></li>
                </ul>
            </li>
            <li class="nav_menu open rule1">
                <div><a href="javascript:void(0);">运输管理</a></div>
                <ul>
                    <li class="${menuid==102?'dangqiande':'' }"><a href="/center/transCompany">运输企业信息管理</a></li>
                    <li class="${menuid==103?'dangqiande':'' }"><a href="/center/techRecord">运输车辆技术档案</a></li>
                </ul>
            </li>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">文章信息管理</a></div>
                <ul>
                    <li class="${menuid==67?'dangqiande':'' }"><a href="/center/articlesInfo">文章信息列表</a></li>
                </ul>
            </li>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">满意度调查管理</a></div>
                <ul>
                    <li class="${menuid==69?'dangqiande':'' }"><a href="/center/satisfactionSurvey">满意度调查列表</a>
                    </li>
                </ul>
            </li>
            <li class="${menuid==63?'dangqiande':'' }"><a href="/center/corpInfo">维修企业信息管理</a></li>
            <%--<li class="nav_menu open">--%>
                <%--<div><a href="javascript:void(0);">维修企业评价管理</a></div>--%>
                <%--<ul>--%>
                    <%--<li class="${menuid==67?'dangqiande':'' }"><a href="/center/companyReviewList">维修企业评价列表</a>--%>
                    <%--</li>--%>
                <%--</ul>--%>
            <%--</li>--%>


            <li class="${menuid==91?'dangqiande':'' }"><a href="/center/sysLogInfo">用户行为日志列表</a></li>
            <li class="${menuid==7?'dangqiande':'' }"><a href="javascript:logout();">退出登录</a></li>
        </ul>
    </div>

    <div class="usermenu5 lmenu" style="display: none">
        <div class="zhengwu">专家中心</div>
        <ul class="zheng_ul">
            <li class="${menuid==30?'dangqiande':'' }"><a href="/cdf/question4Expert">首页</a></li>
            <li class="${menuid==5 || menuid==51 || menuid==17 ?'dangqiande':'' }"><a href="/center/repairInfo?role_id=5">爱车档案</a>
            </li>
            <%--<li class="${menuid==6?'dangqiande':'' }"><a href="/center/myBindCar">绑定车辆</a></li>--%>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">车大夫管理</a></div>
                <ul>
                    <li class="${menuid==23?'dangqiande':'' }"><a href="/cdf/question4Expert">车大夫问题管理</a></li>
                </ul>
            </li>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">账号管理</a></div>
                <ul>
                    <li class="${menuid==1?'dangqiande':'' }"><a href="/center/userInfo">基本信息一览</a></li>
                    <li class="${menuid==3?'dangqiande':'' }"><a href="/center/updatePass">修改密码</a></li>
                    <li class="${menuid==7?'dangqiande':'' }"><a href="javascript:logout()">退出登录</a></li>
                </ul>
            </li>
        </ul>
    </div>

    <div class="usermenu6 lmenu" style="display: none">
        <div class="zhengwu">协会中心</div>
        <ul class="zheng_ul">
            <%--<li class="${menuid==30?'dangqiande':'' }"><a href="/center/manageHome">首页</a></li>--%>
            <%--<li class="${menuid==44?'dangqiande':'' }"><a href="/center/recordCompInfo">电子健康档案</a></li>--%>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">管理服务</a></div>
                <ul>
                    <li class="${menuid==32?'dangqiande':'' }"><a href="/center/manageNotify">通知发布</a></li>
                    <li class="${menuid==39?'dangqiande':'' }"><a href="/center/manageNotes">通知管理</a></li>
                    <li><a href="http://218.242.195.69:3320/hytjglxt/login.vm" target="_blank">统计报表</a></li>
                    <li class="${menuid==43?'dangqiande':'' }"><a href="/center/downloadCenter">文件下载</a></li>
                </ul>

            </li>
        </ul>
    </div>

    <div class="usermenu7 lmenu" style="display: none">
        <div class="zhengwu">管理中心</div>
        <ul class="zheng_ul">
            <li class="${menuid==30?'dangqiande':'' }"><a href="/center/manageHome">首页</a></li>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">电子健康档案</a></div>
                <ul>
                    <li class="${menuid==44 || menuid==17?'dangqiande':'' }"><a href="/center/recordCompInfo">根据维修企业查找</a>
                    </li>
                    <li class="${menuid==18?'dangqiande':'' }"><a href="/center/repairInfo?role_id=7">根据维修记录查找</a></li>
                </ul>
            </li>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">管理服务</a></div>
                <ul>
                    <li class="${menuid==32?'dangqiande':'' }"><a href="/center/manageNotify">通知发布</a></li>
                    <li class="${menuid==39?'dangqiande':'' }"><a href="/center/manageNotes">通知管理</a></li>
                    <li class="${menuid==50?'dangqiande':'' }"><a href="/center/manageReview">通知审核</a></li>
                    <li class="${menuid==33?'dangqiande':'' }"><a href="/center/manageComplain">反馈管理</a></li>
                    <li class="${menuid==34?'dangqiande':'' }"><a href="/center/manageSurvey">问卷调查</a></li>
                    <li><a href="http://218.242.195.69:3320/hytjglxt/login.vm" target="_blank">统计报表</a></li>
                    <li class="${menuid==43?'dangqiande':'' }"><a href="/center/downloadCenter">文件下载</a></li>
                </ul>

            </li>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">登录信息</a></div>
                <ul>
                    <li class="logininfo company"><a href="/center/manageLoginInfo?type=company">企业登录信息</a></li>
                    <li class="logininfo manager"><a href="/center/manageLoginInfo?type=manager">管理部门登录信息</a></li>
                </ul>
            </li>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">企业员工人才管理</a></div>
                <ul>
                    <li class="${menuid==62?'dangqiande':'' }"><a href="/center/recordCompEmpInfo">按维修企业查询</a>
                    </li>
                    <li class="${menuid==61?'dangqiande':'' }"><a href="/center/companyEmployeeList">按维修企业员工查询</a>
                    </li>
                </ul>
            </li>

            <li class="nav_menu open">
                <div><a href="javascript:void(0);">企业资料</a></div>
                <ul>
                    <li class="${menuid==36?'dangqiande':'' }"><a href="/center/manageCompInfo">维修企业信息管理</a></li>
                    <li class="${menuid==37?'dangqiande':'' }"><a href="/center/manageQualCheck">质量信誉考核管理</a></li>
                </ul>

            </li>

            <li class="${menuid==45 || menuid==46 ?'dangqiande':'' }"><a
                    href="/center/compInfoList">企业合格证使用信息管理</a></li>
            <li class="nav_menu open">
                <div><a href="javascript:void(0);">账号管理</a></div>
                <ul>
                    <li class="${menuid==1?'dangqiande':'' }"><a href="/center/userInfo">基本信息一览</a></li>
                    <li class="${menuid==3?'dangqiande':'' }"><a href="/center/updatePass">修改密码</a></li>
                    <li class="${menuid==7?'dangqiande':'' }"><a href="javascript:logout()">退出登录</a></li>
                </ul>
            </li>

        </ul>
    </div>

</div>
<style>
#companyComplainCount{
    margin-left: 5px;
    color: red;
}
</style>
<script>
    var notReadCountOfCompany=0
    $(function () {
        var auth= false
        if (localStorage.getItem('USERINFO')) {
            var info = JSON.parse(localStorage.getItem('USERINFO'))
            $(".usermenu" + info.showRole).show()
//		console.log(info)
            if (!info.isdisabled) {
                $(".usermenu2 .pass").show()
            } else {
                $(".usermenu2 .unpass").show()
            }


//            console.log(window.location.pathname)
            $(".lmenu a").each(function () {
                if($(this).attr("href")==window.location.pathname){
                    console.log($(this).parents(".lmenu"))
                    if($(this).parents(".lmenu").hasClass("usermenu"+info.showRole)||$(this).parents(".lmenu").hasClass("usermenu"+info.userRoleId)){
                        $(".lmenu").hide()
                        $(this).parents(".lmenu").show()
                        auth= true
                        return;
                    }else{
//                        layer.msg('对不起，您没有权限访问此功能。', {time: 2000, icon:5},function () {
//                            window.history.go(-1)
//                        })
                    }
                }else if(window.location.pathname=='/center/repairInfo'){
                    $(".lmenu").hide()
                    $(".usermenu" + (getUrlParam('role_id')||info.showRole)).show()
                }
            })

            if(info.userRoleId==2) {
                companyComplainCount()
                setInterval(function () {
                    notReadCountOfCompany=0
                    companyComplainCount()
                }, 1800000)
            }



        }

        $(".nav_menu > div").click(function () {
            var li = $(this).parent();
            if (li.hasClass('open')) {
                li.removeClass('open');
            } else {
                li.addClass('open');
            }
        })

        dangqiande('logininfo', 'type', 'company')
        dangqiande('logininfo', 'type', 'manager')
        function dangqiande(classname, key, name) {
            if( getUrlParam(key)==name) $('.'+classname+'.'+name).addClass('dangqiande')
        }

        rules()

    })

    function companyComplainCount() {
        getCompanyComplainCount(0)
        getCompanyComplainCount(1)
    }

    function getCompanyComplainCount(type) {
        simpleGet(baseu + '/comment/company/complaint/count/noread?complaintType='+type+'&accesstoken='+localStorage.getItem('ACCESSTOKEN'), function (res) {
            if(res.code=='000000'&&res.notReadCountOfCompany) notReadCountOfCompany+= parseInt(res.notReadCountOfCompany)
            if(notReadCountOfCompany>0 ){
                $("#companyComplainCount").text('('+notReadCountOfCompany+')')
            }else $("#companyComplainCount").text('')
        })
    }

    function rules() {
        var userinfo = localStorage.getItem('USERINFO');
        var pathname= window.location.pathname
        var needLogin= false;

        (!userinfo || JSON.parse(userinfo).userRoleId!=4) && pathname=='/center/runHome'? (needLogin=true) : false;
        (!userinfo || JSON.parse(userinfo).userRoleId!=2) && pathname=='/center/companyInfo'? (needLogin=true) : false;

        var showRule=''
        //菜单可见度
        if(userinfo){
            switch (JSON.parse(userinfo).telphone){
                case '17317147935':{
                    showRule='.rule1'

                    $(".zheng_ul>li").hide()
                    $(showRule).show()
                    needLogin= true
                    $(showRule+" a").each(function () {
                        if($(this).attr('href')==pathname) needLogin=false
                    })
                    break;
                }
            }

        }


        if(needLogin){
            window.location.href= '/toLogin?reUrl='+ pathname
        }
    }
</script>