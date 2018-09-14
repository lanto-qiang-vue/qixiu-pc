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

<div class="supervision">
    <div class="pro_t">
        	<span class="wenti">维修反馈</span>
            <span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>公众监督</span> > <span>维修反馈</span></span>
        </div>
    <div class="examine" style="height: 628px;">
    	<div>
    		<h2 style="color:#6f6b6b;font-size:16px;padding:0px 20px;margin-top:10px;"><b>反馈电话：</b></h2>
    		<div style="font-size:15px;line-height:25px;margin:5px 0px 10px 0px;padding:0px 16px;">
			    市民热线：<span style="font-style: italic;color:#03a9f4;margin-right:60px;font-size:20px;"><b>12345</b></span>
			    城建热线：<span style="font-style: italic;color:#03a9f4;margin-right:60px;font-size:20px;"><b>12319</b></span>
			    全国运输客服电话：<span style="font-style: italic;color:#03a9f4;font-size:20px;"><b>12328</b></span>
    		</div>
    	</div>
		<%--<div class="user-info">--%>
			<%--<form class="layui-form layui-form-pane">--%>
				<%--<div class="layui-form-item">--%>
					<%--<label class="layui-form-label">类型<font color="red">*</font></label>--%>
					<%--<div class="layui-input-block">--%>
						<%--<select name="type" lay-verify="required">--%>
							<%--<c:forEach items="${typeList }" var="item" varStatus="state">--%>
								<%--<option value="${item.codeId }">${item.codeDesc }</option>--%>
							<%--</c:forEach>--%>
						<%--</select>--%>
					<%--</div>--%>
				<%--</div>--%>
				<%--<div class="layui-form-item">--%>
					<%--<label class="layui-form-label">标题<font color="red">*</font></label>--%>
					<%--<div class="layui-input-block">--%>
						<%--<input type="text" name="title" lay-verify="required"--%>
							<%--placeholder="请输入标题" autocomplete="off" class="layui-input">--%>
					<%--</div>--%>
				<%--</div>--%>

				<%--<div class="layui-form-item">--%>
					<%--<label class="layui-form-label">投诉企业</label>--%>
					<%--<div class="layui-input-block">--%>
						<%--<input type="text" name="unitName"--%>
							<%--placeholder="请输入投诉企业" autocomplete="off" class="layui-input">--%>
					<%--</div>--%>
				<%--</div>--%>
				<%----%>
				<%--<div class="layui-form-item">--%>
					<%--<label class="layui-form-label">涉及车辆</label>--%>
					<%--<div class="layui-input-block">--%>
						<%--<input type="text" name="involveCar" --%>
							<%--placeholder="请输入涉及车辆" autocomplete="off" class="layui-input">--%>
					<%--</div>--%>
				<%--</div>--%>
				<%----%>
				<%--<div class="layui-form-item">--%>
					<%--<label class="layui-form-label">投诉人</label>--%>
					<%--<div class="layui-input-block">--%>
						<%--<input type="text" name="name" --%>
							<%--placeholder="请输入投诉人" autocomplete="off" class="layui-input">--%>
					<%--</div>--%>
				<%--</div>--%>
				<%----%>
				<%--<div class="layui-form-item">--%>
					<%--<label class="layui-form-label">联系电话</label>--%>
					<%--<div class="layui-input-block">--%>
						<%--<input type="text" name="linkTel" --%>
							<%--placeholder="请输入联系电话" autocomplete="off" class="layui-input">--%>
					<%--</div>--%>
				<%--</div>--%>

				<%--<div class="layui-form-item layui-form-text" style="height:140px;">--%>
					<%--<label class="layui-form-label">情况说明<font color="red">*</font></label>--%>
					<%--<div class="layui-input-block" style="max-height:100px;">--%>
						<%--<textarea placeholder="请输入情况说明" name="content" class="layui-textarea" lay-verify="required" style="resize: none;"></textarea>--%>
					<%--</div>--%>
				<%--</div>--%>

				<%--<div class="layui-form-item">--%>
				    <%--<div class="layui-input-block">--%>
				      <%--<button class="layui-btn layui-btn-normal" lay-submit="" lay-filter="submit" id="submitBtn"><i class="layui-icon">&#xe642;</i> 提交投诉</button>--%>
				    <%--</div>--%>
				  <%--</div>--%>
			<%--</form>--%>
		<%--</div>--%>
    </div>
</div>


<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
layui.use('form', function(){
	  var form = layui.form;
	  
	  form.on('submit(submit)', function(data){
		  layer.confirm('确认要提交吗？', {
				icon:3,
				btn : ['确定', '取消']
				}, function() {
					ajaxLoading("${ctx}/supervision/submitComplain.do",data.field,$("#submitBtn"),'正在提交中...',function(ret){
						layer.alert('提交成功！', {icon : 1,end:function(){
							window.location.reload();
						}});
					});
				});
		    return false;
		  });
	  form.render();
	});
</script>
</html>
