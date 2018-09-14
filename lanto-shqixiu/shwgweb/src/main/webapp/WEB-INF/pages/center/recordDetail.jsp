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
#view{
}
#view h2, .other h2{
	font-size: 16px;
	padding-left: 10px;
	margin-top: 20px;
}
#view ul {
	padding: 0 20px;
}
#view ul li{
	font-size: 14px;
	line-height: 30px;
	border-bottom: 1px solid #f0f0f0;
}
#view ul li span{
	font-weight: bold;
	display: inline-block;
	width: 110px;
}
#view ul li p{
	display: inline-block;
	/*margin-left: 250px;*/
}
.remarkhead {
	/*margin-top: 40px;*/
	border-bottom: 10px solid #f8f8f8;
	padding: 10px 90px 10px 15px;
	position: relative;
}
.remarkhead h1{
	font-size: 20px;
	font-weight: 300;
	line-height: 30px;
	white-space: nowrap;
}
.remarkhead p{
	margin: 0;
	line-height: 30px;
	white-space: nowrap;
	/*letter-spacing: -1px;*/
	font-size: 12px;
}
.remarkhead img{
	width: 85px;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto 5px auto auto;
}
.remarkbody {
	padding: 0 15px;
}
#compname{
	font-size: 14px;
	margin-top: 10px;
}
.remarkstar {
	/*margin: 10px 0;*/
	font-weight: 300;
	font-size: 14px;
}
.remarkstar>li {
	display: block;
	overflow: hidden;
}
.remarkstar .left {
	float: left;
	width: 80px;
	color: #666666;
	line-height: 43px;
}
.remarkstar .center {
	float: left;
	/*width: 140px;*/
	height: auto;
	padding: 0;
}
.remarkbody .saymore {
	position: relative;
	/*margin-top: 30px;*/
	margin-bottom: 10px;
}
.saymore input{
	border: 0;
	height: 30px;
	line-height: 30px;
	font-size: 14px;
}
.saymore .good,.saymore .bad{
	width: 30px;
	position: absolute;
	cursor: pointer;
}
.good{
	right: 40px;
}
.bad{
	right: 0;
}
.taggood, .tagbad{
	margin-bottom: 10px;
	font-size: 14px;
	display: none;
}
.tagon{
	display: block;
}
.taggood li, .tagbad li{
	cursor: pointer;
	display: inline-block;
	padding: 5px 10px;
	background-color: #f4f4f4;
	color: #666666;
	border-radius: 5px;
	margin-right: 10px;
	margin-bottom: 10px;
}
.tagon li.on{
	background-color: #ff8327;
	color: white;
}
#form .layui-btn{
	margin-left: 15px;
}

#form2 h1{
	text-align: center;
	font-size: 20px;
	margin: 10px 0;
}
.above, .under {
	padding-top: 10px;
	border-top: 15px solid #f8f8f8;
}
.above .title, .under .title {
	/*text-align: center;*/
	font-size: 18px;
	font-weight: 300;
	height: 24px;
	line-height: 24px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.title i{
	display: inline-block;
	width: 40px;
	height: 2px;
	background-color: #f1f2f4;
	padding: 0 5px;
	margin: 0 10px;
	position: relative;
}
.title i:first-child::after,.title i:last-child::before{
	content: '';
	width: 6px;
	height: 6px;
	display: block;
	background-color: #d1d6dc;
	position: absolute;
	top: -2px;
	border-radius: 100%;
}
.title i:first-child::after{
	right: 0;
}
.title i:last-child::before{
	left: 0;
}
.above {
	/*margin-top: 40px;*/
}
.above .picblock {
	width: 50%;
	margin: 20px auto 0 auto;
	border-radius: 5px;
	overflow: hidden;
}
.above .picblock .pic {
	margin: 0;
	width: 100%;
	min-height: 150px;
	overflow: hidden;
	background: #f2f7fd url("/statics/img/maintain/nopic.png") center center no-repeat;
	background-size: 50%;
}
.above .picblock img{
	max-width: 100%;
}

.above .picblock p {
	margin: 0;
	text-align: center;
	color: white;
	height: 30px;
	line-height: 30px;
	font-size: 16px;
	background-color: #5795fc;
	position: relative;
}
.above .picblock p input{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0;
	cursor: pointer;
}
.above .picblock span{
	text-align: center;
	width: 100%;
	display: block;
	margin: 10px 0;
}
.under {
	border-top: 15px solid #f8f8f8;
	/*margin-bottom: 40px;*/
}
.under .content {
	width: 80%;
	margin: 20px auto 0 auto;
	overflow: hidden;
}
.under .content p{
	font-size: 13px;
	color: #999999;
	margin-bottom: 5px;
}
#form2 .layui-btn{
	float: right;
}

#comment{
	overflow: hidden;
	position: relative;
	margin: 15px 0;
	padding: 0 10px;
	height: 45px;
}
#comment .left{
	position: absolute;
	width: 45px;
	height: 45px;
	border-radius: 100%;
	background-color: #eeeeee;
	overflow: hidden;
}
#comment .left img{
	width: 100%;
	height: 100%;
}
#comment .right{
	padding-left: 50px;
}
#comment .right .black span{
	margin-right: 20px;
}
#comment .right .gray{
	margin-top: 5px;
	color: #a6a6a6;
}
#comment .right .gray span{
	margin-right: 15px;
}
.comment,.complaint{
	display: none;
}
#complaint{
	margin-top: 10px;
	margin-bottom: 20px;
	padding: 0 15px;
	font-size: 14px;
}
#complaint span{
	margin-right: 20px;
}

</style>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
<div class="zhengwu_r">
<div class="zhengwu_t">
<span class="sp_zw">车辆档案详情</span> <span class="sp_wz">您所在位置：<a
href="#" onClick="javascript :history.go(-1);">汽车健康档案</a> > <span>档案详情</span></span>
</div>
<div class="biaoge" style="overflow: auto">
	<script id="tpl" type="text/html">
		<h2>维修记录</h2>
		<ul>
			<li><span>维修企业名称：</span> <p>{{d.base.companyname}}</p></li>
			<li><span>车牌号码：</span> <p>{{d.base.vehicleplatenumber}}</p></li>
			<li><span>车辆识别号VIN：</span> <p>{{d.base.vin}}</p></li>
			<li><span>送修里程：</span> <p>{{d.base.repairmileage}}</p></li>
			<li><span>送修日期：</span> <p>{{d.base.repairdate}}</p></li>
			<li><span>结算日期：</span> <p>{{d.base.settledate}}</p></li>
			<li><span>结算编号：</span> <p>{{d.base.costlistcode}}</p></li>
			<li><span>故障描述：</span> <p>{{d.base.faultdescription}}</p></li>
		</ul>
		<h2>维修项目</h2>
		<table class="layui-table" lay-size="sm" style="width: 500px">
			<colgroup>
				<col width="200"><col width="150">
			</colgroup>
			<thead>
			<tr>
				<th>项目名称</th>
				<th>工时</th>
			</tr>
			</thead>
			<tbody>
			{{#  layui.each(d.proj, function(index, item){ }}
				<tr><td>{{item.repairproject}}</td><td>{{item.workinghours}}</td></tr>
			{{#  }); }}
			</tbody>
		</table>
		<h2>维修配件</h2>
		<table class="layui-table" lay-size="sm" style="width: 500px">
			<colgroup>
				<col width="200"><col width="150"><col width="100">
			</colgroup>
			<thead>
			<tr>
				<th>配件名称</th>
				<th>编号</th>
				<th>数量</th>
			</tr>
			</thead>
			<tbody>
			{{#  layui.each(d.part, function(index, item){ }}
				<tr><td>{{item.partsname}}</td><td>{{item.partscode}}</td><td>{{item.partsquantity}}</td></tr>
			{{#  }); }}
			</tbody>
		</table>


	</script>
	<div id="view"></div>
	<div class="other">
		<h2>维修评价</h2>
		<div id="comment">暂未评价</div>

		<h2>维修反馈</h2>
		<div id="complaint">暂未反馈，如维修记录有误，可向我们反馈</div>

		<div style="margin: 10px 0;padding: 0 15px">
			<%--<div class="layui-btn layui-btn-normal" onClick="javascript :history.go(-1);">后退</div>--%>
			<div class="layui-btn layui-btn-normal comment" onClick="comment()">评价</div>
			<div class="layui-btn layui-btn-normal complaint" onClick="complaint()">反馈</div>
		</div>
	</div>

<div id="form" style="display: none">
	<div class="remarkhead">
		<h1>您对该次服务满意吗？</h1>
		<p>以下反馈是匿名的，便于我们记录并沟通改进</p>
		<img src="/statics/img/maintain/chartico.png">
	</div>
	<div class="remarkbody">
		<div id="compname"></div>
		<ul class="remarkstar">
			<li>
				<div class="left">履约情况</div><div class="center" id="keepAppointment"></div>
			</li>
			<li>
				<div class="left">服务态度</div><div class="center" id="attitude"></div>
			</li>
			<li>
				<div class="left">维修质量</div><div class="center" id="quality"></div>
			</li>
			<li>
				<div class="left">维修速度</div><div class="center" id="speed"></div>
			</li>
			<li>
				<div class="left">维修价格</div><div class="center" id="price"></div>
			</li>

		</ul>
		<div class="saymore">
			<input  placeholder="还想再说点什么吗？" readonly="readonly"/>
			<img class="good" onClick="remark('good')" src="/statics/img/maintain/goodon.png"/>
			<img class="bad" onClick="remark('bad')" src="/statics/img/maintain/bad.png"/>
		</div>
		<ul class="taggood tagon">
			<li>价格实惠</li><li>服务热情</li><li>维修时间短</li><li>有WIFI</li><li>维修工位多</li>
			<li>客休区大</li><li>客餐丰富可口</li><li>索赔方便</li><li>上门取车</li>
		</ul>
		<ul class="tagbad">
			<li>乱收费</li><li>维修时间长</li><li>态度差</li><li>不专业</li><li>维修区杂乱</li><li>需要返工</li>
		</ul>
	</div>
	<div class="layui-btn layui-btn-normal" onClick="remarkSubmit()">提交</div>
</div>
<div id="form2" style="display: none">
	<h1>反馈原因：维修记录不正确</h1>
	<div class="above">
		<div class="title"><i></i>请上传维修凭证（可选）<i></i></div>
		<div class="picblock">
			<div class="pic">
				<!--<div class="pic">-->
				<img style="display: none" src="" />
			</div>
			<p>拍摄/上传照片
				<input id="file" type="file" accept="image/jpg,image/png,image/bmp" onchange="getImg()" />
			</p>
			<span>仅支持jpg、png、bmp</span>
		</div>
	</div>
	<div class="under">
		<div class="title"><i></i>上传要求<i></i></div>
		<div class="content">
			<p>维修凭证可以是维修企业开具的《结算单》的清晰照片，或是必须包含以下信息的维修单据的清晰、完整的照片：</p>
			<p> 1、维修企业名称</p>
			<p> 2、车牌号码</p>
			<p> 3、结算日起</p>
			<p> 4、维修项目</p>
			<p> 5、维修配件</p>
			<div class="layui-btn layui-btn-normal" onClick="complaintSubmit()">提交</div>
		</div>
	</div>

</div>
</div>
</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
    var keepAppointment=3, attitude=3, quality=3, speed=3, price=3, vehicleNumber=''
    var showRole= JSON.parse(localStorage.getItem('USERINFO')).showRole
$(function(){
    var param={
        accessToken: localStorage.getItem('ACCESSTOKEN'),
        repairbasicinfoId: getUrlParam('id')
    }
    accessPost(baseu+ '/vehicle/carfile/queryDetail', JSON.stringify(param), function (res) {
		handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
        console.log(res)
		if(res.code == '120513'){
			layer.msg("维修记录不存在或无权限查看");
			setTimeout(function () {
                history.go(-1)
            },1000)

			return;
		}
		if(res.code == '120516'){
			layer.msg("查看权限不足");
            setTimeout(function () {
                history.go(-1)
            },1000)
			return;
		}
        vehicleNumber=res.data.repairBasicinfo.vehicleplatenumber;
		$("#compname").text(res.data.repairBasicinfo.companyname)
        layui.use('laytpl', function(){
            var laytpl = layui.laytpl;
            var data={
                base: res.data && res.data.repairBasicinfo,
				proj: res.data && res.data.repairprojectlist,
                part: res.data && res.data.vehiclepartslist
            }
            var getTpl = $("#tpl").html(),view = document.getElementById('view');
            laytpl(getTpl).render(data, function(html){
                view.innerHTML = html;
            });
        })


    })

    getComment(true)
    getComplaint(true)

    var rate = layui.rate;

    var textarrs = {
        '1': '极差'
        ,'2': '失望'
        ,'3': '一般'
        ,'4': '满意'
        ,'5': '惊喜'
    };
    rate.render({
        elem: '#keepAppointment'
	    ,value: 3
	    ,text: true
        ,choose: function(value){
            keepAppointment= value
        }
        ,setText: function(value){
            this.span.text(textarrs[value]);
        }
    });
    rate.render({
        elem: '#attitude'
        ,value: 3
        ,text: true
        ,choose: function(value){
            attitude= value
        }
        ,setText: function(value){
            this.span.text(textarrs[value]);
        }
    });
    rate.render({
        elem: '#quality'
        ,value: 3
        ,text: true
        ,choose: function(value){
            quality= value
        }
        ,setText: function(value){
            this.span.text(textarrs[value]);
        }
    });
    rate.render({
        elem: '#speed'
        ,value: 3
        ,text: true
        ,choose: function(value){
            speed= value
        }
        ,setText: function(value){
            this.span.text(textarrs[value]);
        }
    });
    rate.render({
        elem: '#price'
        ,value: 3
        ,text: true
        ,choose: function(value){
            price= value
        }
        ,setText: function(value){
            this.span.text(textarrs[value]);
        }
    });

    $(".taggood li, .tagbad li").click(function () {
	    if($(this).hasClass('on')) $(this).removeClass('on')
	    else $(this).addClass('on')
    })

    $(".pic img").zoomify({duration:0});
})
function comment() {
    layer.open({
        type: 1,
        content: $('#form'),
        title: "评价",
        area: ['500px', '600px'],
        cancel: function () {
            $("#form").hide()
        }
    });
}
function complaint() {
    layer.open({
        type: 1,
        content: $('#form2'),
        title: "反馈",
        area: ['450px', '700px'],
        cancel: function () {
            $("#form2").hide()
        }
    });
}

function getComment(first) {
    accessPost(baseu + '/comment/getComments/repair?accessToken='+ localStorage.getItem("ACCESSTOKEN"),
        JSON.stringify({
            "repairId": getUrlParam('id'),
            "page":  1,
            "pageSize": 10
        }), function (res) {
            if(res.code=='000000'){
                if(res.comments&&res.comments.length){
                    var html='<div class="left">'+
	                    (res.comments[0].userInfo?'<img src="'+JSON.parse(res.comments[0].userInfo).headimgurl+'"/>':'')+'</div>'+
                        '<div class="right">' +
                        '<p class="black">' +
                        '<span>车友：'+ (res.comments[0].vehicleNum)+'</span>' +
                        '<span>点评日期：'+ formatDate(res.comments[0].createTime, "yyyy.MM.dd")+'</span>' +
                        '<span>评分：'+ res.comments[0].userAvgScore +'</span>' +
                        '</p>' +
                        '<p class="gray">评分详情：' +
                        '<span>履约：'+ res.comments[0].keepAppointment +'</span>' +
                        '<span>态度：'+ res.comments[0].attitude +'</span>' +
                        '<span>质量：'+ res.comments[0].quailty +'</span>' +
                        '<span>速度：'+ res.comments[0].speed +'</span>' +
                        '<span>价格：'+ res.comments[0].price +'</span>' +
                        '</p>' +
                        '</div>'
                    $("#comment").html(html)
                    $(".comment").hide()
                    if(getUrlParam('show')=='yes'&& first) layer.msg("已有评价");
                }else{
                    if(showRole==1) $(".comment").css('display','inline-block')
                    if(getUrlParam('show')=='yes'&& first) layer.open({
                        type: 1,
                        content: $('#form'),
                        title: "评价",
                        area: ['500px', '600px'],
                        cancel: function () {
                            $("#form").hide()
                        }
                    });
                }
            }
        })
}

function getComplaint(first) {
    accessPost(baseu + '/comment/company/complaint/list?accessToken='+ localStorage.getItem("ACCESSTOKEN"),
        JSON.stringify({
            "repairId": getUrlParam('id'),
            "page":  1,
            "pageSize": 10,
	        "complaintType": 1
        }), function (res) {
            if(res.code=='000000'){
                if(res.content&&res.content.length){
                    var html='<label>反馈原因：</label><span>'+getType(res.content[0].complaintType)+'</span>'+
                        '<label>凭据：</label><span>'+(res.content[0].credits?'有':'无')+'</span>'+
                        '<label>反馈时间：</label><span>'+formatDate(res.content[0].complaintTime, "yyyy.MM.dd")+'</span>'
	                $("#complaint").html(html)
                    $(".complaint").hide()
                }else{
                    if(showRole==1) $(".complaint").css('display','inline-block')
                }
            }
        })
}

function remark(status) {
	if(status=='good') {
	    $(".good").attr('src','/statics/img/maintain/goodon.png')
	    $(".bad").attr('src','/statics/img/maintain/bad.png')
		$(".taggood").addClass('tagon')
		$(".tagbad").removeClass("tagon")
	}else{
        $(".good").attr('src','/statics/img/maintain/good.png')
        $(".bad").attr('src','/statics/img/maintain/badon.png')
        $(".tagbad").addClass('tagon')
        $(".taggood").removeClass("tagon")
	}
}

function getImg() {
    uploadImg($("#file").get(0).files[0], function (path,res) {
	    $(".pic img").attr('src', path).show()
    },function (res) {
        $(".pic img").attr('src', '').hide()
    })
}

function remarkSubmit() {
    var tag=[]
	$(".tagon .on").each(function () {
        tag.push($(this).text())
    })
    accessPost(baseu+ '/comment/commit/repair', JSON.stringify({
	    "access_token": localStorage.getItem("ACCESSTOKEN"),
        "attitude": attitude,
        "companyId":  getUrlParam('compid'),
        "extraDetails": '',
        "keepAppointment": keepAppointment,
        "level": $(".taggood").hasClass('tagon')?0:1,
        "needSave": true,
        "price": price,
        "quality": quality,
        "speed": speed,
        "tags": tag,
        "vehicleNumber": vehicleNumber,
        'needJudgeVehicleExist': false,
        "repairId": getUrlParam('id'),
    }), function (res) {
		layer.closeAll()
        $("#form,#form2").hide()
        if(res.code == '000000'){
            layer.msg("点评成功");
            getComment()
        }else{
            layer.msg(res.status)
        }
    })
}

function complaintSubmit() {
    accessPost(baseu+ '/comment/company/complaint/repair?accessToken='+localStorage.getItem("ACCESSTOKEN"), JSON.stringify({
        accesstoken: localStorage.getItem("ACCESSTOKEN"),
        commentId: getUrlParam('id'),
        complaintFile: $(".pic img").attr('src')
    }), function (res) {
        layer.closeAll()
        $("#form,#form2").hide()
        if(res.code == '000000'){
            layer.msg("反馈成功");
            getComplaint()
        }else{
            layer.msg(res.status)
        }
    })
}

function getType(type) {
	switch (type){
		case '0': return '维修记录未上传'; break
		case '1': return '维修记录不正确'; break
	}
}
</script>
</html>
