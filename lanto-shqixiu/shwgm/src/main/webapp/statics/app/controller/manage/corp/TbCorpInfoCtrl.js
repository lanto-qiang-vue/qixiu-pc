Ext.define('app.controller.manage.corp.TbCorpInfoCtrl',{
	extend:'Ext.app.Controller',
//	stores : ['app.store.CorpQualification'],
	views: [
		'manage.corp.TbCorpInfoMngPanel',
		'manage.corp.TbCorpInfoEdit'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.corp.TbCorpInfoMngPanel]'
	},{
		ref : 'quatoMngPanel',
		selector : 'panel[itemId=manage.corp.TbCorpQuatoMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.corp.TbCorpInfoMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.corp.TbCorpInfoMngPanel] panel[itemId=gpanel]'
	},{
		ref : 'quatoGrid',
		selector : 'panel[itemId=manage.corp.TbCorpQuatoMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.corp.TbCorpInfoMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.corp.TbCorpInfoEdit]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.corp.TbCorpInfoMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=manage.corp.TbCorpInfoMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=manage.corp.TbCorpQuatoMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.quatoGridBtnsHandler
			},
			'panel[itemId=manage.corp.TbCorpInfoMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'panel[itemId=manage.corp.TbCorpInfoMngPanel] button[itemId=printBtn] menuitem':{
				click: this.doItemClick
			},
			'window[itemId=manage.corp.TbCorpInfoEdit] button[itemId=saveBtn]': {
				click: this.doSave
			},
			'window[itemId=manage.corp.TbRepairQuatoEdit] button[itemId=saveBtn]': {
				click: this.quatoSave
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
			var corpQualivar = params.CORP_QUALIS;
			var qual = [];
			if(!Ext.isEmpty(corpQualivar)){
				for(var i=0;i<corpQualivar.length;i++){
					qual.push(corpQualivar[i]);
				}
			}
			params.CORP_QUALI = qual.join(',');
			store.proxy.extraParams=params;
		});
		st.loadPage(1);//预加载
	},
	//grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'viewBtn'==button.itemId ){
			me.doView(button);
		}else if( 'editBtn' == button.itemId){
			me.doEdit(button);
		}else if( 'addBtn' == button.itemId){
			me.doAdd(button);			
		}else if( 'zzsdBtn' == button.itemId){
			me.doZzsd(button);			
		}else if( 'quatoBtn' == button.itemId){
			me.quatoManage(button);			
		}else if( 'exportBtn' == button.itemId){
			me.doExport(button);
		}
	},
	//跳转新增页面
	doView:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.corp.TbCorpInfoEdit',{isView:true,title:'维修企业资料查看'});
		win.show();
		win.loadViewData(mds);
	},
	//修改
	doEdit:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.corp.TbCorpInfoEdit');
		win.show();
		win.loadData(mds);
	},
	doZzsd:function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win = Ext.create('Ext.window.Window',{
			title:'资质设定',
			autoShow : true,
			closable : true,
			layout : 'fit',
			width : 500,
			height:250,
			modal : true,
			items:[{
				xtype:'form',
				bodyPadding:30,
				items:[{xtype:'hidden',name:'CORP_ID'},{
			        xtype: 'checkboxgroup',
			        name:'box_group',
			        colspan:2,
			        defaults: {readOnly:me.isView},
			        columns: 2,
			        items: [
			            { boxLabel: '二级维护', name: 'IS_SEC_MAINTAIN', inputValue: '10041001'},
			            { boxLabel: '危运车辆维修', name: 'IS_WYCL', inputValue: '10041001'},
			            { boxLabel: '新能源汽车维修', name: 'IS_XNY', inputValue: '10041001'},
			            { boxLabel: '汽车救援服务', name: 'IS_QCJY', inputValue: '10041001'}			            
			        ]
			    }],
			    buttons:[{
			    	xtype:'button',
			    	iconCls:'accept_button',
			    	text:'确 定',
			    	handler:function(btn){
			    		me.doSave(btn);
			    	}
			    },{
			    	xtype:'button',
			    	iconCls:'icon-remove red',
			    	text:'取 消',
			    	handler:function(){
			    		win.close();
			    	}
			    }]
			}],
			isValid:function(){
				return true;
			}
		});
		win.show();
		win.down('form').loadRecord(mds);
	},
	//配额管理按钮
	quatoManage:function(btn){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.corp.TbCorpQuatoMngPanel');
		win.show();
		win.loadData(mds);
		win.loadQuato();
	},
	//新增
	doAdd:function(button){ 
		var win =	Ext.create('app.view.manage.corp.TbCorpInfoEdit');
		win.show();
		win.loadAddData();
	},
	doSave : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/corp/corpinfo/save';
				app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,win, '保存中...',function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
						win.close();
						Ext.Msg.alert('系统提示','保存成功！');
					}
				});
			}
		});
	},
	doExport : function(button){
		var form =  this.getSearchPanel().getForm();
		if(!form.isValid()){return;}
		var params = form.getValues(false,true);
		var corpQualivar = params.CORP_QUALIS;
		var qual = [];
		if(!Ext.isEmpty(corpQualivar)){
			for(var i=0;i<corpQualivar.length;i++){
				qual.push(corpQualivar[i]);
			}
		}
		params.CORP_QUALI = qual.join(',');
		var url = "manage/corp/corpinfo/doExport";
		app.utils.CommonUtil.exportStandardSubmit(form,url,params);
	},
	/**********************************************************************************
	 * 配额管理页面控制
	 **********************************************************************************/
	//配额保存按钮
	quatoSave : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		data.TYPE='10421001';
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/corp/corpquato/save';
				app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,win, '保存中...',function(ret){
					if( ret.success ){
						me.getQuatoGrid().getStore().reload();
						me.getQuatoMngPanel().loadQuato();
						win.close();
						Ext.Msg.alert('系统提示','保存成功！');
					}
				});
			}
		});
	},
	//grid工具条中button事件.
	quatoGridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'addBtn'==button.itemId ){
			me.addQuato(button);
		}
	},
	//添加配额
	addQuato : function(btn){
		var corpId=btn.up('window').down('form').getValues().CORP_ID;
		var win =	Ext.create('app.view.manage.corp.TbRepairQuatoEdit');
		win.show();
		win.loadAddData(corpId);
	}
});
