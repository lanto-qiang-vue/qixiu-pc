Ext.define('app.controller.manage.report.CorpNumReportCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.report.CorpNumReportMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.report.CorpNumReportMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.report.CorpNumReportMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.report.CorpNumReportMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.report.CorpNumReportMngPanel]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.report.CorpNumReportMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			}
		});
	},
	//组件初始化时store上挂接查询form.
	initGridSearchCondition : function(grid, opts){
		var me = this;
		var store = grid.getStore();
		var repairChart=grid.up('panel').down('#repairChart');
		var rstore=repairChart.getStore();
		store.on('load',function(st,records){
			rstore.removeAll();
			rstore.add(records);
		});
		store.loadPage();
	},
	//grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'acceptBtn'==button.itemId ){
			me.doAccept(button);
		}else if( 'deleteBtn'==button.itemId ){
			me.doDelete(button);
		}else if( 'endBtn'==button.itemId ){
			me.doEnd(button);
		}else if( 'viewBtn'==button.itemId ){
			me.doView(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	}
});
