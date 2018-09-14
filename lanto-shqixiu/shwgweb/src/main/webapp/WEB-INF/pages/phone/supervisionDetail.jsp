<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<title>${model.title }</title>
		<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
		<%@ include file="/WEB-INF/pages/phone/common/head.jsp"%>
	</head>

	<body>
		<div class="title-header">
			<h1>
				${model.title }
			</h1>
		</div>
		<input type="hidden" id="quesId" value="${model.quesId }"/>
		<div class="content htx" style="padding-top: 0px;">
			<b>问卷说明：</b>${model.content }
		</div>
		<div style="padding:10px 10px;">
			<c:forEach items="${list }" var="sub" varStatus="state">
				<div class="mui-card itemSelector" style="margin:10px 0px;" data-subject="${sub.SUBJECT_ID }" data-item="">
					<div class="mui-input-group">
						<div class="mui-input-row" style="line-height: 22px;font-size: 16px;min-height: 40px;height:100%;padding:10px;">
							<em style="font-size:18px;">${state.index + 1 }.</em>${sub.SUB_TITLE }
						</div>
						<c:forEach items="${sub.ITEMS }" var="item" varStatus="sta">
							<div class="mui-input-row mui-radio mui-left" style="line-height: 22px;height:100%;min-height: 40px;">
								<label>${item.ITEM_TAG }、${item.ITEM_NAME } </label>
								<input name="n_${sub.SUBJECT_ID }" type="radio" value="${item.ITEM_ID }" id="r_${item.ITEM_ID }">
							</div>
						</c:forEach>
					</div>
				</div>
			</c:forEach>
			<div class="tj-btn" style="text-align:center;margin-top:20px;">
				<button type="button" class="mui-btn mui-btn-primary" id="submitBtn">提交问卷</button>
			</div>
		</div>
	</body>

<script type="text/javascript">
var inProcess = false;
$(function(){
	jQuery("input:radio").change(function() {
		 $(this).parent().parent().parent('.itemSelector').removeClass("unSelected");
		 $(this).parent().parent().parent('.itemSelector').attr("data-item",$(this).val());
	});
	
	jQuery("#submitBtn").click(function(){
		
		var me = this;
		var flag = true;
		var datas = [];
		jQuery(".itemSelector").each(function(){
			var dataSubject = jQuery(this).attr("data-subject");
			var dataItem = jQuery(this).attr("data-item");
			if(dataItem == null || dataItem == ''){
				flag = false;
				jQuery(this).addClass("unSelected");
			}
			datas.push('{"subjectId":' + dataSubject + ',"itemId":' + dataItem + '}');
		});
		
		if(!flag){
			mui.toast('有答题未选择选项！');
			return false;
		}
		if(inProcess){
			return;
		}
		mui.confirm('确认要提交问卷吗？',"系统提示",['是', '否'],function(e){
			if (e.index == 0) {
				inProcess = true;
				jQuery(me).html("正在提交中...");
				var param = {
					"quesId" : $("#quesId").val(),
					"subjects" : '[' + datas.join(',') + ']'
				};
				console.log(param);
				var url = ctx + "/supervision/submitQuest.do";
				jQuery.ajax({
					url : url + "?random=" + Math.random(),
					data : param,
					type : "post",
					dataType : "json",
					success : function(e) {
						jQuery(me).html("提交问卷");
						if (e.success) {
							mui.alert('提交成功！',"系统提示","确定",function(){
								window.location.reload();
							});
						}else{
							mui.alert(e.title,"系统提示","确定");
						}							
						inProcess = false;
					},
					error : function() {
						jQuery(me).html("提交问卷");
						inProcess = false;
						mui.toast('非法请求！');
					},
					timeout : function() {
						jQuery(me).html("提交问卷");
						inProcess = false;
						mui.toast('请求超时！');
					}
				});
			}
		});
		
	});
});

</script>
</html>

