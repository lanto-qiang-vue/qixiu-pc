Ext.define('app.controller.sys.TqVehicleCardCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'sys.TqVehicleCardMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=sys.TqVehicleCardMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=sys.TqVehicleCardMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=sys.TqVehicleCardMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=sys.TqVehicleCardMngPanel]': {
		//		afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'window[itemId=sys.TqVehicleCardEdit]': {
	   //		afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=sys.TqVehicleCardMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=sys.TqVehicleCardMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=sys.TqVehicleCardMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
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
			store.proxy.extraParams=fm.getValues(false,true);
		});
		st.loadPage(1);//预加载
	},
	//grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'addBtn'==button.itemId ){
			me.doAdd(button);
		}else if( 'editBtn' == button.itemId){
			me.doEdit(button);
		}else if( 'deleteBtn' == button.itemId){
			me.doDelete(button);
		}else if('viewBtn' == button.itemId){
			me.doView(button);
		}else if('printBtn' == button.itemId){
			me.doPrint(button);				
		}else if( 'exportBtn' == button.itemId){
			me.doExport(button);
		}else if('caseBtn' == button.itemId){
		}else if('toCased' == button.itemId){
			me.toCased(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转新增页面
	doAdd:function(button){ 
		var win =	Ext.create('app.view.sys.TqVehicleCardEdit',{title:'车辆发卡'});
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
		var win =	Ext.create('app.view.sys.TqVehicleCardEdit',{title:'修改车辆'});
		win.show();
		win.loadData(mds);
	},
	//跳转查看页面
	doView:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.sys.TqVehicleCardEdit',{title:'查看车辆档案'});
		win.show();
		win.loadData(mds);
	},
	doExport : function(button){
		var form =  this.getSearchPanel().getForm();
		if(!form.isValid()){return;}
		var url = "trans/vehicle/vehiclebase/doExport";
		app.utils.CommonUtil.exportStandardSubmit(form,url,null);
	}
});
