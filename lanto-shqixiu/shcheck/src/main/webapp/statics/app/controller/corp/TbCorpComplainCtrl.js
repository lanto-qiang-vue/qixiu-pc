Ext.define('app.controller.corp.TbCorpComplainCtrl',{
	extend:'Ext.app.Controller',
	views: [],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=corp.TbCorpComplainMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=corp.TbCorpComplainMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=corp.TbCorpComplainMngPanel] panel[itemId=gpanel]'
	},{
		ref : 'activeGrid',
		selector : 'window[itemId=common.ToDoWin] grid[itemId=activegrid]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=corp.TbCorpComplainMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=corp.TbCorpComplainEdit]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=corp.TbCorpComplainMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=corp.TbCorpComplainMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=corp.TbCorpComplainMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'window[itemId=corp.TbCorpComplainEdit] button[itemId=saveBtn]': {
				click: this.doProcess
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
		if( 'makeBtn'==button.itemId ){
			me.toMake(button);
		}else if( 'viewBtn' == button.itemId){
			me.doView(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	doView:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.corp.TbCorpComplainEdit',{title:'投诉单查看'});
		win.show();
		win.loadViewData(mds.data);
	},
	toMake:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		if(mds.data.IS_CORP_DEAL == '10041001'){
			Ext.Msg.alert('系统提示','投诉单已处理！');
			return false;
		}
		var win =	Ext.create('app.view.corp.TbCorpComplainEdit',{title:'投诉单处理'});
		win.show();
		win.loadProcessData(mds.data);
	},
	doProcess : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return;
		}
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		data.IS_CORP_DEAL = '10041001';
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认提交吗？',function(flag){
			if(flag=='yes'){
				var url = 'client/corp/tbcorpcomplain/process';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){					
						var mngGrid = me.getGridPanel();
						var toGrid = me.getActiveGrid();
						if(!Ext.isEmpty(mngGrid)){
							mngGrid.getStore().reload();
						}
						if(!Ext.isEmpty(toGrid)){
							toGrid.getStore().reload();
						}
						win.close();
						Ext.Msg.alert('系统提示','提交成功！');
					}
				});
			}
		});
	}
});
