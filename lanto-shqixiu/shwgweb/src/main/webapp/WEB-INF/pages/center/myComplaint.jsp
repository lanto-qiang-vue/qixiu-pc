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
				<span class="sp_zw">我的反馈</span> <span class="sp_wz">您所在位置：<a
					href="${ctx}/center/userInfo">车主中心</a> > <span>我的反馈</span></span>
				<input type="text" id="ctx" name="ctx" style="display:none;" value="${ctx}"/>
			</div>
			<div class="biaoge">
				<div class="layui-form" >
					<div class="layui-form-item" style="width: 300px;margin-top: 20px;display: inline-block">
						<label class="layui-form-label">反馈类型</label>
						<div class="layui-input-block">
							<select id="type" >
								<%--<option value="">全部</option>--%>
								<option value="0" selected>维修记录未上传</option>
								<option value="1">维修记录不正确</option>
							</select>
						</div>
					</div>
					<div class="layui-form-item" style="width: 300px;margin-top: 20px;display: inline-block">
						<label class="layui-form-label"></label>
						<div class="layui-input-block">
							<div id="query" class="layui-btn layui-btn-normal">查询</div>
						</div>
					</div>
				</div>

				<table id="table" class="layui-table" lay-size="sm">
					<colgroup>
						<col width="150">
						<col width="150">
						<col width="150">
						<col width="150">
						<col width="150">
					</colgroup>
					<thead>
						<tr>
							<th align="center">反馈企业</th>
							<th align="center">反馈原因</th>
							<th align="center">反馈日期</th>
							<th align="center">车牌号</th>
							<th align="center">凭据</th>
						</tr>
					</thead>
					<tbody id="tablebody">
						
					</tbody>
				</table>
				<div id="pagebar" style="text-align:center;margin-top:5px;"></div>
			</div>
		</div>
	</div>
	<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
$(function () {
    var form = layui.form;
    form.render()
    var laypage = layui.laypage;
    getList(1, 10, laypage)

	$("#query").click(function () {
        getList(1, 10, laypage)
    })

    function getList(pageNo, pageSize, laypage) {
        var ii = layer.load();
        accessPost(baseu + '/comment/company/getUserComplaints?accesstoken='+localStorage.getItem('ACCESSTOKEN')+
	        '&pageNum='+(pageNo|| 1)+ '&pageSize=' +(pageSize|| 10) +'&complaintType='+$("#type").val(),'',
            function (res) {
                if(res.code=='000000'){
                    var datas= res.complaintInfoBOList, html=''
                    for(var i in datas){
                        html+='<tr>' +
                            '<td>'+datas[i].companyName+'</td>'+
                            '<td>'+getType(datas[i].complatinType)+'</td>'+
                            '<td>'+ formatDate( datas[i].complaintTime, 'yyyy-MM-dd')+'</td>'+
                            '<td>'+datas[i].vehicleNum+'</td>'+
                            '<td>'+(datas[i].credits?'<img src="'+datas[i].credits+'" />':'无')+'</td>'+
                            '</tr>'
                    }
                    $("#table tbody").html(html)
                    $("#table img").zoomify({duration:0});
                }
                if(laypage){
                    laypage.render({
                        elem: 'pagebar' //注意，这里的 test1 是 ID，不用加 # 号
                        , count: res.total //数据总数，从服务端得到
                        ,layout: ['count', 'prev', 'page','next']
                        , jump: function (obj, first) {
                            //obj包含了当前分页的所有参数，比如：
                            console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                            console.log(obj.limit); //得到每页显示的条数
                            //首次不执行
                            if (!first) {
                                getList(obj.curr, obj.limit)
                            }
                        }
                    });
                }
                layer.close(ii);
            })
    }

    function getType(type) {
        switch (type){
            case 0: return '维修记录未上传';
            case 1: return '维修记录不正确';
            default: return '维修记录未上传';
        }
    }
})
</script>
</html>
