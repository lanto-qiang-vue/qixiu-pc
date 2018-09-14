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

	<div class="supervision" style="height:100%;">
		<div class="pro_t">
			<span class="wenti">满意度调查</span> <span class="weizhi">我所在的位置：<a
				href="${ctx}/index">首页</a> > <span>公众监督</span> > <span>满意度调查</span></span>
		</div>
		<div class="examine" style="height:100%;margin-bottom:10px;">
			<div class="pro_t" style="text-align:center;">
				<span class="wenti" style="text-align:center;width: 100%;"><b>${model.title }</b></span>
			</div>
			<input type="hidden" id="quesId" value="${model.quesId }"/>
			<div class="questionnaire">
				<!--  <h1>${model.title }</h1>-->
				<h2>问卷说明：</h2>
				<div class="qu-box">
					${model.content }
				</div>
				<div class="quest-box">
					<c:forEach items="${list }" var="sub" varStatus="state">
						<div class="q1">
							<h3>
								<em>${state.index + 1 }.</em>${sub.SUB_TITLE }
							</h3>
							<div class="itemSelector" data-subject="${sub.SUBJECT_ID }" data-item="">
								<ul>
									<c:forEach items="${sub.ITEMS }" var="item" varStatus="sta">
										<li>
											<input name="n_${sub.SUBJECT_ID }" type="radio" value="${item.ITEM_ID }" id="r_${item.ITEM_ID }" />
											<label for="r_${item.ITEM_ID }">${item.ITEM_TAG }、${item.ITEM_NAME } </label>
										</li>
									</c:forEach>
	
								</ul>
							</div>
						</div>
					</c:forEach>
					<div class="tj-btn">
						<span
							style="color:#f33;float:left;margin-top:10px;font-size:13px;padding-left:50px;"
							id="error_result"></span> <a href="javascript:void(0);"
							class="btn-box" id="submitBtn">提交问卷</a>
					</div>
				</div>
			</div>

		</div>

	</div>

	<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
var inProcess = false;
$(function(){
	$("input:radio").change(function() {
		 $(this).parent().parent().parent('.itemSelector').removeClass("unSelected");
		 $(this).parent().parent().parent('.itemSelector').attr("data-item",$(this).val());
	});
	
	$("#submitBtn").click(function(){
		var me = this;
		var flag = true;
		$("#error_result").html('');
		var datas = [];
		$(".itemSelector").each(function(){
			var dataSubject = $(this).attr("data-subject");
			var dataItem = $(this).attr("data-item");
			if(dataItem == null || dataItem == ''){
				flag = false;
				$(this).addClass("unSelected");
			}
			datas.push('{"subjectId":' + dataSubject + ',"itemId":' + dataItem + '}');
		});
		
		if(!flag){
			$("#error_result").html('有答题未选择选项！');
			return false;
		}
		if(inProcess){
			return;
		}
		inProcess = true;
		$(me).html("正在提交中...");
		var param = {
			"quesId" : $("#quesId").val(),
			"subjects" : '[' + datas.join(',') + ']'
		};
		var url = ctx + "/supervision/submitQuest.do";
		$.ajax({
			url : url + "?random=" + Math.random(),
			data : param,
			type : "post",
			dataType : "json",
			success : function(e) {
				$(me).html("提交问卷");
				if (e.success) {
					layer.alert('提交成功！', {icon : 1,end:function(){
						window.location.href= '${ctx}/supervision/questions';
					}});
				}else{
					$("#error_result").html(e.title);
				}							
				inProcess = false;
			},
			error : function() {
				$(me).html("提交问卷");
				inProcess = false;
				$("#error_result").html('非法请求或登录已超时');
			},
			timeout : function() {
				$(me).html("提交问卷");
				inProcess = false;
				$("#error_result").html('请求超时');
			}
		});
	});
});

</script>
</html>
