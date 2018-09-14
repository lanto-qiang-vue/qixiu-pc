<%--
  Created by IntelliJ IDEA.
  User: lvjj
  Date: 2018/2/5
  Time: 16:27
  To change this template use File | Settings | File Templates.
--%>
<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp"%>
    <%@ include file="/WEB-INF/pages/common/head.jsp"%>
    <%--<script src="${btx}/js/front/myQuestions.js"></script>--%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">简历中心</span> <span class="sp_wz">您所在位置：<a
                href="${ctx}/center/userInfo">车主中心</a> > <span>简历中心</span></span>
        </div>
        <div class="biaoge">
            </br>
            <button class="layui-btn layui-btn-normal layui-btn-xs" id="selectResume" style="font-size:10px;margin-bottom: 5px;">确定</button>
            <button class="layui-btn layui-btn-normal layui-btn-xs" id="back" style="font-size:10px;margin-bottom: 5px;margin-left: 3px;">返回到职位列表</button>
            <table class="gridtable">
                <tr>
                    <th style="text-align: center;"width="8%"><input type="checkbox" class="main_class"/></th>
                    <th width="10%" align="center">简历</th>
                    <th width="20%" align="center">创建时间</th>
                    <th width="20%" align="center">操作</th>
                </tr>
                <tbody id="tablebody">

                </tbody>
            </table>
            <input type="hidden" value="${postIds}" class="postIds">
            <div id="pagebar" style="text-align:center;margin-top:5px;"></div>
        </div>
    </div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
    var laypage = layui.laypage;
    var limit,page;
    $(function () {
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            postIds : $(".postIds").val()
        }
        accessPost(baseu+ '/center/getJobResumeList', JSON.stringify(param), function (res) {
            var html = '', data = res.data;
            if(data){
                for (var i in data){
                    var editButtonHtml = ( '<button class="layui-btn layui-btn-normal layui-btn-xs" onclick="updateResume(' + data[i].id + ')" style="font-size:10px">查看简历详情</button>' );
                    html+='<tr>' +
                        '<td style="text-align: center"><input type="checkbox" class="sub_class" value="' + data[i].id + '"/></td>' +
                        '<td style="text-align: center;">'+("我的简历")+'</td>' +
                        '<td style="text-align: center;">'+formatDate(data[i].createTime, "yyyy-MM-dd hh:mm:ss")+'</td> '+
                        // '<td>'+ open + '</td>' +
                        '<td style="text-align: center;">'+ editButtonHtml + '</td>'
                        +'</tr>'
                }
                $("#tablebody").html(html)
            }else{
                $("#tablebody").html("<tr><td colspan='4' style='text-align: center;'>您还没有添加简历！请前往简历中心添加简历</td></tr>")
            }
        });
        //实现全选功能
        $(".main_class").click(function () {
            if($(".main_class").is(":checked")){
                $(".sub_class").prop("checked",true);
            }else{
                $(".sub_class").prop("checked",false);
            }
        })
        $("#selectResume").click(function() {
            var resumeId = "";
            var arr = [];
            $("input[class='sub_class']:checked").each(function () {
                resumeId += $(this).val() + ",";
            })
            if(resumeId != '' && resumeId != null){
                arr = resumeId.split(",");
            }
            if (arr[0] != null && arr[0] != '' && arr[1] != null && arr[1] != '') {
                layer.msg("只能选择一份简历!", {time: 2000, icon: 7});
                return;
            }
            if (arr.length == 0) {
                layer.msg("请选择一份简历!", {time: 2000, icon: 7});
                return;
            }
            var param2={
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                postIds: $(".postIds").val(),
                resumeId:parseInt(resumeId.substring(0,resumeId.lastIndexOf(",")))
            }
            var param1={
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                postIds: $(".postIds").val()
            }
            //检查该用户有没有重复申请岗位
            accessPost(baseu+ '/center/checkPostUnique', JSON.stringify(param1), function (res) {
                if(res.code == "0"){
                    layer.msg("该岗位已申请,不能重复申请,请重新申请!",{time:2000,icon: 7});
                }else{
                    accessPost(baseu+ '/center/applyPost', JSON.stringify(param2), function (res) {

                        if(res.code == "000000"){

                            layer.alert('恭喜您！申请岗位成功!', {
                                skin: 'blue' //样式类名 自定义样式
                                ,closeBtn: 1  // 是否显示关闭按钮
                                ,anim: 1 //动画类型
                                ,btn: ['确定'] //按钮
                                ,icon: 6  // icon
                                ,yes:function(){
                                    window.history.back();
                                }
                            });
                            //layer.msg(res.status,{icon: 6});
                        }else{
                            layer.msg(res.status,{icon: 5});
                        }
                        //setTimeout(window.history.back(),7000);
                    })

                }
            })
            resumeId = '';
        })
        $("#back").click(function () {
            window.location.href = "${ctx}/center/searchJobsByCondition";
        })

    });

    function updateResume(id)
    {
        window.location.href = "${ctx}/center/addJobResume?id="+id;
    }

</script>
</html>

