var corpLimit = 4;
var corpMapLimit = 500;
var autoCompleteFlg = false;
var defaultCorpName = "上海";
var currentCorpId;

    $(window).load(function() {
			// 百度地图API功能
			map = new BMap.Map("map_b");
			addController();
			var point = new BMap.Point(121.480201, 31.236336);// 上海
			map.centerAndZoom(point, js);

			var ac = new BMap.Autocomplete({
				"input" : "searchtext",
				"location" : map
			});

			ac.addEventListener("onhighlight", function(e) {

			});

			ac.addEventListener("onconfirm", function(e) {
                var _value = e.item.value;
                myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                $('#searchResultPanel').innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

                setPlace();
			});

			$('#searchtext').change(function(){
				if(autoCompleteFlg){
                    autoCompleteFlg = false;
				} else{
                    $('#hidLat').val('');
                    $('#hidLng').val('');
				}
			});

			function setPlace(){
                var local = new BMap.LocalSearch(map, {
                    onSearchComplete: function (){
                        var pp = local.getResults().getPoi(0).point;

                        autoCompleteFlg = true;
                        $('#hidLat').val(pp.lat);
                        $('#hidLng').val(pp.lng);

                        // map.centerAndZoom(pp, 18);
                    }
                });

				local.search(myValue);
			}

    		//map.enableScrollWheelZoom(true);
			//自适应宽度
			//	window.onresize = initResize;
			//	initResize();
            // listData();
        getDefaultCompany();
//			$(".arealist a").click(function(){
//				var obj = $(this);
//				var type = obj.attr("data-type");
//				var code = obj.attr("data-code");
//				$(this).addClass('active').siblings('a').removeClass('active');
//				listRangeCorp();
//			});
//			$(".sellist").on("click",".Typeclose", function() {
//			     $(this).parent().remove();
//				if($(".sellist a").length <= 0) {
//					$(".sellist").append('<span data-type="all">所有类型</span>');
//				}
//				listRangeCorp();
//			 });
			var onceSearch=true
			 $('#searchbtn').click(function(){
				 if(onceSearch){
					 // layer.alert("维修质量可进行评价。", {
						//  time: 2000 //1.5秒关闭（如果不配置，默认是3秒）
					 // });
					 onceSearch=false
				 }
                 var corpName = $('#searchtext').val();
                 listData(corpName);
             });

			 $('.selSearchOptionHoverlist dl dd').click(function(){
					var corpName = $('#searchtext').val();
					listData(corpName);
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

			 		var corpName = $('#searchtext').val();
                 	listData(corpName);
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

				var corpName = $('#searchtext').val();
				listData(corpName);
			});

        $('.hoverlist3 dl dd').click(function(){
            var par = $(this).parents(".search_select");
            if($(this).hasClass('select-this')){
                $(this).removeClass('select-this');
            }else{
                $('.hoverlist3 dl dd').removeClass('select-this');
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

            var corpName = $('#searchtext').val();
            listData(corpName);
        });

        $('.hoverlist4 dl dd').click(function(){
            var par = $(this).parents(".search_select");
            if($(this).hasClass('select-this')){
                $(this).removeClass('select-this');
            }else{
                $('.hoverlist4 dl dd').removeClass('select-this');
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

            var corpName = $('#searchtext').val();
            listData(corpName);
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

			 		var corpName = $('#searchtext').val();
                 	listData(corpName);
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
			 		var corpName = $('#searchtext').val();
                 	listData(corpName);
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
//			 	var corpName = $('#searchtext').val();
//              listData(corpName);
//			 });
//			 
//			  $('#searchStar').change(function(){
// 				var corpName = $('#searchtext').val();
// 			 	listData(corpName);
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

function getDefaultCompany() {
    layer.load();
    var params = getParams();

    var isRender = true;
    systemCall(function (sysTok) {
        var param = {
            systemToken: sysTok,
            corpName: $("#searchtext").val(),
            // lat: $("#hidLat").val(),
            // lng: $("#hidLng").val(),
            lat: "31.236336",
            lng: "121.480201",
            distance:params.distance,
            searchOption:$("#selSearchOption").attr('data-value'),
            sortField: params.sortField,
            companycategory: $("#companycategory").attr("data-value"),
            corpAreaEq: params.area,
            magorBrandsLk: params.magor_brands_lk,
            starLevel:'',
            type: '164',
            limit: 4,
            page: 1
        };

        $('#countResult').attr('hidden',true)
        $('#pagebar').attr('hidden',true)
        simplePost(baseu + '/maintain/getDefaultCompany', JSON.stringify(param), function (res) {
            console.log('/maintain/getDefaultCompany→res:',res);
            layer.closeAll('loading');

            var rangeCorps = res.data;
            var totalCount = res.totalCount;

            listRangeCorp4MapFromLocal(rangeCorps,param);

            // var point = new BMap.Point(121.480201, 31.236336);// 上海
            // // map.centerAndZoom(point, 11);
            // map.centerAndZoom(point, 15);

            $('#totalrecords').html(totalCount);
            $("#corplist").empty();
            $("#corplist").append(render(rangeCorps));
            $("#corplist li").click(function () {
                var corpId = $(this).attr('data-corp');
                //map.panTo(linkMarkers['marker-' + corpId].point);
                if(corpId){
                    getRangeCorp(corpId);
                }
            });

            if(isRender){
                if(laypage){
                    laypage.render({
                        elem: 'pagebar',
                        count: totalCount,
                        groups: 3,
                        limit:4,
                        jump: function(obj, first){
                            // if(!first){
                            //     listRangeCorp(obj.curr,pageSize,laypage,false);
                            // }
                        }
                    });
                }
            }
        });

    });
}

var listData = function (corpName) {
    layer.load();
	if(!corpName){
        corpName = defaultCorpName;
	}

    var local = new BMap.LocalSearch(map, { // 智能搜索
        onSearchComplete : function () {
            var searchResult = local.getResults();

            if(searchResult){
                var poi = searchResult.getPoi(0);
                if(poi){
                    var pp = searchResult.getPoi(0).point; // 获取第一个智能搜索的结果
                    // map.centerAndZoom(pp, alljs);

                    $('#hidLat').val(pp.lat);
                    $('#hidLng').val(pp.lng);
                } else{
                    $('#hidLat').val('');
                    $('#hidLng').val('');
                    alert("无法定位");
                }
            } else{
                $('#hidLat').val('');
                $('#hidLng').val('');
                alert("无法定位");
            }

            layui.use('laypage', function(){
                var laypage = layui.laypage;
                listRangeCorp(1,corpLimit,laypage);
            });

            // listRangeCorp4MapFromServer();
        }
    });
    local.search(corpName);
}

// var listData = function (corpName) {
//     layui.use('laypage', function(){
//         var laypage = layui.laypage;
//         listRangeCorp(1,corpLimit,laypage);
//     });
//
//     listRangeCorp4MapFromLocal();
// }

var listRangeCorp = function (pageNo,pageSize,laypage,isRender) {
    layer.load();
    var params = getParams();

    if(isRender === null || isRender === undefined || isRender === ''){
        isRender = true;
	}

    systemCall(function (sysTok) {
        var param = {
            systemToken: sysTok,
            corpName: $("#searchtext").val(),
            lat: $("#hidLat").val(),
            lng: $("#hidLng").val(),
            distance:params.distance,
            searchOption:$("#selSearchOption").attr('data-value'),
            sortField: params.sortField,
            companycategory: $("#companycategory").attr("data-value"),
            corpAreaEq: params.area,
            magorBrandsLk: params.magor_brands_lk,
            starLevel:'',
            type: '164',
            limit: pageSize,
            page: pageNo ? pageNo : 1
        };

        simplePost(baseu + '/maintain/getRangeCorps', JSON.stringify(param), function (res) {
            console.log('/maintain/getRangeCorps→res:',res);
            layer.closeAll('loading');
            $('#countResult').removeAttr('hidden')
            $('#pagebar').removeAttr('hidden')
            $('#corplist').attr('style','height:370px')
            var rangeCorps = res.data;
            var totalCount = res.totalCount;

            listRangeCorp4MapFromLocal(rangeCorps,param);

            $('#totalrecords').html(totalCount);
            $("#corplist").empty();
            $("#corplist").append(render(rangeCorps));
            $("#corplist li").click(function () {
                var corpId = $(this).attr('data-corp');
                //map.panTo(linkMarkers['marker-' + corpId].point);
				if(corpId){
                    getRangeCorp(corpId);
				}
            });

            if(isRender){
                if(laypage){
                    laypage.render({
                        elem: 'pagebar',
                        count: totalCount,
                        groups: 3,
						limit:4,
                        jump: function(obj, first){
                            if(!first){
                                listRangeCorp(obj.curr,pageSize,laypage,false);
                            }
                        }
                    });
                }
			}
        });
    });
};

var getRangeCorp = function (corpId) {
    systemCall(function (sysTok) {
        var param = {
            systemToken: sysTok,
            corpId: corpId
        };

        simplePost(baseu + '/maintain/corpDetail', JSON.stringify(param), function (res) {
            console.log('/maintain/corpDetail→res:',res);

            var rangeCorp = res.data;

            var html = '<div class="jianjie" style="margin:0px;border:0px;">' +
                '<div class="jianjie_b">' +
                '<div class="img" style="float:right;width:170px;">' +
                // '<img src="' + img + '" width="168" height="150" alt="">' +
                '</div>' +
                '<ul style="float:left;width:310px;">' +
                '<li><span>企业名称：</span>' + (rangeCorp.corpName ? rangeCorp.corpName : "") + '</li>' +
                '<li><span>经营地址：</span>' + (rangeCorp.corpAdd ? rangeCorp.corpAdd : "") + '</li>' +
                '<li><span>经营范围：</span>' + (rangeCorp.companybusinessscope? rangeCorp.companybusinessscope: '') + '</li>' +
                '<li><span>联系电话：</span>' + (rangeCorp.linkTel?rangeCorp.linkTel:"") + '</li>' +
				'<li><span>主修品牌：</span>' + (rangeCorp.brand!="否"?rangeCorp.brand: "") + '</li>' +
                '<li><span>信誉等级：</span>' + (rangeCorp.creditLevel?rangeCorp.creditLevel:"" )+ '</li>' +
                // '<li><span>收费标准：</span>' + (rangeCorp.hourprice ? rangeCorp.hourprice : "") + '</li>' +
                // '<li><span>服务星级：</span>' + getStar(rangeCorp.STAR_LEVEL) + '</li>' +
                // '<li><span>营业时间：</span>' + (rangeCorp.time?rangeCorp.time:"" )+ '</li>' +
                // '<li><span>联系电话：</span>' + '******' + '</li>' +
                // '<li><span>经营状况：</span></li>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '<div style="text-align:right;width:500px;margin:15px 0px;">' +
                '<a class="layui-btn layui-btn-normal turn-btn"  href="' + ctx + '/maintain/visit?company_id=' + rangeCorp.corpId + '" ><i class="layui-icon"></i>上门服务</a>' +
                '<a class="layui-btn layui-btn-normal turn-btn"  href="' + ctx + '/maintain/online?company_id=' + rangeCorp.corpId + '" ><i class="layui-icon"></i>预约服务</a>' +
                '<a class="layui-btn layui-btn-normal" id="doLoginbtn" href="' + ctx + '/maintain/detail/' + rangeCorp.corpId + '" target="_blank"><i class="layui-icon"></i> 查看详情</a>' +

                // '<a class="layui-btn layui-btn-normal" id="doLoginbtn" href="' + ctx + '/maintain/maintainDetail" target="_blank"><i class="layui-icon"></i> 查看详情</a>' +
                '</div>';

				var searchInfoWindow = new BMapLib.SearchInfoWindow(map, html, {
					title: '<b>' + rangeCorp.corpName + '</b>', // 标题
					width: 520, // 宽度
					panel: "panel", // 检索结果面板
					enableAutoPan: true, // 自动平移
					enableSendToPhone: false,
					//enableMessage : false,
					searchTypes: [
						BMAPLIB_TAB_FROM_HERE,// 从这里出发
						BMAPLIB_TAB_SEARCH, // 周边检索
						BMAPLIB_TAB_TO_HERE // 到这里去
					]
				});

            	var marker = linkMarkers['marker-' + rangeCorp.corpId];
            	map.centerAndZoom(marker.point, js);
            	searchInfoWindow.open(marker);

        });
    });
};

var listRangeCorp4MapFromLocal = function (rangeCorps,param) {
    map.clearOverlays();

    var farthestDistance = 0;

    for (var i = 0; i < rangeCorps.length; i++) {
        (function (x) {
            var rangeCorp = rangeCorps[x];
            var lat = rangeCorp.latitude;
            var lng = rangeCorp.longitude;
            var distance = rangeCorp.distance;

            if(distance > farthestDistance){
                farthestDistance = distance;
			}

            var point = new BMap.Point(lng, lat);
            var marker = new BMap.Marker(point, {icon: icon_orange});

            marker.addEventListener("click", function () {
                getRangeCorp(rangeCorp.corpId);
            });

            map.addOverlay(marker);
            linkMarkers['marker-' + rangeCorp.corpId] = marker;


        })(i);
    }

    if(param.searchOption && param.searchOption == 1){
        var centerPoint = new BMap.Point(param.lng, param.lat);

        var marker = new BMap.Marker(centerPoint);

        map.addOverlay(marker);
        map.centerAndZoom(centerPoint, calcZoom(farthestDistance));
    } else{
        var point = new BMap.Point(121.480201, 31.236336);// 上海
        map.centerAndZoom(point, 11);
	}
};

var calcZoom = function (distance) {
	var zoom;
	var unit = 7;
    distance = distance * 1000;

    if(distance > 2000 * 1000 * unit){
        zoom = 2;
    } else if(distance > 1000 * 1000 * unit){
        zoom = 3;
    } else if(distance > 500 * 1000 * unit){
        zoom = 4;
    } else if(distance > 200 * 1000 * unit){
        zoom = 5;
    } else if(distance > 100 * 1000 * unit){
        zoom = 6;
    } else if(distance > 50 * 1000 * unit){
        zoom = 7;
    } else if(distance > 25 * 1000 * unit){
        zoom = 8;
    } else if(distance > 20 * 1000 * unit){
        zoom = 9;
    } else if(distance > 10 * 1000 * unit){
        zoom = 10;
    } else if(distance > 5 * 1000 * unit){
        zoom = 11;
    } else if(distance > 2 * 1000 * unit){
        zoom = 12;
    } else if(distance > 1 * 1000 * unit){
        zoom = 13;
    } else if(distance > 500 * unit){
        zoom = 14;
    } else if(distance > 200 * unit){
        zoom = 15;
    } else if(distance > 100 * unit){
        zoom = 16;
    } else if(distance > 50 * unit){
        zoom = 17;
    } else if(distance > 20 * unit){
        zoom = 18;
    } else{
        zoom = 19;
	}

	return zoom - 1;
}

var listRangeCorp4MapFromServer = function () {
    var params = getParams();

    systemCall(function (sysTok) {
        var param4Map = {
            systemToken: sysTok,
            corpName: $("#searchtext").val(),
            lat: $("#hidLat").val(),
            lng: $("#hidLng").val(),
            distance:params.distance,
            searchOption:$("#selSearchOption").attr('data-value'),
            sortField: params.sortField,
            companycategory: $("#companycategory").attr("data-value"),
            corpAreaEq: params.area,
            magorBrandsLk: params.magor_brands_lk,
            starLevel: '',
            type: '164',
            limit: corpMapLimit,
            page: 1
        };

        simplePost(baseu + '/maintain/getRangeCorps4Map', JSON.stringify(param4Map), function (res) {
            console.log('/maintain/getRangeCorps4Map→res:', res);

            var rangeCorps = res.data;
            map.clearOverlays();
            for (var i = 0; i < rangeCorps.length; i++) {
                (function (x) {
                    var rangeCorp = rangeCorps[x];
                    var point = new BMap.Point(rangeCorp.lng, rangeCorp.lat);
                    var marker = new BMap.Marker(point, {icon: icon_orange});

                    marker.addEventListener("click", function () {
                        getRangeCorp(rangeCorp.corpId);
                    });

                    map.addOverlay(marker);
                    linkMarkers['marker-' + rangeCorp.corpId] = marker;


                })(i);
            }
        });
    });
};

function getParams() {
    var params = {
        latitude: "31.236336",
        longitude : "121.480201",
		distance : 5,
        corp_name:$('#searchext').val()
    };

    // if(!$('#searchtext').val().trim()){
    //     $('#hidLat').val('');
    //     $('#hidLat').val('');
    // }

    $('.search_select').each(function(){
        var type = $(this).attr("data-type");
        var value = $(this).attr("data-value");
        params[type] = value;
    });

    var obj = $('.arealist .active');
    var type = obj.attr("data-type");
    var code = obj.attr("data-code");
    params[type] = code;
    var areaName = '';
    if(code != null && code != ''){
        areaName = obj.html();
    }

    // if($('#hidLat').val() && $('#hidLng').val()){
    //     params.sortField = 1;
    // }

    // map.setZoom(alljs);
    setPlace(areaName);

	return params;
}

// function load4Map(){
// 	var params = {
// 		latitude: "31.236336",
// 		longitude : "121.480201",
// //		type:$('#searchType').val(),
// //		star_level:$('#searchStar').val(),
// 		corp_name:$('#searchtext').val()
// 	};
// 	$('.search_select').each(function(){
// 		var type = $(this).attr("data-type");
// 		var value = $(this).attr("data-value");
// 		params[type] = value;
// 	});
// 	var obj = $('.arealist .active');
// 	var type = obj.attr("data-type");
// 	var code = obj.attr("data-code");
// 	params[type] = code;
// 	var areaName = '';
// 	if(code != null && code != ''){
// 		areaName = obj.html();
// 	}
// //	var corpName = $('#searchtext').val();
// //	if(corpName == searchtext.defaultValue){
// //		corpName = '';
// //	}
// //	params.corp_name = corpName;
// 	map.setZoom(alljs);
// 	setPlace(areaName);
// 	//map.clearOverlays();
//
// 	var url = ctx + "/maintain/getRangeCorps4Map";
// 	// ajaxEvent(url,params,function(ret){
// 	systemCall(function (sysTok) {
//         var par = {
//             systemToken: sysTok,
//             corpName: $("#searchtext").val(),
// 			lat:lat,
//             lng:lng,
//             sortField: params.sortField,
//             companycategory: $("#companycategory").attr("data-value"),
//             corpAreaEq: params.area,
//             magorBrandsLk: params.magor_brands_lk,
//             starLevel:'',
//             type: '164',
//             limit: 500,
//             page: 1
//         }
//
//     });
// }

function submitReview(){

    var accessToken = localStorage.ACCESSTOKEN;

    if(!accessToken){
    	return alert('请登录后评价');
	}

    var performance = $('#star1 .on').length * 1.0;
    var attitude = $('#star2 .on').length * 1.0;
    var quality = $('#star3 .on').length * 1.0;
    var speed = $('#star4 .on').length * 1.0;
    var price = $('#star5 .on').length * 1.0;
    // var composite = Math.round(performance * 60 + attitude * 10 + quality * 20 + speed * 5 + price * 5) / 100;

	var param = {
        accessToken:accessToken,
        companyId:currentCorpId,
        performance:performance,	//履约情况60%
        attitude:attitude,			//服务质量10%
        quality:quality,			//维修质量20%
        speed:speed,				//维修速度5%
        price:price,				//维修价格5%
        // composite:composite,
        jsoninfo:{
            content : $('#txtReview').val(),
			images:[]
		}
	};

    simplePost(baseu + '/company/review/submit', JSON.stringify(param), function (res) {
        layer.msg(res.status);
        setTimeout(function () {
            layer.closeAll();
            $('#dialog').hide();
        }, 1000)
    });
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

function render(datas){
	var arr = [];
	// thisData = datas.concat().splice(pageNo*pageSize-pageSize, pageSize);

    layui.each(datas, function(index, item){
    	var img = "statics/images/shqxw.jpg";
	    if(item.FRONT_PHOTO){
	    	img = window.location.origin + "/attach/" + item.FRONT_PHOTO;
	    }

    	var html = '<li data-corp="' + item.corpId + '">' +
                    	'<a href="javascript:void(0);">' +
                        	'<img src="' + img +'" width="100" height="70" alt="">' +
                            '<div class="ziliao">' +
                                '<span class="zl_sp">' + item.corpName + '</span>' +
                                '<span>地址：' + (item.corpAdd?item.corpAdd:"") + '</span>' +
                                '<span>电话：' + (item.linkTel?item.linkTel:"") + '</span>' +
           					 	// '<span>电话：' + '******' + '</span>' +
                                // '<span>星级：' + getStar(item.STAR_LEVEL) + '</span>' +
                                // ((item.apart=="0")?'': '<span>距离：' + apart(item.apart) + '</span>' )+
								'<span>距离：' + item.distance + 'KM</span>' +
								'<div class="appraise" onclick="showDialog(' + item.corpId + ',\'' + item.corpName + '\')">我要评价</div>'+
                            '</div>' +
                        '</a>' +
                    '</li>';
      arr.push(html);
    });
    return arr.join('');
}

function showDialog(corpId,corpName) {
    currentCorpId = corpId;
    $('#spnReviewCorpName').html('【' + corpName + '】');

    var stars = ['star1','star2','star3','star4','star5'];
    for(var i in stars) {
        var oStar = document.getElementById(stars[i]);
        var oSpan = oStar.getElementsByTagName("span")[1];
        var aLi = oStar.getElementsByTagName("li");
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].className = i < 3 ? "on" : "";
        }
        oSpan.innerHTML = "<strong>" + 3 + " 分</strong> (" + '一般' + ")"
    }

    $('#txtReview').val('');

    layer.open({
        type: 1,
		title: '我要评价',
        area: ['500px', '500px'],
        content: $('#dialog'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        yes: function(index, layero){
            //do something
            $('#dialog').hide();
        },
        cancel: function(){
        	$('#dialog').hide();
        }
    });

    cancelBubble();
}

function cancelBubble(e) {
    var evt = e ? e : window.event;

    if (evt.stopPropagation) {
        evt.stopPropagation();
    } else {
        evt.cancelBubble = true;
    }
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

// function infoWindow(mark, title, addr, tel, req, remark) {
// 	var div = "<div>"
// 			+ '<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">'
// 			+ '<tr style="margin:2px;">'
// 			+ '<td width="38px" valign="top"><strong>地址：</strong></td>'
// 			+ '<td width="215px" >'
// 			+ addr
// 			+ '</td>'
// 			+ '<td width="28px" valign="top"><a href="javascript:editContent();" id="content_id">修改</a></td>'
// 			+ '</tr>' + '<tr>' + '<td width="38px"><strong>电话：</strong></td>'
// 			+ '<td colspan="2">' + tel + '</td>' + '</tr>' + '<tr>'
// 			+ '<td width="38px"><strong>星级：</strong></td>' + '<td colspan="2">'
// 			+ req + '</td>' + '</tr>' + '<tr>' + '<td colspan="3">' + remark
// 			+ '</td>' + '</tr>' + "</div>"
//
// 	// var div = "<div style='width:100%;' width='290px;'>" +
// 	// "<div style='float:left;width:250px;height:60px;'>" +
// 	// "<span><strong>地址：</strong></span><span id='content_add'>" + addr +
// 	// "</span><br/>" +
// 	// "<span><strong>电话：</strong></span><span id='content_phone'>" + tel +
// 	// "</span><br/>" +
// 	// "<span><strong>星级：</strong></span><span id='content_phone'>" + req +
// 	// "</span><br/>" +
// 	// "</div>" +
// 	// "<div style='float:right;width:30px;height:60px;'><a
// 	// href='javascript:editContent();' id='content_id'>修改</a></div>" +
// 	// "</div>" +
// 	// "<div style='width:100%;' width='290px;'>" +
// 	// remark +
// 	// "</div>";
// 	var searchInfoWindow = new BMapLib.SearchInfoWindow(map, div, {
// 				title : title, // 标题
// 				width : 290, // 宽度
// 				panel : "panel", // 检索结果面板
// 				enableAutoPan : true, // 自动平移
// 				enableMessage : false,
// 				searchTypes : [BMAPLIB_TAB_FROM_HERE,// 从这里出发
// 						BMAPLIB_TAB_SEARCH, // 周边检索
// 						BMAPLIB_TAB_TO_HERE // 到这里去
//
// 				]
// 			});
// 	searchInfoWindow.open(mark);
// 	mark.addEventListener("click", function() {
// 				searchInfoWindow.open(mark);
// 			});
// }


function setPlace(areaName) {
	function myFun() {
		var pp = local.getResults().getPoi(0).point; // 获取第一个智能搜索的结果
		// map.centerAndZoom(pp, alljs);
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