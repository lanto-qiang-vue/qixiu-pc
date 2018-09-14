Ext.define('app.controller.sys.TqSysUserCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'sys.TqSysUserMngPanel',
		'sys.TqSysUserEdit'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=sys.TqSysUserMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=sys.TqSysUserMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=sys.TqSysUserMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=sys.TqSysUserMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=sys.TqSysUserEdit]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=sys.TqSysUserMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=sys.TqSysUserMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=sys.TqSysUserMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'window[itemId=sys.TqSysUserEdit] button[itemId=saveBtn]': {
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
		//st.loadPage(1);//预加载
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
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转新增页面
	doAdd:function(button){ 
		var win =	Ext.create('app.view.sys.TqSysUserEdit');
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
		var win =	Ext.create('app.view.sys.TqSysUserEdit');
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
		var data = form.getFieldValues();
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'client/sys/tqsysuser/save';
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
			if(record.data.ROLE_ID == 1){
				Ext.Msg.alert('系统提示','企业管理员帐号不能删除！');
				return false;
			}
			if(i == 0){
				ids = record.data.USER_ID;
			}else{
				ids = ids + "," + record.data.USER_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'client/sys/tqsysuser/delete';
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
				var url = 'client/sys/tqsysuser/resetPass';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids},function(ret){
					if( ret.success ){
						Ext.Msg.alert('系统提示','重置密码成功！');
					}
				});
			}
		});
	}
});
