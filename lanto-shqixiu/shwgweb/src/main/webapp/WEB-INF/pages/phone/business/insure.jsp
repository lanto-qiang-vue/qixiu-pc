<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="format-detection" content="telephone=no">
	<%@ include file="/WEB-INF/pages/common/head.jsp"%>
	<link rel="stylesheet" href="${btx}/css/phone.css" />
</head>
<body>
<%--<%@ include file="/WEB-INF/pages/common/nav.jsp"%>--%>
<div class="supervision">
	<div class="pro_t">
		<span class="wenti">汽车保险</span>
		<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
	</div>
	<div class="examine" style="text-align: center">
		<p style="text-align:center">
			<strong><span style="font-size:21px;font-family:宋体"><br/></span></strong>
		</p>
		<p style="text-align: center;">
			<span style="font-size: 24px;"><strong><span style="font-family: 宋体;">车险公司名称电话</span></strong></span>
		</p>
		<p>
			<strong><span style="font-size:21px;font-family:宋体"><br/></span></strong>
		</p>

		<div class="detailtable" style="width: 100%;overflow: scroll">
			<table lay-filter="demo" border=0 cellpadding=0 cellspacing=0 width=1373 style='border-collapse:collapse;table-layout:fixed;width:1030pt'>
				<col class=xl65 width=56 style='mso-width-source:userset;mso-width-alt:1792;
 width:42pt'>
				<col class=xl65 width=521 span=2 style='mso-width-source:userset;mso-width-alt:
 16682;width:391pt'>
				<col class=xl65 width=155 style='mso-width-source:userset;mso-width-alt:4949;
 width:116pt'>
				<col class=xl65 width=120 style='mso-width-source:userset;mso-width-alt:3840;
 width:90pt'>
				<thead>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<th lay-data="{field:'id', width:50}"  height=25 class=xl71 width=56 style='height:19.5pt;width:42pt'>序号</th>
					<th lay-data="{field:'name', width:300}" class=xl71 width=521 style='border-left:none;width:391pt'>公司名称</th>
					<th lay-data="{field:'address', width:400}" class=xl71 width=521 style='border-left:none;width:391pt'>公司地址</th>
					<th lay-data="{field:'phone1', width:150}" class=xl71 width=155 style='border-left:none;width:116pt'>承保电话</th>
					<th lay-data="{field:'phone2', width:150}" class=xl71 width=120 style='border-left:none;width:90pt'>客服电话</th>
				</tr>
				</thead>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>1</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>中国人民财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>杨浦区长阳路581号</td>
					<td class=xl66 width=155 style='border-top:none;border-left:none;width:116pt'>4001234567</td>
					<td class=xl66 width=120 style='border-top:none;border-left:none;width:90pt'>95518</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl68 width=56 style='height:19.5pt;width:42pt'>2</td>
					<td class=xl69 width=521 style='width:391pt'>中国太平洋财产保险股份有限公司上海分公司</td>
					<td class=xl69 width=521 style='border-left:none;width:391pt'>虹口区吴淞路400号</td>
					<td class=xl69 width=155 style='border-left:none;width:116pt'>10108888</td>
					<td class=xl69 width=120 style='border-left:none;width:90pt'>95500</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl67 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>3</td>
					<td class=xl66 width=521 style='border-top:none;width:391pt'>中国平安财险保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>静安区常熟路8号12楼</td>
					<td class=xl66 width=155 style='border-top:none;border-left:none;width:116pt'>4008000000</td>
					<td class=xl66 width=120 style='border-top:none;border-left:none;width:90pt'>95511</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>4</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>东京海上日动火灾保险（中国）有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区陆家嘴环路1000号恒生银行大厦38楼021室</td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>4008858008</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>5</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>天安财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区浦东大道2000号阳光大厦7-8楼</td>
					<td class=xl66 width=155 style='border-top:none;border-left:none;width:116pt'>10106868</td>
					<td class=xl66 width=120 style='border-top:none;border-left:none;width:90pt'>95505</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl68 width=56 style='height:19.5pt;width:42pt'>6</td>
					<td class=xl66 width=521 style='border-top:none;width:391pt'>华泰财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区浦东大道720号26楼</td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>4006095509</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl67 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>7</td>
					<td class=xl66 width=521 style='border-top:none;width:391pt'>三井住友海上火灾保险（中国）有限公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区世纪大道100号环球金融中心34-T70</td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>4008832836</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>8</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>太平财产保险有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区陆家嘴东路166号中国保险大厦13楼</td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>95589</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>9</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>中华联合财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>黄浦区成都北路600号17楼</td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>95585</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl68 width=56 style='height:19.5pt;width:42pt'>10</td>
					<td class=xl66 width=521 style='border-top:none;width:391pt'>中国大地财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>虹口区吴淞路130号13楼</td>
					<td class=xl66 width=155 style='border-top:none;border-left:none;width:116pt'>4009210921</td>
					<td class=xl66 width=120 style='border-top:none;border-left:none;width:90pt'>95590</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl67 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>11</td>
					<td class=xl66 width=521 style='border-top:none;width:391pt'>华安财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区浦建路727号浦建雅居商业裙楼201A<span
							style='mso-spacerun:yes'> </span></td>
					<td class=xl66 width=155 style='border-top:none;border-left:none;width:116pt'>10100111</td>
					<td class=xl66 width=120 style='border-top:none;border-left:none;width:90pt'>95556</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>12</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>安邦财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区浦东南路1118号1601室<span
							style='mso-spacerun:yes'> </span></td>
					<td class=xl66 width=155 style='border-top:none;border-left:none;width:116pt'>4001111111</td>
					<td class=xl66 width=120 style='border-top:none;border-left:none;width:90pt'>95569</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>13</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>安盛天平财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区浦东南路500号21楼</td>
					<td class=xl66 width=155 style='border-top:none;border-left:none;width:116pt'>10106969</td>
					<td class=xl66 width=120 style='border-top:none;border-left:none;width:90pt'>95550</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl68 width=56 style='height:19.5pt;width:42pt'>14</td>
					<td class=xl66 width=521 style='border-top:none;width:391pt'>永诚财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区陆家嘴环路958号华能联合大厦2楼</td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>95552</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl67 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>15</td>
					<td class=xl66 width=521 style='border-top:none;width:391pt'>三星财产保险（中国）有限公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>闵行区吴中路1799号B座7楼</td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>4008333000</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>16</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>阳光财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>静安区广中西路777弄55号9楼</td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>95510</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>17</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>都邦财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>静安区天目西路218号第一座3406室</td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>95586</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl68 width=56 style='height:19.5pt;width:42pt'>18</td>
					<td class=xl66 width=521 style='border-top:none;width:391pt'>亚太财产保险有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>虹口区吴淞路218号宝矿国际大厦1101室</td>
					<td class=xl66 width=155 style='border-top:none;border-left:none;width:116pt'>4000123123</td>
					<td class=xl66 width=120 style='border-top:none;border-left:none;width:90pt'>95506</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl67 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>19</td>
					<td class=xl66 width=521 style='border-top:none;width:391pt'>中国人寿财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>虹口区天潼路133号14楼</td>
					<td class=xl66 width=155 style='border-top:none;border-left:none;width:116pt'>4008007007</td>
					<td class=xl66 width=120 style='border-top:none;border-left:none;width:90pt'>95519</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>20</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>中银保险有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>黄浦区四川中路321号11楼</td>
					<td class=xl66 width=155 style='border-top:none;border-left:none;width:116pt'>4006795566</td>
					<td class=xl66 width=120 style='border-top:none;border-left:none;width:90pt'>95566</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>21</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>安诚财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>黄浦区中山南路969号17楼</td>
					<td class=xl66 width=155 style='border-top:none;border-left:none;width:116pt'>4008500000</td>
					<td class=xl66 width=120 style='border-top:none;border-left:none;width:90pt'>4000500000</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl68 width=56 style='height:19.5pt;width:42pt'>22</td>
					<td class=xl66 width=521 style='border-top:none;width:391pt'>渤海财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区浦东南路2240号507室</td>
					<td class=xl66 width=155 style='border-top:none;border-left:none;width:116pt'>4006111100</td>
					<td class=xl66 width=120 style='border-top:none;border-left:none;width:90pt'>4006116666</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl67 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>23</td>
					<td class=xl66 width=521 style='border-top:none;width:391pt'>国泰财产保险有限责任公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>虹口区杨树浦路18号航运大厦2508室</td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>4008202288</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>24</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>英大泰和财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区银城中路68号20楼</td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>4000188688</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>25</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>紫金财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>长宁区淮海西路666号802室</td>
					<td class=xl66 width=155 style='border-top:none;border-left:none;width:116pt'>10108080</td>
					<td class=xl66 width=120 style='border-top:none;border-left:none;width:90pt'>4008280018</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl68 width=56 style='height:19.5pt;width:42pt'>26</td>
					<td class=xl66 width=521 style='border-top:none;width:391pt'>鼎和财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区杨高中路2112号界龙总部园1号楼C座118室</td>
					<td class=xl66 width=155 style='border-top:none;border-left:none;width:116pt'>4009006666</td>
					<td class=xl66 width=120 style='border-top:none;border-left:none;width:90pt'>4008888136</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl67 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>27</td>
					<td class=xl66 width=521 style='border-top:none;width:391pt'>国任财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>静安区北京西路1399号信达大厦18楼</td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>4008667788</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>28</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>长安责任保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区浦东大道1085号C座401室</td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>95592</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>29</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浙商财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>虹口区四川北路1717号嘉杰国际广场21层</td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>4008666777</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl68 width=56 style='height:19.5pt;width:42pt'>30</td>
					<td class=xl66 width=521 style='border-top:none;width:391pt'>永安财产保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区峨山路91弄120号1幢7层701室<span
							style='mso-spacerun:yes'> </span></td>
					<td class=xl66 width=155 style='border-top:none;border-left:none;width:116pt'>4009888888</td>
					<td class=xl66 width=120 style='border-top:none;border-left:none;width:90pt'>95502</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl67 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>31</td>
					<td class=xl66 width=521 style='border-top:none;width:391pt'>众诚汽车保险股份有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>虹口区四川北路859号2505、2506室</td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>4008600600</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>32</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>安联财产保险（中国）有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区世纪大道100号环球金融中心28楼</td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>4008002020</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>33</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>中意财产保险有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区世纪大道1200号13层<span
							style='mso-spacerun:yes'> </span></td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>4006002700</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl68 width=56 style='height:19.5pt;width:42pt'>34</td>
					<td class=xl66 width=521 style='border-top:none;width:391pt'>日本财险保险（中国）有限公司上海分公司</td>
					<td class=xl66 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区陆家嘴环路1000号恒生银行大厦20楼</td>
					<td colspan=2 class=xl67 width=275 style='border-right:.5pt solid black;
  border-left:none;width:206pt'>4009209551</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl67 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>35</td>
					<td class=xl70 width=521 style='border-top:none;width:391pt'>国元农业保险股份有限公司上海分公司</td>
					<td class=xl70 width=521 style='border-top:none;border-left:none;width:391pt'>浦东新区崮山路538号中港汇10层</td>
					<td class=xl70 width=155 style='border-top:none;border-left:none;width:116pt'>40096969999</td>
					<td class=xl70 width=120 style='border-top:none;border-left:none;width:90pt'>96999</td>
				</tr>
				<tr height=25 style='mso-height-source:userset;height:19.5pt'>
					<td height=25 class=xl66 width=56 style='height:19.5pt;border-top:none;
  width:42pt'>36</td>
					<td class=xl70 width=521 style='border-top:none;border-left:none;width:391pt'>众安在线财产保险股份有限公司</td>
					<td class=xl70 width=521 style='border-top:none;border-left:none;width:391pt'>黄浦区圆明园路169号协进大楼4楼</td>
					<td class=xl70 width=155 style='border-top:none;border-left:none;width:116pt'>10103888</td>
					<td class=xl70 width=120 style='border-top:none;border-left:none;width:90pt'>4009999595</td>
				</tr>
			</table>
		</div>

		<%--<div class="examine" style="text-align: center">--%>
		<p style="text-align:center">
			<strong><span style="font-size:21px;font-family:宋体"><br/></span></strong>
		</p>
		<p style="text-align: center;">
			<span style="font-size: 24px;"><strong><span style="font-family: 宋体;">上海市道路交通事故保险理赔服务分中心基础服务信息</span></strong></span>
		</p>
		<p>
			<strong><span style="font-size:21px;font-family:宋体"><br/></span></strong>
		</p>
		<div class="detailtable">
			<table width="589" style="display: inline-table">
				<tbody>
				<tr class="firstRow">
					<td width="54" valign="top" style="border-width: 1px; border-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:19px;font-family:   宋体">序号</span></strong>
						</p>
					</td>
					<td width="78" valign="top" style="border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-left: none; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:19px;font-family:   宋体">中心</span></strong>
						</p>
					</td>
					<td width="226" valign="top" style="border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-left: none; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:19px;font-family:   宋体">地址</span></strong>
						</p>
					</td>
					<td width="112" valign="top" style="border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-left: none; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:19px;font-family:   宋体">服务时间</span></strong>
						</p>
					</td>
					<td width="119" valign="top" style="border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-left: none; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:19px;font-family:   宋体">服务电话</span></strong>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">1</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">开隆</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:left">
							<span style="font-size: 16px;font-family: 仿宋">浦东新区川桥路199号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center;line-height:115%">
							<span style="font-size: 16px;line-height: 115%;font-family: 仿宋">8</span><span style="font-size: 16px;line-height: 115%;font-family: 仿宋">：30-17：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-50701727</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">2</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">协通</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:left">
							<span style="font-size: 16px;font-family: 仿宋">嘉定区曹安公路3908号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-17：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-39598808</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">3</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">宝钢</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:left">
							<span style="font-size: 16px;font-family: 仿宋">宝山区铁力路1300号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-17：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-66592959</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">4</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">云峰</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:left">
							<span style="font-size: 16px;font-family: 仿宋">金山区亭卫公路2258号J幢</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-17：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-57241633</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">5</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">府航</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">浦东新区南芦公路163号10栋</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-17：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-58011950</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">6</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">瀚博</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">浦东新区龙阳路1238号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-21：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-60875566</span>
						</p>
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-60875001</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">7</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">金旋</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">奉贤区沪杭公路1058号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-17：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-67101999</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">8</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">利港</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">闵行区程家桥路168弄39号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-21：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-64466333</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">9</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">仕玖</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">崇明区城桥镇南门路350号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-17：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-59618122</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">10</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">文洋</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">闵行区元江路3266号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-17：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-61256126</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">11</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">沪仑</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">静安区沪太支路476号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-21：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-66279351</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">12</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">汇安</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">松江区荣乐东路989号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-17：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-67860666</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">13</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">永达</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">浦东新区上丰路839号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-17：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-68794320</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">14</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">翟业</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">闵行区北翟路1571号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-17：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-62205300</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">15</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">易尚</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">虹口区车站南路 &nbsp; 261 号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-21：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-65368855</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">16</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">尚德</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">青浦区北青公路9665号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-17：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-59706066</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">17</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">上汽</span></strong>
						</p>
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">交运</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">杨浦区内江路301号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-21：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-65680589</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">18</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">东昌</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">浦东新区康杉路128号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-17：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-68938598</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">19</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">宝鸿</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">宝山区宝安公路839号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-21：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-33856177</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">20</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">众国</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">普陀区金沙江路2085号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-21：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-52700000</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">21</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">上运</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">徐汇区枫林路858号北</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-21：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-54019907</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="54" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size:15px;font-family:   仿宋">22</span>
						</p>
					</td>
					<td width="78" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<strong><span style="font-size:16px;font-family:   仿宋">德实</span></strong>
						</p>
					</td>
					<td width="226" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p>
							<span style="font-size: 16px;font-family: 仿宋">青浦区外青松公路2506号</span>
						</p>
					</td>
					<td width="112" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">8</span><span style="font-size: 16px;font-family: 仿宋">：30-17：00</span>
						</p>
					</td>
					<td width="119" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
						<p style="text-align:center">
							<span style="font-size: 16px;font-family: 仿宋">021-39803821</span>
						</p>
					</td>
				</tr>
				<tr style=";height:34px">
					<td width="589" colspan="5" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
						<p>
							<strong><span style="font-size: 16px;font-family: 仿宋">注：</span></strong><span style="font-size:16px;font-family:仿宋">瀚博、利港、沪仑、易尚、上汽交运、宝鸿、众国、上运八家分中心春节长假期间下班时间为17:00时</span>
						</p>
					</td>
				</tr>
				</tbody>
			</table>
		</div>

		<p>
			<span style="font-size:21px">&nbsp;</span>
		</p>
	</div>
</div>
<%--<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>--%>
</body>
<script type="text/javascript">
$(function () {
    var table = layui.table
    table.init('demo',{
        height: 1500 //设置高度
        ,limit: 36
    })
})

</script>
</html>
