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
            <span class="wenti">满意度调查详情</span>
            <button id="back" class="layui-btn layui-btn-normal" style="float:right;margin-top: 6px;margin-left: 10px"
                    onclick="back()">返回
            </button>
        </div>
        <div class="examine" style="position: relative">
            <div class="pro_t" style="text-align:center;">
                <span class="wenti" id="title" style="text-align:center;width: 100%;">
                    <%--<b>汽车维修服务平台调查</b>--%>
                </span>
            </div>
            <div class="questionnaire">
                <h2>问卷说明：</h2>
                <div class="qu-box" id="content">
                    <%--<span>对上海市汽车维修服务平台进行调查</span>--%>
                </div>
                <div class="quest-box" id="dataList" style="position:absolute; height:400px; overflow:auto;left:5%">
                    <%--<dl>--%>
                        <%--<dt style="font-size: 16px;font-weight: 400;line-height: 35px;"><span class="color">1.</span>版面设计如何？</dt>--%>
                        <%--<dd class="position">A、很好  <span style="float: right;">（30人选择）</span></dd>--%>
                        <%--<dd class="position">B、好 <span style="float: right;">（30人选择）</span></dd>--%>
                        <%--<dd class="position">C、一般 <span style="float: right;">（30人选择）</span></dd>--%>
                    <%--</dl>--%>
                    <%--<dl>--%>
                        <%--<dt style="font-size: 16px;font-weight: 400;line-height: 35px;"><span class="color">1.</span>版面设计如何？</dt>--%>
                        <%--<dd class="position">A、很好<span style="float: right;">（30人选择）</span></dd>--%>
                        <%--<dd class="position">B、好<span style="float: right;">（30人选择）</span></dd>--%>
                        <%--<dd class="position">C、一般<span style="float: right;">（30人选择）</span></dd>--%>
                    <%--</dl>--%>
                </div>
            </div>
        </div>
    </div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>

<script type="text/javascript">
    // 初始化页面数据(详情)
    function initData() {
        var id = getUrlParam('quesId');
        var title = '';
        var content = '';
        var dd = '';
        var dl = '';
        if (id) {
            layer.load();

            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                quesId: id
            }
            accessPost(baseu + '/admin/question/detail/' + id, JSON.stringify(param), function (res) {
                handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                layer.closeAll('loading');
                console.log('res',res)
                var data = res.data;
                if(data == null){
                    layer.msg(res.status, {time: 3000, icon: 5})
                    return false;
                }
                title = '<b>' + (data.title || '') + '结果' + '</b>'
                content = '<span>' + (data.content || '' )+ '</span>'
                var dataQuestion = data.subjectPO;
                console.log('data',data)
                console.log('dataQuestion',dataQuestion)


                $.each(dataQuestion,function(n,val) {
                    var dds = "";
                    console.log('val',val)
                    $.each(val.subjectItemPOList,function(i,item) {
                        console.log('item',item)
                        dds += '<dd class="position">' + item.itemTag +'、' + item.itemName + '<span style="float: right;">' + '(' + item.tagNumber + '人选择)' + '</span></dd>';
                    });
                    var dls = "";
                    dls += '<dl>' +
                        '<dt style="font-size: 16px;font-weight: 400;line-height: 35px;"><span class="color">' +parseInt(n+1) + '.' + '</span>' + val.subTitle + '</dt>'
                        + dds +
                        '</dl>';
                    dl += dls;
                });
                $("#dataList").html(dl);
                $("#title").html(title)
                $("#content").html(content)

            })
        }
    }

    initData();


    $(function () {

    });


    function back(){
        window.location.href = 'satisfactionSurvey';
    }

</script>
<style>
    .position{
        line-height: 35px;
        font-size: 14px;
        padding-right: 30px;
        padding-left: 30px;
    }
    .color{
        color: #245AAB;
        font-weight: 600;
    }
</style>
</html>
<script src="${btx}/js/zooming.js"></script>