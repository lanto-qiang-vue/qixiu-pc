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
				href="#" onClick="javascript :history.go(-1);">汽车健康档案</a> > <span>档案列表</span></span>
		</div>
		<div class="biaoge" style="overflow: auto">


			<table id="table1" class="layui-table" lay-size="sm" style="width: 800px">
				<colgroup>
					<col width="50"><col width="200"><col width="150"><col width="150">
				</colgroup>
				<thead>
				<tr>
					<th>序号</th>
					<th>维修企业</th>
					<th>结算日期</th>
					<th>送修里程</th>

				</tr>
				</thead>
				<tbody>

				</tbody>
			</table>

			<div id="pagebar" style="text-align:center;margin-top:5px;"></div>
			<button class="layui-btn layui-btn-normal" onClick="javascript :history.go(-1);">后退</button>
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
            search(getUrlParam('id'), 10, 1, laypage)

        });

        $("#table1 tbody").on('click','tr', function () {
//            console.log(this)
            window.location.href='recordDetail?id='+$(this).attr('id')
        })


    });

    function search(carcard, limit, page, laypage) {
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            vehicleId: (carcard ? carcard : ''),
            limit: (limit ? limit : 10),
            page: page
        }
        accessPost(baseu+ '/vehicle/carfile/query', JSON.stringify(param), function (res) {
            handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
            console.log(res)
            var html='',data=res.data.content;
            for (var i in data){
                html+='<tr id="'+data[i].repairbasicinfoId+'"><td>'+(i+1)+'</td><td>'+data[i].companyname+'</td> <td>'+data[i].settledate+'</td> <td>'+data[i].repairmileage+'</td></tr>'
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
