Ext.define('app.controller.manage.employee.TbEmployeeCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.employee.TbEmployeeMngPanel',
		'manage.employee.TbEmployeeEdit'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.employee.TbEmployeeMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.employee.TbEmployeeMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.employee.TbEmployeeMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.employee.TbEmployeeMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.employee.TbEmployeeEdit]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.employee.TbEmployeeMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=manage.employee.TbEmployeeMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=manage.employee.TbEmployeeMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'window[itemId=manage.employee.TbEmployeeEdit] button[itemId=saveBtn]': {
				click: this.doSave
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
		}else if('exportBtn' == button.itemId){
			me.doExport(button);
		}else if( 'viewBtn' == button.itemId){
			me.doView(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转新增页面
	doAdd:function(button){ 
		var win =	Ext.create('app.view.manage.employee.TbEmployeeEdit');
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
		var win =	Ext.create('app.view.manage.employee.TbEmployeeEdit');
		win.show();
		win.loadData(mds);
		var dstore = win.down('grid').getStore();
		dstore.proxy.extraParams = {ID_NUM:mds.data.ID_NUM};
		dstore.loadPage(1);
	},
	//跳转修改页面
	doView:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.employee.TbEmployeeEdit');
		win.show();
		win.loadViewData(mds);
		var dstore = win.down('grid').getStore();
		dstore.proxy.extraParams = {ID_NUM:mds.data.ID_NUM};
		dstore.loadPage(1);
	},
	doSave : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		var grid = win.down('grid');
		var array = [];
		var records = grid.getStore().data.items;
		for(var i =0 ; i<records.length;i++){
			var record = records[i];
			if(Ext.isEmpty(record.data.CERT_NUM)){
				Ext.Msg.alert('错误','从业资格证号不能为空');
				return false;
			}
			if(Ext.isEmpty(record.data.CERT_NAME)){
				Ext.Msg.alert('错误','从业资格证类型不能为空');
				return false;
			}
			array.push(record.data);
		}
		var params = {
			data : Ext.JSON.encode(data),
			array : Ext.JSON.encode(array)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/employee/tbemployee/save';
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
				ids = record.data.EMPLOYEE_ID;
			}else{
				ids = ids + "," + record.data.EMPLOYEE_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/employee/tbemployee/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
	},
	doExport : function(button){
		var form =  this.getSearchPanel().getForm();
		if(!form.isValid()){return;}
		var url = "manage/employee/tbemployee/doExport";
		app.utils.CommonUtil.exportStandardSubmit(form,url,null);
	}
});
