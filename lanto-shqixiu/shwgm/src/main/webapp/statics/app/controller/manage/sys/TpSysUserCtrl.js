Ext.define('app.controller.manage.sys.TpSysUserCtrl',{
	extend:'Ext.app.Controller',
	config:{userId:null},		//用户ID
	views: [
		'manage.sys.TpSysUserMngPanel',
		'manage.sys.TpSysUserEdit'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.sys.TpSysUserMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.sys.TpSysUserMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.sys.TpSysUserMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.sys.TpSysUserMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.sys.TpSysUserEdit]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.sys.TpSysUserMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=manage.sys.TpSysUserMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=manage.sys.TpSysUserMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'window[itemId=manage.sys.TpSysUserEdit] button[itemId=saveBtn]': {
				click: this.doSave
			},
			'window[itemId=manage.sys.TpSysUserSetStatus] button[itemId=saveBtn]': {
				click: this.doSave
			},
			'panel[itemId=manage.sys.TpSysUserVehicleList] grid[itemId=gpanel]':{
				beforerender : this.initGrid
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
	//查看绑定车辆时，将USER_ID传入list参数
	initGrid : function(grid, opts){
		var me = this;
		var st = grid.getStore();
		st.on('beforeload', function (store, options) {
			var params = {USER_ID_eq:me.config.userId};
			store.proxy.extraParams=params;
		});
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
		}else if( 'resetPassBtn' == button.itemId){
			me.resetPass(button);
		}else if( 'setStatusBtn' == button.itemId){
			me.setStatus(button);
		}else if( 'vehicleListBtn' == button.itemId){
			me.vehicleList(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转新增页面
	doAdd:function(button){ 
		var win =	Ext.create('app.view.manage.sys.TpSysUserEdit');
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
		var win =	Ext.create('app.view.manage.sys.TpSysUserEdit');
		win.show();
		win.loadData(mds);
	},
	doSave : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var data = form.getValues();
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/sys/tpsysuser/save';
				app.utils.AjaxCallbackUtil.ajaxSaveCallback(url,params,win,function(ret){
					me.getGridPanel().getStore().reload();
					win.close();
					Ext.Msg.alert('系统提示','保存成功！');
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
				ids = record.data.USER_ID;
			}else{
				ids = ids + "," + record.data.USER_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/sys/tpsysuser/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
	},
	resetPass : function(button){
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
				ids = record.data.USER_ID;
			}else{
				ids = ids + "," + record.data.USER_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认要重置密码吗？<br/> <font color="red">重置后，登录密码为：123456</font>',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/sys/tpsysuser/resetPass';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids},function(ret){
					if( ret.success ){
						Ext.Msg.alert('系统提示','重置密码成功！');
					}
				});
			}
		});
	},
	//工具栏设置状态按钮
	setStatus:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.sys.TpSysUserSetStatus');
		win.show();
		win.loadData(mds);
	}
});
