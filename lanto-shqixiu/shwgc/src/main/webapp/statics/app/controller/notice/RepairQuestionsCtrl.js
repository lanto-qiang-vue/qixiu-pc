Ext.define('app.controller.notice.RepairQuestionsCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'notice.RepairQuestionsMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=notice.RepairQuestionsMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=notice.RepairQuestionsMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=notice.RepairQuestionsMngPanel] panel[itemId=gpanel]'
	},{
		ref : 'infoPanel',
		selector : 'panel[itemId=notice.RepairQuestionsMngPanel] panel[itemId=infoPanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=notice.RepairQuestionsMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=notice.RepairQuestionsMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=notice.RepairQuestionsMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=notice.RepairQuestionsMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			}
		});
	},
	//查询panel中点击查询
	doSearch: function(button){
		if( this.getSearchPanel().getForm().isValid() ){
			this.getGridPanel().getStore().loadPage(1);
		}
	},
	//组件初始化时store上挂接查询form.
	initGridSearchCondition : function(grid, opts){
		var me = this;
		var st = grid.getStore();
		st.on('beforeload', function (store, options) {
			var fm = me.getSearchPanel().getForm();
			var params = fm.getValues();
			store.proxy.extraParams=params;
		});
		grid.on('itemclick',function(table,record){
			var data = record.data;
			var params = {QUES_ID_eq:data.QUES_ID};
			var url = 'notice/vrepairquestions/list';
			app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
				if( ret.success ){
					me.getInfoPanel().update(ret.data[0]);
				}
			});
		});
		st.loadPage(1);//预加载
	}
});
