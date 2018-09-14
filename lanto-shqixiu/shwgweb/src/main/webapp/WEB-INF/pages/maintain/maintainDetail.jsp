<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<link rel="stylesheet" href="/statics/css/maintaindetail.css" />
<%--<link rel="stylesheet" href="//api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css" />--%>
<%--<link rel="stylesheet" href="${ctx}/js/swiper/css/idangerous.swiper.css" />--%>
<%--<script src="${btx}/js/swiper/js/idangerous.swiper.min.js" type="text/javascript"></script>--%>

	
</head>
<body>
	<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
	<input type="hidden" id="longitude" name="longitude"
		value="${model.LONGITUDE }" />
	<input type="hidden" id="latitude" name="latitude"
		value="${model.LATITUDE }" />
	<input type="hidden" id="corpName" name="corpName"
		value="${model.CORP_NAME }" />
	<input type="hidden" id="corpAdd" name="corpAdd"
		value="${model.CORP_ADD }" />
	<div class="problem specialist company">
		<div class="problem_l">
			<div id="view"></div>
		</div>
		<div class="problem_r">
			<div class="hangye_t">
				<div class="pro_t">
					<span class="wenti">行业信息</span> <span class="weizhi"><a href="${ctx}/industry/10281001" target="_blank">更多>></a></span>
				</div>
				<ul class="baoyang">
					<c:forEach items="${infoList }" var="item" varStatus="state">
						<li><a href="${ctx}/industry/detail/${item.INFO_ID}">${item.TITLE }</a></li>
					</c:forEach>
				</ul>
			</div>
			<div class="hangye_t changshi_b">
				<div class="pro_t">
					<span class="wenti">政务信息</span> <span class="weizhi"><a href="/government/10281001" target="_blank">更多>></a></span>
				</div>
				<ul class="baoyang">
					<c:forEach items="${zwList }" var="item" varStatus="state">
						<li><a href="${ctx}/industry/detail/${item.INFO_ID}">${item.TITLE }</a></li>
					</c:forEach>
				</ul>
			</div>
		</div>
	</div>


	<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>

	<%--<script type="text/javascript" src="//api.map.baidu.com/api?v=2.0&ak=hUrYR4hH5XExjuf6qHt7TLDhyqM08GYF"></script>--%>
	<%--<script type="text/javascript" src="//api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js"></script>--%>
	<%--<script src="${ctx}/js/BMap/CorpPosition.js" type="text/javascript"></script>--%>

<script id="tpl" type="text/html">
	<div class="head">
		<h1>{{ d.companyName }}<span id="status"></span></h1>
		<div class="icon"><img src="/statics/img/maintain/营业执照.png"><img src="/statics/img/maintain/认证.png"></div>
		<div class="address"><span>{{d.companyAddress}}</span><a href="/queryRepairCompany?searchText={{d.companyName}}&searchOption=2">导航地图</a></div>
		<div class="tel" {{d.companyTel?'':'style="display: none"'}}><span>{{d.companyTel}}</span></div>
		<div class="button"><a href="/maintain/visit?company_id={{d.companyId}}">上门服务</a><a href="/maintain/online?company_id={{d.companyId}}">预约服务</a></div>
		<div class="right" {{d.avgCompany?'':'style="display: none"'}}>
			<div class="point"><span>{{d.avgCompany}}</span>分</div>
			<div class="avg"><span id="average"></span>于同类平均水平</div>
			<div class="star">
				{{#  for(var i=0; i< parseInt(d.avgCompany); i++){}}
					<img src="/statics/img/maintain/yellow.png">
				{{#  }}}
			</div>
		</div>
	</div>
	<div class="info">
		<h1>企业档案</h1>
		<div class="block">
			<p class="p1">企业性质：<span>{{d.companyProperty}}</span></p><p class="p2">行业信誉评级：<span>{{d.crediRating}}</span></p><p class="p3">评分：<span>{{d.avgCompany?d.avgCompany:'暂无'}}</span></p>
		</div>
		<div class="block" style="display: none;">
			<label>企业认证</label>
			<ul></ul>
		</div>
		<div class="block" {{(d.serveSupports&&d.serveSupports.length)?'':'style="display: none"'}}>
			<label>服务支持</label>
			<ul>
				{{#  layui.each(d.serveSupports, function(index, item){ }}
				<li>{{item}}</li>
				{{#  }); }}
			</ul>
		</div>
		<div class="block" {{d.servePreponderance?'':'style="display: none"'}}>
			<label>服务优势</label>
			<ul>
				<li>{{d.servePreponderance}}</li>
			</ul>
		</div>
	</div>
	<div class="appraise">
		<h1>服务评价</h1>
		<div class="tag">
			<ul>
				{{#  layui.each(d.companyShowWors, function(index, item){ }}
				<li>{{item}}</li>
				{{#  }); }}
			</ul>
			<span>共<em id="number"></em>条评价</span>
		</div>
		<div class="stars">
			<span>履约情况 <i id="avgKeepAppointment"></i><em>{{ d.avgKeepAppointment?d.avgKeepAppointment.toFixed(1):0}}</em></span>
			<span>服务态度 <i id="avgStatus"></i><em>{{d.avgStatus?d.avgStatus.toFixed(1):0}}</em></span>
			<span>维修质量 <i id="avgQuality"></i><em>{{d.avgQuality?d.avgQuality.toFixed(1):0}}</em></span>
			<span>维修速度 <i id="avgSpeed"></i><em>{{d.avgSpeed?d.avgSpeed.toFixed(1):0}}</em></span>
			<span>维修价格 <i id="avgPrice"></i><em>{{d.avgPrice?d.avgPrice.toFixed(1):0}}</em></span>
		</div>
		<ul id="list"></ul>
		<div id="pagebar"></div>
	</div>
</script>
<script>



$(function () {
    var id=window.location.pathname.split('/')[window.location.pathname.split('/').length-1]
//	console.log(window.location.pathname.split('/'))
//	console.log(id)

    /*systemCall(function (systok) {
	    var param={
            corpId: id,
            systemToken: systok
	    }
	    simplePost(baseu+ '/maintain/corpDetail', JSON.stringify(param), function (res) {
			//handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
		    console.log("查看详情",res)
		    var data= res.data
			console.log("res-->data", data);
		    $("#conpname").text(data.corpName?data.corpName:"")
		    $("#compcode").text(data.businessNum?data.businessNum:"")
            $("#scope").text(data.companybusinessscope?data.companybusinessscope:"")
            $("#band").text(data.magorBrands?(data.magorBrands!="否"? data.magorBrands:""):"")
            $("#add").text(data.corpAdd?data.corpAdd:'')
            $("#tel").text(data.linkTel?data.linkTel:"")
//            $("#tel").text('******')
            $("#linkman").text(data.linkMan?data.linkMan:"")
            $("#profile").text(data.profile?data.profile:"")
        })
    })*/

    var laytpl = layui.laytpl;
    var laypage = layui.laypage;
//    var getTpl = $("#tpl").html(),view = document.getElementById('view');
//    laytpl(getTpl).render({}, function(html){
//        view.innerHTML = html;
//    });

    simpleGet(baseu+ '/comment/company/detail?companyId='+ id, function (res) {
        var getTpl = $("#tpl").html(),view = document.getElementById('view');
        laytpl(getTpl).render(res, function(html){
            view.innerHTML = html;
        });
        formatStatus(res.businessStatus)
        $("#average").text(res.avgCompany>res.avgIndustry?'高':'低')
	    getStars('avgKeepAppointment', res.avgKeepAppointment)
	    getStars('avgStatus', res.avgStatus)
	    getStars('avgQuality', res.avgQuality)
	    getStars('avgSpeed', res.avgSpeed)
	    getStars('avgPrice', res.avgPrice)
        getList(1, 10, laypage)
    })

	function formatStatus(st) {
		switch (st){
			case 1: $("#status").text("营业").css("background-color","#00cc99"); break;
			case 2: $("#status").text("停业").css("background-color","#ccc"); break;
			case 3: $("#status").text("注销").css("background-color","#ccc"); break;
			case 4: $("#status").text("空壳").css("background-color","#ccc"); break;
		}
    }

    function getStars(dom, val) {
        var star=''
		for(var i=0; i<5; i++){
		    if(i < parseInt(val))
		        star+='<img src="/statics/img/maintain/yellow.png"/>'
			else
                star+='<img src="/statics/img/maintain/gray.png"/>'
        }
        $("#"+dom).html(star)
    }

    function getList(pageNo, pageSize, laypage) {
	    simplePost(baseu+'/comment/getComments',
		    JSON.stringify({
                companyId: id,
                page: pageNo|| 1,
                pageSize: pageSize|| 10
		    }),
		    function (res) {
	            var list=''
		        for(var i in res.comments){
	                var head=''
			        if(res.comments[i].userInfo) head= JSON.parse(res.comments[i].userInfo).headimgurl
		            list+='<li>' +
//		            '<div class="left" oid="'+res.comments[i].openId+'"></div>'+
		            '<div class="left">'+ (head?'<img src="'+head+'"/>':'') +'</div>'+
		            '<div class="right">' +
	                    '<p class="black">' +
			            '<span>车友：'+ hide(res.comments[i].vehicleNum)+'</span>' +
			            '<span>点评日期：'+ formatDate(res.comments[i].createTime, "yyyy.MM.dd")+'</span>' +
			            '<span>评分：'+ res.comments[i].userAvgScore +'</span>' +
			            '</p>' +
	                    '<p class="gray">评分详情：' +
			            '<span>履约：'+ res.comments[i].keepAppointment +'</span>' +
			            '<span>态度：'+ res.comments[i].attitude +'</span>' +
			            '<span>质量：'+ res.comments[i].quailty +'</span>' +
			            '<span>速度：'+ res.comments[i].speed +'</span>' +
			            '<span>价格：'+ res.comments[i].price +'</span>' +
			            '</p>' +
	                '</div>'+
		            '</li>';
			    }
				$("#list").html(list)
//                for(var j in res.comments){
//					if(res.comments[j].openId)
//                        getHead(res.comments[j].openId)
//                }

	            $("#number").text(res.count)
                if(laypage){
                    laypage.render({
                        elem: 'pagebar' //注意，这里的 test1 是 ID，不用加 # 号
                        , count: res.count //数据总数，从服务端得到
                        ,layout: [
//                            'count',
		                    'prev', 'page','next']
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
        })
    }

    function getHead(oid) {
	    simpleGet(baseu+'/user/useraccount/weixin/userinfo?openid='+oid, function (res) {
            if(res.code=='000000')
                if(res.data){
                    var img= JSON.parse(res.data).headimgurl
	                if(img)
                    $("#list li .left").each(function () {
	                    if($(this).attr('oid')==oid){
                            console.log($(this))
                            $(this).append('<img src="'+img+'"/>')
	                    }
                    })
                }
        })
    }

    function hide( content) {
	    return content.substr(0,2)+"****"+content.substr(content.length-1,1)
    }
})

</script>


</body>
</html>
