<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
	<%@ include file="/WEB-INF/pages/common/head.jsp"%>
	<%--<script src="${btx}/js/front/myOrders.js"></script>--%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
	<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
	<div class="zhengwu_r">
		<div class="zhengwu_t">
			<span class="sp_zw">问卷调查</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/manageHome">管理中心</a> > <span>问卷调查</span></span>
		</div>
		<div class="biaoge" style="overflow: auto">
			<form class="layui-form" action="" style="width: 500px;margin-top: 10px">
				<div class="layui-form-item">
					<label class="layui-form-label">问卷标题</label>
					<div class="layui-input-block">
						<input type="text" name="title" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
					</div>
				</div>


				<div class="layui-form-item layui-form-text">
					<label class="layui-form-label">问卷内容</label>
					<div class="layui-input-block">
						<textarea name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>
					</div>
				</div>

				<button type="button" class="layui-btn layui-btn-normal" id="upload" style="margin-left: 100px">
					<i class="layui-icon">&#xe67c;</i>上传附件
				</button>

				<button class="layui-btn layui-btn-normal" style="float: right">发布问卷</button>
			</form>
		</div>
	</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
$(function () {
    layui.use('upload', function(){
        var upload = layui.upload;

        //执行实例
        var uploadInst = upload.render({
            elem: '#upload' //绑定元素
            ,url: baseu+'/upload/' //上传接口
            ,accept: 'file'
            ,done: function(res){
                //上传完毕回调
            }
            ,error: function(){
                //请求异常回调
            }
        });
    });
})
</script>
</html>
