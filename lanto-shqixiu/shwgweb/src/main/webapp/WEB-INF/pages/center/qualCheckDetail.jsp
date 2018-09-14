<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
	<%@ include file="/WEB-INF/pages/common/head.jsp"%>
	<%--<script src="${btx}/js/front/myOrders.js"></script>--%>
	<%--<script src="${btx}/js/front/notifyDetail.js"></script>--%>
</head>
<style>
	/*.title{*/
		/*font-size: 13px;*/
		/*line-height: 16px;*/
	/*}*/
	/*.context{*/
		/*font-size: 13px;*/
		/*line-height: 16px;*/
	/*}*/
	.recipient-button{
		display: none;
	}
    .notify-detail-input{
	display: inline-block;
	width: 100%;
	height: 32px;
	line-height: 1.5;
	padding: 4px 7px;
	border: 1px solid #dddee1;
	border-radius: 4px;
	color: #495060;
	background-color: #fff;
	background-image: none;
	position: relative;
	cursor: text;
	transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
}
.extra li{
	width: 500px;
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #cccccc;
}
.extra li a{
	color: red;
}
</style>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
<div class="zhengwu_r">
<div class="zhengwu_t">
<span class="sp_zw">质量信誉考核管理</span> <span class="sp_wz">您所在位置：
<a href="#" onClick="javascript :history.go(-1);">质量信誉考核管理</a> > <span>考核详情</span></span>
</div>
<div class="biaoge" style="overflow: auto">
	<div class="dblock">
		<%--<h1 class="dtitle title1">考核内容</h1>--%>
		<div style="width:70%">
			<div class="layui-form-item">
				<label class="layui-form-label">考核标题</label>
				<div class="layui-input-block">
					<input type="text" id="title" name="title" required  placeholder="请输入标题"
						    class="layui-input notify-detail-input">
				</div>
			</div>
			<div class="layui-form-item">
				<label class="layui-form-label">考核状态</label>
				<div class="layui-input-block">
					<input type="text" id="status" name="status" required  placeholder="请输入状态"
						   class="layui-input notify-detail-input">
				</div>
			</div>
			<div class="layui-form-item layui-form-text">
				<label class="layui-form-label">考核描述</label>
				<div class="layui-input-block">
                        <div id="description" name="description" placeholder="请输入考核描述"
								  class="layui-textarea notify-detail-input" required></div>
				</div>
			</div>
			<div class="layui-form-item" style="margin-top: 10px">
				<label class="layui-form-label">考核附件</label>
				<div class="layui-input-block">
					<ul class="extra" style="width: 500px">
						<%--<li><a href="">ssssssss</a></li>--%>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div style="text-align: center;">
		<button class="manageNotes-buttom removeCss" onclick="audit('2')" id="release">发布</button>
		<button class="manageNotes-buttom removeCss" onclick="audit('3')" id="cancel">撤销</button>
		<button class="manageNotes-buttom" onclick="javascript :history.go(-1);">后退</button>
	</div>
		</div>
	</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
$(function () {
    if(localStorage.getItem('USERINFO')){
        var info= JSON.parse(localStorage.getItem('USERINFO'))
        console.log('role',info)
        if(info.userRoleId == 3){
            $("#release").removeClass("removeCss")
            $("#cancel").removeClass("removeCss")
        }
    }
    var id = getUrlParam('id'), token = localStorage.getItem('ACCESSTOKEN'), url = ''
    layer.load()
	var param = {
        accessToken: token,
        id: id
    }
    accessPost(baseu + '/reputation-assessmant/detail', JSON.stringify(param), function (res) {
		handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
        console.log(res)
        var data = res.data;
        console.log('data.title',data.title)
//        url = JSON.parse(data.content).url
        if(data.status == 1){
            data.status = '待发布'
        }else if(data.status == 2){
            data.status = '已发布'
            $('#release').hide()
        }else {
            data.status = '已撤销'
            $('#cancel').hide()
        }

        $("#title").val(data.title)
        $("#status").val(data.status)
        $("#description").html(data.description)
        var html = ""
        var fileName = ''
            fileName = data.fileurl.substring(data.fileurl.lastIndexOf('/')+1)
            html += "<li><a href='" + data.fileurl + "'>" + fileName + "</a></li>"
        $(".extra").append(html)
        layer.closeAll('loading');
    })
//    if (getUrlParam('type') == 'my') {
//        layer.load()
//
//    } else {
//
//    }

})
function audit(status) {
    layer.load()
    var param={
        accessToken: localStorage.getItem('ACCESSTOKEN'),
        id: getUrlParam('id'),
        status: status
    }
    accessPost(baseu+ '/reputation-assessmant/update-status',JSON.stringify(param), function (res) {
		handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
        if('2' === status) {

            layer.msg('发布成功');
			setTimeout(function(){ window.location.href = 'manageQualCheck'},1000);

        } else {

            layer.msg('撤销成功');
            setTimeout(function(){ window.location.href = 'manageQualCheck'},1000);
        }
        layer.closeAll('loading');
    })
}
</script>
<style>
	.removeCss{
		display: none;
	}
</style>
</html>
