Ext.define('app.controller.manage.publicservice.ComplaintCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.publicservice.ComplaintMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.publicservice.ComplaintMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.publicservice.ComplaintMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.publicservice.ComplaintMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.publicservice.ComplaintMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.publicservice.ComplaintMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=manage.publicservice.ComplaintMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=manage.publicservice.ComplaintMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'panel[itemId=manage.publicservice.ComplaintAccept] button[itemId=acceptBtn]':{
				click: this.doAcceptSave
			},
			'panel[itemId=manage.publicservice.ComplaintEnd] button[itemId=endBtn]':{
				click: this.doEndSave
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
			var params = fm.getValues();
			store.proxy.extraParams=params;
		});
		st.loadPage(1);//预加载
	},
	//grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'acceptBtn'==button.itemId ){
			me.doAccept(button);
		}else if( 'deleteBtn'==button.itemId ){
			me.doDelete(button);
		}else if( 'endBtn'==button.itemId ){
			me.doEnd(button);
		}else if( 'viewBtn'==button.itemId ){
			me.doView(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转受理页面
	doAccept:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		if(mds.get('STATUS')!='10341001'){
			Ext.Msg.alert('提醒','该记录不是未受理状态！');
			return false;
		}
		var win =	Ext.create('app.view.manage.publicservice.ComplaintAccept',{title:'<i class="' + button.iconCls + '"></i> 投诉受理'});
		win.show();
		win.loadData(mds);
	},
	doDelete : function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.mutChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var ids = [];
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			if(mds[i].get('STATUS')!='10341001'){
				Ext.Msg.alert('提醒','所选记录中包含非未受理状态的记录！');
				return false;
			}
			ids.push(record.get("COMPLAINT_ID"));
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/publicservice/complaint/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids.join(',')},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
	},
	//受理窗口受理按钮
	doAcceptSave : function(button){
		var me = this;
		var win  = button.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认受理吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/publicservice/complaint/accept';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
						win.close();
						Ext.Msg.alert('系统提示','受理成功！');
					}
				});
			}
		});
	},
	//跳转办结窗口
	doEnd : function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		if(mds.get('STATUS')!='10341002'){
			Ext.Msg.alert('提醒','该记录不是已受理状态！');
			return false;
		}
		var win =	Ext.create('app.view.manage.publicservice.ComplaintEnd',{title:'<i class="' + button.iconCls + '"></i> 投诉办结'});
		win.show();
		win.loadData(mds);
	},
	//办结窗口办结按钮
	doEndSave : function(button){
		var me = this;
		var win  = button.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认办结吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/publicservice/complaint/end';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
						win.close();
						Ext.Msg.alert('系统提示','办结成功！');
					}
				});
			}
		});
	},
	//跳转查看窗口
	doView : function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.publicservice.ComplaintView',{title:'<i class="' + button.iconCls + '"></i> 查看投诉信息'});
		win.show();
		win.loadData(mds);
	}
});
