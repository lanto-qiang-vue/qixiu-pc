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
			<span class="sp_zw">企业合格证使用信息管理</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/companyHome">企业中心</a> > <span>企业合格证使用信息管理</span></span>
		</div>
		<div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label" style="margin-right: 15px">维修类别</label>
				<div id="repairType" class="layui-input-inline search_select hoverlist3"
					 style="width: 190px; margin-right: 3px;" data-value=""
					  data-type="repairType">
					<div class="layui-unselect layui-form-select">
						<div class="layui-select-title">
							<input type="text" placeholder="请选择维修类别" value="" readonly=""
								   class="layui-input layui-unselect">
							<i class="layui-edge"></i>
						</div>
						<dl class="layui-anim layui-anim-upbit">
							<dd data-value="" class=""><i class="layui-icon">&#xe605;</i> <span>全部</span>
							</dd>
							<dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>小型车</span>
							</dd>
							<dd data-value="2" class=""><i class="layui-icon">&#xe605;</i> <span>大、中型客车</span>
							</dd>
							<dd data-value="3" class=""><i class="layui-icon">&#xe605;</i> <span>大、中型货车</span>
							</dd>
						</dl>
					</div>
				</div>
			</div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">车牌号</label>
				<div class="layui-input-block">
					<input id="vehiclePlateNumber" type="text" name="title" placeholder="请输车牌号" autocomplete="off"
						   class="layui-input">
				</div>
			</div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">车型</label>
				<div class="layui-input-block">
					<input id="carType" type="text" name="title" placeholder="请输车型" autocomplete="off"
						   class="layui-input">
				</div>
			</div>
		<div style="margin-left: 60px;margin-top:10px;">
			<div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo">搜索</div>
			<div id="add" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo">添加</div>
		</div>
</div>
		<div class="biaoge" style="overflow: auto">
			<table id="table1" class="layui-table" lay-size="sm" style="width: 1650px" >
				<colgroup>
					<col width="200"><col width="200"><col width="200"><col width="150"><col width="150"><col width="150"><col width="150"><col width="150"><col width="150"><col width="150"><col width="150">
				</colgroup>
				<thead>
				<tr>
					<th>送修单位</th>
					<th>维修类别</th>
					<th>车牌号</th>
					<th>车型</th>
					<th>合格证编号</th>
					<th>检测报告编号</th>
					<th>进厂日</th>
					<th>竣工日</th>
					<th>出厂日</th>
					<th>发证日</th>
				</tr>
				</thead>
				<tbody>

				</tbody>
			</table>

			<div id="pagebarA" style="text-align:center;margin-top:5px;"></div>
		</div>
	</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
$(function () {

    layui.use('laypage', function(){
        var laypage = layui.laypage;
        //执行一个laypage实例
        searchA(10, 1, laypage)
    });
    function searchA(limit, page, laypageA) {
        layer.load()
        var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            pageSize: (limit ? limit : 10),
            pageNo: page,
            cartype:$('#carType').val(),
            repairtype:$('#repairType').attr('data-value'),
            vehicleplatenumber:$('#vehiclePlateNumber').val(),
        }
        console.log('param',param);
        accessPost(baseu + '/company/repairquality/list' ,JSON.stringify(param),function (res) {
            handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
            console.log('res',res)
            if(res.data) {
            var datas = res.data.dataList, html = '';

                for (var i in datas) {
                    if (datas[i].repairtype == 1) {
                        datas[i].repairtypename = '小型车'
                    } else if (datas[i].repairtype == 2) {
                        datas[i].repairtypename = '大、中型客车'
                    } else if (datas[i].repairtype == 3) {
                        datas[i].repairtypename = '大、中型货车'
                    }
                    html += '<tr id="' + datas[i].id + '"><td>' + datas[i].carsource + '</td><td>' + datas[i].repairtypename + '</td><td>' + datas[i].vehicleplatenumber + '</td><td>' + datas[i].cartype + '</td><td>' + datas[i].certificatecode + '</td><td>' + datas[i].examinationreportcode + '</td><td>' + datas[i].inplantdate + '</td><td>' + datas[i].repairenddate + '</td><td>' + (datas[i].exfactorydate || '') + '</td><td>' + datas[i].issuedate + '</td></tr>'
                }
                $("#table1 tbody").html(html)
                if (laypageA) {
                    laypageA.render({
                        elem: 'pagebarA'
                        , count: res.data.total //数据总数，从服务端得到
                        , jump: function (obj, first) {
                            //obj包含了当前分页的所有参数，比如：
                            console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                            console.log(obj.limit); //得到每页显示的条数
                            //首次不执行
                            if (!first) {
                                searchA(limit, obj.curr)
                                //do something
                            }
                        }
                    });
                }
            }else {
                layer.msg(res.status);
			}
                layer.closeAll('loading');

        })

    }
    $("#search").on('click', function () {
        searchA(10, 1, laypage)
    })
    $("#add").on('click', function () {
        window.location.href = 'addRepairQuality';
    })
    $("#table1 tbody").on('click','tr', function () {
//            console.log(this)
        window.location.href='addRepairQuality?id='+$(this).attr('id')
    })


})
$('.hoverlist3 dl').on('click', 'dd', function () {
    var par = $(this).parents(".search_select");
    if ($(this).hasClass('select-this')) {
        $(this).removeClass('select-this');
    } else {
        $('.hoverlist3 dl dd').removeClass('select-this');
        $(this).addClass('select-this');
    }
    var items = [];
    var titleItems = [];
    par.find('dl .select-this').each(function () {
        items.push($(this).attr('data-value'));
        titleItems.push($(this).find('span').text());
    });
    if (titleItems && titleItems.length > 0) {
        par.find('input').val(titleItems.join('|'));
        par.attr("title", titleItems.join('|'));
    } else {
        par.find('input').val(par.attr('data-tit'));
        par.attr("title", par.attr('data-tit'));
    }

    if (items && items.length > 0) {
        par.attr("data-value", items.join(','));
    } else {
        par.attr("data-value", '');
    }
});
</script>
</html>
