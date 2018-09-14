<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>

<div class="Government industry page" style="height:100%;display: table;">
	<div class="zhengwu_l" style="height:100%;min-height:750px;">
    	<div class="zhengwu">协会治理</div>
        <ul class="zheng_ul">
        	<li class="${type=='summary'?'dangqiande':'' }"><a href="${ctx}/assoinfo/summary">协会简介</a></li>
        	<li class="${type=='function'?'dangqiande':'' }"><a href="${ctx}/assoinfo/function">协会职能</a></li>
        	<li class="${type=='10281013'?'dangqiande':'' }"><a href="${ctx}/industry/10281013">工作动态</a></li>
        	<li class="${type=='10281014'?'dangqiande':'' }"><a href="${ctx}/industry/10281014">行业风采</a></li>
        	<li class="${type=='10281015'?'dangqiande':'' }"><a href="${ctx}/industry/10281015">行业党建</a></li>
	        <li class="${type=='10281008'?'dangqiande':'' }"><a href="${ctx}/industry/10281008">行业能手</a></li>
	        <li class="${type=='specialist'?'dangqiande':'' }"><a href="${ctx}/specialist">专家组</a></li>
        </ul>
    </div>
	<div class="zhengwu_r" style="height:100%;min-height:750px;">
    	<div class="zhengwu_t">
        	<span class="sp_zw">${typeName }</span>
            <span class="sp_wz"><a href="">首页</a> > <span>协会治理</span> > <span>${typeName }</span></span>
        </div>
        <div class="detailpage">
        	<%--<h1>${info.title }</h1>--%>
        	<%--<h2>${time } 来源: ${info.dataFrom }</h2>--%>
            ${info.content }
        </div>
    </div>
</div>

<script>
$(function () {
//    var arr=[], text=''
//	$("span").each(function () {
//        arr= $(this).text().split("。")[0].split("、")
//		if(arr[0]=="洪永楠"){
//		    for( var i in arr){
//                text+= "<a href='/specialist#"+arr[i]+"'>"+ arr[i]+"</a>、"
//		    }
//            text= (text.substring(0,text.length-1)+ "。")
//            $(this).html(text)
//		}
//    })
})
</script>

<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
</html>
