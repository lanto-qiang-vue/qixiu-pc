Ext.define('app.controller.manage.publicservice.CommentManageCtrl',{
	extend:'Ext.app.Controller',
	config:{corpId:null},		//企业ID
	views: [
		'manage.publicservice.CommentManageMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.publicservice.CommentManageMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.publicservice.CommentManageMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.publicservice.CommentManageMngPanel] panel[itemId=gpanel]'
	},{
		ref : 'viewPanel',
		selector : 'panel[itemId=manage.publicservice.CommentManageView] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.publicservice.CommentManageMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.publicservice.CommentManageMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=manage.publicservice.CommentManageMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=manage.publicservice.CommentManageMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'panel[itemId=manage.publicservice.CommentManageView] button[itemId=viewBtn]':{
				click: this.doCommentView
			},
			'panel[itemId=manage.publicservice.CommentManageView] button[itemId=repairBtn]':{
				click: this.doRepair
			},
			'panel[itemId=manage.publicservice.CommentManageView] button[itemId=deleteBtn]':{
				click: this.doDelete
			},
			'panel[itemId=manage.publicservice.CommentManageView] grid[itemId=gpanel]':{
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
	//查看评价详情的表格初始化时查询该企业的记录，将CORP_ID传入list参数
	initGrid : function(grid, opts){
		var me = this;
		var st = grid.getStore();
		st.on('beforeload', function (store, options) {
			var params = {CORP_ID_eq:me.config.corpId};
			store.proxy.extraParams=params;
		});
		st.loadPage(1);
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
		if( 'viewBtn'==button.itemId ){
			me.doView(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转查看评价信息页面
	doView:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		me.config.corpId=mds.get('CORP_ID');	//保存所选记录的CORP_ID
		var win =	Ext.create('app.view.manage.publicservice.CommentManageView',{title:'<i class="' + button.iconCls + '"></i> 查看评价信息'});
		win.show();
		//win.loadData(mds);
	},
	//查看页面查看按钮
	doCommentView:function(button){ 
		var me = this;
		var grid = me.getViewPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.publicservice.CommentView',{title:'<i class="' + button.iconCls + '"></i> 查看评价详情'});
		win.show();
		win.loadData(mds);
	},
	//查看页面删除按钮
	doDelete : function(button){
		var me = this;
		//var grid = button.up('window').down('grid');
		var grid=me.getViewPanel();
		var ret = app.utils.FunUtils.mutChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var ids = [];
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			ids.push(record.get("COMMENT_ID"));
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/publicservice/comment/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids.join(',')},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
	},
	//查看页面维修信息按钮
	doRepair : function(btn){
		var me = this;
		var grid = me.getViewPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		mds.data.RECORD_ID=ret.result.data.REPAIR_ID;
		var win =	Ext.create('app.view.manage.privehicle.RepairRecordsView',{title:'<i class="' + btn.iconCls + '"></i> 维修记录查看'});
		win.show();
		win.loadData(mds);
	}
});
