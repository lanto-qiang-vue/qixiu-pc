Ext.define('app.controller.manage.publicservice.RepairQuestionsCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.publicservice.RepairQuestionsMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.publicservice.RepairQuestionsMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.publicservice.RepairQuestionsMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.publicservice.RepairQuestionsMngPanel] panel[itemId=gpanel]'
	},{
		ref : 'infoPanel',
		selector : 'panel[itemId=manage.publicservice.RepairQuestionsMngPanel] panel[itemId=infoPanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.publicservice.RepairQuestionsMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.publicservice.RepairQuestionsMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=manage.publicservice.RepairQuestionsMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=manage.publicservice.RepairQuestionsMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
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
			var url = 'manage/publicservice/vrepairquestions/list';
			app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
				if( ret.success ){
					me.getInfoPanel().update(ret.data[0]);
				}
			});
		});
		st.loadPage(1);//预加载
	},
	//grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'deleteBtn'==button.itemId ){
			me.doDelete(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	doDelete : function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.mutChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var ids = [];
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			ids.push(record.get("QUES_ID"));
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/publicservice/repairquestions/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids.join(',')},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
	},
	//跳转查看窗口
	doView : function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.publicservice.ComplaintView',{title:'<i class="' + button.iconCls + '"></i> 查看投诉信息'});
		win.show();
		win.loadData(mds);
	}
});
