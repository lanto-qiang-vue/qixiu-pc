$(window).load(function() {
			// 百度地图API功能
			map = new BMap.Map("allmap");
			addController();
			var point = new BMap.Point(113.30765, 23.120049);// 广州
			map.centerAndZoom(point, js);
			map.enableScrollWheelZoom(true);
			marker = new BMap.Marker(point, {
						icon : icon_blue
					}); // 创建标注
			// 创建检索信息窗口对象
			var corpId = $('#corpId').html();
			if (!parent.Ext.isEmpty(corpId)) {
				map.addOverlay(marker); // 将标注添加到地图中
				marker.setAnimation(BMAP_ANIMATION_BOUNCE); // 跳动的动画
				getCorpPosition();
			} else {
				getAllCorpPosition();
			}
		});
function getCorpPosition() {
	var corpId = $('#corpId').html();
	if (parent.Ext.isEmpty(corpId)) {
		return;
	}
	var url = "getPosition";
	$.ajax({
		type : 'POST',
		url : url,
		data : "corpId=" + corpId,
		async : false,
		globle : false,
		error : function() {
			alert('数据处理错误！');
			return false;
		},
		success : function(data) {
			var ret = eval('(' + data + ')');
			var data = ret.data;
			if (!parent.Ext.isEmpty(data.LONGITUDE)
					&& !parent.Ext.isEmpty(data.LATITUDE)) {
				var point = new BMap.Point(data.LONGITUDE, data.LATITUDE);
				marker.setPosition(point);
				map.panTo(point);
				infoWindow(marker, data.CORP_NAME, data.CORP_ADDR,
						data.CORP_TEL, data.CORP_STAR_LEVEL,
						data.SELF_INTRODUCTION);
			} else {
				// var opts = {
				// width : 200, // 信息窗口宽度
				// height: 120, // 信息窗口高度
				// title : data.CORP_NAME , // 信息窗口标题
				// enableMessage:false//设置允许信息窗发送短息
				// }
				// var infoWindow2 = new
				// BMap.InfoWindow("该企业未添加位置,请在编辑模式下移动地图中的点到正确的位置或直接点击要设置的位置。",
				// opts); // 创建信息窗口对象
				// map.openInfoWindow(infoWindow2,marker.getPosition());
				// //开启信息窗口
				infoWindow(marker, data.CORP_NAME, data.CORP_ADDR,
						data.CORP_TEL, data.CORP_STAR_LEVEL,
						"<font color='red'>该企业未添加位置,请在编辑模式下移动地图中跳动的点到正确的位置或直接点击要设置的位置(可以先通过搜索地址来寻找大概位置)。</font>");
			}
		}
	});
}

function toEdit() {
	closePanorama();
	map.panTo(marker.getPosition());
	marker.setAnimation(false);
	marker.enableDragging();
	map.addEventListener("click", function(e) {
				map.panTo(e.point);
				marker.setPosition(e.point);
				var geocoder = new BMap.Geocoder();
				geocoder.getLocation(e.point, function(result) {
							setText("<div style=''>" + result.address
									+ "<br/> 坐标：" + e.point.lng + ","
									+ e.point.lat + "</div>");
						});
			});
	marker.addEventListener("dragend", function(e) {
				map.panTo(e.point);
				var geocoder = new BMap.Geocoder();
				geocoder.getLocation(e.point, function(result) {
							setText("<div style=''>" + result.address
									+ "<br/> 坐标：" + e.point.lng + ","
									+ e.point.lat + "</div>");
						});
			});
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

function getAllCorpPosition() {
			map.setZoom(alljs);
			map.clearOverlays();
			var panel = parent.Ext.ComponentQuery
					.query('panel[itemId=corp.TbCorpPositionMngPanel]')[0];
			var data = panel.down('grid').getStore().data.items;
			if (!parent.Ext.isEmpty(data)) {
				var m = 0;
				var store = parent.window.Ext.getStore("markers");
				store.removeAll();
				for (var i = 0; i < data.length; i++) {
	(function		(x) {
						var corp = data[x].data;
						if (!parent.Ext.isEmpty(corp.LONGITUDE)
								&& !parent.Ext.isEmpty(corp.LATITUDE)) {
							var point = new BMap.Point(corp.LONGITUDE,
									corp.LATITUDE);
							// var label = new
							// BMap.Label(corp.CORP_NAME,{offset:new
							// BMap.Size(20,-10)});
							var mar = new BMap.Marker(point);
							map.addOverlay(mar);
							var sContent = "<div style='z-index:10000;'>"
									+ "<h4 style='margin:0 0 5px 0;padding:0.2em 0;font-size:13px;'>"
									+ corp.CORP_NAME
									+ "</h4>"
									+ "<div style='margin:0;font-size:12px;'><strong>地址：</strong>"
									+ corp.CORP_ADDR
									+ "</div>"
									+ "<div style='margin:0;font-size:12px;'><strong>星级评价：</strong>"
									+ corp.CORP_STAR_LEVEL + "</div>"
									+ "<p style='margin:0;font-size:12px;'>"
									+ corp.SELF_INTRODUCTION + "</p>"
									+ "</div>";
							var info_Window = new BMap.InfoWindow(sContent); // 创建信息窗口对象
							mar.addEventListener("click", function() {
										stopAnimaMarker();
										this.setIcon(icon_blue);
										this
												.setAnimation(BMAP_ANIMATION_BOUNCE);
										this.openInfoWindow(info_Window);
										animaMarker.push(this);
									});
							var myCompOverlay = new ComplexCustomOverlay(point,
									corp.CORP_NAME, corp.CORP_NAME + ' [ '
											+ corp.CORP_ADDR + ' ] ');
							map.addOverlay(myCompOverlay);
							mar.setIcon(icon_red);
							// mar.setLabel(label);
							var obj = {
								"code" : corp.CORP_ID,
								"name" : corp.CORP_NAME,
								"mark" : mar,
								"info" : info_Window
							};
							store.add(obj);
							m++;
						}
					})(i);
				}
//				win.down('form').getForm().findField('result').setValue('已定位企业'
//						+ m + '家');
			} else {
//				win.down('form').getForm().findField('result').setValue('');
			}
}

function setPlace(areaName) {
	function myFun() {
		var pp = local.getResults().getPoi(0).point; // 获取第一个智能搜索的结果
		map.centerAndZoom(pp, alljs);
	}
	var local = new BMap.LocalSearch(map, { // 智能搜索
		onSearchComplete : myFun
	});
	local.search("广州市" + areaName + areaName);
}

function setAddPlace(add, disp) {
	disp.setValue('');
	if (parent.window.Ext.isEmpty(add)) {
		disp.setValue('请输入地址');
		return;
	}
	function myFun() {
		stopAnimaMarker();
		var result = local.getResults().getPoi(0); // 获取第一个智能搜索的结果
		if (parent.window.Ext.isEmpty(result)) {
			disp.setValue('找不到该地址');
			return;
		}
		var pp = result.point;
		map.centerAndZoom(pp, js);
		closeCircles();
		var Cirmarker = new BMap.Marker(pp, {
					icon : icon
				}); // 创建标注
		map.addOverlay(Cirmarker);
		var cirlabel = new BMap.Label("地址搜索：<font color='blue'>" + add + "以及周围500米范围</font>",{offset:new BMap.Size(20,-10)});
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
				anchor : BMAP_ANCHOR_TOP_LEFT
			});// 左上角，添加比例尺
	var top_left_navigation = new BMap.NavigationControl(); // 左上角，添加默认缩放平移控件
	map.addControl(top_left_control);
	map.addControl(top_left_navigation);
	var mapType1 = new BMap.MapTypeControl({
				mapTypes : [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
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
		"../../../images/mark/1006.png",
		new BMap.Size(16, 16));
var icon_red = new BMap.Icon(
		"../../../images/mark/mark_red.png",
		new BMap.Size(32, 32));
var icon_blue = new BMap.Icon(
		"../../../images/mark/mark_blue.png",
		new BMap.Size(32, 32));
var icon_green = new BMap.Icon(
		"../../../images/mark/mark_green.png",
		new BMap.Size(32, 32));
var icon_orange = new BMap.Icon(
		"../../../images/mark/mark_orange.png",
		new BMap.Size(32, 32));

var map, marker, circle, animaMarker = [];
var circles = [];
var js = 16;
var alljs = 13;