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
			<span class="sp_zw">汽车健康档案</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/manageHome">管理中心</a> > <span>汽车健康档案</span></span>
		</div>
		<div class="biaoge" style="overflow: auto">
			<form class="layui-form" >
				<div class="layui-form-item" style="width: 300px;margin-top: 20px;display: inline-block">
					<label class="layui-form-label">车牌号</label>
					<div class="layui-input-block">
						<input id="carcard" type="text" name="title"  placeholder="请输入车牌号" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" >搜索</div>
			</form>

			<table id="table1" class="layui-table" lay-size="sm" style="width: 1000px">
				<colgroup>
					<col width="50"><col width="150"><col width="150"><col width="150"><col width="150"><col width="150">
				</colgroup>
				<thead>
				<tr>
					<th>序号</th>
					<th>车牌号码</th>
					<th>车辆品牌</th>
					<th>车系</th>
					<th>车架号</th>
					<th>发动机号</th>
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


        layui.use('laypage', function(){
            var laypage = layui.laypage;
            //执行一个laypage实例
            search('', 10, 1, laypage)

        });

        $("#table1 tbody").on('click','tr', function () {
//            console.log(this)
            window.location.href='recordDetail?id='+$(this).attr('id')
        })

        $("#search").click(function () {
            search($("#carcard").val(),10, 1, laypage)
        })

    });

    function search(carcard, limit, page, laypage) {
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            vehicleplatenumber: (carcard ? carcard : ''),
            limit: (limit ? limit : 10),
            page: page
        }
        accessPost(baseu+ '/vehicle/carfile/query', JSON.stringify(param), function (res) {
            handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
            console.log(res)
            var html='',data=res.data.content;
            for (var i in data){
                html+='<tr id="'+data[i].repairbasicinfoId+'"><td>'+(parseInt(i)+1)+'</td> <td>'+data[i].vehicleplatenumber+'</td> <td></td> <td></td> <td>'+data[i].vin+'</td> <td></td> </tr>'
            }
            $("#table1 tbody").html(html)

            if(laypage){
                laypage.render({
                    elem: 'pagebar'
                    ,count: res.data.totalElements //数据总数，从服务端得到
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

        })
    }
</script>
</html>
