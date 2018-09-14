Ext.define('app.controller.manage.sys.TjSysUserCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.sys.TjSysUserMngPanel',
		'manage.sys.TjSysUserEdit'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.sys.TjSysUserMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.sys.TjSysUserMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.sys.TjSysUserMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.sys.TjSysUserMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.sys.TjSysUserEdit]': {
			//	afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.sys.TjSysUserMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=manage.sys.TjSysUserMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=manage.sys.TjSysUserMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'window[itemId=manage.sys.TjSysUserEdit] button[itemId=saveBtn]': {
				click: this.doSave
			},
			'window[itemId=manage.sys.TjSysUserSetStatus] button[itemId=saveBtn]': {
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
		}else if( 'resetPassBtn' == button.itemId){
			me.resetPass(button);
		}else if( 'setStatusBtn' == button.itemId){
			me.setStatus(button);
		}else if( 'createUserBtn' == button.itemId){
			me.doCreateUsers(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转新增页面
	doAdd:function(button){ 
		var win =	Ext.create('app.view.manage.sys.TjSysUserEdit');
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
		var win =	Ext.create('app.view.manage.sys.TjSysUserEdit');
		win.show();
		win.loadData(mds);
	},
	//跳转设置状态页面
	setStatus:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.sys.TjSysUserSetStatus');
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
				var url = 'manage/sys/tjsysuser/save';
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
				ids = record.data.USER_ID;
			}else{
				ids = ids + "," + record.data.USER_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/sys/tjsysuser/delete';
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
				var url = 'manage/sys/tjsysuser/resetPass';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids},function(ret){
					if( ret.success ){
						Ext.Msg.alert('系统提示','重置密码成功！');
					}
				});
			}
		});
	},
	doCreateUsers : function(button){
		var me = this;
		Ext.MessageBox.confirm('警告','确认要生成企业用户吗？<br/> <font color="red">此功能根据企业道路经营许可证号作为登录帐号生成企业用户（未生成过帐号的企业）<br/>生成后的企业用户初始密码为：123456<br/>完成此操作可能要花费较长时间，请谨慎操作！</font>',function(flag){
			if(flag=='yes'){
				var url = 'manage/sys/tjsysuser/createUsers';
				app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,{},me.getMngPanel(),"正在生成企业用户中...",function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
						Ext.Msg.alert('系统提示','生成企业用户完毕！');
					}
				});
			}
		});
	}
});
