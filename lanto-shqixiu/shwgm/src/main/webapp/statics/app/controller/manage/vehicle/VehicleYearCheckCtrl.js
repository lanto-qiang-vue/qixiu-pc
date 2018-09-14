Ext.define('app.controller.manage.vehicle.VehicleYearCheckCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.vehicle.VehicleYearCheckMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.vehicle.VehicleYearCheckMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.vehicle.VehicleYearCheckMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.vehicle.VehicleYearCheckMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.vehicle.VehicleYearCheckMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.vehicle.VehicleYearCheckMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
        	'panel[itemId=manage.vehicle.VehicleYearCheckMngPanel] button[itemId=searchBtn]': {
            	click: this.doSearch 
            },
			'panel[itemId=manage.vehicle.VehicleYearCheckMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=manage.vehicle.VehicleYearCheckEdit] button[itemId=passBtn]':{
				click: this.doPass
			},
			'panel[itemId=manage.vehicle.VehicleYearCheckEdit] button[itemId=notPassBtn]':{
				click: this.doNotPass
			}
		});
	},
	// grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'addBtn'==button.itemId ){
			me.doAdd(button);
		}else if( 'deleteBtn'==button.itemId ){
			me.doDelete(button);
		}else if( 'editBtn'==button.itemId ){
			me.doEdit(button);
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
		var win =	Ext.create('app.view.manage.vehicle.VehicleYearCheckEdit');
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
		var win =	Ext.create('app.view.manage.vehicle.VehicleYearCheckEdit');
		win.show();
		win.loadData(mds);
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
		st.loadPage(1);
	},
	//通过审核按钮
	doPass : function(btn){
		var me = this;
		var win  = btn.up('window');
		console.log(win);
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		delete data.PLATE_NUM;
		data.CHECK_RESULT='10481002';
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认审核吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/vehicle/vehicleyearcheck/save';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
						win.close();
						Ext.Msg.alert('系统提示','审核成功！');
					}
				});
			}
		});
	},
	//不通过审核按钮
	doNotPass : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		delete data.PLATE_NUM;
		data.CHECK_RESULT='10481003';
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认审核吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/vehicle/vehicleyearcheck/save';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
						win.close();
						Ext.Msg.alert('系统提示','审核成功！');
					}
				});
			}
		});
	},
	doDelete : function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.mutChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var ids = "";
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			if(i == 0){
				ids = record.data.CHECK_ID;
			}else{
				ids = ids + "," + record.data.CHECK_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/vehicle/vehicleyearcheck/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
	}
});
