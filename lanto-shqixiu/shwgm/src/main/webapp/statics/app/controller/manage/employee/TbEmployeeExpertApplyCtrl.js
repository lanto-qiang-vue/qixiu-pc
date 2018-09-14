Ext.define('app.controller.manage.employee.TbEmployeeExpertApplyCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.employee.TbEmployeeExpertApplyMngPanel',
		'manage.employee.TbEmployeeExpertApplyEdit'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.employee.TbEmployeeExpertApplyMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.employee.TbEmployeeExpertApplyMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.employee.TbEmployeeExpertApplyMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.employee.TbEmployeeExpertApplyMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.employee.TbEmployeeExpertApplyEdit]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.employee.TbEmployeeExpertApplyMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=manage.employee.TbEmployeeExpertApplyMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=manage.employee.TbEmployeeExpertApplyMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			}
//			'window[itemId=manage.employee.TbEmployeeExpertApplyEdit] button[itemId=saveBtn]': {
//				click: this.doSave
//			},
//			'window[itemId=manage.employee.TbEmployeeExpertApplyEdit] button[itemId=submitBtn]': {
//				click: this.doSave
//			}
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
		st.loadPage(1);//预加载
	},
	//grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'checkBtn'==button.itemId ){
			me.toCheck(button);
		}else if( 'submitBtn' == button.itemId){
			me.doEdit(button);
		}else if( 'deleteBtn' == button.itemId){
			me.doDelete(button);
		}else if( 'viewBtn' == button.itemId){
			me.doView(button);
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
			title:'专家申请审核【' + mds.get('NAME') + '】',
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
		var win =	Ext.create('app.view.manage.employee.TbEmployeeExpertApplyEdit');
		win.show();
		win.loadData(mds);
	},
	//跳转修改页面
	doView:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.employee.TbEmployeeExpertApplyEdit');
		win.show();
		win.loadViewData(mds);
	},
	doSave : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		data.STATUS = btn.code;
		var grid = win.down('grid');
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认' + btn.text + '吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/employee/tbemployeeexpertapply/save';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
						win.close();
						Ext.Msg.alert('系统提示',btn.text + '成功！');
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
		data.APPLY_ID = record.get('APPLY_ID');
		var params = {
			data : Ext.JSON.encode(data)
		};
		var url = 'manage/employee/tbemployeeexpertapply/check';
		app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,win, '审核中...',function(ret){
			if( ret.success ){
				me.getGridPanel().getStore().reload();
				win.close();
				Ext.Msg.alert('系统提示','审核完成!');
			}
		});
	}
});
