Ext.define('app.controller.trans.sys.TbCorpQuatoCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'trans.sys.TbCorpQuatoMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=trans.sys.TbCorpQuatoMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=trans.sys.TbCorpQuatoMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=trans.sys.TbCorpQuatoMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=trans.sys.TbCorpQuatoMngPanel]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=trans.sys.TbCorpQuatoMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
        	'panel[itemId=trans.sys.TbCorpQuatoMngPanel] button[itemId=searchBtn]': {
            	click: this.doSearch 
            },
			'panel[itemId=trans.sys.TbCorpQuatoMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			}
		});
	},
	// grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'addBtn'==button.itemId ){
			me.doAdd(button);
		}else if( 'deleteBtn'==button.itemId ){
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
		var url = 'trans/sys/corpquato/getquato';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,null,function(ret){
			if( ret.success ){
				me.getSearchPanel().getForm().findField('CREATE_QUATO_COUNT').setValue(ret.data.createQuatoNum);
			}
		});
	}
});
