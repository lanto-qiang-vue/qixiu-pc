Ext.define('app.controller.manage.report.ComplaintReportCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.report.ComplaintReportMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.report.ComplaintReportMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.report.ComplaintReportMngPanel] panel[itemId=spanel]'
	},{
		ref : 'chartPanel',
		selector : 'panel[itemId=manage.report.ComplaintReportMngPanel] panel[itemId=cpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.report.ComplaintReportMngPanel]': {
				afterrender : this.loadData
			},
			'panel[itemId=manage.report.ComplaintReportMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			}
		});
	},
	//查询panel中点击查询
	doSearch: function(button){
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
	},
	//加载数据
	loadData : function(mngPanel){
		var me=this;
		var sstore=mngPanel.down('#statusChart').getStore();
		var tstore=mngPanel.down('#typeChart').getStore();
		var params=this.getSearchPanel().getForm().getValues();
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
});
