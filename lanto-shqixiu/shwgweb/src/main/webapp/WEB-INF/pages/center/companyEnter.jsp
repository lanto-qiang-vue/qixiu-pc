<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
	<%@ include file="/WEB-INF/pages/common/head.jsp"%>
	<script type="text/javascript" src="//api.map.baidu.com/api?v=2.0&ak=hUrYR4hH5XExjuf6qHt7TLDhyqM08GYF"></script>
	<%--<script src="${btx}/js/front/myOrders.js"></script>--%>
</head>
<style >
	.layui-form-item{
		width: 48%;
		display: inline-block;
		margin-top: 5px;
	}
</style>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
<div class="zhengwu_r">
<div class="zhengwu_t">
<span class="sp_zw">请完善资料</span> <span class="sp_wz">您所在位置：<a
href="${ctx}/center/userInfo">企业中心</a> > <span>企业详细信息填写</span></span>
</div>
<div class="biaoge" style="overflow: auto">
<form class="layui-form">
	<div class="layui-form-item">
		<label class="layui-form-label">企业名称</label>
		<div class="layui-input-block">
			<input type="text" name="companyname"  class="layui-input">
		</div>
	</div>

	<div class="layui-form-item">
		<label class="layui-form-label">许可证号</label>
		<div class="layui-input-block">
			<input type="text" name="companyroadtransportationlicense"  class="layui-input">
		</div>
	</div>
	<div class="layui-form-item">
		<label class="layui-form-label">统一社会信用代码</label>
		<div class="layui-input-block">
			<input type="text" name="companyunifiedsocialcreditidentifier"  class="layui-input">
		</div>
	</div>
	<div class="layui-form-item">
		<label class="layui-form-label">工商注册地址</label>
		<div class="layui-input-block">
			<input type="text" name="companyaddress"  class="layui-input">
		</div>
	</div>
	<div class="layui-form-item">
		<label class="layui-form-label">邮政编码</label>
		<div class="layui-input-block">
			<input type="text" name="companypostalcode"  class="layui-input">
		</div>
	</div>

	<div class="layui-form-item">
		<label class="layui-form-label">经济类型</label>
		<div class="layui-input-block">
			<select name="companyeconomiccategory" lay-filter="aihao">
				<option value="国有">国有</option>
				<option value="集体">集体</option>
				<option value="私营">私营</option>
				<option value="联营">联营</option>
				<option value="股份制">股份制</option>
				<option value="外商独资">外商独资</option>
				<option value="外商合资">外商合资</option>
				<option value="外商合作">外商合作</option>
				<option value="港澳台投资">港澳台投资</option>
				<option value="其他">其他</option>
			</select>
		</div>
	</div>

	<div class="layui-form-item">
		<label class="layui-form-label">经营业务类别</label>
		<div class="layui-input-block">
			<select name="companycategory" lay-filter="aihao">
				<option value="01">一类维修经营业务</option>
				<option value="02">二类维修经营业务</option>
				<option value="03">三类维修经营业务</option>
			</select>
		</div>
	</div>

	<div class="layui-form-item">
		<label class="layui-form-label">法人手机</label>
		<div class="layui-input-block">
			<input type="text" name="corporatetel"  class="layui-input">
		</div>
	</div>
	<div class="layui-form-item">
		<label class="layui-form-label">联系人姓名</label>
		<div class="layui-input-block">
			<input type="text" name="companylinkmanname"  class="layui-input">
		</div>
	</div>
	<div class="layui-form-item">
		<label class="layui-form-label">联系人手机</label>
		<div class="layui-input-block">
			<input type="text" name="companylinkmantel"  class="layui-input">
		</div>
	</div>
	<div class="layui-form-item">
		<label class="layui-form-label">负责人姓名</label>
		<div class="layui-input-block">
			<input type="text" name="companysuperintendentname"  class="layui-input">
		</div>
	</div>
	<div class="layui-form-item">
		<label class="layui-form-label">负责人手机</label>
		<div class="layui-input-block">
			<input type="text" name="companysuperintendenttel"  class="layui-input">
		</div>
	</div>
	<div class="layui-form-item">
		<label class="layui-form-label">企业经营范围</label>
		<div class="layui-input-block">
			<input type="text" name="companybusinessscope"  class="layui-input">
		</div>
	</div>

	<div class="layui-form-item">
		<label class="layui-form-label">许可证起始日期</label>
		<div class="layui-input-block">
			<input type="text" name="roadtransportationlicensestartdate" placeholder="格式20100101"  class="layui-input">
		</div>
	</div>

	<div class="layui-form-item">
		<label class="layui-form-label">许可证有效期至</label>
		<div class="layui-input-block">
			<input type="text" name="roadtransportationlicenseenddate" placeholder="格式20100101"  class="layui-input">
		</div>
	</div>

	<div class="layui-form-item">
		<label class="layui-form-label">经营状态</label>
		<div class="layui-input-block">
			<select name="companyoperationstate" lay-filter="aihao">
				<option value="1">营业</option>
				<option value="2">停业</option>
				<option value="3">整改</option>
				<option value="6">注销</option>
				<option value="9">其他</option>
			</select>
		</div>
	</div>

	<div class="layui-form-item">
		<label class="layui-form-label">企业注册区域</label>
		<div class="layui-input-block">
			<select id="area" name="companyadministrativedivisioncode" lay-filter="aihao">

			</select>
		</div>
	</div>

	<div class="layui-form-item">
		<label class="layui-form-label">企业邮箱</label>
		<div class="layui-input-block">
			<input type="text" name="companyemail"  class="layui-input">
		</div>
	</div>

	<div class="layui-btn  layui-btn-normal"
	        style="display: block; margin: auto;width: 200px"
	        lay-submit=""
	        lay-filter="loginSubmit">提交</div>

</form>

</div>
</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>

<script type="text/javascript">
$(function () {
    layui.use('form', function(){
        var form = layui.form;




        form.on('submit(loginSubmit)', function(data){
            console.log(data.field)
	        var params= data.field;
            params.companypassword= crandom(12);
            params.accessToken= localStorage.getItem('ACCESSTOKEN')
            var myGeo = new BMap.Geocoder();
            myGeo.getPoint('上海市'+ params.companyaddress, function(point){
                if (point) {
//				console.log(point)
                    params.companyaddresspoint= point.lng+ ','+ point.lat;
                }
            })

	        var url= baseu+ '/company/repaircompany/add'
	        simplePost(url, JSON.stringify(params), function(res){
				handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
	            if(res.code!='000000'){
                    layer.msg(res.status, {time: 5000, icon:5});
	            }else{
                    layer.msg(res.status, {time: 5000, icon:1},function () {
                        //重新登录
                        var token= localStorage.getItem('ACCESSTOKEN')
                        simpleGet(baseu+ '/user/useraccount/logout/'+ token, function(res){
                            localStorage.removeItem('ACCESSTOKEN')
                            localStorage.removeItem('USERINFO')
                            // window.location.reload();
                            var memberUri = $("#memberUri").html();
                            window.location.href = ctx + "/toLogin?reUrl=" + memberUri;
                        })
                    })
	            }

	            console.log(res)
	        })
        })

        systemCall(function (systok) {
//            console.log(res)
	        simpleGet(baseu+'/area/county/'+systok+'/310100' ,function (res) {
                for (var i in res.data){
                    $("#area").append('<option value="'+res.data[i].areakey+'">'+res.data[i].areaname+'</option>')
                }

                form.render();
            })


        })


    })
})
</script>
</html>
