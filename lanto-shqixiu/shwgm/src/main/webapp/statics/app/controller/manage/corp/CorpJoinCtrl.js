Ext.define('app.controller.manage.corp.CorpJoinCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.corp.CorpJoinMngPanel'
		],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.corp.CorpJoinMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.corp.CorpJoinMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.corp.CorpJoinMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.corp.CorpJoinMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.corp.CorpJoinMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=manage.corp.CorpJoinMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=manage.corp.CorpJoinMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'window[itemId=manage.corp.CorpJoinEdit] button[itemId=saveBtn]': {
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
			store.proxy.extraParams=fm.getValues();
		});
		grid.on('select',function(gd, record, index, eOpts ){
			me.getMngPanel().down("#map_position").update('<iframe height="100%" width="100%" src="manage/corp/corpjoin/position?isview=yes&joinId=' + record.get('JOIN_ID') + '" scrolling="yes" frameborder="0" id="corpjoinbmapFrame" name="bmapFrame"></iframe>');
		});
		st.loadPage(1);//预加载
	},
	//grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'checkBtn'==button.itemId ){
			me.toCheck(button);
		}else if( 'editBtn' == button.itemId){
			me.doEdit(button);
		}else if( 'viewBtn' == button.itemId){
			me.doView(button);
		}else if( 'backBtn' == button.itemId){
			me.toBack(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转新增页面
	toCheck:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		if(mds.get('STATUS') != '10321002'){
			Ext.Msg.alert('系统提示','待审核状态下才能审核！');
			return false;
		}
		var win = Ext.create('Ext.window.Window',{
			title:'入网审核【' + mds.get('CORP_NAME') + '】',
			layout:'fit',
			height:230,
			modal : true,
			width:400,
			items:[{
				xtype:'form',
				padding:'5 10 10 10',
				border:false,
				items:[{
					xtype     : 'textareafield',
			        grow      : true,
			        labelWidth:60,
			        allowBlank:false,
			        labelAlign:'top',
			        height:120,
			        name      : 'CHECK_OPINION',
			        fieldLabel: '审核意见',
			        anchor    : '100%'
				}],
				buttons:[{
					xtype:'button',
					text:'通过',
					iconCls:'accept_button',
					handler:function(){
						me.doCheck('10321003',win,mds);
					}
				},{
					xtype:'button',
					text:'不通过',
					iconCls:'icon-remove red',
					handler:function(){
						me.doCheck('10321004',win,mds);
					}
				}]
			}]
		});
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
		var win =	Ext.create('app.view.manage.corp.CorpJoinEdit');
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
		var win =	Ext.create('app.view.manage.corp.CorpJoinView');
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
		var store = win.down('dataview').getStore();
		var images = store.data.items;
		var photos = [];
		Ext.each(images,function(image){
			photos.push(image.data);
		});
		var params = {
			data : Ext.JSON.encode(data),
			photos : Ext.JSON.encode(photos)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/corp/corpjoin/save';
				app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,win, '保存中...',function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
						win.close();
						Ext.Msg.alert('系统提示','保存成功');
					}
				});
			}
		});
	},
	doCheck:function(status,win,record){
		var me = this;
		var form = win.down('form');
		if(!form.isValid()){
			return false;
		}
		var data = form.getValues();
		data.STATUS = status;
		data.JOIN_ID = record.get('JOIN_ID');
		var params = {
			data : Ext.JSON.encode(data)
		};
		var url = 'manage/corp/corpjoin/check';
		app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,win, '审核中...',function(ret){
			if( ret.success ){
				me.getGridPanel().getStore().reload();
				win.close();
				Ext.Msg.alert('系统提示','审核完成!');
			}
		});
	},
	//跳转新增页面
	toBack:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		if(mds.get('STATUS') != '10321003'){
			Ext.Msg.alert('系统提示','审核通过状态下才能退网！');
			return false;
		}
		var win = Ext.create('Ext.window.Window',{
			title:'退网【' + mds.get('CORP_NAME') + '】',
			layout:'fit',
			height:230,
			modal : true,
			width:400,
			items:[{
				xtype:'form',
				padding:'5 10 10 10',
				border:false,
				items:[{
					xtype     : 'textareafield',
			        grow      : true,
			        labelWidth:60,
			        allowBlank:false,
			        labelAlign:'top',
			        height:120,
			        name      : 'BACK_OPINION',
			        fieldLabel: '退网原因',
			        anchor    : '100%'
				}],
				buttons:[{
					xtype:'button',
					text:'确定退网',
					iconCls:'accept_button',
					handler:function(){
						me.doBack(win,mds);
					}
				},{
					xtype:'button',
					text:'关 闭',
					iconCls:'close_button',
					handler:function(){
						win.close();
					}
				}]
			}]
		});
		win.show();
	},
	doBack:function(win,record){
		var me = this;
		var form = win.down('form');
		if(!form.isValid()){
			return false;
		}
		var data = form.getValues();
		data.JOIN_ID = record.get('JOIN_ID');
		var params = {
			data : Ext.JSON.encode(data)
		};
		var url = 'manage/corp/corpjoin/back';
		Ext.MessageBox.confirm('系统提示','确认要退网吗？',function(flag){
			if(flag=='yes'){
				app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,win, '退网中...',function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
						win.close();
						Ext.Msg.alert('系统提示','退网完成!');
					}
				});
			}
		});
	}
});
