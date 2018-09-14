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
			<span class="sp_zw">维修数据上报查询</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/companyHome">企业中心</a> > <span>维修数据上报查询</span></span>
		</div>
        <form class="layui-form" >
            <div class="layui-form-item" style="width: 300px;margin-top: 20px;display: inline-block">
                <label class="layui-form-label">维修单号</label>
                <div class="layui-input-block">
                    <input id="costlistcode" type="text" name="title"  placeholder="请输入维修单号" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item" style="width: 300px;margin-top: 20px;display: inline-block">
                <label class="layui-form-label">维修车牌</label>
                <div class="layui-input-block">
                    <input id="vehicleplatenumber" type="text" name="title"  placeholder="请输入维修车牌" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 60px">搜索</div>
        </form>
		<div class="biaoge" style="overflow: auto">
			<table id="table1" class="layui-table" lay-size="sm" >
				<colgroup>
					<col width="150"><col width="150"><col width="200"><col width="150"><col width="150">
				</colgroup>
				<thead>
				<tr>
					<th>上传时间</th>
					<th>维修单号</th>
					<th>维修内容</th>
					<th>维修车牌</th>
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
<script src="${btx}/js/front/company/upload.js"></script>
</body>
<script type="text/javascript">
    $(function(){


        layui.use('laypage', function(){
            var laypage = layui.laypage;
            //执行一个laypage实例
            search(10, 1, laypage)

        });


        $("#search").click(function () {
            search(10, 1, laypage)
        })

        $("#table1 tbody").on('click','tr', function () {
//            console.log(this)
            window.location.href='recordDetail?id='+$(this).attr('id')
        })

//        $("#search").click(function () {
//            search($("#carcard").val())
//        })

    });

    function search(limit, page, laypage) {
        var ii = layer.load();
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            vehicleplatenumber: ($("#vehicleplatenumber").val() ? $("#vehicleplatenumber").val() : ''),
            costlistcode: ($("#costlistcode").val() ? $("#costlistcode").val() : ''),
            pageNo: page,
            pageSize: (limit ? limit : 10)
        }
        accessPost(baseu+ '/vehicle/carfile/query', JSON.stringify(param), function (res) {
            handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
            layer.close(ii);
            console.log(res)
            var html='', data=res.data;
            for (var i in data){
                html+='<tr id="'+data[i].repairbasicinfoId+'">' +
                        '<td>'+data[i].repairdate+'</td> ' +
                        '<td>'+data[i].costlistcode+'</td> ' +
                        '<td>'+data[i].faultdescription+'</td> ' +
                        '<td>'+data[i].vehicleplatenumber+'</td> </tr>'
            }
            $("#table1 tbody").html(html)

            if(laypage){
                laypage.render({
                    elem: 'pagebar'
                    ,count: res.count //数据总数，从服务端得到
                    ,jump: function(obj, first){
                        //obj包含了当前分页的所有参数，比如：
                        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
//                        console.log(obj.limit); //得到每页显示的条数
                        //首次不执行
                        if(!first){
//                            search(carcard, limit, obj.curr)
                            search(limit, obj.curr)
                            //do something
                        }
                    }
                });
            }

        })
    }
</script>
</html>
