<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp" %>
    <%@ include file="/WEB-INF/pages/common/head.jsp" %>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp" %>

<div class="supervision">
    <div class="pro_t">
        <span class="wenti">维修反馈</span>
        <span class="weizhi">我所在的位置：<a href="/shwgweb/index">首页</a> &gt; <span>公众监督</span> &gt; <span>维修反馈</span></span>
    </div>
    <div class="examine" style="height: 628px;">
        <div>
            <h2 style="color:#6f6b6b;font-size:16px;padding:0px 20px;margin-top:10px;"><b>商务合作：</b></h2>
            <div style="font-size:15px;line-height:25px;margin:5px 0px 10px 0px;padding:0px 16px;">
                商务合作热线：<span
                    style="font-style: italic;color:#03a9f4;margin-right:60px;font-size:20px;"><b>12345</b></span>
            </div>
        </div>
    </div>
</div>

<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
<script>
    $(function () {
        $(".detailpage img").bind("contextmenu", function (e) {
            return false;
        });
    })
</script>
</body>
</html>