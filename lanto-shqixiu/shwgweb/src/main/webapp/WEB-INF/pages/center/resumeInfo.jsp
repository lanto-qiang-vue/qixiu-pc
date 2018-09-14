<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp" %>
    <%@ include file="/WEB-INF/pages/common/head.jsp" %>
    <%--<script src="${btx}/js/front/myOrders.js"></script>--%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp" %>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp" %>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">岗位管理</span> <span class="sp_wz">您所在位置：<a
                href="${ctx}/center/manageHome">企业中心</a> > <span>岗位管理</span></span>
        </div>

        <div class="biaoge" style="overflow: auto">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <table class="layui-table larry-table-info">
                    <colgroup>
                        <col width="150">
                        <col>
                        <col width="150">
                        <col>
                    </colgroup>
                    <thead>
                        <tr>
                            <th colspan="4">个人信息</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><span class="tit">姓名:</span></td>
                        <td><span class="realName"></span></td>
                        <td><span class="tit">手机:</span></td>
                        <td><span class="mobile"></span></td>
                    </tr>
                    <tr>
                        <td><span class="tit">性别:</span></td>
                        <td><span class="sex"></span></td>
                        <td><span class="tit">邮箱地址:</span></td>
                        <td><span class="email"></span></td>
                    </tr>
                    <tr>
                        <td><span class="tit">出生日期:</span></td>
                        <td><span class="birthDate"></span></td>
                        <td><span class="tit">居住地:</span></td>
                        <td><span class="address"></span></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <table class="layui-table larry-table-info">
                    <colgroup>
                        <col width="150">
                        <col>
                        <col width="150">
                        <col>
                    </colgroup>
                    <thead>
                        <tr>
                            <th colspan="4">求职意向</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><span class="tit">期望薪资:</span></td>
                        <td><span class="expectSalary"></span></td>
                        <td><span class="tit">期望职位:</span></td>
                        <td><span class="expectPost"></span></td>
                    </tr>
                    <tr>
                        <td><span class="tit">工作地方:</span></td>
                        <td><span class="workRegion"></span></td>
                        <td><span class="tit">工作类型:</span></td>
                        <td><span class="workType"></span></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <table class="layui-table larry-table-info">
                    <colgroup>
                        <col width="150">
                        <col>
                        <col width="150">
                        <col>
                    </colgroup>
                    <thead>
                    <tr>
                        <th colspan="4">教育经历</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><span class="tit">时间:</span></td>
                        <td><span class="educationStartDate"></span>&nbsp;&nbsp;-&nbsp;&nbsp;<span class="educationEndDate"></span></td>
                        <td><span class="tit">学校:</span></td>
                        <td><span class="schoolName"></span></td>
                    </tr>
                    <tr>
                        <td><span class="tit">学历:</span></td>
                        <td><span class="degree"></span></td>
                        <td><span class="tit">专业:</span></td>
                        <td><span class="major"></span></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <table class="layui-table larry-table-info">
                    <colgroup>
                        <col width="150">
                        <col>
                        <col width="150">
                        <col>
                    </colgroup>
                    <thead>
                    <tr>
                        <th colspan="4">工作经历</th>
                    </tr>
                    </thead>
                    <tbody class="work">
                    <tr>
                        <td><span class="tit">时间:</span></td>
                        <td><span class="workStartTime"></span>&nbsp;&nbsp;-&nbsp;&nbsp;<span class="workEndTime"></span></td>
                        <td><span class="tit">公司名称:</span></td>
                        <td><span class="corpName"></span></td>
                    </tr>
                    <tr>
                        <td colspan="4"><span class="industry"></span>&nbsp;&nbsp;<span class="department"></span>&nbsp;&nbsp;<span class="post"></span></td>
                    </tr>
                    <tr>
                        <td><span class="tit">工作描述:</span></td>
                        <td colspan="3"><span class="workDesc"></span></td>
                    </tr>
                    </tbody>
                </table>
                <a class="layui-btn layui-btn-normal" href="javascript:void(0)" onclick="history.back()">返回</a>
            </div>
        </div>
    </div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>
<script type="text/javascript">
    $(function () {
        var id = getUrlParam('id');
        var type = getUrlParam('type');
        console.log('id', id);

        var userinfo = JSON.parse(localStorage.getItem('USERINFO'))
        if (!userinfo) {
            layer.msg('请先进行登录');
            setTimeout(function () {
                window.location.href = "${ctx}" + "/toLogin?reUrl=" + "${memberUri}";
            }, 2000)
        }

        if (id) {
            var ii = layer.load();
            //详情显示
            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                Id: id
            }
            accessPost(baseu + '/post/resume/detail/' + localStorage.getItem('ACCESSTOKEN') + '/' + id, JSON.stringify(param), function (res) {
                console.log('resDetail: ', res);
                var data = res.data;
                if (data) {
                    console.log('data: ', data);
                    $('.realName').html(data.realName);
                    $('.sex').html(data.sex == 1 ? '男':'女' );
                    $('.birthDate').html(formatDate(data.birthDate, 'yyyy-MM-dd'));
                    $('.mobile').html(data.mobile);
                    $('.email').html(data.email);
                    $('.address').html(data.address);
                    var expectSalary="";
                    if(data.expectSalary==1){
                        expectSalary="2000-3000"
                    }
                    if(data.expectSalary==2){
                        expectSalary="3000-4000"
                    }
                    if(data.expectSalary==3){
                        expectSalary="4000-5000"
                    }
                    if(data.expectSalary==4){
                        expectSalary="5000及以上"
                    }
                    $('.expectSalary').html(expectSalary);
                    $('.expectPost').html(data.expectPost);
                    $('.workRegion').html(data.workRegion);
                    $('.workType').html(data.workType == 1?'全职':'兼职');
                    $('.educationStartDate').html(formatDate(data.educationStartDate, 'yyyy-MM-dd'));
                    $('.educationEndDate').html(formatDate(data.educationEndDate, 'yyyy-MM-dd'));
                    $('.schoolName').html(data.schoolName);
                    $('.degree').html(data.degree == 1 ? '本科':(data.degree == 2 ?'大专':(data.degree == 3 ? '中专':(data.degree == 4 ? '高中':'初中及以下'))));
                    $('.major').html(data.major);
                    $('.majorDesc').html(data.majorDesc);

                    if (data.workExperiencePOS.length > 0) {
                        var htmle = $('.work').clone(true).end().hide();
                        var html = '';
                        for (var i = 0; i < data.workExperiencePOS.length; i++) {
                            htmle.find('.corpName').html(data.workExperiencePOS[i].corpName);
                            htmle.find('.post').html(data.workExperiencePOS[i].post);
                            htmle.find('.department').html(data.workExperiencePOS[i].department);
                            htmle.find('.industry').html(data.workExperiencePOS[i].industry);
                            htmle.find('.workDesc').html(data.workExperiencePOS[i].workDesc);
                            htmle.find('.workStartTime').html(formatDate(data.workExperiencePOS[i].workStartDate, 'yyyy-MM-dd'));
                            htmle.find('.workEndTime').html(formatDate(data.workExperiencePOS[i].workEndDate, 'yyyy-MM-dd'));
                            html += htmle.html();
                        }
                        $('.work').html(html).show();
                    }
                }
                layer.closeAll();
            });
        }
    });
</script>
</html>
