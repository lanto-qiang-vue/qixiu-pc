<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp" %>
    <%@ include file="/WEB-INF/pages/common/head.jsp" %>
    <%--<script src="${btx}/js/front/myOrders.js"></script>--%>
    <%--<script src="${btx}/js/front/notifyDetail.js"></script>--%>
</head>
<style>
    .title {
        font-size: 13px;
        line-height: 16px;
    }

    .context {
        font-size: 13px;
        line-height: 16px;
    }

    .notify-detail-input {
        display: inline-block;
        width: 100%;
        height: 32px;
        line-height: 1.5;
        padding: 4px 7px;
        border: 1px solid #dddee1;
        border-radius: 4px;
        color: #495060;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
        transition: border .2s ease-in-out, background .2s ease-in-out, box-shadow .2s ease-in-out;
    }

    .extra li {
        width: 500px;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #cccccc;
    }

    .extra li a {
        color: red;
    }
</style>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp" %>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp" %>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">待审核通知详情</span> <span class="sp_wz">您所在位置：：
<a href="#" onClick="javascript :history.go(-1);">通知管理</a> > <span>待审核通知详情</span></span>
        </div>
        <div class="biaoge" style="overflow: auto">
            <div class="dblock">
                <%--<h1 class="dtitle title1">待审核的通知</h1>--%>
                <div style="width: 100%">
                    <div class="layui-form-item" style="margin-top: 10px;width:100%; ">
                        <p id="title" style="width: 92%;font-size:24px;text-align: center;margin:0 auto"></p>
                    </div>

                    <div class="layui-form-item" style="margin-top: 10px;width:100%; ">
                        <div style="width:100%;">
                            <p id="context" style="width: 92%;margin: 0 auto"></p>
                        </div>
                    </div>
                    <div class="layui-form-item" style="margin-top: 10px">
                        <label class="layui-form-label">附件下载</label>
                        <div class="layui-input-block">
                            <ul class="extra" style="width: 500px">
                                <%--<li><a href="">ssssssss</a></li>--%>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div style="text-align: center;">
                <button class="manageNotes-buttom" onclick="audit('2')" id="audit">审核</button>
                <button class="manageNotes-buttom" onclick="audit('3')" id="noAudit">驳回</button>
                <button class="manageNotes-buttom" onclick="javascript :history.go(-1);">后退</button>
                <button class="manageNotes-buttom recipient-button" id="recipient-button" onclick="recipient()">查看收件人</button>
            </div>
        </div>
    </div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>
<script type="text/javascript">
    $(function () {
        layer.load()
        var id = getUrlParam('id')
        var token = localStorage.getItem('ACCESSTOKEN'), url = ''
//        url = '/message/notify/getReceiveNotify/';
        var params = {
            accessToken: token,
            notifyId: id
        }

        accessPost(baseu + '/message/notify/getNotify',JSON.stringify(params), function (res) {
            handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
            // console.log(res)
            var data = res.data, content = '', url = [];
            content = JSON.parse(data.content).content
            url = JSON.parse(data.content).url
            $("#title").html(data.title)
            $("#context").html(content)
            var html = ""
            var fileName = ''
            for (var i in url) {
                if (url[i] != '' && url[i] != null) {
                    fileName = url[i].substring(url[i].lastIndexOf('/')+1)
                }
                html += "<li><a href='" + url[i] + "'>" + fileName + "</a></li>"
            }
            $(".extra").append(html)
             layer.closeAll('loading');
        })

//        accessGet(baseu + url + token, function (res) {
//            // console.log(res)
//            var datas = res.data, content = '', url = [];
//            for (var i in datas) {
//                if (datas[i].notifyId == id) {
//                    // console.log(datas[i])
//                    content = JSON.parse(datas[i].content).content
//                    url = JSON.parse(datas[i].content).url
//                    $(".title").val(datas[i].title)
//                    $(".context").val(content)
//                    // console.log(url)
//                    var html = ""
//                    for (var i in url) {
//                        html += "<li><a href='" + url[i] + "'>" + url[i] + "</a></li>"
//                    }
//                    $(".extra").append(html)
//                }
//            }
//            layer.closeAll('loading');
//        })
    })
    function audit(status) {
        layer.load()
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            notifyId: getUrlParam('id'),
            status: status
        }
        //查询我收到的通知
        accessPost(baseu+ '/message/notify/audit',JSON.stringify(param), function (res) {
            handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
            if('2' === status) {
                layer.msg('审核成功');
            } else {
                layer.msg('驳回成功');
            }
            $('#audit').hide()
            $('#noAudit').hide()
            layer.closeAll('loading');
        })
    }
    function recipient() {
        window.location.href = 'companyRecipients?id='+getUrlParam('id')+'&type=my';
    }
</script>
</html>
