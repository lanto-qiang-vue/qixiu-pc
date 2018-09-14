Ext.define('app.controller.manage.privehicle.PrivateVehicleCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.privehicle.PrivateVehicleMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.privehicle.PrivateVehicleMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.privehicle.PrivateVehicleMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.privehicle.PrivateVehicleMngPanel] panel[itemId=gpanel]'
	},{
		ref : 'recordsGrid',
		selector : 'panel[itemId=manage.privehicle.PrivateVehicleFile] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.privehicle.PrivateVehicleMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.privehicle.PrivateVehicleMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
        	'panel[itemId=manage.privehicle.PrivateVehicleMngPanel] button[itemId=searchBtn]': {
            	click: this.doSearch 
            },
			'panel[itemId=manage.privehicle.PrivateVehicleMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=manage.privehicle.PrivateVehicleFile] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.recordsGridBtnsHandler
			},
			'panel[itemId=manage.privehicle.PrivateVehicleEdit] button[itemId=saveBtn]':{
				click: this.doSave
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
		}else if( 'recordBtn'==button.itemId ){
			me.viewRecord(button);
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
		var win =	Ext.create('app.view.manage.privehicle.PrivateVehicleEdit',{title:'<i class="' + button.iconCls + '"></i> 普通车辆信息编辑'});
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
		var win =	Ext.create('app.view.manage.privehicle.PrivateVehicleEdit',{title:'<i class="' + button.iconCls + '"></i> 普通车辆信息编辑'});
		win.show();
		win.loadData(mds);
	},
	//跳转查看电子健康档案页面
	viewRecord : function(btn){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.privehicle.PrivateVehicleFile',{title:'<i class="' + btn.iconCls + '"></i> 汽车电子健康档案'});
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
			//params.CORP_ID_eq=window.GL.corpId;
			store.proxy.extraParams=params;
		});
		st.loadPage(1);
	},
	//编辑页面保存按钮
	doSave : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/privehicle/privatevehicle/save';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
						win.close();
						Ext.Msg.alert('系统提示','保存成功！');
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
				ids = record.data.VEHICLE_ID;
			}else{
				ids = ids + "," + record.data.VEHICLE_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/privehicle/privatevehicle/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
	},
	/**********************************************************************************
	 * 电子健康档案页面控制
	 **********************************************************************************/
	//维修记录表格工具栏按钮
	recordsGridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'viewBtn'==button.itemId ){
			me.viewFile(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//查看电子健康档案按钮
	viewFile : function(btn){
		var me = this;
		var grid = me.getRecordsGrid();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.privehicle.RepairRecordsView',{title:'<i class="' + btn.iconCls + '"></i> 维修记录查看'});
		win.show();
		win.loadData(mds);
	}
});
