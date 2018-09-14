$(window).load(function() {
			// 百度地图API功能
			map = new BMap.Map("l-map");
			addController();
			var point = new BMap.Point(121.480201, 31.236336);// 上海
			map.centerAndZoom(point, 11);
			//map.enableScrollWheelZoom(true);
			//自适应宽度
			window.onresize = initResize;
			initResize();

    switch (getUrlParam('flag')){
        // case 'corp':{
        //     $("#corpType").val("维修企业");
        //     break
        // }
        case 'check':{
            $("#corpType").val("综合检测站");
            break;
        }
        case 'wyc':{
            $("#corpType").val("危运车辆维修");
            break;
        }
        case 'xny':{
            $("#corpType").val("新能源汽车维修");
            break;
        }
        case 'qcjy':{
            $("#corpType").val("汽车救援");
            break;
        }
		default:
            $("#corpType").val("综合检测站");
            break;
    }

			getCorpData();
			$(".arealist a").click(function(){
				var obj = $(this);
				var type = obj.attr("data-type");
				var code = obj.attr("data-code");
				$(this).addClass('active').siblings('a').removeClass('active');
				getCorpData();
			});
//			$(".sellist").on("click",".Typeclose", function() {
//			     $(this).parent().remove();
//				if($(".sellist a").length <= 0) {
//					$(".sellist").append('<span data-type="all">所有类型</span>');
//				}
//				getCorpData();
//			 });


			 $('#searchbtn').click(function(){
			 	getCorpData();
			 });
			 
			 $(document).click(function(event){
			 	var dom = $(event.target).parents(".hoverlist");
			 	if(!dom.attr("data-toggle")){
			 		$(".hoverlist").removeClass('layui-form-selected');
			 	}
			 });
			$(".sellist .layui-select-title").click(function(){
				var par = $(this).parents(".sellist");
				if(!par.hasClass('layui-form-selected')){
		 			par.addClass('layui-form-selected');
		 		}
			});
			
			$('.sellist dl dd').click(function(){
			 		var par = $(this).parents(".sellist");
					var value = $(this).attr("data-value");
					// console.log(value);
					if(value == '维修企业'){
						$("#corpSarchCondition").show();
					}else{
						$("#corpSarchCondition").hide();
					}
					$(this).addClass('layui-this').siblings().removeClass('layui-this');
					par.removeClass('layui-form-selected');
					par.find('input').val(value);
			 		getCorpData();
			 });
			 
			 $('.hoverlist dl dd').click(function(){
			 		var par = $(this).parents(".search_select");
			 		if($(this).hasClass('select-this')){
			 			$(this).removeClass('select-this');
			 		}else{
			 			$(this).addClass('select-this');
			 		}
			 		var items = [];
			 		var titleItems = [];
			 		par.find('dl .select-this').each(function(){
			 			items.push($(this).attr('data-value'));
			 			titleItems.push($(this).find('span').text());
			 		});
			 		if(titleItems && titleItems.length > 0){
			 			par.find('input').val(titleItems.join('|'));
			 			par.attr("title",titleItems.join('|'));
			 		}else{
			 			par.find('input').val(par.attr('data-tit'));
			 			par.attr("title",par.attr('data-tit'));
			 		}
			 		
			 		if(items && items.length > 0){
			 			par.attr("data-value",items.join(','));
			 		}else{
			 			par.attr("data-value",'');
			 		}
			 		getCorpData();
			 });

			$('.hoverlist2 dl dd').click(function(){
				var par = $(this).parents(".search_select");
				if($(this).hasClass('select-this')){
					$(this).removeClass('select-this');
				}else{
					$('.hoverlist2 dl dd').removeClass('select-this');
					$(this).addClass('select-this');
				}
				var items = [];
				var titleItems = [];
				par.find('dl .select-this').each(function(){
					items.push($(this).attr('data-value'));
					titleItems.push($(this).find('span').text());
				});
				if(titleItems && titleItems.length > 0){
					par.find('input').val(titleItems.join('|'));
					par.attr("title",titleItems.join('|'));
				}else{
					par.find('input').val(par.attr('data-tit'));
					par.attr("title",par.attr('data-tit'));
				}

				if(items && items.length > 0){
					par.attr("data-value",items.join(','));
				}else{
					par.attr("data-value",'');
				}
				getCorpData();
			});
			 
			 $('.brand_select dl dd a').click(function(){
			 		var par = $(this).parents(".search_select");
			 		if($(this).hasClass('select-this')){
			 			$(this).removeClass('select-this');
			 		}else{
			 			$(this).addClass('select-this');
			 		}
			 		var items = [];
			 		var titleItems = [];
			 		par.find('dl .select-this').each(function(){
			 			items.push($(this).attr('data-value'));
			 			titleItems.push($(this).find('span').text());
			 		});
			 		if(titleItems && titleItems.length > 0){
			 			par.find('.select-selected span').html(titleItems.join('|'));
			 			par.attr("title",titleItems.join('|'));
			 		}else{
			 			par.find('.select-selected span').html(par.attr('data-tit'));
			 			par.attr("title",par.attr('data-tit'));
			 		}
			 		
			 		if(items && items.length > 0){
			 			par.attr("data-value",items.join(','));
			 		}else{
			 			par.attr("data-value",'');
			 		}
			 		getCorpData();
			 });
			 
			 $('.brand_select .clear').click(function(){
			 		var par = $(this).parents(".search_select");
			 		var bselect = $(this).parents(".brandselect");
			 		$('.brand_select dl dd a').each(function(){
			 			if($(this).hasClass('select-this')){
				 			$(this).removeClass('select-this');
				 		}
			 		});
			 		par.find('.select-selected span').html(par.attr('data-tit'));
			 		par.attr("data-value",'');
			 		par.attr("title",par.attr('data-tit'));
			 		//bselect.removeClass('active');
			 		getCorpData();
			 });
			 
			 $('.hoverlist,.hoverlist2').hover(function(){
			 	$(".brandselect").removeClass('active');
			 });
			 
			 $(".brandselect .brand-index a").click(function(){
			 	$(this).addClass('selected').siblings('a').removeClass('selected');
			 	isSelectIndex = true;
			 	setTimeout(function(){
			 		isSelectIndex = false;
			 	},1000);
			 	var selChart = $(this).html();
			 	$(".brandselect .select-dl dl").each(function(){
			 		var dt = $(this).find('dt');
			 		var chart = dt.html();
			 		if(selChart == chart){
//			 			$('.brandselect .select-dl').scrollTop(
//					    	$(this).offset().top - $('.brandselect .select-dl').offset().top + $('.brandselect .select-dl').scrollTop()
//					  	);
					  	 $('.brandselect .select-dl').animate({
					    	scrollTop: $(this).offset().top - $('.brandselect .select-dl').offset().top + $('.brandselect .select-dl').scrollTop()
					  	}, 200);//0.2秒滑动到指定位置
			 		}
			 	});
			 });
			 
			 $('.brandselect .select-dl').on('scroll',function(){
			 	var me = this;
			 	if(isSelectIndex){
			 		return false;
			 	}
			 	var rembObj;
			    $(".brandselect .select-dl dl").each(function(){
			    	if($(me).scrollTop() >= $(this).offset().top - $(me).offset().top +  $(me).scrollTop()){
			    		rembObj = $(this);
			    	}
			    });
			    if(rembObj){
			    	$(".brandselect .brand-index a").each(function(){
			    		var dt = rembObj.find('dt');
				 		var chart = dt.html();
				 		if(chart == $(this).html()){
				 			$(this).addClass('selected').siblings('a').removeClass('selected');
				 		}
			    	});
			    }
			});
			 
			 $(".brandselect").mouseover(function(){
			 	$(this).addClass('active');
			 });
			 
			 $(document).click(function(event){
			 	var dom = $(event.target).parents(".brandselect");
			 	if(!dom.attr("data-toggle")){
			 		$(".brandselect").removeClass('active');
			 	}
			 });
			 
//			 $('#searchType').change(function(){
//			 	getCorpData();
//			 });
//			 
//			  $('#searchStar').change(function(){
//			 	getCorpData();
//			 });
			 //拉伸地图按钮
			$("#narrow_left").bind("click",function(){
				$("#map-left-content").hide();
				$(".map_left").animate({"width":"0px","display":"none"},0,function(){
				});
				//$(".map_left_content").animate({"width":"0px"},"3000");
				var w = document.body.clientWidth;
				$(".map_right_top").css({"width":w-2});
				$(".map_right_place").css({"width":w-2});
				$("#l-map").css({"width":w-2});
				$(this).css("display","none");
				$("#narrow_right").css("display","block");			
			});
			$("#narrow_right").bind("click",function(){
				$("#narrow_right").css("display","none");
				$(".map_left").animate({"width":"381px","display":"block"},0,function(){
					$("#map-left-content").show();
					var w = document.body.clientWidth;
					$(".map_right_top").css({"width":w-382});
					$(".map_right_place").css({"width":w-382});
					$("#l-map").css({"width":w-382});
					$("#narrow_left").css("display","block");
				});
			});
		});
var isSelectIndex = false;
		
var pageSize = 6;
		
function getCorpData(){
	var params = {
		latitude: "31.236336",
		longitude : "121.480201",
//		type:$('#searchType').val(),
//		star_level:$('#searchStar').val(),
		corp_name:$('#searchtext').val()
	};
	var corpType = $("#corpType").val();
	if(corpType == '维修企业'){
		$('.search_select').each(function(){
			var type = $(this).attr("data-type");
			var value = $(this).attr("data-value");
			params[type] = value;
		});
	}else{
        $('.search_select').each(function(){
            var type = $(this).attr("data-type");
            params[type] = "";
        });
        $("#companycategory").attr("data-value","")
    }
	var obj = $('.arealist .active');
	var type = obj.attr("data-type");
	var code = obj.attr("data-code"); 
	params[type] = code;
	params.corpType = corpType;
	switch (corpType){
		case '维修企业':{
            params.corpType= '164'
			break
		}
        case '综合检测站':{
            params.corpType= '166'
            break
        }
        case '危运车辆维修':{
            params.corpType= '214'
            break
        }
        case '新能源汽车维修':{
            params.corpType= '215'
            break
        }
        case '汽车救援':{
            params.corpType= '213'
            break
        }
	}

	var areaName = '';
	if(code != null && code != ''){
		areaName = obj.html();
	}
//	var corpName = $('#searchtext').val();
//	if(corpName == searchtext.defaultValue){
//		corpName = '';
//	}
//	params.corp_name = corpName;
	map.setZoom(alljs);
	setPlace(areaName);
	//map.clearOverlays();
	
	var url = ctx + "/maintain/getRangeCorps";
    systemCall(function (sysTok) {
        var par = {
            companycategory: $("#companycategory").attr("data-value"),
            systemToken: sysTok,
            corpAreaEq: params.area,
            corpName: $("#searchtext").val(),
            magorBrandsLk: params.magor_brands_lk,
            iSort: ($("#compsort").val()=='信誉等级'),
            starLevel: '',
            type: params.corpType? params.corpType: '164',
            limit: 500,
            page: 1
        }
        simplePost(baseu + '/maintain/getRangeCorps', JSON.stringify(par), function (res) {
            console.log(res)

			// ajaxEvent(url,params,function(ret){
		var datas = res.data;
        var totalCount = res.totalCount;

        map.clearOverlays();

		// if(datas && datas.length > 0){
		// 	var centerPoint = new BMap.Point(datas[0].longitude, datas[0].latitude);
		// 	map.centerAndZoom(centerPoint, js);
		// }

        // var point = new BMap.Point(121.480201, 31.236336);// 上海
        // map.centerAndZoom(point, 11);

		$('#totalrecords').html(totalCount);
		for (var i = 0; i < datas.length; i++) {
			(function(x){
				var corp = datas[x];
                corp.LONGITUDE= corp.longitude, corp.LATITUDE= corp.latitude;
				// if (corp.LONGITUDE == "" || corp.LATITUDE == "" || corp.LONGITUDE == null  || corp.LATITUDE == null) {
				// 	corp.LONGITUDE = 121.480201;
				// 	corp.LATITUDE = 31.236336;
				// }
					var img = "statics/images/shqxw.jpg";
					var html = '';
					var point = new BMap.Point(corp.LONGITUDE,corp.LATITUDE);
					if(corpType != '综合检测站'){
						if(corp.FRONT_PHOTO){
					    	img =  "attach/" + corp.FRONT_PHOTO;
					    }
						var credit = ' — ';
						if(corp.CREDIT_LEVEL){
							credit = corp.CREDIT_LEVEL;
							if(corp.CREDIT_YEAR){
								credit += '（' + corp.CREDIT_YEAR + '年度）';
							}
						}
						html = '<div class="jianjie" style="margin:0px;border:0px;">' +
							            '<div class="jianjie_b">' +
							            	'<div class="img" style="float:right;width:170px;">' +
							                    '<img src="' + img + '" width="168" height="150" alt="">' +
							                '</div>' +
							                '<ul style="float:left;width:310px;">' +
												'<li><span>企业名称：</span>' + (corp.corpName?corp.corpName:"") + '</li>' +
												// '<li><span>经营范围：</span>' + (corp.companybusinessscope? corp.companybusinessscope: '') + '</li>' +
												// '<li><span>服务星级：</span>' + getStar(corp.STAR_LEVEL) + '</li>' +
												// '<li><span>信誉等级：</span>' + (corp.creditLevel?corp.creditLevel:"" )+ '</li>' +
												// '<li><span>主修品牌：</span>' + (corp.brand!="否"?(corp.brand?corp.brand:""): "") + '</li>' +
												// '<li><span>营业时间：</span>' + (corp.time?corp.time:"" )+ '</li>' +
												'<li><span>经营地址：</span>' + (corp.corpAdd? corp.corpAdd: "") + '</li>' +
												'<li><span>联系电话：</span>' + (corp.linkTel?corp.linkTel:"") + '</li>' +
                                                // '<li><span>联系电话：</span>' + '******' + '</li>' +
							                '</ul>' +
							            '</div>' +
							        '</div>' +
							        '<div style="text-align:center;width:500px;margin:15px 0px;">' +
							        	'<a class="layui-btn layui-btn-normal" id="doLoginbtn" href="' + ctx + '/maintain/detail/' + corp.corpId + '" target="_blank"><i class="layui-icon"></i> 查看详情</a>' +
							        '</div>';
					}else{
						corp.CORP_ID = corp.corpId;
						corp.CORP_NAME = corp.corpName;
						var car = '机动车综合性能检测';
						html = '<div class="jianjie" style="margin:0px;border:0px;">' +
							            '<div class="jianjie_b">' +
							            	'<div class="img" style="float:right;width:170px;">' +
							                    '<img src="' + img + '" width="168" height="150" alt="">' +
							                '</div>' +
							                '<ul style="float:left;width:310px;">' +
							                	'<li><span>企业名称：</span>' + (corp.corpName?corp.corpName:"") + '</li>' +
												'<li><span>经营范围：</span>' + (car) + '</li>' +
												// '<li><span>检测站简称：</span>' + '' + '</li>' +
							                	'<li><span>经营地址：</span>' + (corp.corpAdd? corp.corpAdd: "") + '</li>' +
							                	// '<li><span>所属辖区：</span>'  + '' +  '</li>' +
							                	'<li><span>联系电话：</span>' + (corp.linkTel?corp.linkTel:"") + '</li>' +
                                                // '<li><span>联系电话：</span>' + '******' + '</li>' +
                                                // '<li><span>传真：</span>'  + '' +  '</li>' +
							                '</ul>' +
							            '</div>' +
							        '</div>';
						
					}
				    
					var mar = new BMap.Marker(point,{icon : icon_orange});
					map.addOverlay(mar);
//					var label = new BMap.Label(corp.CORP_NAME,{offset:new BMap.Size(20,-10)});
//					mar.setLabel(label);
					var searchInfoWindow = new BMapLib.SearchInfoWindow(map, html, {
						title : '<b>' + corp.corpName + '</b>', // 标题
						width : 520, // 宽度
						panel : "panel", // 检索结果面板
						enableAutoPan : true, // 自动平移
						enableSendToPhone: false,
						//enableMessage : false,
						searchTypes : [BMAPLIB_TAB_FROM_HERE,// 从这里出发
								BMAPLIB_TAB_SEARCH, // 周边检索
								BMAPLIB_TAB_TO_HERE // 到这里去
						]
					});
					//searchInfoWindow.open(mar);
					mar.searchInfoWindow = searchInfoWindow;
					mar.addEventListener("click", function() {
						searchInfoWindow.open(mar);
					});
					linkMarkers['marker-' + corp.corpId] = mar;
			})(i);
		}
		laypage.render({
				elem: 'pagebar',
				limit: 6,
				count:datas.length,
				cont: 'pagebar',
				skin: '#4ba7f5',
			    groups:5,
			    curr:1,
			    pages: Math.ceil(datas.length/pageSize), //得到总页数
			    jump: function(obj){
			    	$("#corplist").empty();
			    	$("#corplist").append(render(datas, obj.curr));
			    	$("#corplist li").click(function(){
			    		var corpId = $(this).attr('data-corp');
			    		//map.panTo(linkMarkers['marker-' + corpId].point);
			    		linkMarkers['marker-' + corpId].searchInfoWindow.open(linkMarkers['marker-' + corpId]);
			    	});
			    }
			});
	// });


        })
    })

}

function getStar(v){
	var star=parseInt(v);
	var text='';
	var full='<i class="icon-star bigger-150" style="color:orange;"></i>';
	var half='<i class="icon-star-half-empty bigger-150" style="color:orange;"></i>';
	var empty='<i class="icon-star-empty bigger-150" style="color:orange;"></i>';
	if(star==0){
		text=empty+empty+empty+empty+empty;
	}else if(star==1){
		text=half+empty+empty+empty+empty;
	}else if(star==2){
		text=full+empty+empty+empty+empty;
	}else if(star==3){
		text=full+half+empty+empty+empty;
	}else if(star==4){
		text=full+full+empty+empty+empty;
	}else if(star==5){
		text=full+full+half+empty+empty;
	}else if(star==6){
		text=full+full+full+empty+empty;
	}else if(star==7){
		text=full+full+full+half+empty;
	}else if(star==8){
		text=full+full+full+full+empty;
	}else if(star==9){
		text=full+full+full+full+half;
	}else if(star==10){
		text=full+full+full+full+full;
	}
	return text;
}

var initResize = function(){
			var w = document.body.clientWidth;
			var l_or_r = $("#narrow_left").css("display");
			if(l_or_r == "none"){
				$(".map_right_top").css({"width":w-1});
				$(".map_right_place").css({"width":w-1});
				$("#l-map").css({"width":w-1});
			}else{
				$(".map_right_top").css({"width":w-382});
				$(".map_right_place").css({"width":w-382});
				$("#l-map").css({"width":w-382});
			}
			
			
		}

function render(datas,curr){
	var arr = [],thisData = datas.concat().splice(curr*pageSize-pageSize, pageSize);
	var corpType = $("#corpType").val();
    layui.each(thisData, function(index, item){
    	var img = "statics/images/shqxw.jpg";
	    if(item.FRONT_PHOTO){
	    	img = window.location.origin + "attach/" + item.FRONT_PHOTO;
	    }
	    var html = '';
	    if(corpType != '综合检测站'){
	    	html = '<li data-corp="' + item.corpId + '">' +
                    	'<a href="javascript:void(0);">' +
                        	'<img src="' + img +'" width="100" height="70" alt="">' +
                            '<div class="ziliao">' +
								'<span class="zl_sp">' + item.corpName + '</span>' +
								'<span>地址：' + (item.corpAdd?item.corpAdd:"") + '</span>' +
								'<span>电话：' + (item.linkTel?item.linkTel:"") + '</span>' +
                                // '<span>电话：' + '******' + '</span>' +
								// '<span>星级：' + getStar(item.STAR_LEVEL) + '</span>' +
                                ((item.apart=="0")?'': '<span>距离：' + apart(item.apart) + '</span>' )+
                            '</div>' +
                        '</a>' +
                    '</li>';
	    }else{
	    	html = '<li data-corp="' + item.corpId + '">' +
                    	'<a href="javascript:void(0);">' +
                        	'<img src="' + img +'" width="100" height="70" alt="">' +
                            '<div class="ziliao">' +
                                '<span class="zl_sp">' + item.corpName + '</span>' +
                                '<span>地址：' + (item.corpAdd?item.corpAdd:"") + '</span>' +
                                '<span>电话：' + (item.linkTel?item.linkTel:"") + '</span>' +
                                '<span>传真：' + '' + '</span>' +
                            '</div>' +
                        '</a>' +
                    '</li>';
	    }
      arr.push(html);
    });
    return arr.join('');
}

function apart(ap) {
    var flap= parseFloat(ap)
    if(flap>=1000){
        return (flap/1000).toFixed(1)+' km'
    }else{
        return ap+' 米'
    }
}

function setText(text) {
	$('#editText').show();
	$('#editText_ch').html(text);
}

function closeText() {
	$('#editText').hide();
}
function toPanorama() {
	closeText();
	document.getElementById("panorama").style.display = "";
	document.getElementById('svInfoText').style.display = "";
	document.getElementById("allmap").style.display = "none";
	var panorama = new BMap.Panorama('panorama');
	panorama.setPosition(marker.getPosition());
	var panoramaService = new BMap.PanoramaService();
	panoramaService.getPanoramaByLocation(marker.getPosition(), function(data) {
				var panoramaInfo = "";
				if (data == null) {
					document.getElementById('panorama').innerHTML = "该位置没有全景地图";
					return;
				}
				panoramaInfo += '全景路段名为：' + data.description + '  \n';
				panoramaInfo += '坐标为：' + data.position.lng + ' : '
						+ data.position.lat + '\n';
				document.getElementById('svInfoText').innerHTML = panoramaInfo;
			});
}

function closePanorama() {
	document.getElementById("panorama").style.display = "none";
	document.getElementById("svInfoText").style.display = "none";
	document.getElementById("allmap").style.display = "";
}

function editContent() {
	var win = parent.window.Ext.create('Ext.window.Window', {
				title : '修改企业内容',
				autoShow : true,
				height : 400,
				width : 600,
				layout : 'fit',
				modal : true,
				items : [{
					xtype : 'form',
					layout : {
						type : 'table',
						columns : 3
					},
					defaults : {
						msgTarget : 'side',
						labelWidth : 65
					},
					items : [{
								xtype : 'textfield',
								margin : '5 0 5 0',
								width : 500,
								fieldLabel : '地址',
								allowBlank : false,
								colspan : 2,
								name : 'CORP_ADDR'
							}, {
								xtype : 'button',
								width : 60,
								text : '获取地址',
								handler : function(btn) {
									var geocoder = new BMap.Geocoder();
									geocoder.getLocation(marker.getPosition(),
											function(result) {
												var form = win.down('form')
														.getForm();
												form
														.findField('CORP_ADDR')
														.setValue(result.address);
											});
								}

							}, {
								xtype : 'textfield',
								width : 280,
								colspan : 3,
								fieldLabel : '电话',
								name : 'CORP_TEL'
							}, {
								xtype : 'numberfield',
								width : 280,
								colspan : 3,
								fieldLabel : '星级评定',
								name : 'CORP_STAR_LEVEL'
							}, {
								xtype : 'htmleditor',
								width : 580,
								colspan : 3,
								id: 'context',
								plugins: [
					        	    parent.window.Ext.create('app.ux.HtmlEditorImage')
					            ],
								height : 250,
								fieldLabel : '业务介绍',
								name : 'SELF_INTRODUCTION'
							}]
				}],
				bbar : ['->', {
					xtype : 'button',
					text : '确定',
					icon : 'images/accept.png',
					handler : function(btn) {
						var form = win.down('form').getForm();
						if (!form.isValid()) {
							return false;
						}
						var params = form.getValues();
						$('#corpAddr').val(params.CORP_ADDR);
						$('#corpTel').val(params.CORP_TEL);
						$('#corpStarLevel').val(params.CORP_STAR_LEVEL);
						$('#selfIntroduction').html(params.SELF_INTRODUCTION);
						win.close();
						parent.window.Ext.mytip.msg("提示",
								"<font color='red'>企业信息已更改，请点击保存后方可生效！</font>");
					}
				}, {
					xtype : 'button',
					text : '关闭',
					icon : 'images/cross.png',
					handler : function(btn) {
						win.close();
					}
				}]
			});
	var form = win.down('form').getForm();
	var params = {
		CORP_ADDR : $('#corpAddr').val(),
		CORP_TEL : $('#corpTel').val(),
		CORP_STAR_LEVEL : $('#corpStarLevel').val(),
		SELF_INTRODUCTION : $('#selfIntroduction').html()
	};
	form.setValues(params);
}

function myposition(pload) {
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r) {
				if (this.getStatus() == BMAP_STATUS_SUCCESS) {
					marker.setPosition(r.point);
					map.panTo(r.point);
					var circle = new BMap.Circle(r.point, 1000, {
								strokeColor : "blue",
								strokeWeight : 2,
								strokeOpacity : 0.2
							}); // 创建圆
					map.addOverlay(circle); // 增加圆
					pload.hide();
					pload.setLoading(false);
				} else {
					pload.hide();
					pload.setLoading(false);
					alert('定位失败！');
				}
			}, {
				enableHighAccuracy : true
			});
}

function infoWindow(mark, title, addr, tel, req, remark) {
	var div = "<div>"
			+ '<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">'
			+ '<tr style="margin:2px;">'
			+ '<td width="38px" valign="top"><strong>地址：</strong></td>'
			+ '<td width="215px" >'
			+ addr
			+ '</td>'
			+ '<td width="28px" valign="top"><a href="javascript:editContent();" id="content_id">修改</a></td>'
			+ '</tr>' + '<tr>' + '<td width="38px"><strong>电话：</strong></td>'
			+ '<td colspan="2">' + tel + '</td>' + '</tr>' + '<tr>'
			+ '<td width="38px"><strong>星级：</strong></td>' + '<td colspan="2">'
			+ req + '</td>' + '</tr>' + '<tr>' + '<td colspan="3">' + remark
			+ '</td>' + '</tr>' + "</div>"

	// var div = "<div style='width:100%;' width='290px;'>" +
	// "<div style='float:left;width:250px;height:60px;'>" +
	// "<span><strong>地址：</strong></span><span id='content_add'>" + addr +
	// "</span><br/>" +
	// "<span><strong>电话：</strong></span><span id='content_phone'>" + tel +
	// "</span><br/>" +
	// "<span><strong>星级：</strong></span><span id='content_phone'>" + req +
	// "</span><br/>" +
	// "</div>" +
	// "<div style='float:right;width:30px;height:60px;'><a
	// href='javascript:editContent();' id='content_id'>修改</a></div>" +
	// "</div>" +
	// "<div style='width:100%;' width='290px;'>" +
	// remark +
	// "</div>";
	var searchInfoWindow = new BMapLib.SearchInfoWindow(map, div, {
				title : title, // 标题
				width : 290, // 宽度
				panel : "panel", // 检索结果面板
				enableAutoPan : true, // 自动平移
				enableMessage : false,
				searchTypes : [BMAPLIB_TAB_FROM_HERE,// 从这里出发
						BMAPLIB_TAB_SEARCH, // 周边检索
						BMAPLIB_TAB_TO_HERE // 到这里去

				]
			});
	searchInfoWindow.open(mark);
	mark.addEventListener("click", function() {
				searchInfoWindow.open(mark);
			});
}


function setPlace(areaName) {
	function myFun() {
		var pp = local.getResults().getPoi(0).point; // 获取第一个智能搜索的结果
		map.centerAndZoom(pp, 11);
	}
	var local = new BMap.LocalSearch(map, { // 智能搜索
		onSearchComplete : myFun
	});
	local.search("上海市" + areaName + areaName);
}

function setAddPlace(add) {
	if (parent.window.Ext.isEmpty(add)) {
		parent.window.Ext.Msg.alert('系统提示','请输入地址!');
		return;
	}
	function myFun() {
		stopAnimaMarker();
		var result = local.getResults().getPoi(0); // 获取第一个智能搜索的结果
		if (parent.window.Ext.isEmpty(result)) {
			parent.window.Ext.Msg.alert('系统提示','找不到该地址!');
			return;
		}
		var pp = result.point;
		map.centerAndZoom(pp, js);
		closeCircles();
		var Cirmarker = new BMap.Marker(pp, {
					icon : icon
				}); // 创建标注
		map.addOverlay(Cirmarker);
		var cirlabel = new BMap.Label("地址搜索：<font color='blue'>" + add + "以及周围500米范围<br/>请点击该范围设置位置。</font>",{offset:new BMap.Size(20,-10)});
		Cirmarker.setLabel(cirlabel);
		var circle = new BMap.Circle(pp, 500, {
					strokeColor : "blue",
					strokeWeight : 2,
					strokeOpacity : 0.2
				}); // 创建圆
		map.addOverlay(circle); // 增加圆
		circles.push(circle);
		circles.push(cirlabel);
		circles.push(Cirmarker);
	}
	var local = new BMap.LocalSearch(map, { // 智能搜索
		onSearchComplete : myFun
	});
	local.search(add);
}

function addController() {
	var top_left_control = new BMap.ScaleControl({
				anchor : BMAP_ANCHOR_BOTTOM_RIGHT
			});// 左上角，添加比例尺
	var top_left_navigation = new BMap.NavigationControl({offset: new BMap.Size(20, 20)}); // 左上角，添加默认缩放平移控件
//	var top_left_navigation = new BMap.NavigationControl({
//				anchor : BMAP_ANCHOR_TOP_LEFT
//			}); // 左上角，添加默认缩放平移控件
	map.addControl(top_left_control);
	map.addControl(top_left_navigation);
	var mapType1 = new BMap.MapTypeControl({
				mapTypes : [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
				offset: new BMap.Size(10, 20)
			});
	var mapType2 = new BMap.MapTypeControl({
				anchor : BMAP_ANCHOR_TOP_RIGHT
			});

	// 添加地图类型和缩略图
	map.addControl(mapType1); // 2D图，卫星图
	// map.addControl(mapType2); //左上角，默认地图控件
	// map.setCurrentCity("广州"); //由于有3D图，需要设置城市哦
}

function dePosition(point) {
	var geocoder = new BMap.Geocoder();
	geocoder.getLocation(point, function(result) {
				$("#content_add").html(result.address);
				console.log(result);
			});
}

// 复杂的自定义覆盖物
function ComplexCustomOverlay(point, text, mouseoverText) {
	this._point = point;
	this._text = text;
	this._overText = mouseoverText;
}
ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function(mp) {
	this._map = mp;
	var div = this._div = document.createElement("div");
	div.style.position = "absolute";
	div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
	div.style.backgroundColor = "#EE5D5B";
	div.style.border = "1px solid #BC3B3A";
	div.style.color = "white";
	div.style.height = "18px";
	div.style.padding = "2px";
	div.style.lineHeight = "18px";
	div.style.whiteSpace = "nowrap";
	div.style.MozUserSelect = "none";
	div.style.fontSize = "12px"
	var span = this._span = document.createElement("span");
	div.appendChild(span);
	span.appendChild(document.createTextNode(this._text));
	var that = this;

	var arrow = this._arrow = document.createElement("div");
	arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
	arrow.style.position = "absolute";
	arrow.style.width = "11px";
	arrow.style.height = "10px";
	arrow.style.top = "22px";
	arrow.style.left = "10px";
	arrow.style.overflow = "hidden";
	div.appendChild(arrow);

	div.onmouseover = function() {
		this.style.backgroundColor = "#6BADCA";
		this.style.borderColor = "#0000ff";
		this.getElementsByTagName("span")[0].innerHTML = that._overText;
		arrow.style.backgroundPosition = "0px -20px";
	}

	div.onmouseout = function() {
		this.style.backgroundColor = "#EE5D5B";
		this.style.borderColor = "#BC3B3A";
		this.getElementsByTagName("span")[0].innerHTML = that._text;
		arrow.style.backgroundPosition = "0px 0px";
	}

	map.getPanes().labelPane.appendChild(div);

	return div;
}
ComplexCustomOverlay.prototype.draw = function() {
	var mp = this._map;
	var pixel = mp.pointToOverlayPixel(this._point);
	this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
	this._div.style.top = pixel.y - 50 + "px";
}

function stopAnimaMarker() {
	if (!parent.Ext.isEmpty(animaMarker)) {
		for (var i = 0; i < animaMarker.length; i++) {
			animaMarker[i].setAnimation(null);
			animaMarker[i].setIcon(icon_red);
		}
	}
}

function closeCircles() {
	if (!parent.Ext.isEmpty(circles)) {
		for (var i = 0; i < circles.length; i++) {
			map.removeOverlay(circles[i]);
		}
	}
}
var icon = new BMap.Icon(
		"images/mark/1006.png",
		new BMap.Size(16, 16));
var icon_red = new BMap.Icon(
		"images/mark/mark_red.png",
		new BMap.Size(32, 32));
var icon_blue = new BMap.Icon(
		"images/mark/mark_blue.png",
		new BMap.Size(32, 32));
var icon_green = new BMap.Icon(
		"images/mark/mark_green.png",
		new BMap.Size(32, 32));
var icon_orange = new BMap.Icon(
		"statics/images/mark/mark_orange.png",
		new BMap.Size(32, 32));
icon_orange.imageSize= new BMap.Size(32, 32)

var map, marker, circle, animaMarker = [],linkMarkers = {};
var circles = [];
var js = 16;
var alljs = 13;