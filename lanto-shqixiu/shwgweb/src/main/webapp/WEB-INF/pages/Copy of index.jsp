<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<link rel="stylesheet" href="${ctx}/css/banner/banner.css" />
<script src="${ctx }/js/jquery.easing.js"></script>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<!--  <div class="banner">
	<ul class="banner_in">
		<c:forEach items="${banners }" var="item" varStatus="state">
			<li><a href="${item.LINK_URL }" target="${item.LINK_TYPE }"><img src="/attach/${item.LINK_IMAGE }" width="1920" alt="" title="${item.TITLE }"></a></li>
		</c:forEach>
	</ul>
    <ul class="lb">
    	<c:forEach items="${banners }" var="item" varStatus="state">
    		<li class="${state.index == 0?'current1':'' }"></li>
    	</c:forEach>
    </ul>
</div>-->
 <!--ps_box-->
 <div class="ps_box">
   <div class="pics_switch">
     <div class="pb">
     	<c:forEach items="${banners }" var="item" varStatus="state">
       		<div class="pic_box"><a style="background:url(${ctx}/attach/${item.LINK_IMAGE }) center top no-repeat;" target="${item.LINK_TYPE }" href="${item.LINK_URL }"></a></div>
       	</c:forEach>
     </div>
     <div class="viewArrows prev">上一张</div>
     <div class="viewArrows next">下一张</div>
     <div class="pics_switch_clients">
       <ul style="width:${banners.size()*25 + 25}px;">
       	<c:forEach items="${banners }" var="item" varStatus="state">
       	 	<li class="li_1"><span class="${state.index == 0?'current':'' }">${state.index + 1 }</span></li>
    	</c:forEach>
       </ul>
     </div>
   </div>
 </div>
 <!--case_box-->

<div class="chedaifu">
	<div class="cdf_t">
    	<div class="z"></div>
    	<div class="m">车大夫门诊</div>
    	<a href="${ctx }/cdf">进入门诊 >></a>
    </div>
	<div class="cdf_d">
    	<div class="l">
        	<div class="l_t">
            	<div class="w">问题集锦</div>
               	<a href="${ctx }/questSearch">更多>></a>
            </div>
        	<div class="l_c">
            	<div class="l_cl" style="height:170px;">
            		<ul>
	            		<c:forEach items="${questList }" var="item" varStatus="state">
	            			<li>
		                    	<a class="p1" href="${ctx }/cdf/qeustDetail/${item.QUES_ID}">
		                    		<span style="float:left;">[${item.TYPE_ == ''?'其它': item.TYPE_}]</span>
		                    		<span style="max-width:390px;float:left;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;color: #020202;">${item.CONTENT}</span> 
		                    		<span>${item.STATUS_ }</span>
		                    		<span>${item.CREATE_TIME}</span>
		                    	</a>
		                    </li>
	            		</c:forEach>
            		</ul>
                </div>
            </div>
            <div class="l_b">
            	<div class="l_bt">热门问题</div>
            	<div class="l_bb">
            		<c:if test="${hotQuest != null }">    		
	                	<div class="wen" title="${hotQuest.CONTENT }">
	                    	<a href="${ctx }/cdf/qeustDetail/${hotQuest.QUES_ID }">
		                    	<p class="p1" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">${hotQuest.CONTENT }</p>
		                    	<p class="p2">${hotQuest.answerCount }个回答    ${hotQuest.VIEW_NUMBER }人浏览    发布时间： ${hotQuest.QUES_TIME }</p>
	                    	</a>
	                    </div>
	                    <c:if test="${hotQuest.cnAnswer != null }">
		                	<div class="da" title="${hotQuest.cnAnswer.CONTENT }">
		                		<a href="${ctx }/cdf/qeustDetail/${hotQuest.QUES_ID }">
			                    	<p class="p1" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;"> ${hotQuest.cnAnswer.CONTENT }</p>
			                    	<p class="p2">回复时间：${hotQuest.cnAnswer.ANSWER_TIME }</p>
		                    	</a>
		                    </div>
	                    </c:if>
	                </c:if>
	            </div>
            </div>
        </div>
    	<div class="r">
        	<div class="r_t">
            	<div class="zhuan">问答专家团</div>
            	<a href="${ctx }/specialist">更多>></a>
            </div>
            <div class="r_b" id="expertlist">
            	<ul class="lb" id="expertlist1">
            		<c:forEach items="${experts }" var="item" varStatus="state">
						<li>
	                    	<a class="a1" href="${ctx }/cdf/expert/${item.EXPERT_ID}"><img src="${ctx}/attach/${item.PHOTO }" alt=""></a>
	                        <div class="lb_r">
	                            <a class="a2" href="${ctx }/cdf/expert/${item.EXPERT_ID}">${item.NAME }<span></span></a>
	                            <p>${item.PROFESSOR }</p>
	                            <a class="a3" href="${ctx }/cdf/expert/${item.EXPERT_ID}">向TA提问</a>
	                        </div>
	                    </li>
					</c:forEach>
            	</ul>
            	<ul class="lb" id="expertlist2">
            		
            	</ul>
            </div>
        </div>
    </div>
</div>
<!--  
<div class="zhaoweixiu">
	<div class="cdf_t">
    	<div class="z"></div>
    	<div class="m">找维修</div>
    	<a href="maintain.html">更多 >></a>
    </div>
    <div class="map">
    	<div class="map_container" id="map_container"></div>
    	<div class="map_t">
        	<p><input type="text" id="addr" value="搜地点、找路线" onfocus="if(value==defaultValue){value='';this.style.color='#000'}" style="width: 245px;color:#CCC;" onblur="if(!value){value=defaultValue;this.style.color='#CCC'}" ></p>
            <span></span>
        </div>
        <div class="map_b">
        	<div class="xiangmu">
            	<span id="cur" class="currtent">选择企业</span>
            	<span id="cue">企业列表</span>
            </div>
            <div class="leixing">
            	<div class="lei">
                    <p>已选类型:</p>
                    <span class="sp1">救援</span>
                    <span class="sp1">宝马</span>
                    <span class="sp2"></span>
                    <span class="sp2"></span>
                </div>
                <div class="jieguo">
                	<p><span>查询结果：</span>共206条记录，请在企业列表或地图中选择</p>
                </div>
                <div class="quyu">
                	<span>区域 | </span>
                    <a href="">长宁区</a>
                    <a href="">浦东区</a>
                    <a href="">天河区</a>
                    <a href="">长宁区</a>
                    <a href="">浦东区</a>
                    <a href="">天河区</a>
                    <a href="">长宁区</a>
                    <a href="">浦东区</a>
                    <a href="">天河区</a>
                </div>
                <div class="quyu lx">
                	<span>类型 | </span>
                    <a href="">4S店</a>
                    <a href="">二级维护</a>
                    <a href="">救援</a>
                </div>
                <div class="quyu xingji">
                	<span>星级服务 | </span>
                    <a href="">3星服务</a>
                    <a href="">4星服务</a>
                    <a href="">5星服务</a>
                </div>
                <div class="sousuo">
                	<div class="sousuo_in">
                        <span>按品牌查找</span>
                        <ul class="ul1">
                            <li class="li"><a href="">A</a></li>
                            <li><a href="">B</a></li>
                            <li><a href="">C</a></li>
                            <li><a href="">D</a></li>
                            <li><a href="">E</a></li>
                            <li><a href="">F</a></li>
                            <li><a href="">G</a></li>
                            <li><a href="">H</a></li>
                            <li><a href="">I</a></li>
                            <li><a href="">J</a></li>
                            <li><a href="">K</a></li>
                            <li><a href="">L</a></li>
                            <li><a href="">M</a></li>
                            <li><a href="">N</a></li>
                            <li><a href="">O</a></li>
                            <li><a href="">P</a></li>
                            <li><a href="">Q</a></li>
                            <li><a href="">R</a></li>
                            <li><a href="">S</a></li>
                            <li><a href="">T</a></li>
                            <li><a href="">U</a></li>
                            <li><a href="">V</a></li>
                            <li><a href="">W</a></li>
                            <li><a href="">X</a></li>
                            <li><a href="">Y</a></li>
                            <li><a href="">Z</a></li>
                        </ul>
                    </div>
                    <ul class="ul2">
                    	<li><a href="">DS</a></li>
                    	<li><a href="">大发</a></li>
                    	<li><a href="">道奇</a></li>
                    	<li><a href="">大众</a></li>
                    </ul>
                </div>
            </div>
            <div class="liebiao">
            	<ul>
            		<li><a href=""></a></li>
            	</ul>
            </div>
        </div>
    </div>
</div>
-->

<div class="xinxi">
	<div class="xinxi_l">
        <div class="cdf_t">
            <div class="z"></div>
            <div class="m">行业信息</div>
            <a href="${ctx }/industry/10281001">更多 >></a>
        </div>
        <div class="img">
        	<c:choose>
        		<c:when test="${inImageList != null && inImageList.size() > 0 }">
        			<img src="${ctx}/attach/${inImageList.get(0).PHOTO }" width="150px" height="100px" alt="">
        			<div style="width:310px;padding:5px;float:left;">
        				<h1 style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"><a style="color: #4ba7f5;font-size:16px;" href="${ctx }/industry/detail/${inImageList.get(0).INFO_ID}" target="_blank">${inImageList.get(0).TITLE}</a></h1>
        				<div style="color:#999;line-height:20px;font-size:13px;margin-top:5px;">${inImageList.get(0).CONTENT} [ <a style="color: #4ba7f5;font-size:16px;" href="${ctx }/industry/detail/${inImageList.get(0).INFO_ID}" target="_blank">详情</a> ]</div>
        			</div>
        		</c:when>
        		<c:otherwise>
        			<img src="images/shqxw.jpg" width="150px" height="100px" alt="">
        		</c:otherwise>
        	</c:choose>
        </div>
        <ul class="hangye">
        	<c:forEach items="${instList }" var="item" varStatus="state">
           		<li><a href="${ctx }/industry/detail/${item.INFO_ID}">${item.TITLE}</a></li>
           	</c:forEach>
        </ul>
    </div>
	<div class="xinxi_l xinxi_r">
        <div class="cdf_t">
            <div class="z"></div>
            <div class="m">政务信息</div>
            <a href="${ctx }/government">更多 >></a>
        </div>
        <div class="img">
        	<c:choose>
        		<c:when test="${zwImageList != null && zwImageList.size() > 0 }">
        			<img src="${ctx}/attach/${zwImageList.get(0).PHOTO }" width="150px" height="100px" alt="">
        			<div style="width:310px;padding:5px;float:left;">
        				<h1 style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"><a style="color: #4ba7f5;font-size:16px;" href="${ctx }/government/detail/${zwImageList.get(0).INFO_ID}" target="_blank">${zwImageList.get(0).TITLE}</a></h1>
        				<div style="color:#999;line-height:20px;font-size:13px;margin-top:5px;">${zwImageList.get(0).CONTENT} [ <a style="color: #4ba7f5;font-size:16px;" href="${ctx }/government/detail/${zwImageList.get(0).INFO_ID}" target="_blank">详情</a> ]</div>
        			</div>
        		</c:when>
        		<c:otherwise>
        			<img src="images/shqxw.jpg" width="150px" height="100px" alt="">
        		</c:otherwise>
        	</c:choose>    	
        </div>
        <ul class="hangye">
        	<c:forEach items="${zwList }" var="item" varStatus="state">
           		<li><a href="${ctx }/government/detail/${item.INFO_ID}">${item.TITLE}</a></li>
           	</c:forEach>
        </ul>
    </div>
</div>

<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>

<script type="text/javascript">
var speed=40
function Marquee(){
if(expertlist2.offsetTop-expertlist.scrollTop<=0)
	expertlist.scrollTop-=expertlist1.offsetHeight
else{
	expertlist.scrollTop++
}
}
var MyMar;
if($("#expertlist1").children().length > 4){
	expertlist2.innerHTML=expertlist1.innerHTML
	MyMar=setInterval(Marquee,speed);
	expertlist.onmouseover=function() {clearInterval(MyMar)}
	expertlist.onmouseout=function() {MyMar=setInterval(Marquee,speed)}
}

$(function(){
	var index = 0;
	var imgWidth = $('.pics_switch .pic_box').width();//单张图片宽度
	//alert(imgWidth);
	var len = $('.pics_switch .pic_box').length;//图片数
	//alert(len)
	var totalImgWidth = imgWidth*len;//图片序列宽度
	
	//默认banne宽度是1600，低于1600的分辨率会出现位置偏差，需要调整，故在低于1600下设置banner宽度为100%；
	if($(window).width()<imgWidth) {
		$('.ps_box .pics_switch').css({'width':$(window).width()});
		$('.ps_box .pics_switch .pic_box').css({'width':$(window).width()});
		$('.ps_box .pics_switch .pic_box a').css({'width':$(window).width()});
		imgWidth = $(window).width();
	}
	
	//小按钮鼠标滑过透明度
	$('.ps_box .pics_switch_clients ul li').css({'opacity':0.3});
	$('.ps_box .pics_switch_clients ul li span.current').css({'opacity':0.8});
	$('.pics_switch_clients li').hover(function() {
			$(this).addClass('hover');
		},function() {
			$(this).removeClass('hover');
		}
	);
	
	//左右翻页按钮滑过透明度
	$('.ps_box .pics_switch .viewArrows').css({'opacity':0.4});
	$('.ps_box .pics_switch .viewArrows').hover(function() {
			$(this).fadeTo(200, 0.8);
		},function() {
			$(this).fadeTo(200, 0.4);
		}
	);
	
	//为小按钮添加鼠标滑入事件，以显示相应的内容
	$('.ps_box .pics_switch_clients ul li').css("opacity",0.4).mouseover(function() {
		index = $('.ps_box .pics_switch_clients ul li').index(this);
		showPics(index);
	}).eq(0).trigger("mouseover");
	
	//上一页按钮
	$(".ps_box .prev").click(function() {
		index -= 1;
		if(index == -1) {index = len - 1;}
		showPics(index);
	});
	
	//下一页按钮
	$(".ps_box .next").click(function() {
		index += 1;
		if(index == len) {index = 0;}
		showPics(index);
	});
	
	$('.ps_box .pb').css({'width':totalImgWidth});
	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$('.ps_box .pb').hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {index = 0;}
		},4000); //此4000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");
	
	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) {
		var nowLeft = -index*imgWidth; //根据index值计算ul元素的left值
		$('.ps_box .pb').stop(true,false).animate({"marginLeft":nowLeft},1000,'easeInOutExpo'); //通过animate()调整ul元素滚动到计算出的position
		$('.ps_box .pics_switch_clients ul li span').stop(true,false).animate({"opacity":"0.4"},600).eq(index).stop(true,false).animate({"opacity":"1"},600); //为当前的按钮切换到选中的效果
	}
	
});
</script>



</body>
</html>
