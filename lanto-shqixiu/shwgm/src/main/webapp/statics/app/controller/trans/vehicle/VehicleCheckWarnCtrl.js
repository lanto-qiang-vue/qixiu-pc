Ext.define('app.controller.trans.vehicle.VehicleCheckWarnCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'trans.vehicle.VehicleCheckWarnMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=trans.vehicle.VehicleCheckWarnMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=trans.vehicle.VehicleCheckWarnMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=trans.vehicle.VehicleCheckWarnMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=trans.vehicle.VehicleCheckWarnMngPanel]': {
		//		afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=trans.vehicle.VehicleCheckWarnMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=trans.vehicle.VehicleCheckWarnMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
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
		var view = me.getMngPanel();
		if(view.plateNum){
			view.down('form').getForm().setValues({PLATE_NUM_lk:view.plateNum});
		}
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
		}else if( 'exportBtn' == button.itemId){
			me.doExport(button);
		}else if('caseBtn' == button.itemId){
		}else if('toCased' == button.itemId){
			me.toCased(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	doExport : function(button){
		var form =  this.getSearchPanel().getForm();
		if(!form.isValid()){return;}
		var url = "trans/vehicle/vehiclebase/doExport";
		app.utils.CommonUtil.exportStandardSubmit(form,url,null);
	}
});
