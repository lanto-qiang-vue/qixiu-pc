<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp"%>
    <%@ include file="/WEB-INF/pages/common/head.jsp"%>
    <script src="${btx}/js/front/login.js"></script>
    <style>
        body {
            text-align: center;
            background-image: url('${btx}/images/315/huabanglongbai-detail-bg.jpg');
            background-repeat:no-repeat;
            background-size:100% 100%;
            -moz-background-size:100% 100%;
            /*width:600px;*/
            margin-left:auto;
            margin-right:auto;
            width: 900px;
        }

        .shop-detail {
            width:800px;
            height: 800px;
            margin-top: 350px;
            margin-left:auto;
            margin-right:auto;
            padding-top: 700px;
        }

        .yuyue-btn {
            margin-top: 100px;
        }

    </style>
</head>
<body style="text-align: center">
<%--<%@ include file="/WEB-INF/pages/common/nav.jsp"%>--%>
<div class="shop-detail">
<a href="/maintain/online?company_id=5" class="yuyue-btn">
    <img src="${btx}/images/315/yuyue-btn.png" />
</a>
</div>
<%--<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>--%>
</body>
</html>
