<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<link rel="stylesheet" href="//api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css" />
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="zhaoweixiu maintain">
<div id="map_all">
	<div class="map_left" style="background:#fff;">
		<div id="map-left-content">
		<div style="padding:10px 5px 0px 5px;">
			<div class="layui-form-item">
				<div class="layui-input-inline  sellist" style="width:125px;margin-right: 3px;" data-field="searchType" data-toggle="true">
			    	<div class="layui-unselect layui-form-select">
						<div class="layui-select-title">
							<input type="text" placeholder="选择类型" name="corpType" id="corpType" value="" readonly="" lay-verify="required" class="layui-input layui-unselect"><i class="layui-edge"></i>
						</div>
						<dl class="layui-anim layui-anim-upbit">
							<%--<dd data-value="维修企业" class="${flag == 'corp'?'layui-this':'' }">维修企业</dd>--%>
							<dd data-value="综合检测站" class="${flag == 'check'?'layui-this':'' }">综合检测站</dd>
							<dd data-value="危运车辆维修" class="${flag == 'wyc'?'layui-this':'' }">危运车辆维修</dd>
							<dd data-value="新能源汽车维修" class="${flag == 'xny'?'layui-this':'' }">新能源汽车维修</dd>
							<dd data-value="汽车救援" class="${flag == 'qcjy'?'layui-this':'' }">施救牵引企业</dd>
						</dl>
					</div>
			    </div>
				<div class="layui-input-inline" style="width:169px;margin-right: 5px;">
					<input type="text" name="title" id="searchtext" placeholder="输入名称搜索..." class="layui-input">
				</div>
				<div class="layui-input-inline" style="width:68px;margin-right: 0px;">
					<button class="layui-btn layui-btn-normal" id="searchbtn">查询</button>
				</div>
			</div>
			<div class="layui-form-item" id="corpSarchCondition" style="${flag == 'corp'?'':'display:none;' }">

				<%--<div class="layui-input-inline search_select hoverlist" style="width:33%;margin-right: 3px;" data-value="${hovType }" data-tit="企业类型" data-type="type">--%>
					<%--<div class="layui-unselect layui-form-select qylx">--%>
						<%--<div class="layui-select-title">--%>
							<%--<input type="text" placeholder="企业类型" value="${hovTypeName }" readonly=""--%>
								<%--class="layui-input layui-unselect"><i--%>
								<%--class="layui-edge"></i>--%>
						<%--</div>--%>
						<%--<dl class="layui-anim layui-anim-upbit">--%>
							<%--<c:forEach items="${typeList }" var="item" varStatus="state">--%>
		                    	 <%--<dd data-value="${item.CODE }" class="${item.CODE == hovType?'select-this':'' }"><i class="layui-icon">&#xe605;</i> <span>${item.NAME }</span></dd>--%>
		                    <%--</c:forEach>--%>
						<%--</dl>--%>
					<%--</div>--%>
				<%--</div>--%>
				<%--<div class="layui-input-inline search_select hoverlist" style="width:90px;margin-right: 3px;" data-value="" data-tit="服务星级" data-type="star_level">--%>
			    	<%--<div class="layui-unselect layui-form-select">--%>
						<%--<div class="layui-select-title">--%>
							<%--<input type="text" placeholder="服务星级" value="服务星级" readonly=""--%>
								<%--class="layui-input layui-unselect"><i--%>
								<%--class="layui-edge"></i>--%>
						<%--</div>--%>
						<%--<dl class="layui-anim layui-anim-upbit" style="text-align:center;">--%>
							<%--<dd data-value="1" ><i class="layui-icon">&#xe605;</i> <span>1星服务</span></dd>--%>
							<%--<dd data-value="2" ><i class="layui-icon">&#xe605;</i> <span>2星服务</span></dd>--%>
							<%--<dd data-value="3"><i class="layui-icon">&#xe605;</i> <span>3星服务</span></dd>--%>
							<%--<dd data-value="4"><i class="layui-icon">&#xe605;</i> <span>4星服务</span></dd>--%>
							<%--<dd data-value="5"><i class="layui-icon">&#xe605;</i> <span>5星服务</span></dd>--%>
						<%--</dl>--%>
					<%--</div>--%>
			    <%--</div>--%>
			    <%----%>
			    <%--<div class="layui-input-inline search_select hoverlist" style="width:90px;margin-right: 3px;" data-value="" data-tit="信誉等级" data-type="xy_level">--%>
					<%--<div class="layui-unselect layui-form-select">--%>
						<%--<div class="layui-select-title">--%>
							<%--<input type="text" placeholder="信誉等级" value="信誉等级" readonly=""--%>
								<%--class="layui-input layui-unselect"><i--%>
								<%--class="layui-edge"></i>--%>
						<%--</div>--%>
						<%--<dl class="layui-anim layui-anim-upbit">--%>
							<%--<dd data-value="AAA" class=""><i class="layui-icon">&#xe605;</i> <span>AAA级</span></dd>--%>
							<%--<dd data-value="AA" class=""><i class="layui-icon">&#xe605;</i> <span>AA级</span></dd>--%>
							<%--<dd data-value="A" class=""><i class="layui-icon">&#xe605;</i> <span>A级</span></dd>--%>
							<%--<dd data-value="B" class=""><i class="layui-icon">&#xe605;</i> <span>B级</span></dd>--%>
						<%--</dl>--%>
					<%--</div>--%>
				<%--</div>--%>

				<div class="layui-input-inline search_select hoverlist2"
				     style="width: 24%; margin-right: 3px;" data-value=""
				     data-tit="企业排序" data-type="star_level">
					<div class="layui-unselect layui-form-select">
						<div class="layui-select-title">
							<input type="text" placeholder="企业排序" value="" readonly="" id="compsort"
							       class="layui-input layui-unselect"><i
								class="layui-edge"></i>
						</div>
						<dl class="layui-anim layui-anim-upbit"
						    style="text-align: center;">
							<dd data-value="1">
								<i class="layui-icon">&#xe605;</i> <span>信誉等级</span>
							</dd>
							<dd data-value="2">
								<i class="layui-icon">&#xe605;</i> <span>服务评价</span>
							</dd>
							<dd data-value="3">
								<i class="layui-icon">&#xe605;</i> <span>分数等级</span>
							</dd>
						</dl>
					</div>
				</div>

				<div class="layui-input-inline search_select hoverlist2"
				     style="width: 24%; margin-right: 3px;" data-value="" id="companycategory"
				     data-tit="企业类型" data-type="type">
					<div class="layui-unselect layui-form-select qylx">
						<div class="layui-select-title">
							<input id="compType" type="text" placeholder="企业类型" value="" readonly=""
							       class="layui-input layui-unselect"><i
								class="layui-edge"></i>
						</div>
						<dl class="layui-anim layui-anim-upbit">
							<%--<c:forEach items="${typeList }" var="item" varStatus="state">--%>
							<dd data-value="">
								<i class="layui-icon">&#xe605;</i> <span>全部</span>
							</dd>
							<dd data-value="43">
								<i class="layui-icon">&#xe605;</i> <span>一类维修企业</span>
							</dd>
							<dd data-value="44">
								<i class="layui-icon">&#xe605;</i> <span>二类维修企业</span>
							</dd>
							<dd data-value="45">
								<i class="layui-icon">&#xe605;</i> <span>三类维修业户</span>
							</dd>
							<dd data-value="46">
								<i class="layui-icon">&#xe605;</i> <span>摩托车维修业户</span>
							</dd>
							<dd data-value="47">
								<i class="layui-icon">&#xe605;</i> <span>汽车快修业户</span>
							</dd>
							<%--</c:forEach>--%>
						</dl>
					</div>
				</div>

				<div class="layui-input-inline search_select hoverlist2"
				     style="width: 24%; margin-right: 3px;" data-value=""
				     data-tit="企业区域" data-type="area">
					<div class="layui-unselect layui-form-select">
						<div class="layui-select-title">
							<input type="text" placeholder="企业区域" value="" readonly=""
							       class="layui-input layui-unselect">
							<i class="layui-edge"></i>
						</div>
						<dl class="layui-anim layui-anim-upbit">
							<dd data-value="" class=""><i class="layui-icon">&#xe605;</i> <span>全部</span></dd>
							<dd data-value="310101" class=""><i class="layui-icon">&#xe605;</i> <span>黄浦区</span></dd>
							<%--<dd data-value="310103" class=""><i class="layui-icon">&#xe605;</i> <span>卢湾区</span></dd>--%>
							<dd data-value="310104" class=""><i class="layui-icon">&#xe605;</i> <span>徐汇区</span></dd>
							<dd data-value="310105" class=""><i class="layui-icon">&#xe605;</i> <span>长宁区</span></dd>
							<dd data-value="310106" class=""><i class="layui-icon">&#xe605;</i> <span>静安区</span></dd>
							<dd data-value="310107" class=""><i class="layui-icon">&#xe605;</i> <span>普陀区</span></dd>
							<%--<dd data-value="310108" class=""><i class="layui-icon">&#xe605;</i> <span>闸北区</span></dd>--%>
							<dd data-value="310109" class=""><i class="layui-icon">&#xe605;</i> <span>虹口区</span></dd>
							<dd data-value="310110" class=""><i class="layui-icon">&#xe605;</i> <span>杨浦区</span></dd>
							<dd data-value="310112" class=""><i class="layui-icon">&#xe605;</i> <span>闵行区</span></dd>
							<dd data-value="310113" class=""><i class="layui-icon">&#xe605;</i> <span>宝山区</span></dd>
							<dd data-value="310114" class=""><i class="layui-icon">&#xe605;</i> <span>嘉定区</span></dd>
							<dd data-value="310115" class=""><i class="layui-icon">&#xe605;</i> <span>浦东新区</span></dd>
							<dd data-value="310116" class=""><i class="layui-icon">&#xe605;</i> <span>金山区</span></dd>
							<dd data-value="310117" class=""><i class="layui-icon">&#xe605;</i> <span>松江区</span></dd>
							<dd data-value="310118" class=""><i class="layui-icon">&#xe605;</i> <span>青浦区</span></dd>
							<%--<dd data-value="310119" class=""><i class="layui-icon">&#xe605;</i> <span>南汇区</span></dd>--%>
							<dd data-value="310120" class=""><i class="layui-icon">&#xe605;</i> <span>奉贤区</span></dd>
							<dd data-value="310230" class=""><i class="layui-icon">&#xe605;</i> <span>崇明区</span></dd>

						</dl>
					</div>
				</div>

				<div class="layui-input-inline search_select brand_select" style="width:24%;margin-right: 0px;" data-value="" data-tit="车辆品牌" data-type="magor_brands_lk">
			    	<div data-toggle="select" class="brandselect selectsigle" style="z-index:40;">
						<div class="select-selected" data-type="name" data-key="0">
                          <span>车辆品牌</span><i class="icon10 icon10-sjb"></i>
                        </div>
						<div class="select-option layui-anim layui-anim-upbit" data-type="list">
							<div class="select-box">
								<div class="select-box-title">
									<ul>
										<li class="name">选择车辆品牌</li>
									</ul>
									<a class="clear">清空选择</a>
								</div>
								<div class="select-box-content">
									<div class="box-content-dl box-content-brand" id="auto-index-usedcarbrand">
										<div class="brand-index">
											<c:forEach items="${brandlist }" var="item" varStatus="state">
						                    	 <a class="${state.index == 0?'selected':'' }">${item.lat }</a>
						                    </c:forEach>
										</div>
										<div data-type="brand" class="select-dl">
											<c:forEach items="${brandlist }" var="item" varStatus="stat">
						                    	 <dl class="town-con-dl">
													<dt>${item.lat }</dt>
													<dd class="town-btn">
														<c:forEach items="${item.brands }" var="brand" varStatus="state">
															<a href="javascript:void(0);" data-key="${brand.id }" data-value="${brand.name }"><i class="layui-icon">&#xe605;</i> <span>${brand.name }</span></a>
														</c:forEach>
													</dd>
												</dl>
						                    </c:forEach>
										</div>
									</div>						
								</div>
							</div>
						</div>
					</div>
			    </div>
			</div> 
		</div>
		<div class="jieguo" style="padding:0px 15px;">
            <p><span>查询结果：</span>共 <span id="totalrecords"></span> 条记录，请在企业列表或地图中选择</p>
        </div>
		<div class="corpList">
         	<ul class="liebiao_in" id="corplist">
         		
         	</ul>
             <div id="pagebar" style="text-align:center;margin-top:5px;"></div>
         </div>
         </div>
	</div>
	<div class="map_right">
		<!--  <div class="map_right_top" ></div>-->
		<div class="map_right_place" style="position: relative;">
			<div class="place_style arealist">
				&nbsp;&nbsp;
				<a href="javascript:void(0);" class="type_area active" data-code="" data-type="corp_area_eq">上海市</a>&nbsp;&nbsp;
				<c:forEach items="${arealist }" var="item" varStatus="state">
                	<a  href="javascript:void(0);" class="type_area" data-code="${item.CODE }" data-type="corp_area_eq">${item.NAME }</a>&nbsp;&nbsp;
                </c:forEach>
			</div>
		</div>	
		<div id="l-map" >
 		</div>
	</div>
<div class="clear"></div>
<div id="narrow_left" style="display: block;"></div>
<div id="narrow_right" style="display: none;"></div>
</div>
</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
<script type="text/javascript" src="//api.map.baidu.com/api?v=2.0&ak=hUrYR4hH5XExjuf6qHt7TLDhyqM08GYF"></script>
<script type="text/javascript" src="//api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js"></script>
<script src="${ctx}/statics/js/BMap/CorpInfoMap.js" type="text/javascript"></script>

<script type="text/javascript">

</script>



</body>
</html>
