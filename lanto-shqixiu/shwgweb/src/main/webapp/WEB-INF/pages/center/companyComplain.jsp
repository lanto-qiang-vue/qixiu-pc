<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
	<%@ include file="/WEB-INF/pages/common/head.jsp"%>
	<%--<script src="${btx}/js/front/myOrders.js"></script>--%>
</head>
<style>
	.layui-input-block{
		line-height: 36px;
	}
</style>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
	<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
	<div class="zhengwu_r">
		<div class="zhengwu_t">
			<span class="sp_zw">反馈管理</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/companyHome">企业中心</a> > <span>反馈管理</span></span>
		</div>

		<div class="search layui-form" style="margin-top: 10px">
			<div class="layui-form-item layui-inline" style="width: 300px">
				<label class="layui-form-label">车牌号</label>
				<div class="layui-input-block">
					<input type="text" class="layui-input" id="vehicleNum">
				</div>
			</div>
			<div class="layui-form-item layui-inline" style="width: 300px">
				<label class="layui-form-label">反馈日期</label>
				<div class="layui-input-block">
					<input type="text" class="layui-input" id="complaintTime">
				</div>
			</div>
			<div class="layui-form-item layui-inline" style="width: 300px">
				<label class="layui-form-label">反馈类型</label>
				<div class="layui-input-block">
					<select id="type">
						<%--<option value="">全部</option>--%>
						<option value="0" selected>维修记录未上传</option>
						<option value="1">维修记录不正确</option>
					</select>
				</div>
			</div>
			<div class="layui-form-item layui-inline" style="width: 300px">
				<label class="layui-form-label">有无凭证</label>
				<div class="layui-input-block">
					<select id="hasCredit">
						<option value="">全部</option>
						<option value="true">有</option>
						<option value="false">无</option>
					</select>
				</div>
			</div>
			<div class="layui-form-item layui-inline" style="width: 300px">
				<label class="layui-form-label"></label>
				<div class="layui-input-block">
					<div class="layui-btn layui-btn-normal" id="search">查询</div>
				</div>
			</div>
		</div>

		<table class="layui-table" id="table1" lay-size="sm">
			<colgroup>
				<col width="100">
				<col width="100">
				<col width="100">
				<col width="100">
				<col width="100">
				<col width="100">
				<col width="100">
			</colgroup>
			<thead>
			<tr>
				<th>反馈日期</th>
				<th>车牌号</th>
				<th>反馈类型</th>
				<th>事件发生日期</th>
				<th>凭证</th>
				<th>是否已读</th>
				<th>操作</th>
			</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<div id="pagebar" style="text-align:center;margin-top:5px;"></div>
	</div>
</div>
<div id="form" style="display: none;padding: 10px">
	<div class="layui-form-item">
		<label class="layui-form-label">反馈日期</label>
		<div class="layui-input-block complaintTime"></div>
	</div>
	<div class="layui-form-item">
		<label class="layui-form-label">车牌号</label>
		<div class="layui-input-block vehicleNum"></div>
	</div>
	<div class="layui-form-item">
		<label class="layui-form-label">反馈类型</label>
		<div class="layui-input-block type" ></div>
	</div>
	<div class="layui-form-item">
		<label class="layui-form-label">事件发生日期</label>
		<div class="layui-input-block commentTime"></div>
	</div>
	<%--<div class="layui-form-item">--%>
		<%--<label class="layui-form-label">凭证</label>--%>
		<%--<div class="layui-input-block">--%>
			<%--<img class="credits" />--%>
		<%--</div>--%>
	<%--</div>--%>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
	var pageNum=1
    var laypage = layui.laypage;
    $(function () {
        var form = layui.form;
        form.render()
        var laydate = layui.laydate;
        laydate.render({
            elem: '#complaintTime',
            type: 'date',
            format: 'yyyy-MM-dd',
        });
        $("img.credits").zoomify({duration:0});

//        $("#companyName").val( decodeURI(getUrlParam('name')||''))


        search(10, 1, laypage)

        $("#search").click(function () {
            pageNum=1
            search(10, 1, laypage)
        })
    })

    function search(pageSize, pageNo, laypage) {
        var ii = layer.load();
        var param = {
            pageSize: (pageSize ? pageSize : 10),
            pageNum: pageNo,
            companyName: $("#companyName").val(),
            vehicleNum: $("#vehicleNum").val(),
            complaintTime: $("#complaintTime").val(),
            hasCredit: $("#hasCredit").val(),
            complaintType: $("#type").val()
        }
        simplePost(baseu + '/comment/company/getComplaints?accesstoken='+localStorage.getItem('ACCESSTOKEN'), JSON.stringify(param), function (res) {
//            console.log('res',res)
            if(res.code=="000000"){
                var html='',datas= res.complaintInfoBOList
                for (var i in datas){
                    html+='<tr>' +
                        '<td>'+formatDate(datas[i].complaintTime,'yyyy-MM-dd')+'</td>'+
                        '<td>'+datas[i].vehicleNum+'</td>'+
                        '<td>'+getType(datas[i].complaintType)+'</td>'+
                        '<td>'+formatDate(datas[i].commentTime,'yyyy-MM-dd')+'</td>'+
                        '<td>'+(datas[i].credits?'有':'无')+'</td>'+
                        '<td>'+(datas[i].hasRead=='已读'?'<span class="color-green">已读</span>':'<span class="color-red">未读</span>')+'</td>'+
                        '<td><div class="layui-btn layui-btn-normal layui-btn-sm" onclick="detail('+datas[i].complaintId+','+datas[i].complaintType+')">详情</div></td>'+
                        '</tr>'
                }
                $("#table1 tbody").html(html)
            }else{
                layer.msg(res.status, {time: 3000, icon: 5});
                $("#table1 tbody").html('')
            }
            $("#table1 img").zoomify({duration:0});
            if (laypage) {
                laypage.render({
                    elem: 'pagebar'
                    , count: res.size //数据总数，从服务端得到
                    ,layout: ['count', 'prev', 'page','next']
                    , jump: function (obj, first) {
                        //obj包含了当前分页的所有参数，比如：
                        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                        //首次不执行
                        if (!first) {
                            search(pageSize, obj.curr)
                            pageNum= obj.curr
                            //do something
                        }
                    }
                });
            }
            layer.close(ii);
        })
    }

    function detail(id,type) {
        simplePost(baseu + '/comment/company/complaint/detail?accesstoken='+localStorage.getItem('ACCESSTOKEN')
	        +'&complaintId='+id+'&updateState=yes&complaintType='+type
	        , '', function (res) {
//            console.log('res',res)
            if(res.code=="000000"){
                var data= res.complaintInfoBOList[0]
				$(".commentTime").text(formatDate(data.commentTime,'yyyy-MM-dd'))
				$(".complaintTime").text(formatDate(data.complaintTime,'yyyy-MM-dd'))
				$(".vehicleNum").text(data.vehicleNum)
				$(".type").text(getType(data.complaintType))
//				$(".credits").attr('src',data.credits)
                layer.open({
                    type: 1,
                    content: $('#form'),
                    title: "反馈详情",
                    area: ['750px', '600px'],
                    cancel: function () {
                        $("#form").hide()
                    }
                });

                //更新已读状态
                search(10, pageNum, laypage)
                companyComplainCount()
            }
        })

    }
    function getType(type){
        switch (type){
            case '0': return '维修记录未上传';
            case '1': return '维修记录不正确';
            default: return '维修记录未上传';
        }
    }
</script>
</html>
