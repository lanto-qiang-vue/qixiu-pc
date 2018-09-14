<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
</head>
<body>
	<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
	<div class="Government archives" style="height:900px;">
		<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
		<div class="zhengwu_r" style="height:900px;">
			<div class="zhengwu_t">
				<span class="sp_zw">开业申请</span> <span class="sp_wz">您所在位置：<a
					href="${ctx}/center/userInfo">车主中心</a> > <span>开业申请</span></span>
			</div>
			<div class="user-info">
				<c:choose>
					<c:when test="${loginInfo.userType == 0 }">
						<form class="layui-form layui-form-pane">
							<fieldset class="layui-elem-field layui-field-title"
								style="margin-top: 20px;">
								<legend>企业基本信息</legend>
							</fieldset>
							<div class="layui-form-item">
								<label class="layui-form-label">企业名称<font color="red">*</font></label>
								<div class="layui-input-block">
									<input type="text" name="corpName" lay-verify="required"
										placeholder="请输入企业名称" autocomplete="off" class="layui-input">
								</div>
							</div>

							<div class="layui-form-item">
								<label class="layui-form-label">企业地址<font color="red">*</font></label>
								<div class="layui-input-block">
									<input type="text" name="corpAdd" lay-verify="required"
										placeholder="请输入企业地址" autocomplete="off" class="layui-input">
								</div>
							</div>
							<div class="layui-form-item">
						    <label class="layui-form-label">省-市-区</label>
						   <div class="layui-input-inline  hoverlist" style="width:170px;margin-right: 3px;" data-field="corpPro" id="selectPro" data-toggle="true">
						    	<div class="layui-unselect layui-form-select">
									<div class="layui-select-title">
										<input type="text" placeholder="选择省份" readonly="" name="corpPro" value="上海" lay-verify="required" class="layui-input layui-unselect">
										<i class="layui-edge"></i>
									</div>
									<dl class="layui-anim layui-anim-upbit">
										
									</dl>
								</div>
						    </div>
						    <div class="layui-input-inline  hoverlist" style="width:175px;margin-right: 3px;" data-field="corpCity"  id="selectCity" data-toggle="true">
						    	<div class="layui-unselect layui-form-select">
									<div class="layui-select-title">
										<input type="text" placeholder="选择城市" name="corpCity" value="上海市" readonly="" lay-verify="required" 
											class="layui-input layui-unselect"><i
											class="layui-edge"></i>
									</div>
									<dl class="layui-anim layui-anim-upbit">
										
									</dl>
								</div>
						    </div>
						    <div class="layui-input-inline  hoverlist" style="width:175px;margin-right: 3px;" data-field="corpArea" id="selectArea" data-toggle="true">
						    	<div class="layui-unselect layui-form-select">
									<div class="layui-select-title">
										<input type="text" placeholder="选择辖区" value="" readonly="" name="corpArea" lay-verify="required" 
											class="layui-input layui-unselect"><i
											class="layui-edge"></i>
									</div>
									<dl class="layui-anim layui-anim-upbit">
									
									</dl>
								</div>
						    </div>
						  </div>
							<div class="layui-form-item">
								<div class="layui-inline">
									<label class="layui-form-label">企业规模<font color="red">*</font></label>
									<div class="layui-input-block">
										<select name="corpType" lay-verify="required">
											<option value=""></option>
											<c:forEach items="${typeList }" var="item" varStatus="state">
												<option value="${item.codeId }">${item.codeDesc }</option>
											</c:forEach>
										</select>
									</div>
								</div>
								<div class="layui-inline">
									<label class="layui-form-label">主修品牌</label>
									<div class="layui-input-block">
										<input type="text" name="magorBrands" autocomplete="off"
											class="layui-input" style="width:173px;">
									</div>
								</div>
								<div class="layui-inline">
									<label class="layui-form-label">经济类型<font color="red">*</font></label>
									<div class="layui-input-block">
										<select name="businessType" lay-verify="required">
											<option value=""></option>
											<c:forEach items="${jjList }" var="item" varStatus="state">
												<option value="${item.codeId }">${item.codeDesc }</option>
											</c:forEach>
										</select>
									</div>
								</div>
								<div class="layui-inline">
									<label class="layui-form-label">企业联系人</label>
									<div class="layui-input-block">
										<input type="text" name="linkMan" autocomplete="off"
											class="layui-input" style="width:173px;">
									</div>
								</div>
								<div class="layui-inline">
									<label class="layui-form-label">联系电话</label>
									<div class="layui-input-block">
										<input type="text" name="linkTel" autocomplete="off"
											class="layui-input" style="width:173px;">
									</div>
								</div>
								<div class="layui-inline">
									<label class="layui-form-label">企业邮箱</label>
									<div class="layui-input-block">
										<input type="text" name="emails" autocomplete="off"
											lay-verify="email" class="layui-input" style="width:173px;">
									</div>
								</div>
								<div class="layui-inline">
									<label class="layui-form-label">是否为4S店<font color="red">*</font></label>
									<div class="layui-input-block">
										<select name="is4s" lay-verify="required">
											<option value=""></option>
											<c:forEach items="${isList }" var="item" varStatus="state">
												<option value="${item.codeId }">${item.codeDesc }</option>
											</c:forEach>
										</select>
									</div>
								</div>
							</div>
							<fieldset class="layui-elem-field layui-field-title"
								style="margin-top: 20px;">
								<legend>道路经营许可证信息</legend>
							</fieldset>
							<div class="layui-form-item">
								<div class="layui-inline">
									<label class="layui-form-label">许可证号<font color="red">*</font></label>
									<div class="layui-input-block">
										<input type="text" name="businessNum" autocomplete="off"
											lay-verify="required" class="layui-input">
									</div>
								</div>
								<div class="layui-inline">
									<label class="layui-form-label">发证日期</label>
									<div class="layui-input-block">
										<input type="text" name="certificateFirstTime"
											autocomplete="off" class="layui-input"
											onclick="layui.laydate({elem: this})">
									</div>
								</div>
								<div class="layui-inline">
									<label class="layui-form-label">开始日期</label>
									<div class="layui-input-block">
										<input type="text" name="certificatStartTime"
											autocomplete="off" class="layui-input"
											onclick="layui.laydate({elem: this})">
									</div>
								</div>
								<div class="layui-inline">
									<label class="layui-form-label">结束日期</label>
									<div class="layui-input-block">
										<input type="text" name="certificateEndTime"
											autocomplete="off" class="layui-input"
											onclick="layui.laydate({elem: this})">
									</div>
								</div>
							</div>
							<fieldset class="layui-elem-field layui-field-title"
								style="margin-top: 20px;">
								<legend>人员信息</legend>
							</fieldset>

							<div class="layui-form-item">
								<div class="layui-inline">
									<label class="layui-form-label">企业负责人</label>
									<div class="layui-input-block">
										<input type="text" name="legalName" autocomplete="off"
											class="layui-input" style="width:173px;">
									</div>
								</div>
								<div class="layui-inline">
									<label class="layui-form-label">负责人电话</label>
									<div class="layui-input-block">
										<input type="text" name="legalTel" autocomplete="off"
											class="layui-input" style="width:173px;">
									</div>
								</div>
								<div class="layui-inline">
									<label class="layui-form-label">法人代表</label>
									<div class="layui-input-block">
										<input type="text" name="fictPerson" autocomplete="off"
											class="layui-input" style="width:173px;">
									</div>
								</div>
								<div class="layui-inline">
									<label class="layui-form-label">技术负责人</label>
									<div class="layui-input-block">
										<input type="text" name="technologyPerson" autocomplete="off"
											class="layui-input" style="width:173px;">
									</div>
								</div>
								<div class="layui-inline">
									<label class="layui-form-label">财务负责人</label>
									<div class="layui-input-block">
										<input type="text" name="finalPerson" autocomplete="off"
											class="layui-input" style="width:173px;">
									</div>
								</div>
								<div class="layui-inline">
									<label class="layui-form-label">质量负责人</label>
									<div class="layui-input-block">
										<input type="text" name="qualityPerson" autocomplete="off"
											class="layui-input" style="width:173px;">
									</div>
								</div>
							</div>
							<div class="layui-form-item" style="padding-left:20px;">
								<a style="color:#2196f3;" href="http://www.jt.sh.cn/jtw/wszwdt/n65/n82/n302/78b7162f-cc72-11e4-97bc-0050569a26dd.html" target="_blank">
										 点击查看维修企业开业申请条件
									</a>
							</div>
							<div class="layui-form-item">
								<div class="" style="text-align: center;">
									<button class="layui-btn layui-btn-normal" lay-submit=""
										lay-filter="userinfosubmit" id="submitBtn">
										<i class="layui-icon">&#xe642;</i> 提交申请
									</button>
								</div>
							</div>
						</form>
					</c:when>
					<c:otherwise>
						<div style="padding:30px 0px;text-align:center;">请 <a href="javascript:toLogin();" style="color:red;">登录/注册</a> 成为个人用户后才能开业申请</div>
					</c:otherwise>
				</c:choose>
			</div>
		</div>
	</div>
	<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script src="${btx}/js/front/json/ProJson.js"></script>
<script src="${btx}/js/front/json/CityJson.js"></script>
<script src="${btx}/js/front/json/DistrictJson.js"></script>
<script src="${btx}/js/front/apply.js"></script>
<script type="text/javascript">
	
	
</script>
</html>
