Ext.define('app.controller.service.OnSiteServiceCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'service.OnSiteServiceMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=service.OnSiteServiceMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=service.OnSiteServiceMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=service.OnSiteServiceMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=service.OnSiteServiceMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=service.OnSiteServiceMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
        	'panel[itemId=service.OnSiteServiceMngPanel] button[itemId=searchBtn]': {
            	click: this.doSearch 
            },
			'panel[itemId=service.OnSiteServiceMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=service.OnSiteServiceEdit] button[itemId=saveBtn]':{
				click: this.doSave
			}
		});
	},
	// grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'deleteBtn'==button.itemId ){
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
	//跳转修改页面
	doEdit:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.service.OnSiteServiceEdit',{title:'<i class="' + button.iconCls + '"></i> 服务确认'});
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
			params.CORP_ID_eq=window.GL.corpId;
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
		//data.CORP_ID=window.GL.corpId;
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'service/onsiteservice/save';
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
				ids = record.data.SERVICE_ID;
			}else{
				ids = ids + "," + record.data.SERVICE_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'service/onsiteservice/delete';
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
