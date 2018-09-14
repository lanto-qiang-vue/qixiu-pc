<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<script src="${btx}/js/front/forgetPass.js"></script>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>

<script>
    switch (JSON.parse(localStorage.getItem("USERINFO")).userRoleId){
        case 1: window.location.href = 'center/applyList';break
//        case 2: window.location.href = 'center/companyRecord';break
        case 2: window.location.href = 'center/repairInfo';break
        case 3: window.location.href = 'center/manageRecord';break
    }
</script>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
</html>
