<%@page language="java" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="${btx}/css/job_detail.css">
    <%@ include file="/WEB-INF/pages/common/icon.jsp" %>
    <%@ include file="/WEB-INF/pages/common/head.jsp" %>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp" %>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp" %>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">岗位详情</span> <span class="sp_wz">您所在位置：<a
                href="${ctx}/center/userInfo">车主中心</a> > <span>岗位详情</span></span>
        </div>

        <div style="margin-top: 10px;float: right;">
            <input type="button" class="btn layui-btn layui-btn-normal"  value="返回" onclick="javascript:history.go(-1);"/>
        </div>

        <div id="jianli">

        </div>

    </div>


</div>

<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>

<script>

    var id = getUrlParam('id');
    var param1={
        accessToken: localStorage.getItem('ACCESSTOKEN'),
        postIds: id
    }
    var status; var status2;
    //检查该用户有没有重复申请岗位
    accessPost(baseu+ '/center/checkPostUnique', JSON.stringify(param1), function (res) {
        if(res.code == "0"){
            status = 0;
        }else{
            status=1;
        }
        if(res.code2 == "0"){
            status2 = 0;
        }else{
            status2=1;
        }
            initData(status,status2);
    })

    // 初始化页面数据(详情)
    function initData(status,status2) {
        var  status = status;
        var status2 = status2;
        var id = getUrlParam('id');
        if (id) {
            layer.load();

            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                id: id
            }
            accessPost(baseu + '/center/companyPost/detail/' + id, JSON.stringify(param), function (res) {
                handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                layer.closeAll('loading');
                console.log('res', res)

                var data = res.data, postDesc = '', html = '';
                postDesc = data.postDesc;
                if (data == null) {
                    layer.msg(res.status, {time: 3000, icon: 5})
                    return false;
                }
                console.log('data', data)
                html +='<div class="leftCon"><div class="item_con pos_info"><div class="pos_base_info"><span class="pos_title"> '+ data.postName + '</span><span class="pos_salary">';//岗位名称
                if (data.salaryType == 1) {
                    html += '<span class="font18">日薪：';
                }//薪资类型
                if (data.salaryType == 2) {
                    html += '<span class="font18">月薪：';
                }
                if (data.salaryType == 3) {
                    html += '<span class="font18">年薪：';
                }

                if (data.salaryType == 1) {
                    html += '</span>30-50元</span></div>';
                }//薪资范围
                if (data.salaryType == 2) {
                    html += '</span>60-80元</span></div>';
                }
                if (data.salaryType == 3) {
                    html += '</span>80-100元</span></div>';
                }
                if (data.salaryType == 4) {
                    html += '</span>100元以上</span></div>';
                }
                if (data.salaryType == 5) {
                    html += '</span>2000-3000元</span></div>';
                }
                if (data.salaryType == 6) {
                    html += '</span>3000-4000元</span></div>';
                }
                if (data.salaryType == 7) {
                    html += '</span>4000-5000元</span></div>';
                }
                if (data.salaryType == 8) {
                    html += '</span>5000元及以上</span></div>';
                }
                if (data.salaryType == 9) {
                    html += '</span>20000-40000元</span></div>';
                }
                if (data.salaryType == 10) {
                    html += '</span>50000-80000元</span></div>';
                }
                if (data.salaryType == 11) {
                    html += '</span>90000-110000元</span></div>';
                }
                if (data.salaryType == 12) {
                    html += '</span>12万元及以上</span></div>';
                }

                if (data.postType == 1) {
                    html += '<span class="pos_name">实习职位</span>';
                }//岗位职能
                if (data.postType == 2) {
                    html += '<span class="pos_name">社会职位</span>';
                }
                if (data.postType == 3) {
                    html += '<span class="pos_name">基层职位</span>';
                }

                html += '<div class="pos_base_condition"><span class="item_condition pad_left_none"> 招' + data.recruitNum + '人 </span>';//招聘人数

                if (data.minEducation == 1) {
                    html += '<span class="item_condition">初中及以下</span>';
                }//最低学历
                if (data.minEducation == 2) {
                    html += '<span class="item_condition">高中</span>';
                }
                if (data.minEducation == 3) {
                    html += '<span class="item_condition">中专</span>';
                }
                if (data.minEducation == 4) {
                    html += '<span class="item_condition">中技</span>';
                }
                if (data.minEducation == 5) {
                    html += '<span class="item_condition">大专</span>';
                }
                if (data.minEducation == 6) {
                    html += '<span class="item_condition">本科</span>';
                }
                if (data.minEducation == 7) {
                    html += '<span class="item_condition">硕士</span>';
                }
                if (data.minEducation == 8) {
                    html += '<span class="item_condition">博士</span>';
                }

                if (data.minEducation == 1) {
                    html += '<span class="item_condition border_right_None">无工作经验</span></div>';
                }//工作年限
                if (data.minEducation == 2) {
                    html += '<span class="item_condition border_right_None">1年工作经验</span></div>';
                }
                if (data.minEducation == 3) {
                    html += '<span class="item_condition border_right_None">2年工作经验</span></div>';
                }
                if (data.minEducation == 4) {
                    html += '<span class="item_condition border_right_None">3 - 4年工作经验</span></div>';
                }
                if (data.minEducation == 5) {
                    html += '<span class="item_condition border_right_None">5 - 7年工作经验</span></div>';
                }
                if (data.minEducation == 6) {
                    html += '<span class="item_condition border_right_None">8 - 9年工作经验</span></div>';
                }
                if (data.minEducation == 7) {
                    html += '<span class="item_condition border_right_None">10年以上工作经验</span></div>';
                }

                html += '<div class="pos-area"><span class="pos_area_span pos_address"><i class="icon iconfont icon_dingwei"></i><span class="pos_area_item">工作地点：</span></span><span>' + data.address + '</span> </div>';//地址

                if(status==0){
                    html += '<div class="pos_operate"><a class="btn btn-orange btn-large applyJobBtn disabledBtn" href="javascript:void(0)">已申请</a>';//申请职位
                    if(status2==1){
                        html += '<a class="btn btn-orange btn-large "  style="height: 54px;line-height: 54px;" href="jobResumeList?postIds='+data.id+'">再次申请</a>';//申请职位  disabledBtn
                    }
                }else{
                    html += '<div class="pos_operate"><a class="btn btn-orange btn-large applyJobBtn " href="jobResumeList?postIds='+data.id+'">申请职位</a>';//申请职位  disabledBtn
                }


                html += '</div></div><div class="item_con"><div class="subitem_con pos_description"><h2 class="title">职位描述</h2><div class="posDes"><div class="des">'

                html +=  postDesc ; //职位描述
                html += '</div><div class="Job requirements">年龄：' + data.minAge + ' - ' + data.maxAge + '岁<br>工作性质：';

                if (data.workProperty == '1') {
                    html +='全职<br>';
                } else {
                    html +='兼职<br>';
                }

                html+='招聘期限：'+formatDate(data.beginTime, 'yyyy-MM-dd')+' 至 '+formatDate(data.endTime, 'yyyy-MM-dd')+'</div></div></div></div> </div>';


                $("#jianli").html(html)

            })
        }
    }

</script>
</body>
</html>
