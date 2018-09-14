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
<div class="Government archives">
	<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
	<div class="zhengwu_r">
		<div class="zhengwu_t">
			<span class="sp_zw">车辆档案</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/userInfo"><span id="centerName"></span></a> > <span>车辆档案</span></span>
		</div>
		<div class="biaoge">

			<form class="layui-form" >
				<div class="layui-form-item" style="width: 300px;margin-top: 20px;display: inline-block">
					<label class="layui-form-label">车牌号</label>
					<div class="layui-input-block">
						<input id="carcard" type="text" name="title"  placeholder="请输入车牌号" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item" style="width: 300px;margin-top: 20px;display: inline-block">
					<label class="layui-form-label">车架号</label>
					<div class="layui-input-block">
						<input id="vin" type="text" name="vin"  placeholder="请输入车架号" autocomplete="off" class="layui-input">
					</div>
				</div>

				<div class="layui-form-item">
						<div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo">搜索</div>
						<div id="bind" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 20px">绑定本人车辆</div>
						<div id="bindOther" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 20px">绑定他人车辆</div>
				</div>

				</form>
			<table id="table1" class="layui-table" lay-size="sm" style="width: 100%">
				<colgroup>
					<col width="50">
					<col width="150">
					<col width="150">
					<%--<col width="150">--%>
					<col width="150">
					<col width="150">
					<col width="300">
				</colgroup>
				<thead>
				<tr>
					<th>序号</th>
					<th>车牌号码</th>
					<th>车辆品牌</th>
					<%--<th>车系</th>--%>
					<th>车架号</th>
					<th>发动机号</th>
					<th>操 作</th>
				</tr>
				</thead>
				<tbody>

				</tbody>
			</table>

			<div id="pagebar" style="text-align:center;margin-top:5px;"></div>
		</div>
	</div>
</div>
<div id="form" style="display: none;margin-left: 10px">
	<table id="table2" class="layui-table" lay-size="sm" style="width: 500px">
		<colgroup>
			<col width="150">
			<col width="100">
		</colgroup>
		<thead>
		<tr>
			<th>已授权手机号</th>
			<th>操 作</th>
		</tr>
		</thead>
		<tbody>

		</tbody>
	</table>
</div>

<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
	var data={}
    $(function(){



        layui.use('laypage', function(){
            var laypage = layui.laypage;
            //执行一个laypage实例
            search('', 10, 1, laypage)

        });

        $("#table1 tbody").on('click','#mn-check', function () {
			if($(this).attr('status')=='1'){
                layer.open({title:'审核中', content:'绑定车辆信息正在审核中，请审核通过后再查看'});
			    return
			}
//            console.log(this)
            window.location.href='ownerRepairInfo?vin='+$(this).attr('vin')+'&vehicleplatenumber='+$(this).attr('vehicleplatenumber')
        })

        $("#search").click(function () {
            search($("#carcard").val(), 10, 1, laypage)
        })
        $("#bind").click(function () {
            window.location.href='myBindCar'
        })
        $("#bindOther").click(function () {
            window.location.href='bindOtherCar'
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


    function removeBind(id) {
        var ii = layer.load();
        var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            vehicleId: id,
        }
        accessPost(baseu + '/vehicle/carfile/remove-bind', JSON.stringify(param), function (res) {
            console.log("----",res)
            if (res.code == '000000') {
                search($("#carcard").val(), 10, 1, laypage)
            } else {
                layer.msg('操作失败', {time: 2000, icon:5});
            }
            layer.closeAll();
        })
    }

    function search(carcard, limit, page, laypage) {
        var ii = layer.load();
        var info= JSON.parse(localStorage.getItem('USERINFO'))
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            vehicleplatenumber: (carcard ? carcard : ''),
            pageSize: (limit ? limit : 10),
            pageNo: page,
            roleId: info.userRoleId,
            companyId: getUrlParam('company_id')||'',
            vin: $('#vin').val()
        }
        var display_btn = '';
//        if (info && info.userRoleId == 1) {
//            display_btn = 'inline-block';
//        } else {
//            display_btn = 'none'
//        }
        display_btn = 'inline-block';
        var url='/vehicle/company/queryVehicelist'
	    if (getUrlParam('role_id')=='1'){
            url= '/vehicle/owner/queryVehicelist'
	    }
        accessPost(baseu + url, JSON.stringify(param), function (res) {
            console.log("记录----",res)
            var html=''; data =res.data;
            for (var i in data){
                html+='<tr name="'+data[i].vin+'"><td>'+(parseInt(i)+1)+'</td>' +
                    ' <td>'+(data[i].vehicleplatenumber || '')+'</td>' +
                    ' <td>' + (data[i].brand || '') + '</td>' +
//                    ' <td></td>' +
//                    ' <td>' + (data[i].cartype || '') + '</td>' +
//                    ' <td></td>' +
                    ' <td>' + (data[i].vin || '') + '</td>' +
                    ' <td>' + (data[i].engineno || '') + '</td>' +
//                    ' <td></td>' +
                    '<td><button type="button" class="manageNotes-buttom" id="mn-check" vin="'+data[i].vin+'" status="'+data[i].status+'" vehicleplatenumber="'+data[i].vehicleplatenumber+'">查看</button>' +
                    '<button style="display: '+ display_btn  +'" type="button" class="manageNotes-buttom" id="remove-bind" onclick="removeBind(' + data[i].vehicleId  + ')" vehicleid="'+data[i].vehicleId+'">解绑</button>' +
	                (data[i].binds && data[i].binds.length?('<div class="manageNotes-buttom" onclick="relieve(' + data[i].vehicleId  + ')">解除授权</div>'):'')+
	                '</td> '+
                    ' </tr>'
            }
            $("#table1 tbody").html(html)

            if(laypage){
                laypage.render({
                    elem: 'pagebar'
                    ,count: res.total //数据总数，从服务端得到
                    ,jump: function(obj, first){
                        //obj包含了当前分页的所有参数，比如：
                        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
//                        console.log(obj.limit); //得到每页显示的条数
                        //首次不执行
                        if(!first){
                            search(carcard, limit, obj.curr)
                            //do something
                        }
                    }
                });
            }
            layer.closeAll();
            if(getUrlParam('comment')=='yes'){
                layer.msg('请选择维修记录进行评价', {time: 3000});
            }
//            layer.close(ii);
        })
    }

    function relieve(id) {
        var html=''
        for (var i in data){
            if(data[i].vehicleId==id){
                for(var j in data[i].binds){
                    html+='<tr><td>'+data[i].binds[j].mobile+'</td><td><div class="manageNotes-buttom" onclick="rebind(\'' + data[i].binds[j].binduserid  +'\',\''+data[i].vehicleplatenumber+ '\',\''+ id +'\')">解除</div></td></tr>'
                }
            }
        }
        console.log(data)
        $("#table2 tbody").html(html)
        layer.open({
            type: 1,
            content: $('#form'),
            title: "解除授权",
            area: ['520px', '400px'],
            cancel: function () {
                $("#form").hide()
            }
        });
    }
    
    function rebind(id, cardId, rowid) {
	    console.log(id)
	    console.log(cardId)
	    console.log(rowid)
	    var param={
            accessToken: localStorage.getItem("ACCESSTOKEN"),
            binduserid: id,
            vehicleNumber: cardId
	    }

        accessPost(baseu + '/scan/relieve', JSON.stringify(param), function (res) {
			console.log(res)
	        if(res.code=='000000'){
                layer.msg('解绑成功',{time: 1000},function () {
                    layer.closeAll()
                    $("#form").hide()
                    search('', 10, 1, laypage)
                })

	        }else{
	            layer.msg(res.status, {
	                icon: 5,
	                time: 2000 //2秒关闭（如果不配置，默认是3秒）
	            });
	        }
        })
    }
    
</script>
</html>
