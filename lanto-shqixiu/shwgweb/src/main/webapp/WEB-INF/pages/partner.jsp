<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>

<div class="about">
    <img class="bg" src="${btx}/images/about_bg.jpg" />
    <div class="msg">
        <img src="${btx}/images/about_msg.jpg">
        <div class="">
            <p>请使用以下方式联系我们：</p>
            <i></i>
            <%--<p>公司地址：上海市长宁区淞虹路207号明基商务广场C座</p>--%>
            <p>服务热线：400-663-8210 </p>
            <p>邮箱：contact@lantoev.com</p>
        </div>
    </div>
</div>

<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
</html>
