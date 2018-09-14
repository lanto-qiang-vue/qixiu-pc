<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<%--<script src="${btx}/js/kindeditor/kindeditor-all-min.js"></script>--%>
<%--<script src="${btx}/js/kindeditor/lang/zh_CN.js"></script>--%>
<%--<script src="${btx}/js/front/expert.js"></script>--%>
<%--<script src="${btx}/js/front/cdf.js"></script>--%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="supervision">
<div class="pro_t">
	<span class="wenti">合格证信息登记管理</span>
	<input type="text" id="ctx" name="ctx" style="display:none;" value="${ctx}"/>
	<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
</div>
<div class="examine" >
	<form class="layui-form" style="margin-top: 10px;margin-left:50px;"> <!-- 提示：如果你不想用form，你可以换成div等任何一个普通元素 -->
		<div class="layui-form-item">
			<label class="layui-form-label">送修单位</label>
			<div class="layui-input-block" style="width: 600px">
				<input type="text" name="carSource" placeholder="请输入" id="carSource" lay-verify="required" autocomplete="off" class="layui-input">
			</div>
		</div>


		<div class="layui-form-item">
			<label class="layui-form-label">维修类别</label>
			<div id="repairType" class="layui-input-block search_select hoverlist3"
				 style="width: 600px;" data-value=""
				 data-type="repairType">
				<div class="layui-unselect layui-form-select">
					<div class="layui-select-title">
						<input type="text" placeholder="请选择维修类别" value="" readonly="" lay-verify="required"
							   class="layui-input layui-unselect" id="retype">
						<i class="layui-edge"></i>
					</div>
					<dl class="layui-anim layui-anim-upbit" id="select">
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


		<div class="layui-form-item">
			<label class="layui-form-label">车牌号</label>
			<div class="layui-input-block" style="width: 600px">
				<input type="text" name="vehiclePlateNumber" lay-verify="required" placeholder="请输入" id="vehiclePlateNumber" autocomplete="off" class="layui-input">
			</div>
		</div>
		<div class="layui-form-item">
			<label class="layui-form-label">车型</label>
			<div class="layui-input-block" style="width: 600px">
				<input type="text" name="carType" lay-verify="required" placeholder="请输入" id="carType" autocomplete="off" class="layui-input">
			</div>
		</div>

		<div class="layui-form-item">
			<label class="layui-form-label">合格证编号
			</label>
			<div class="layui-input-block" style="width: 600px">
				<input type="text" name="certificateCode" lay-verify="required" placeholder="请输入" id="certificateCode" autocomplete="off" class="layui-input">
			</div>
		</div>

		<div class="layui-form-item">
			<label class="layui-form-label">检测报告编号
			</label>
			<div class="layui-input-block" style="width: 600px">
				<input type="text" name="examinationReportCode" lay-verify="required" placeholder="请输入" id="examinationReportCode" autocomplete="off" class="layui-input">
			</div>
		</div>


		<div class="layui-form-item">
			<label class="layui-form-label">进厂日
			</label>
			<div class="layui-input-block" style="width: 600px">
				<input type="date" placeholder="请选择" id="inPlantDate" lay-verify="required" class="layui-input">
			</div>
		</div>
		<div class="layui-form-item">
			<label class="layui-form-label">竣工日
			</label>
			<div class="layui-input-block" style="width: 600px">
				<input type="date"  placeholder="请选择" id="repairEndDate" lay-verify="required" class="layui-input">
			</div>
		</div>
		<div class="layui-form-item">
			<label class="layui-form-label">出厂日
			</label>
			<div class="layui-input-block" style="width: 600px">
				<input type="date"  placeholder="请选择" id="exfactorydate" lay-verify="required" class="layui-input">
			</div>
		</div>
		<div class="layui-form-item">
			<label class="layui-form-label">发证日
			</label>
			<div class="layui-input-block" style="width: 600px">
				<input type="date"  placeholder="请选择" id="issueDate" lay-verify="required" class="layui-input">
			</div>
		</div>

		<div class="layui-form-item" style="text-align: right;margin-right: 100px;">
			<a class="layui-btn layui-btn-normal" href="javascript:void(0)" onclick="history.back()">返回</a>
			<a class="layui-btn layui-btn-normal" lay-submit lay-filter="serviceSubmit" id="submitBtn">提交</a>
		</div>
	</form>

</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
	$(function () {
        var id = getUrlParam('id');
        console.log('id',id);

        var userinfo = JSON.parse(localStorage.getItem('USERINFO'))
		if(!userinfo){
            layer.msg('请先进行登录');
            setTimeout(function(){
                window.location.href = "${ctx}" + "/toLogin?reUrl=" + "${memberUri}";
			},2000)
		}
	//    layui.use('form', function() {
			var form = layui.form;
			form.render();
	//    })
        if(id){
            $("#submitBtn").addClass('isShow');
            $("#repairType").removeClass('search_select');
            var ii = layer.load();
            $('#carSource').attr('disabled',true);
            $('#carType').attr('disabled',true);
            $('#certificateCode').attr('disabled',true);
            $('#examinationReportCode').attr('disabled',true);
            $('#vehiclePlateNumber').attr('disabled',true);
            $('#retype').attr('disabled',true);
            $('#inPlantDate').attr('disabled',true);
            $('#issueDate').attr('disabled',true);
            $('#exfactorydate').attr('disabled',true);
            $('#repairEndDate').attr('disabled',true);

            var param={
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                id:id
            }
            console.log('param',param);
            accessPost(baseu+ '/company/repairquality/detail', JSON.stringify(param), function (res) {
				handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                console.log('resDetail: ', res);
                var data = res.data;
                data.repairtypename = '';
                if(data){
                    if (data.repairtype == 1) {
                        data.repairtypename = '小型车'
                    } else if (data.repairtype == 2) {
                        data.repairtypename = '大、中型客车'
                    } else if (data.repairtype == 3) {
                        data.repairtypename = '大、中型货车'
                    }
                    console.log('data: ', data);
                $('#carSource').val(data.carsource);
                $('#carType').val(data.cartype);
                $('#certificateCode').val(data.certificatecode);
                $('#examinationReportCode').val(data.examinationreportcode);
                $('#vehiclePlateNumber').val(data.vehicleplatenumber);
                $('#retype').val(data.repairtypename);
                $('#inPlantDate').val(formatDate(data.inplantdate,'yyyy-MM-dd'));
                $('#issueDate').val(formatDate(data.issuedate,'yyyy-MM-dd'));
                $('#exfactorydate').val(formatDate(data.exfactorydate,'yyyy-MM-dd'));
                $('#repairEndDate').val(formatDate(data.repairenddate,'yyyy-MM-dd'));
                }
                layer.closeAll();
            })
        };
	})
	var speed=40
	function Marquee(){
		if(expertlist2.offsetTop-expertlist.scrollTop<=0)
			expertlist.scrollTop-=expertlist1.offsetHeight
		else{
			expertlist.scrollTop++
		}
	}
	var MyMar;
	if($("#expertlist1").children().length > 5){
		expertlist2.innerHTML=expertlist1.innerHTML
		MyMar=setInterval(Marquee,speed);
		expertlist.onmouseover=function() {clearInterval(MyMar)}
		expertlist.onmouseout=function() {MyMar=setInterval(Marquee,speed)}
	}
	var nums = 11; //每页出现的数据量


	layui.use('form', function(){
		var form = layui.form;
		//监听提交
		form.on('submit(serviceSubmit)', function(data){
			var ii = layer.load();
			var param={
				accessToken: localStorage.getItem('ACCESSTOKEN'),
                carsource:$('#carSource').val(),
                cartype: $('#carType').val(),
                certificatecode: $('#certificateCode').val(),
                companyid: null,
                examinationreportcode: $('#examinationReportCode').val(),
                inplantdate:$('#inPlantDate').val(),
                issuedate: $('#issueDate').val(),
                exfactorydate: $('#exfactorydate').val(),
                repairenddate: $('#repairEndDate').val(),
                repairtype:$('#repairType').attr('data-value'),
                vehicleplatenumber: $('#vehiclePlateNumber').val(),
			}
			console.log('param',param);
			accessPost(baseu+ '/company/repairquality/add', JSON.stringify(param), function (res) {
				handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
				console.log('res: ', res);
				var message = responseMessageMaker(res, "${ctx}");
				console.log('message',message)
				layer.msg(message, {
					icon: 1,
					time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
				}, function(){
				    if(res.code == '000000'){
				    window.location.href = 'repairQuality';
                    }
					layer.closeAll();
				});


			})
		});
	});
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
<style>
	.isShow{
		display: none;
	}
</style>
</html>
