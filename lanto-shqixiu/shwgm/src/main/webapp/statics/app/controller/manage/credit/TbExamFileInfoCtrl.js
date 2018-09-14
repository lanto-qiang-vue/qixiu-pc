Ext.define('app.controller.manage.credit.TbExamFileInfoCtrl',{
	extend:'Ext.app.Controller',
	stores : ['app.store.CorpQualification'],
	views: [
		'manage.credit.TbExamFileInfoMngPanel',
		'manage.credit.TbExamFileInfoEdit'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.credit.TbExamFileInfoMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.credit.TbExamFileInfoMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.credit.TbExamFileInfoMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.credit.TbExamFileInfoMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.credit.TbExamFileInfoEdit]': {
			//	afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.credit.TbExamFileInfoMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=manage.credit.TbExamFileInfoMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=manage.credit.TbExamFileInfoMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'window[itemId=manage.credit.TbExamFileInfoEdit] button[itemId=saveBtn]': {
				click: this.doSave
			},
			'window[itemId=manage.credit.TbExamFileInfoPF] button[itemId=saveBtn]': {
				click: this.doSavePF
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
			var params = fm.getValues(false,true);
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
		if( 'addBtn'==button.itemId ){
			me.doAdd(button);
		}else if( 'viewBtn' == button.itemId){
			me.doEdit(button);
		}else if( 'zjBtn' == button.itemId){
			me.doZJ(button);
		}else if( 'cpBtn' == button.itemId){
			me.doCP(button);
		}else if( 'fpBtn' == button.itemId){
			me.doFP(button);
		}else if( 'attachBtn' == button.itemId){
			me.doAttach(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转修改页面
	doEdit:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.mutChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.credit.TbExamFileInfoEdit');
		win.show();
		win.loadData(mds);
	},
	//跳转修改页面
	doZJ:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.credit.TbExamFileInfoPF',{title:'质量信誉考核专家评分'});
		win.show();
		win.loadData(mds,'zj');
	},
	doCP:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.credit.TbExamFileInfoPF',{title:'质量信誉考核初评'});
		win.show();
		win.loadData(mds,'first');
	},
	doFP:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.credit.TbExamFileInfoPF',{title:'质量信誉考核复评',corpId:mds.data.CORP_ID,examYear:mds.data.EXAM_YEAR});
		win.show();
		win.loadData(mds,'sec');
	},
	doAttach:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.credit.TbExamFileInfoAttach',{fileBillId:mds.data.FILE_ID});
		win.show();
		win.down('#fileUploadGrid').reload();
	},
	doSave : function(btn){
		var me = this;
		var win  = btn.up('window');
		var view = win.down('dataview');
		var array = [];
		var records = view.getStore().data.items;
		for(var i =0 ; i<records.length;i++){
			var record = records[i];
			array.push(record.data);
		}
		var params = {
			list : Ext.JSON.encode(array)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/credit/tbexamfileinfo/save';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
						win.close();
						Ext.Msg.alert('系统提示','保存成功！');
					}
				});
			}
		});
	},
	doSavePF : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var params = form.getFieldValues();
		var grids = win.down('tabpanel').items.items;
		params.type = win.PF_TYPE;
		var array = [];
		for(var i =0 ; i<grids.length;i++){
			var grid = grids[i];
			var store = grid.getStore();
			var records = store.getModifiedRecords();
			if(!Ext.isEmpty(records)){
				for(var j=0;j<records.length;j++){
					var record = records[j];
					array.push(record.data);
				}
			}
		}
		params.list = Ext.JSON.encode(array);
		params.corpId=win.corpId;
		params.examYear=win.examYear;
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/credit/tbexamfileinfo/savePF';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
						for(var i =0 ; i<grids.length;i++){
							var grid = grids[i];
							var store = grid.getStore();
							store.reload();
						}
						Ext.Msg.alert('系统提示','保存成功！');
					}
				});
			}
		});
	}
});
