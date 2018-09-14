Ext.define('app.controller.manage.exharepair.RepairRecordsCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.exharepair.RepairRecordsMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.exharepair.RepairRecordsMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.exharepair.RepairRecordsMngPanel] panel[itemId=spanel]'
	},{
		ref : 'picsPanel',
		selector : 'panel[itemId=manage.exharepair.RepairRecordsEdit] panel[itemId=picsPanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.exharepair.RepairRecordsMngPanel] panel[itemId=gpanel]'
	},{
		ref : 'itemsGrid',
		selector : 'panel[itemId=manage.exharepair.RepairRecordsEdit] panel[itemId=itemsGrid]'
	},{
		ref : 'partsGrid',
		selector : 'panel[itemId=manage.exharepair.RepairRecordsEdit] panel[itemId=partsGrid]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.exharepair.RepairRecordsMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.exharepair.RepairRecordsMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
        	'panel[itemId=manage.exharepair.RepairRecordsMngPanel] button[itemId=searchBtn]': {
            	click: this.doSearch 
            },
			'panel[itemId=manage.exharepair.RepairRecordsMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			}
		});
	},
	/********************************************************
	 * 主页面控制
	 ********************************************************/
	// grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'addBtn'==button.itemId ){
			me.doAdd(button);
		}else if( 'deleteBtn'==button.itemId ){
			me.doDelete(button);
		}else if( 'editBtn'==button.itemId ){
			me.doEdit(button);
		}else if( 'workBtn'==button.itemId ){
			me.doWork(button);
		}else if( 'submitBtn'==button.itemId ){
			me.doSubmit(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//查询panel中点击查询
	doSearch: function(button){
		if( this.getSearchPanel().getForm().isValid() ){
			this.getGridPanel().getStore().loadPage(1);
		}
		
	},
	// 工具栏添加按钮
	doAdd : function(button){
		var me=this;
		var win =	Ext.create('app.view.manage.exharepair.RepairRecordsEdit',{title:'<i class="' + button.iconCls + '"></i> 维修记录编辑'});
		win.show();
	},
	//跳转修改页面
	doEdit:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.exharepair.RepairRecordsEdit',{title:'<i class="' + button.iconCls + '"></i> 维修记录编辑'});
		win.loadData(mds);
		win.show();
	},
	//组件初始化时store上挂接查询form.
	initGridSearchCondition : function(grid, opts){
		var me = this;
		var st = grid.getStore();
		st.on('beforeload', function (store, options) {
			var fm = me.getSearchPanel().getForm();
			var params = fm.getValues();
			//params.CORP_ID_eq=window.GL.corpId;
			store.proxy.extraParams=params;
		});
		st.loadPage(1);
	}
});
