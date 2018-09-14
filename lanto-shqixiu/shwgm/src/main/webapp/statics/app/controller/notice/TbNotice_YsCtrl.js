Ext.define('app.controller.notice.TbNotice_YsCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'notice.TbNoticeMng_YsPanel',
		'notice.TbNotice_YsEdit'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=notice.TbNotice_YsMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=notice.TbNotice_YsMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=notice.TbNotice_YsMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=notice.TbNoticeMng_YsPanel]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=notice.TbNotice_YsEdit]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=notice.TbNotice_YsMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=notice.TbNotice_YsMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=notice.TbNotice_YsMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'window[itemId=notice.TbNotice_YsEdit] button[itemId=saveBtn]': {
				click: this.doSave
			},
			'window[itemId=notice.TbNotice_YsEdit] button[itemId=sendBtn]': {
				click: this.doSend
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
		}else if( 'sendBtn' == button.itemId){
			me.doEdit(button);
		}else if( 'viewResultBtn' == button.itemId){
			me.doView(button);
		}else if( 'deleteBtn' == button.itemId){
			me.doDelete(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转新增页面
	doAdd:function(button){ 
		var win =	Ext.create('app.view.notice.TbNotice_YsEdit');
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
		var win =	Ext.create('app.view.notice.TbNotice_YsEdit');
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
		var win =	Ext.create('app.view.notice.TbNoticeResultList',{title:mds.data.NOTICE_TITLE});
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
		console.log(data);
		if (data.NOTICE_TITLE.length>200) {
			Ext.Msg.alert('系统提示','标题最多只能输入200个字符，请重新输入！');
			return false;
		}
		
		var content = win.down('htmleditor').getValue();
		var params = {
			data : Ext.JSON.encode(data),
			content :　content,
			sendto:'1'
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/notice/tbnotice/save';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						form.findField('NOTICE_ID').setValue(ret.data.noticeId);
						me.getGridPanel().getStore().reload();
						Ext.Msg.alert('系统提示','保存成功！');
					}
				});
			}
		});
	},
	doSend : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		if(Ext.isEmpty(data.NOTICE_ID)){
			Ext.Msg.alert('系统提示','请先暂存！');
			return false;
		}
		var content = win.down('htmleditor').getValue();
		var params = {
			data : Ext.JSON.encode(data),
			content :　content
		};
		Ext.MessageBox.confirm('系统提示','确认发送吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/notice/tbnotice/send';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
						win.close();
						Ext.Msg.alert('系统提示','发送成功！');
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
				ids = record.data.NOTICE_ID;
			}else{
				ids = ids + "," + record.data.NOTICE_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/notice/tbnotice/delete';
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
