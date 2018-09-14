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
<div class="supervision">
	<div class="pro_t">
		<span class="wenti">企业优惠活动</span>
		<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
	</div>

	<div class="examine" style="text-align: center">
		<p style="text-align:center">
			<strong><span style="font-size:21px;font-family:宋体"><br/></span></strong>
		</p>
		<p style="text-align: center;">
			<span style="font-size: 24px;"><strong><span style="font-family: 宋体;">企业优惠活动</span></strong></span>
		</p>
		<p>
			<strong><span style="font-size:21px;font-family:宋体"><br/></span></strong>
		</p>

		<div class="detailtable">
			<p>
				<br/>
			</p>
			<table width="1709" lay-filter="demo">
				<colgroup>
					<col width="281" span="2" style=";width:281px"/>
					<col width="131" span="7" style=";width:131px"/>
					<col width="232" style=";width:232px"/>
				</colgroup>
				<thead>
				<tr style=";height:69px" class="firstRow">
					<th lay-data="{field:'name', width:300}" width="281" style="" >
						企业名称
					</th>
					<th lay-data="{field:'tel', width:150}" width="281"  style="border-left: none;">
						电话
					</th>
					<th lay-data="{field:'1', width:200}" width="131" style="border-left: none;">
						<%--保质期内或在店消费免费故障诊断--%>
							在店消费免费故障诊断
					</th>
					<th lay-data="{field:'2', width:100}" width="131" style="border-left: none;">
						贴车服务
					</th>
					<th lay-data="{field:'3', width:200}" width="131" style="border-left: none;">
						保养维修客户免费洗车
					</th>
					<th lay-data="{field:'4', width:150}" width="131" style="border-left: none;">
						提供上门施救
					</th>
					<th lay-data="{field:'5', width:150}" width="131" style="border-left: none;">
						人工优惠折扣
					</th>
					<th lay-data="{field:'6', width:200}" width="131" style="border-left: none;">
						送小礼品或优惠券
					</th>
					<th lay-data="{field:'7', width:150}" width="131" style="border-left: none;">
						2018活动长期
					</th>
					<th lay-data="{field:'other', width:200}" width="232" style="border-left: none;">
						预约有优惠活动备注
					</th>
				</tr>
				</thead>
				<tbody>

				<tr style=";height:29px">
					<td width="281" style="border-top: none;">
						上海市汽车修理有限公司汽车修理三厂
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-52816402
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海嘉万汽车修理有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-62039650
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:46px">
					<td width="281" style="border-top: none;">
						上海安吉名世汽车服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-52816688
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						赠送120元工时
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						仅限 &nbsp; 凯迪拉克 3月内<br/> &nbsp; 检测不包含尾气
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海绿地徐通汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-54960756
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						7折平日 &nbsp; 8折周末
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						保险公司送漆面
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海永达汽车贸易中心有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-54366789
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8.5折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海申银汽车服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-52909999
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海大众汽车强生特约维修站有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-66282693
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						仅3月优惠有效
					</td>
				</tr>
				<tr style=";height:46px">
					<td width="281" style="border-top: none;">
						上海星州汽车维修有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-64950577
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						7折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						享受优惠；需提前预约；而且有消费额度
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海安吉汽车销售有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-33562022
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海真北天华汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-66252521
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海外国机构汽车修理服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-54363333
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						仅3月优惠有效
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海锦江丰田汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-64645678
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8.5折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海冠松汽车服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-32051902
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8折 &nbsp; 8.8折 9折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						可以有条件提供代步车
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海强生北美汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-66112762
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海锦江城市汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-62758866
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8.5折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海西上海奥杰汽车销售服务有限公司分公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-52828800
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海上强高级汽车修理有限公司分公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-66112762
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海绿地徐盛汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-64186090
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海冠松汽车普陀销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-62635228
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						7折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						7折优惠仅限3月
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海交运起腾汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-64410178
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8.5折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						仅3月优惠有效
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海保通汽车服务有限公司徐汇分公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-64049680
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海华侨汽车修理服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13818105888--%>021-54351333
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8.8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						仅3月优惠有效
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海交运起豪汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--18917768341--%>021-33565137
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						首次9折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海东联汽车修配有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13761900903--%>021-56913110
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						预约车辆延时营业至8点
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海利星汽车维修有限公司华漕分部
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13916872166--%>400-1666789
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海和凌汽车服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--18918958652--%>021-52697077
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						保养9折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						仅3月优惠有效
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海星瀚汽车维修服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13761398438--%>021-80266999
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:46px">
					<td width="281" style="border-top: none;">
						拓速乐汽车销售服务(上海)有限公司闵行第二分公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13817392418--%>021-80234000
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海浦东保时捷汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13916664107--%>021-80172987
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						免费检测只有3月4月
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海宝诚中环汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13601756966--%>021-56999300
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						补5个面以上提供代步车
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海万兴丰田汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13301879187--%>021-65395069
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						仅3月优惠有效
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海冠松之星汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13501906992--%>021-66690160
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海云峰虹口汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13020156066--%>021-5102768
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海百联沪通汽车销售有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--15801919816--%>021-51022187
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海申荣沪东汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13761007961--%>021-65702715
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						抵用券
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海中达汽车修理有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13901692299--%>021-66522696
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						7折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						大型客车维修
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海讴歌汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--17301600655--%>021-55789997
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海万兴五角场汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13801600670--%>021-55224039
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海安吉明轩汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13818590628--%>
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海江湾五角场汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--15921132538--%>021-51670650
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						7折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海五角场汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--15821112061--%>021-55780268
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						保养7折 &nbsp; 维修9折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海祥通汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13311627508--%>021-65557005
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海海标汽车销售有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--18917698026--%>021-55785825
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海交运起申汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13918293188--%>021-55126095
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8.8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海绿地宝仕汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--18121099136--%>021-65053779
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						3；4月优惠有效
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海百联沪东汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13818824036--%>021-51817188
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海利之星汽车有限公司闵行分公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13818668139--%>021-31150999
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海绿地杨浦汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--15821233721--%>021-51807897
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						3月优惠有效
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海舒福泰汽车修理有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13916376665--%>021-55213866
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海安吉斯鸿汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13817060921--%>50766525/
						50766526/
						50766529
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8.5折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海格林威中环车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--18930892518--%>021-55786900
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						9折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						仅限福特 &nbsp; 预约车主
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海协通福骋汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--15201780592--%>021-66308602
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						9折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海华田汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13818277782--%>021-56618427
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海冠松汽车闸北销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13472402954--%>021-56030900
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海申成民欣汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13061613239--%>021-25103860
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海天泽汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--15316755001--%>021-55809005
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8.5折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海五角场开隆汽车贸易有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--17317298499--%>021-52768888
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						9折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海百联沪北汽车销售有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13681855880--%>021-56657866
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="232" style="border-top: none; border-left: none;"></td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海新港汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13817880768--%>021-55062522
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						全部活动仅限会员
					</td>
				</tr>
				<tr style=";height:47px">
					<td width="281" style="border-top: none;">
						上海中纺机汽车服务有限公司汽车修理厂
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13817663652--%>021-65183782
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						3月优惠有效
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海交运起恒汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						<%--13386272565--%>021-65696388
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;"></td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						更换轮胎免人工费
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海上勤汽车维修有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						021-51819549
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						上汽通用别克、上汽荣威、上汽大通、苏州金龙、厦门金龙、宇通、北方
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海东昌凌志汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						68937199
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						雷克萨斯
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海九菱汽车修理有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						65299090
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						8折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						all
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海冠松丰田汽车销售服务有限公司浦东分公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						65116566
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						丰田
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海冠松汽车维修服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						58332818
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						all
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海名流汽车售后服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						62305305
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						通用别克
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海嘉定华毅汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						59525645
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						上海大众
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海徐大中汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						64878457
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						上海大众
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海永达汽车松江销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						67741279
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						通用别克
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海永达汽车浦东销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						50856789
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						奥迪
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海永达汽车经营服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						64801079
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						本田
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海科达汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						56771666
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						江铃
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海西上海宝山汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						56585566
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						通用别克
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海银星汽车维修有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						37520919
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						all
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海锦江汽车销售服务有限公司维修站
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						62950255
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						上海大众
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海长江汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						58834454
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						上海大众
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="">
						上海万兴世界汽车销售服务有限公司
					</td>
					<td width="281" style="border-left: none;">
						65393133
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-left: none;">
						通用别克
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海东昌汽车服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						50459999
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						通用别克
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海中规汽车销售服务有限公司山阳店
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						400-9209292
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						all
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海云峰众旭汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						67292299
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						7折
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						是
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						上海大众
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海云峰金山汽车发展有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						57244089
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						通用别克
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海交运起元汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						54095189
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						上海大众
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海佳葆汽车修理厂
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						69625560
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						all
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海华邦龙柏汽车服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						64028888
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						奔驰；宝马；保时捷；奥迪
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海同际汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						65985588
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						上海大众
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海宝钢汽车检测修复有限公司宝杨路分厂
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						33794758  33794768
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						依维柯；跃进；郑州日产；苏州金龙；海格
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海强生集团汽车修理有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						55399632
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						all
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海文洋汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						54460199
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						通用别克
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海永加汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						69238397
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						上海大众
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海莱克汽车维修有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						63638633
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						all
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海蓝剑汽车修理有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						57775299
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						all
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海车畅行挚信汽车服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						69211333
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						all
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海锦江通永汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						62955072
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						通用别克
					</td>
				</tr>
				<tr style=";height:28px">
					<td width="281" style="border-top: none;">
						上海龙衡汽车销售服务有限公司
					</td>
					<td width="281" style="border-top: none; border-left: none;">
						57820427
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						无
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="131" style="border-top: none; border-left: none;">
						否
					</td>
					<td width="232" style="border-top: none; border-left: none;">
						上海大众
					</td>
				</tr>
				</tbody>
			</table>
		</div>

</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
$(function () {
    var table = layui.table
    table.init('demo',{
        width: 900,
        height: 500 //设置高度
        ,limit: 94
    })

})

</script>
</html>
