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
	<span class="wenti">维修企业基本信息采集表</span>
</div>
<div class="examine" >
	<form class="layui-form layui-form-pane" action="">

		<div class="layui-form-item">
			<label class="layui-form-label">企业名称</label>
			<div class="layui-input-block">
				<input type="text" name="title" required  lay-verify="required" placeholder="请输入企业名称" autocomplete="off" class="layui-input">
			</div>
		</div>
		<div class="layui-form-item clear">
			<label class="layui-form-label">许可证号</label>
			<div class="layui-input-block">
				<input type="text" name="title" required  lay-verify="required" placeholder="请输入许可证号" autocomplete="off" class="layui-input">
			</div>
		</div>
		<div class="layui-form-item clear">
			<label class="layui-form-label">许可证有效期</label>
			<div class="layui-input-block">
				<input type="text" class="layui-input" id="effectiveDate" required  lay-verify="required" placeholder="请输入许可证有效期" autocomplete="off">
			</div>
		</div>
		<div class="layui-form-item" pane>
			<label class="layui-form-label">单选框</label>
			<div class="layui-input-block">
				<input type="radio" name="sex" value="男" title="男">
				<input type="radio" name="sex" value="女" title="女" checked>
			</div>
		</div>

	</form>

</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
    layui.use(['form', 'laydate'], function(){

        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#effectiveDate' //指定元素
        });

        var form = layui.form;

        form.render();

        //监听提交
        form.on('submit(formDemo)', function(data){
            layer.msg(JSON.stringify(data.field));
            return false;
        });
    });
$(function () {

})

</script>
<style>
	.clear {
		clear: none !important;
		float: left;
		width: 50%;
	}
</style>
</html>
