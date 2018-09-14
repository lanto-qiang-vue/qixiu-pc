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
			<span class="sp_zw">企业详情</span> <span class="sp_wz">您所在位置：<a
				href="/shwgweb/center/userInfo">车主中心</a> > <span>企业详情</span></span>
		</div>

		<div   style="margin-top: 10px;float: right;">
			<a class="layui-btn layui-btn-normal" href="javascript:void(0)" onclick="history.back()">返回</a>
		</div>
		<div class="biaoge" style="overflow: auto">


			<div class="dblock">


				<h1 class="dtitle">企业基本信息</h1>

				<table id="table" class="layui-table" lay-size="sm" >
					<colgroup>
						<col width="150"><col width="100"><col width="100"><col width="100"><col width="100"><col width="100">
					</colgroup>
					<thead>
					<tr>
						<th>业户名称</th>
						<th>许可证号</th>
						<th>注册地址</th>
						<th>经营范围</th>
					</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
			</div>



			<h1 class="dtitle">企业岗位列表</h1>
			<table id="table1" class="layui-table" lay-size="sm" style="width: 1000px">
				<colgroup>
					<col width="50"><col width="150"><col width="150"><col width="150"><col width="150"><col width="50">
				</colgroup>
				<thead>
				<tr>
					<th>序号</th>
					<th>职位名称</th>
					<th>地区</th>
					<th>薪资</th>
					<th>发布时间</th>
					<th>查看</th>
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
    function table() {
        var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN')
        }
        accessPost(baseu+ '/resumeBroswe/corpDetailInfo', JSON.stringify(param), function (res) {
            console.log('res',res)
            var datas=res.data, html='';
            html+='<tr><td>'+ (datas.companyname || '') +'</td><td>'+ (datas.companyroadtransportationlicense || '') +'</td><td>'+ (datas.companyaddress || '') +'</td><td>' + (datas.companybusinessscope || '') + '</td></tr>'
            $("#table tbody").append(html)
        })

    }

    $("#table1 tbody").on('click','#mn-check', function () {
        console.log(this)
        window.location.href='../center/queryPostDetails?id='+$(this).attr('postId')
    })

    $(function(){
        //table();
        $("#back").click(function () {
            window.location.href='applyList'
        })
        if(getUrlParam('corpId')){
            $("#isShow").hide();
            console.log("id",getUrlParam('corpId'))
        }

        layui.use('laypage', function(){
            var laypage = layui.laypage;
            //执行一个laypage实例
            var vinParam = null;
            if(getUrlParam('corpId')){
                $("#isVinShow").hide();
                vinParam = getUrlParam('corpId');
                console.log("corpId",vinParam)
            }else{
                $("#back").hide();
            }
            search(vinParam, 10, 1, laypage)

        });



        $("#search").click(function () {
            var vinParam = '';
            if(getUrlParam('vin')){
                vinParam = getUrlParam('vin');
                console.log("vin",vinParam)
            }
            search(vinParam, 10, 1, laypage)
        })

        var info= JSON.parse(localStorage.getItem('USERINFO'));

    });

    function search(corpId,limit, page, laypage) {
        var ii = layer.load();
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            corpId: (corpId ? corpId : ''),
            pageSize: (limit ? limit : 10),
            pageNo: page,
        }
        accessPost(baseu+ '/resumeBroswe/corpDetailInfo', JSON.stringify(param), function (res) {
            console.log(res)
            if(res.code == '120516'){
                layer.msg(res.status);
            }
            layer.close(ii);
            var html='', data=res.data;
            var html_t='',datas=res.repairCompanyInfoRespDO;
            for (var i in data){
                var type='';
                if (data[i].salaryType==1) {
                    type="日薪：";
                }
                if(data[i].salaryType==2){
                    type="月薪：";
                }
                if(data[i].salaryType==3){
                    type="年薪：";
                }
                var money='';
                if (data[i].salary==1) {
                    money="30-50";
                }
                if (data[i].salary==2) {
                    money="60-80";
                }
                if (data[i].salary==3) {
                    money="80-100";
                }
                if (data[i].salary==4) {
                    money="100以上";
                }
                if (data[i].salary==5) {
                    money="2000-3000";
                }
                if (data[i].salary==6) {
                    money="3000-4000";
                }
                if (data[i].salary==7) {
                    money="4000-5000";
                }
                if (data[i].salary==8) {
                    money="5000及以上";
                }
                if (data[i].salary==9) {
                    money="20000-40000";
                }
                if (data[i].salary==10) {
                    money="50000-80000";
                }
                if (data[i].salary==11) {
                    money="90000-110000";
                }
                if (data[i].salary==12) {
                    money="12万及以上";
                }
                html+='<tr><td>'+(parseInt((param.pageNo - 1) * param.pageSize + parseInt(i) + 1))+'</td><td>'+data[i].postName +'</td><td>'+data[i].address +'</td><td>'+type + money +'</td><td>'+(formatDate(data[i].beginTime,'yyyy-MM-dd hh:mm:ss') || '')+'</td><td><button type="button" class="manageNotes-buttom" id="mn-check" postId="'+data[i].id+'">详情</button> </td> </tr>'
            }
            html_t+='<tr><td>'+ (datas.companyname || '') +'</td><td>'+ (datas.companyroadtransportationlicense || '') +'</td><td>'+ (datas.companyaddress || '') +'</td><td>' + (datas.companybusinessscope || '') + '</td></tr>'
            $("#table tbody").append(html_t)
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
                            search(carcard,corpId,companyname,limit, obj.curr)
                            //do something
                        }
                    }
                });
            }


        })
    }
</script>
</html>
