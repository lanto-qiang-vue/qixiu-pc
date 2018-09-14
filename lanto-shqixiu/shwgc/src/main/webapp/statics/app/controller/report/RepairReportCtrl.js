Ext.define('app.controller.report.RepairReportCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'report.RepairReportMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=report.RepairReportMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=report.RepairReportMngPanel] panel[itemId=spanel]'
	},{
		ref : 'chartPanel',
		selector : 'panel[itemId=report.RepairReportMngPanel] panel[itemId=cpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=report.RepairReportMngPanel]': {
				afterrender : this.loadData
			},
			'panel[itemId=report.RepairReportMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			}
		});
	},
	//查询panel中点击查询
	/*doSearch: function(button){
		var me=this;
		var sstore=me.getMngPanel().down('#statusChart').getStore();
		var tstore=me.getMngPanel().down('#typeChart').getStore();
		var params=this.getSearchPanel().getForm().getValues();
		if( this.getSearchPanel().getForm().isValid() ){
			var url = 'manage/publicservice/complaint/report';
			app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
				if( ret.success ){
					var data=[{ITEM_NAME:'未受理',ITEM_SCORE:ret.data.noAcceptNum},
								{ITEM_NAME:'已受理',ITEM_SCORE:ret.data.acceptNum},
								{ITEM_NAME:'已办结',ITEM_SCORE:ret.data.endNum}];
					sstore.removeAll();
					sstore.add(data);
					var data1=[{ITEM_NAME:'服务投诉',ITEM_SCORE:ret.data.serviceCompNum},
								{ITEM_NAME:'质量投诉',ITEM_SCORE:ret.data.qualityCompNum},
								{ITEM_NAME:'举报',ITEM_SCORE:ret.data.reportCompNum}];
					tstore.removeAll();
					tstore.add(data1);
				}
			});
		}
	},*/
	//加载数据
	loadData : function(mngPanel){
		var me=this;
		var info=mngPanel.down('#info');
		var sstore=mngPanel.down('#transRepairChart').getStore();
		var tstore=mngPanel.down('#repairChart').getStore();
		var url = 'report/repairreport/gettransrepairnum';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,null,function(ret){
			if( ret.success ){
				if(ret.data.length!=0){
					info.hide();
					sstore.removeAll();
					sstore.add(ret.data);
				}
			}
		});
		var url1 = 'report/repairreport/getrepairnum';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url1,null,function(ret){
			if( ret.success ){
				var vehicleInfo=mngPanel.down('#vehicleInfo');
				if(ret.data[0].MONTH1!=0 || ret.data[0].MONTH2!=0 || ret.data[0].MONTH3!=0 || ret.data[0].MONTH4!=0 || ret.data[0].MONTH5!=0 || ret.data[0].MONTH6!=0 || ret.data[0].MONTH7!=0 || ret.data[0].MONTH8!=0 || ret.data[0].MONTH9!=0 || ret.data[0].MONTH10!=0 || ret.data[0].MONTH11!=0 || ret.data[0].MONTH12!=0 ){
					vehicleInfo.hide();
					tstore.removeAll();
					tstore.add([{MONTH:'1月份',REPAIR_NUM:ret.data[0].MONTH1},
				    			{MONTH:'2月份',REPAIR_NUM:ret.data[0].MONTH2},
				    			{MONTH:'3月份',REPAIR_NUM:ret.data[0].MONTH3},
				    			{MONTH:'4月份',REPAIR_NUM:ret.data[0].MONTH4},
				    			{MONTH:'5月份',REPAIR_NUM:ret.data[0].MONTH5},
				    			{MONTH:'6月份',REPAIR_NUM:ret.data[0].MONTH6},
				    			{MONTH:'7月份',REPAIR_NUM:ret.data[0].MONTH7},
				    			{MONTH:'8月份',REPAIR_NUM:ret.data[0].MONTH8},
				    			{MONTH:'9月份',REPAIR_NUM:ret.data[0].MONTH9},
				    			{MONTH:'10月份',REPAIR_NUM:ret.data[0].MONTH10},
				    			{MONTH:'11月份',REPAIR_NUM:ret.data[0].MONTH11},
				    			{MONTH:'12月份',REPAIR_NUM:ret.data[0].MONTH12}
				    		]);
				}
			}
		});
	}
});
