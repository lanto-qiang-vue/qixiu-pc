Ext.define('app.controller.corp.CorpJoinCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'corp.CorpJoinMngPanel'
		],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=corp.CorpJoinMngPanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=corp.CorpJoinMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=corp.CorpJoinMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=corp.CorpJoinMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=corp.CorpJoinMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'window[itemId=corp.CorpJoinEdit] button[itemId=saveBtn]': {
				click: this.doSave
			},
			'window[itemId=corp.CorpJoinEdit] button[itemId=submitBtn]': {
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
		st.loadPage(1);//预加载
	},
	//grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'applyBtn'==button.itemId ){
			me.doAdd(button);
		}else if( 'submitBtn' == button.itemId){
			me.doEdit(button);
		}else if( 'viewBtn' == button.itemId){
			me.doView(button);
		}else if( 'deleteBtn' == button.itemId){
			me.doDelete(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转新增页面
	doAdd:function(button){ 
		var win =	Ext.create('app.view.corp.CorpJoinEdit');
		win.show();
		win.loadAddData();
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
		if(mds.get('STATUS') != '10321001'){
			Ext.Msg.alert('系统提示', '只有暂存状态下才能修改!');
			return false;
		}
		var win =	Ext.create('app.view.corp.CorpJoinEdit');
		win.show();
		win.loadData(mds);
	},
	doView:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.corp.CorpJoinView');
		win.show();
		win.loadData(mds);
	},
	doSave : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form');
		var data = form.getValues();
		var tip = '暂存';
		data.STATUS = '10321001';
		if(btn.code == 'submit'){
			data.STATUS = '10321002';
			tip = '提交';
		}
		var store = win.down('dataview').getStore();
		var images = store.data.items;
		var photos = [];
		Ext.each(images,function(image){
			photos.push(image.data);
		});
		console.log(photos);
		var params = {
			data : Ext.JSON.encode(data),
			photos : Ext.JSON.encode(photos)
		};
		Ext.MessageBox.confirm('系统提示','确认' + tip + '吗？',function(flag){
			if(flag=='yes'){
				var url = 'client/corp/corpjoin/save';
				app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,win, tip + '中...',function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
						win.close();
						Ext.Msg.alert('系统提示',tip + '成功');
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
			if(record.get('STATUS') != '10321001'){
				Ext.Msg.alert('系统提示', '只能删除暂存状态的数据!');
				return false;
			}
			if(i == 0){
				ids = record.data.JOIN_ID;
			}else{
				ids = ids + "," + record.data.JOIN_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'client/corp/corpjoin/delete';
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
