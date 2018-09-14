<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>车辆电子档案查看</title>
		<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
		<%@ include file="/WEB-INF/pages/phone/common/head.jsp"%>
	</head>
<style>
	.mui-control-content {
		background-color: white;
		min-height: 500px;
	}
	.mui-control-content .mui-loading {
		margin-top: 50px;
	}
</style>
	<body>
		<div class="mui-content">
			<div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<a class="mui-control-item" href="#item1mobile">
				车辆基本信息
			</a>
					<a class="mui-control-item" href="#item2mobile">
				车辆维修记录
			</a>
				</div>
				<div id="sliderProgressBar" class="mui-slider-progress-bar mui-col-xs-6"></div>
				<div class="mui-slider-group">
					<div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
						<div id="scroll1" class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<div class="content km2 mui-table-view">
									<ul class="setion1">
										<li>
											<div class="left">
												<b>车牌号码：</b>
											</div>
											<div class="right">
												${veh.plateNum }
											</div>
										</li>
										<li>
											<div class="left">
												<b>车辆品牌：</b>
											</div>
											<div class="right">
												${veh.vehicleBrand }
											</div>
										</li>
										<li>
											<div class="left">
												<b>车系：</b>
											</div>
											<div class="right">
												${veh.vehicleType }
											</div>
										</li>
										<li>
											<div class="left">
												<b>排量：</b>
											</div>
											<div class="right">
												${veh.vehicleCapacity }
											</div>
										</li>
										
										<li>
											<div class="left">
												<b>生产年份：</b>
											</div>
											<div class="right">
												${veh.productionYear }
											</div>
										</li>
										<li>
											<div class="left">
												<b>购买日期：</b>
											</div>
											<div class="right">
												${buytime }
											</div>
										</li>
										<li>
											<div class="left">
												<b>车架号：</b>
											</div>
											<div class="right">
												${veh.vin }
											</div>
										</li>
										<li>
											<div class="left">
												<b>发动机号：</b>
											</div>
											<div class="right">
												${veh.engineNo }
											</div>
										</li>
										<li>
											<div class="left">
												<b>车主姓名：</b>
											</div>
											<div class="right">
												${veh.ownerName }
											</div>
										</li>
										<li>
											<div class="left">
												<b>车主手机：</b>
											</div>
											<div class="right">
												${veh.ownerPhone }
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div id="item2mobile" class="mui-slider-item mui-control-content">
						<div id="scroll2" class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<div class="content bm mui-table-view" style="padding: 5px 0px 0px 0px;background: #eee;">
									<c:choose>
										<c:when test="${list.size() > 0}">
											<c:forEach items="${list}" var="rec">
												<ul class="setion1">
													<li>
														<div>
															<b>维修企业：</b>
														</div>
														<div>
															${rec.CORP_NAME }
														</div>
													</li>
													<li>
														<div>
															<b>维修时间：</b>
														</div>
														<div>
															${rec.REPAIR_DATE2 }
														</div>
													</li>
													<li>
														<div>
															<b>送修里程：</b>
														</div>
														<div>
															${rec.REPAIR_MILE }
														</div>
													</li>
													<li>
														<div>
															<b>故障描述：</b>
														</div>
														<div>
															${rec.FAULT_DESCRIPT }
														</div>
													</li>
												</ul>
											</c:forEach>
										</c:when>
										<c:otherwise>
											<div class="text-center" style="padding:20px;">该车辆暂无维修记录</div>
										</c:otherwise>
									</c:choose>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
		<script>
			(function($) {
				var maxHeight = jQuery(window).height() - 40;
				console.log(maxHeight);
				$(".mui-control-content").each(function(){
					jQuery(this).css('min-height',maxHeight + 'px');
				});
				$('.mui-scroll-wrapper').scroll({
					indicators: true //是否显示滚动条
				});
				
			})(mui);
		</script>
		
	</body>
</html>

