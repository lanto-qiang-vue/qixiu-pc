Ext.define('app.controller.trans.notice.TbNoticeReceiveCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'trans.notice.TbNoticeReceiveMngPanel',
		'trans.notice.TbNoticeReceiveEdit'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=trans.notice.TbNoticeReceiveMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=trans.notice.TbNoticeReceiveMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=trans.notice.TbNoticeReceiveMngPanel] panel[itemId=gpanel]'
	},{
		ref : 'receiveWin',
		selector : 'window[itemId=trans.notice.TbNoticeReceiveEdit]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=trans.notice.TbNoticeReceiveMngPanel]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=trans.notice.TbNoticeReceiveEdit]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=trans.notice.TbNoticeReceiveMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=trans.notice.TbNoticeReceiveMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=trans.notice.TbNoticeReceiveMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'window[itemId=trans.notice.TbNoticeResult] button[itemId=saveBtn]':{
				click: this.doResult
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
		}else if( 'viewBtn' == button.itemId){
			me.doEdit(button);
		}else if( 'deleteBtn' == button.itemId){
			me.doDelete(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
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
		var win =	Ext.create('app.view.trans.notice.TbNoticeReceiveEdit',{title : mds.data.NOTICE_TITLE});
		win.show();
		win.loadData(mds);
	},
	doResult : function(btn){
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
		Ext.MessageBox.confirm('系统提示','确认回执吗？',function(flag){
			if(flag=='yes'){
				var url = 'trans/notice/tbnoticereceive/saveResult';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						me.getReceiveWin().down('button[itemId=resultBtn]').setDisabled(true);
						if(!Ext.isEmpty(me.getGridPanel())){
							me.getGridPanel().getStore().reload();
						}
						win.close();
						Ext.Msg.alert('系统提示','回执成功！');
					}
				});
			}
		});
	}
});
