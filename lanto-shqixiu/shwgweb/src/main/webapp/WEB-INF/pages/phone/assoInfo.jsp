<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<title>${typeName }</title>
		<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
		<%@ include file="/WEB-INF/pages/phone/common/head.jsp"%>
	</head>

	<body>
		<div class="title-header">
			<h1>
				${typeName }
			</h1>
		</div>
		<div class="content htx">
			${content }
		</div>
	</body>

<script type="text/javascript">
$(function(){	
	//var maxWidth = $(window).width() - 25;
	$(".content img").each(function(){
		//console.log($(this).width() + ':' + $(window).width());
		//if($(this).width() > maxWidth){
			$(this).css('max-width','100%');
			$(this).css('height','100%');
			$(this).attr("data-preview-src","");
			$(this).attr("data-preview-group","1");
		//}
	});
	mui.previewImage();
});
</script>
</html>

