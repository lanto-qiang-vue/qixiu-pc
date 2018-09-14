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
			<span class="sp_zw">汽车电子健康档案</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/companyHome"><span id="centerName"></span></a> > <span>电子健康档案</span></span>
		</div>
		<form class="layui-form" >
			<div class="layui-form-item" style="width: 300px;margin-top: 20px;display: inline-block">
				<label class="layui-form-label">车牌号</label>
				<div class="layui-input-block">
					<input id="carcard" type="text" name="title"  placeholder="请输入车牌号" autocomplete="off" class="layui-input">
				</div>
			</div>
			<div class="layui-form-item" style="width: 300px;margin-top: 20px;display: inline-block" id="isVinShow">
				<label class="layui-form-label">VIN</label>
				<div class="layui-input-block">
					<input id="vin" type="text" name="title"  placeholder="请输入车辆识别号VIN" autocomplete="off" class="layui-input">
				</div>
			</div>
			<div class="layui-form-item" style="width: 300px;margin-top: 20px;display: inline-block" id="isShow">
				<label class="layui-form-label">维修企业</label>
				<div class="layui-input-block">
					<input id="companyname" type="text" name="title"  placeholder="请输入维修企业" autocomplete="off" class="layui-input">
				</div>
			</div>

			<div class="layui-form-item" style="width: 300px;margin-top: 20px;display: inline-block" >
				<label class="layui-form-label">车牌正确</label>
				<div class="layui-input-block">
					<select id="cardTrue">
						<option value="all">全部</option>
						<option value="yes">正确</option>
						<option value="no">错误</option>
					</select>
				</div>
			</div>

			<div class="layui-form-item" style="width: 300px;margin-top: 20px;display: inline-block" >
				<label class="layui-form-label">VIN正确</label>
				<div class="layui-input-block">
					<select id="vinTrue">
						<option value="all">全部</option>
						<option value="yes">正确</option>
						<option value="no">错误</option>
					</select>
				</div>
			</div>


			<div class="layui-form-item" style="width: 300px;margin-top: 20px;display: inline-block" >
				<label class="layui-form-label"></label>
				<div class="layui-input-block">
					<div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo">搜索</div>
					<div id="back" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 20px">后退</div>
				</div>
			</div>
		</form>

		<div class="biaoge" style="overflow: auto">
			<table id="table1" class="layui-table" lay-size="sm" style="width: 1000px">
				<colgroup>
					<col width="50"><col width="150"><col width="80"><col width="150"><col width="80"><col width="150"><col width="150"><col width="150">
				</colgroup>
				<thead>
				<tr>
					<th>序号</th>
					<th>车牌号码</th>
					<th>车牌正确</th>
					<th>车辆识别号VIN</th>
					<th>VIN正确</th>
					<th>送修日期</th>
					<th>结算编号</th>
					<th>维修企业</th>
				</tr>
				</thead>
				<tbody>

				</tbody>
			</table>

			<div id="pagebar" style="text-align:center;margin-top:5px;"></div>
		</div>
	</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
    $(function(){
        $("#back").click(function () {
            window.location.href='applyList'
        })
        if(getUrlParam('company_id')){
            $("#isShow").hide();
            console.log("id",getUrlParam('company_id'))
        }

        var form = layui.form;
        form.render()

        layui.use('laypage', function(){
            var laypage = layui.laypage;
            //执行一个laypage实例
            var vinParam = null;
            if(getUrlParam('vin')){
                $("#isVinShow").hide();
                vinParam = getUrlParam('vin');
                console.log("vin",vinParam)
            }else{
                $("#back").hide();
            }
            search('',vinParam,'','','', 10, 1, laypage)

        });

        $("#table1 tbody").on('click','tr', function () {
//            console.log(this)
//            window.location.href='recordDetail?id='+$(this).attr('id')
//            window.location.href='recordDetail?id='+$(this).attr('id')
            window.open('/center/recordDetail?id='+$(this).attr('id'), "_blank")
        })

        $("#search").click(function () {
            var vinParam = $("#vin").val();
            if(getUrlParam('vin')){
                vinParam = getUrlParam('vin');
                console.log("vin",vinParam)
            }
            search($("#carcard").val(),vinParam,$("#companyname").val(),$("#cardTrue").val(),$("#vinTrue").val(), 10, 1, laypage)
        })

        var info= JSON.parse(localStorage.getItem('USERINFO'));
        var roleId = info.userRoleId;
        if(roleId == 1){
            $("#centerName").text("车主中心");
        }
        if(roleId == 4){
            $("#centerName").text("运营商中心");
        }
        if(roleId == 5){
            $("#centerName").text("专家中心");
        }
    });

    function search(carcard,vin,companyname, cardTrue, vinTrue,limit, page, laypage) {
        var ii = layer.load();
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            vehicleplatenumber: (carcard ? carcard : ''),
            pageSize: (limit ? limit : 10),
            pageNo: page,
            vin:  (vin ? vin : null),
            companyId: getUrlParam('company_id'),
            companyName:  (companyname ? companyname : ''),
            byVehicleNumberStandard: cardTrue,
            byVinStandard: vinTrue
        }
        accessPost(baseu+ '/vehicle/carfile/query4manager', JSON.stringify(param), function (res) {
            console.log(res)
            if(res.code == '120516'){
                layer.msg(res.status);
            }
            layer.close(ii);
            var html='', data=res.data;
            for (var i in data){
                html+='<tr id="'+data[i].repairbasicinfoId+'"><td>'+(parseInt((param.pageNo - 1) * param.pageSize + parseInt(i) + 1))+'</td> <td>'+(data[i].checkVehicleNumberSuccess?data[i].vehicleplatenumber:('<span style="color: red">'+data[i].vehicleplatenumber+'</span>'))+'</td><td>'+(data[i].checkVehicleNumberSuccess?'是':'<span style="color: red">否</span>')+'</td> <td>'+(data[i].checkVinSuccess?data[i].vin:('<span style="color: red">'+data[i].vin+'</span>'))+'</td> <td>'+(data[i].checkVinSuccess?'是':'<span style="color: red">否</span>')+'</td><td>'+data[i].repairdate+'</td> <td>'+data[i].costlistcode+'</td><td>'+data[i].companyname+'</td></tr>'
            }
            $("#table1 tbody").html(html)

            if(laypage){
                laypage.render({
                    elem: 'pagebar'
                    ,count: res.count //数据总数，从服务端得到
                    ,layout: ['count', 'prev', 'page', 'next']
                    ,jump: function(obj, first){
                        //obj包含了当前分页的所有参数，比如：
                        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
//                        console.log(obj.limit); //得到每页显示的条数
                        //首次不执行
                        if(!first){
                            search(carcard,vin,companyname, cardTrue, vinTrue,limit, obj.curr)
                            //do something
                        }
                    }
                });
            }


        })
    }
</script>
</html>
