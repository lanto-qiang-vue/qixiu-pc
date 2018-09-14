
Ext.define('app.template.TemplateUtil', {
    singleton: true,
    
	ExamTemplate : function(){
		var tpl = new Ext.XTemplate(
                	'<tpl for=".">',
	                    '<div class="thumb-wrap">',
	                    	'<div class="zw_title" align="center">机动车维修企业质量信誉考核申请表</div>',
	                    	'<div style="margin:5px 10px 5px 10px;width:98%;align:center;height:1px;background-image:url( images/zwgk_xxian03a.gif );" align="center"></div>',
	                    	'<div class="thumb" >',
	                    	'<table style="width:100%;" class= "tableStyle">',
	                    		'<tr>' ,
	                    			'<th colspan="2" height="25px;">申请时间:</th>',
	                    			'<td colspan="10" height="25px;"><div><font color="blue">{UPLOAD_DATE:this.formatDateTime}</font></div></td>',
	                    			'<th colspan="2" height="25px;"><div style="line-height:20px;" onclick="app.utils.ButtonUtils.test({IS_UPLOAD},{FILE_ID})">{IS_UPLOAD:this.formatChecked}<span style="padding-bottom:10px;"><font color="red">拒绝受理</font></span></div></th>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<th colspan="2">企业名称</th><td colspan="4"><div  fieldId="CORP_NAME">{CORP_NAME}</div></td>',
	                    			'<th colspan="2">企业地址</th><td colspan="6"><div  fieldId="CORP_ADD">{CORP_ADD}</div></td>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<th colspan="2">法定代表人</th><td colspan="2"><div  fieldId="LEGAL_PERSON">{LEGAL_PERSON}</div></td>',
	                    			'<th colspan="2">联系电话</th><td colspan="3"><div class="x-editable" fieldId="CORP_TEL">&nbsp;{CORP_TEL}</div></td>',
	                    			'<th colspan="2">企业服务热线</th><td colspan="3"><div class="x-editable" fieldId="SERVICE_HOTLINE">&nbsp;{SERVICE_HOTLINE}</div></td>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<th colspan="2">经济类型</th><td colspan="2"><div   fieldId="ECONOMIC_NATURE">{ECONOMIC_NATURE:this.formatCode}</div></td>',
	                    			'<th colspan="2">经营许可号</th><td colspan="3"><div  fieldId="BUSINESS_NUM">{BUSINESS_NUM}</div></td>',
	                    			'<th colspan="2">营业执照号</th><td colspan="3"><div  fieldId="INDUSTRY_CODE">{INDUSTRY_CODE}</div></td>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<th colspan="2">经营标志牌号</th><td colspan="2"><div  fieldId="CORP_NUM">{CORP_NUM}</div></td>',
	                    			'<th colspan="2">开业时间</th><td colspan="2"><div>{OPEN_DATE:this.formatDate}</div></td>',
	                    			'<th colspan="3">原质量信誉等级（未参加上一年考核的企业此项留空）</th><td colspan="3"><div fieldId="OLD_EXAM_LEVEL">&nbsp;{OLD_EXAM_LEVEL}</div></td>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<th colspan="2">维修类别</th><td colspan="5"><div fieldId="CORP_TYPE">{CORP_TYPE:this.formatCode}</div></td>',
	                    			'<th colspan="2">经营范围</th><td colspan="5"><div fieldId="REPAIR_TYPES">{REPAIR_TYPES}</div></td>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<th colspan="14">场地设施情况（平方米）</th>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<th>总面积</th><td colspan="2"><div>{areaCount:this.formatArea}</div></td>',
	                    			'<th>厂房面积</th><td colspan="2"><div class="x-editable" fieldId="PLANT_AREA">{PLANT_AREA:this.formatArea}</div></td>',
	                    			'<th colspan="2">停车场面积</th><td colspan="2"><div class="x-editable" fieldId="PARK_AREA">{PARK_AREA:this.formatArea}</div></td>',
	                    			'<th colspan="2">接待室面积</th><td colspan="2"><div class="x-editable" fieldId="ANTEROOM_AREA">{ANTEROOM_AREA:this.formatArea}</div></td>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<th colspan="14">从业人员情况（人数）</th>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<th width="70px;">从业人员总数</th>',
	                    			'<th width="61px;">管理负责人</th>',
	                    			'<th width="61px;">技术负责人</th>',
	                    			'<th width="61px;">质量总检验员</th>',
	                    			'<th width="61px;">质量检验员</th>',
	                    			'<th width="80px;">机修技术人员（含轮胎修补工）</th>',
	                    			'<th width="61px;">电器维修技术人员</th>',
	                    			'<th width="61px;">钣金维修技术人员</th>',
	                    			'<th width="61px;">涂漆维修技术人员</th>',
	                    			'<th width="61px;">车身维护技术人员</th>',
	                    			'<th width="70px;">LPG/危运维修技术人员</th>',
	                    			'<th width="61px;">业务接待员</th>',
	                    			'<th width="70px;">价格核算员</th>',
	                    			'<th width="61px;">其它从业人员</th>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<td><div>{personCount}</div></td>',
	                    			'<td><div class="x-editable" fieldId="GL_NUM">{GL_NUM}</div></td>',
	                    			'<td><div class="x-editable" fieldId="JSFZR_NUM">{JSFZR_NUM}</div></td>',
	                    			'<td><div class="x-editable" fieldId="ZZJY_NUM">{ZZJY_NUM}</div></td>',
	                    			'<td><div class="x-editable" fieldId="ZJY_NUM">{ZJY_NUM}</div></td>',
	                    			'<td><div class="x-editable" fieldId="JX_NUM">{JX_NUM}</div></td>',
	                    			'<td><div class="x-editable" fieldId="DQ_NUM">{DQ_NUM}</div></td>',
	                    			'<td><div class="x-editable" fieldId="BJ_NUM">{BJ_NUM}</div></td>',
	                    			'<td><div class="x-editable" fieldId="TQ_NUM">{TQ_NUM}</div></td>',
	                    			'<td><div class="x-editable" fieldId="CS_NUM">{CS_NUM}</div></td>',
	                    			'<td><div class="x-editable" fieldId="LPG_NUM">{LPG_NUM}</div></td>',
	                    			'<td><div class="x-editable" fieldId="YW_NUM">{YW_NUM}</div></td>',
	                    			'<td><div class="x-editable" fieldId="JG_NUM">{JG_NUM}</div></td>',
	                    			'<td><div class="x-editable" fieldId="QT_NUM">{QT_NUM}</div></td>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<td><div>{czCount:this.formatChange}</div></td>',
	                    			'<td><div class="x-editable" fieldId="GL_CZ_NUM">{GL_CZ_NUM:this.formatChange}</div></td>',
	                    			'<td><div class="x-editable" fieldId="JSFZE_CZ_NUM">{JSFZE_CZ_NUM:this.formatChange}</div></td>',
	                    			'<td><div class="x-editable" fieldId="ZZJY_CZ_NUM">{ZZJY_CZ_NUM:this.formatChange}</div></td>',
	                    			'<td><div class="x-editable" fieldId="ZJY_CZ_NUM">{ZJY_CZ_NUM:this.formatChange}</div></td>',
	                    			'<td><div class="x-editable" fieldId="JX_CZ_NUM">{JX_CZ_NUM:this.formatChange}</div></td>',
	                    			'<td><div class="x-editable" fieldId="DQ_CZ_NUM">{DQ_CZ_NUM:this.formatChange}</div></td>',
	                    			'<td><div class="x-editable" fieldId="BJ_CZ_NUM">{BJ_CZ_NUM:this.formatChange}</div></td>',
	                    			'<td><div class="x-editable" fieldId="TQ_CZ_NUM">{TQ_CZ_NUM:this.formatChange}</div></td>',
	                    			'<td><div class="x-editable" fieldId="CS_CZ_NUM">{CS_CZ_NUM:this.formatChange}</div></td>',
	                    			'<td><div class="x-editable" fieldId="LPG_CZ_NUM">{LPG_CZ_NUM:this.formatChange}</div></td>',
	                    			'<td><div class="x-editable" fieldId="YW_CZ_NUM">{YW_CZ_NUM:this.formatChange}</div></td>',
	                    			'<td><div class="x-editable" fieldId="JG_CZ_NUM">{JG_CZ_NUM:this.formatChange}</div></td>',
	                    			'<td><div class="x-editable" fieldId="QT_CZ_NUM">{QT_CZ_NUM:this.formatChange}</div></td>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<th colspan="14">维修机具设备情况（台、套、件）</th>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<th colspan="2">通用设备</th>',
	                    			'<th colspan="2">专用设备</th>',
	                    			'<th colspan="2">检测设备</th>',
	                    			'<th colspan="2"">计量设备</th>',
	                    			'<th colspan="2">主要手工工具</th>',
	                    			'<th colspan="2">外协设备</th>',
	                    			'<th colspan="2">其它设备</th>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<td colspan="2"><div class="x-editable" fieldId="TYSB_NUM">{TYSB_NUM}</div></td>',
	                    			'<td colspan="2"><div class="x-editable" fieldId="ZYSB_NUM">{ZYSB_NUM}</div></td>',
	                    			'<td colspan="2"><div class="x-editable" fieldId="JCSB_NUM">{JCSB_NUM}</div></td>',
	                    			'<td colspan="2"><div class="x-editable" fieldId="JLSB_NUM">{JLSB_NUM}</div></td>',
	                    			'<td colspan="2"><div class="x-editable" fieldId="ZYSGGJ_NUM">{ZYSGGJ_NUM}</div></td>',
	                    			'<td colspan="2"><div class="x-editable" fieldId="WXSB_NUM">{WXSB_NUM}</div></td>',
	                    			'<td colspan="2"><div class="x-editable" fieldId="QTSB_NUM">{QTSB_NUM}</div></td>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<th colspan="14">考核周期内经营情况（辆次或万元）</th>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<th colspan="2">整车大修（辆次）</th><td><div class="x-editable" fieldId="ZHCDX_NUM">{ZHCDX_NUM}</div></td>',
	                    			'<th colspan="2">总成大修（辆次）</th><td><div class="x-editable" fieldId="ZCDX_NUM">{ZCDX_NUM}</div></td>',
	                    			'<th colspan="2">二级维护（辆次）</th><td colspan="2"><div class="x-editable" fieldId="EJWH_NUM">{EJWH_NUM}</div></td>',
	                    			'<th colspan="2">车辆小修（辆次）</th><td colspan="2"><div class="x-editable" fieldId="CLXX_NUM">{CLXX_NUM}</div></td>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<th colspan="2">专项维修（辆次）</th><td><div class="x-editable" fieldId="ZXWX_NUM">{ZXWX_NUM}</div></td>',
	                    			'<th colspan="2">救援（辆次）</th><td><div class="x-editable" fieldId="JY_NUM">{JY_NUM}</div></td>',
	                    			'<th colspan="2">产值（万元）</th><td><div class="x-editable" fieldId="WXCZ_NUM">{WXCZ_NUM:this.formatFloat}</div></td>',
	                    			'<th colspan="2">利润（万元）</th><td><div class="x-editable" fieldId="WXLR_NUM">{WXLR_NUM:this.formatFloat}</div></td>',
	                    			'<th >缴税(万元)</th><td><div class="x-editable" fieldId="SJSJ_NUM">{SJSJ_NUM:this.formatFloat}</div></td>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<td colspan="14" style="padding:5px;line-height:25px;">' +
	                    				'安全生产事故<div class="templateDiv" fieldId="ZXWX_NUM">&nbsp;{countSG}</div>宗，' +
		                    			'其中工伤事故<div  class="x-editable templateDiv" fieldId="GSSG_NUM">{GSSG_NUM}</div>宗，' +
		                    			'火灾事故<div  class="x-editable templateDiv" fieldId="HZSG_NUM">{HZSG_NUM}</div>宗，' +
		                    			'用电事故<div  class="x-editable templateDiv" fieldId="YDSG_NUM">{YDSG_NUM}</div>宗，' +
		                    			'其他事故<div  class="x-editable templateDiv" fieldId="QTSG_NUM">{QTSG_NUM}</div>宗；<br/>' +
		                    			'受伤<div  class="x-editable templateDiv" fieldId="SSRS_NUM">{SSRS_NUM}</div>人，' +
		                    			'死亡<div  class="x-editable templateDiv" fieldId="SWRS_NUM">{SWRS_NUM}</div>人，' +
		                    			'经济损失<div  class="x-editable templateDiv" fieldId="JJSS_NUM">{JJSS_NUM:this.formatFloat}</div>元；<br/>' +
		                    			'环保回收废机油<div  class="x-editable templateDiv" fieldId="HBHS_NUM">{HBHS_NUM:this.formatFloat}</div>吨，' +
		                    			'废旧轮胎 <div  class="x-editable templateDiv" fieldId="FJLT_NUM">{FJLT_NUM}</div>条，' +
		                    			'废旧蓄电池<div  class="x-editable templateDiv" fieldId="FJXDC_NUM">{FJXDC_NUM}</div>个。' +
	                    			'</td>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<td colspan="7" style="padding:5px;line-height:25px;">' +
		                    			'共发生服务质量事件<div  class="x-editable templateDiv" fieldId="FWZLSJ_NUM">{FWZLSJ_NUM}</div>宗，' +
		                    			'其中被管理部门通报<div  class="x-editable templateDiv" fieldId="TB_NUM">{TB_NUM}</div>宗' +
	                    			'</td>',
	                    			'<td colspan="7" style="padding:5px;line-height:25px;">' +
		                    			'共接受客户投诉<div  class="x-editable templateDiv" fieldId="KHTS_NUM">{KHTS_NUM}</div>宗，' +
		                    			'其中有责投诉<div  class="x-editable templateDiv" fieldId="YZTS_NUM">{YZTS_NUM}</div>宗，' +
		                    			'投诉客户满意率<div  class="x-editable templateDiv" fieldId="MYD_NUM">{MYD_NUM:this.formatFloat}</div>%' +
	                    			'</td>',
	                    		'</tr>',
	                    		'<tr>' ,
	                    			'<th colspan="2">企业本地分公司情况</th>',
	                    			'<td colspan="12">',
	                    				'<table style="width:100%;" class= "tableStyle">',
	                    					'<tr>',
	                    						'<th>分公司名称</th>',
	                    						'<th>分公司地址</th>',
	                    					'</tr>',
	                    					'{FGS:this.formatFgs}',
	                    				'</table>',
	                    			'</td>',
	                    		'</tr>',
	                    	'</table>',
	                    	'<div style="margin:10px 10px 20px 10px;width:98%;align:center;height:1px;background-image:url( images/zwgk_xxian03a.gif );" align="center"></div>',
	                    '</div>',
	                '</tpl>',
	                '<div class="x-clear"></div>',
	                '</div>',
        {
            formatChange: function(v){
            	var s = "持证：" + v;
		    	return s;
            },
            formatArea: function(v){
            	var s = Ext.util.Format.number(v,'000.00') + "&nbsp;平方米";
		    	return s;
            },
            formatFloat: function(v){
		    	return Ext.util.Format.number(v,'000.00');
            },
            formatDate: function(v){
		    	return Ext.util.Format.date(v, "Y-m-d");
            },
            formatDateTime: function(v){
		    	return Ext.util.Format.date(v, "Y-m-d H:i:s");
            },
            formatCode: function(v){
		    	return app.utils.FunUtils.renderer(v);
            },
            formatChecked: function(v){
            	 if(v == '10041002'){
                	return '<img border="0" src="images/check.gif" style="margin-top:5px;"/>';
                }else{
                	return '<img border="0" src="images/uncheck.gif" style="margin-top:5px;"/>';
                }
            },
            formatFgs: function(v){
            	var str = "";
            	for(var i=0;i<v.length;i++){
            		var data = v[i];
            		str = str + "<tr>";
            		str = str + "<td>" + data.CORP_NAME + "</td>";
            		str = str + "<td>" + data.CORP_ADD + "</td>";
            		str = str + "</tr>";
            	}
		    	return str;
            }
        });
        return tpl;
	}
});
