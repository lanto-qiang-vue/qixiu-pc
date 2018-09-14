<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp" %>
    <%@ include file="/WEB-INF/pages/common/head.jsp" %>
</head>
<body class="employee-class">
<%@ include file="/WEB-INF/pages/common/nav.jsp" %>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp" %>
    <div class="zhengwu_r" style="overflow: hidden;">
        <div class="pro_t">
            <div>
                <span class="wenti">岗位详细信息</span>
            </div>
            <div>
                <button id="editButton" class="layui-btn layui-btn-normal" style="float:right;margin-top: 6px;"
                        onclick="history.back()">返回
                </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button class="layui-btn layui-btn-normal" style="float:right;margin-right :10px;margin-top: 6px;"
                        id="applyOnePost">申请该职位
                </button>
            </div>
        </div>
        <div class="examine" style="position: relative">
            <form class="layui-form layui-form-pane" action="" style="margin-top: 15px;">
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>公司名称</label>
                    <div class="layui-input-block">
                        <input type="text" name="virtualCompanyName" required lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>岗位名称</label>
                    <div class="layui-input-block">
                        <input type="text" name="post_name" required lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>上班地址</label>
                    <div class="layui-input-block">
                        <input type="text" name="address" required lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>岗位类型</label>
                    <div class="layui-input-block">
                        <input type="text" name="post_type" required lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>招聘人数</label>
                    <div class="layui-input-block">
                        <input type="text" name="recruit_num" required lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>工作性质</label>
                    <div class="layui-input-block">
                        <input type="text" name="work_property" required lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>薪资类型</label>
                    <div class="layui-input-block">
                        <input type="text" name="salary_type" required lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>薪资</label>
                    <div class="layui-input-block">
                        <input type="text" name="salary" required lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>岗位描述</label>
                    <div class="layui-input-block">
                        <input type="text" name="post_desc" required lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>工作年限</label>
                    <div class="layui-input-block">
                        <input type="text" name="work_life" required lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>最低学历</label>
                    <div class="layui-input-block">
                        <input type="text" name="min_education" required lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>年龄范围</label>
                    <div class="layui-input-block">
                        <input type="text" name="ageRange" required lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>招聘时间</label>
                    <div class="layui-input-block">
                        <input type="text" name="timeRange" required lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>

<script type="text/javascript">
    var id = getUrlParam('id');

    // 初始化页面数据(详情)
    function initData() {
        if (id) {
            var ii = layer.load();
            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                postId: id
            }
            accessPost(baseu + '/center/detail/' + id, JSON.stringify(param), function (res) {
                handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                layer.closeAll('loading');
                var data = res.postDetails;
                if (data != null) {
                    console.log(data);
                    //岗位职能
                    var postType = data.post_type;
                    if(postType == 1){
                        postType = "实习职位";
                    }else if(postType == 2){
                        postType = "社会职位";
                    }else{
                        postType = "基层职位";
                    }
                    //工资类型
                    var salaryType = data.salary_type;
                    if(salaryType == 1){
                        salaryType = "日薪";
                    }else if(salaryType == 2){
                        salaryType = "月薪";
                    }else{
                        salaryType = "年薪";
                    }
                    var salary = data.salary;
                    if(salary == 1){
                        salary = '30-50'
                    }else if(salary == 2){
                        salary = '60-80'
                    }else if(salary == 3){
                        salary = '80-100'
                    }else if(salary == 4){
                        salary = '100以上'
                    }else if(salary == 5){
                        salary = '2000-3000'
                    }else if(salary == 6){
                        salary = '3000-4000'
                    }else if(salary == 7){
                        salary = '4000-5000'
                    }else if(salary == 8){
                        salary = '5000及以上'
                    }else if(salary == 9){
                        salary = '20000-40000'
                    }else if(salary == 10){
                        salary = '50000-80000'
                    }else if(salary == 11){
                        salary = '90000-110000'
                    }else{
                        salary = "12万及以上";
                    }

                    var work_life = data.work_life;
                    switch (work_life){
                        case 1 :
                            work_life = "无工作经验";
                            break;
                        case 2 :
                            work_life = "1年";
                            break;
                        case 3 :
                            work_life = "2年";
                            break;
                        case 4:
                            work_life = "3年-4年";
                            break;
                        case 5 :
                            work_life = "5年-7年";
                            break;
                        case 6 :
                            work_life = "8年-9年";
                            break;
                        default:
                            work_life = "10年以上";
                    }

                    var min_education = data.min_education;
                    switch (min_education){
                        case 1 :
                            min_education = "初中及以下";
                            break;
                        case 2 :
                            min_education = "高中";
                            break;
                        case 3 :
                            min_education = "中专";
                            break;
                        case 4:
                            min_education = "中技";
                            break;
                        case 5 :
                            min_education = "大专";
                            break;
                        case 6 :
                            min_education = "本科";
                            break;
                        case 7 :
                            min_education = "硕士";
                            break;
                        default:
                            min_education = "博士";
                    }

                    $('input[name="virtualCompanyName"]').val(data.virtualCompanyName);
                    $('input[name="post_name"]').val(data.post_name);
                    $('input[name="address"]').val(data.address);
                    $('input[name="post_type"]').val(postType);
                    $('input[name="recruit_num"]').val(data.recruit_num == 0?"若干":data.recruit_num);
                    $('input[name="work_property"]').val(data.work_property == 1?"全职":"兼职");
                    $('input[name="salary_type"]').val(salaryType);
                    $('input[name="salary"]').val(salary);
                    $('input[name="post_desc"]').val(data.post_desc);
                    $('input[name="work_life"]').val(work_life);
                    $('input[name="min_education"]').val(min_education);
                    $('input[name="ageRange"]').val(data.min_age+"岁 ~ "+data.min_age+"岁");
                    $('input[name="timeRange"]').val(formatDate(data.begin_time,'yyyy-MM-dd')+" ~ "+formatDate(data.end_time,'yyyy-MM-dd'));

                    $('#position').find('input[value=' + data.position + ']').next('div').click(); // 岗位
                } else {
                    layer.msg(res.status, {time: 2000, icon: 5});
                    layer.close(ii);
                }
            })
        }
    }

    initData();

    $(function () {
        $("input[type='text']").attr("readonly",true);
        $("#applyOnePost").click(function(){
            var param1={
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                postIds: id
            }
            //检查该用户有没有重复申请岗位
            accessPost(baseu+ '/center/checkPostUnique', JSON.stringify(param1), function (res) {

                if(res.code == "0"){
                    layer.msg("该岗位已申请,不能重复申请,请重新申请!",{time:2000,icon: 7});
                }else{
                    window.location.href = "jobResumeList?postIds="+ id;
                }
            })
        })
    });
</script>
<style>
    .common-input60 {
        width: 60%;
    }

    .common-upload {
        position: absolute;
        right: 10px;
        top: 15px;
        width: 35%;
    }

    .site-demo-upload {
        margin: 0 auto;
    }

    .static-width-radio .layui-form-radio {
        width: 170px;
    }

    .layui-upload-img {
        height: 92px;
    }

    .box {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #000;
        opacity: 0.1;
    }

    .shouldInput {
        border: 1px solid red !important;
    }

    .require-icon {
        margin-right: 5px;
        color: red;
    }
</style>
</html>
<script src="${btx}/js/zooming.js"></script>
