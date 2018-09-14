Ext.define('app.controller.credit.TbExamFileInfoCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'credit.TbExamFileInfoMngPanel',
		'credit.TbExamFileInfoEdit'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=credit.TbExamFileInfoMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=credit.TbExamFileInfoMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=credit.TbExamFileInfoMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=credit.TbExamFileInfoMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=credit.TbExamFileInfoEdit]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=credit.TbExamFileInfoMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=credit.TbExamFileInfoMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=credit.TbExamFileInfoMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'window[itemId=credit.TbExamFileInfoEdit] button[itemId=saveBtn]': {
				click: this.doSave
			},
			'window[itemId=credit.TbExamFileInfoZiPing] button[itemId=saveBtn]': {
				click: this.doSaveZiPing
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
		if( 'addDocBtn'==button.itemId ){
			me.doAdd(button);
		}else if( 'viewBtn' == button.itemId){
			me.doView(button);
		}else if( 'editBtn' == button.itemId){
			me.doEdit(button);
		}else if( 'zpBtn' == button.itemId){
			me.doZP(button);
		}else if( 'attachUpBtn' == button.itemId){
			me.doAttach(button);
		}else if( 'printBtn' == button.itemId){
			me.doPrint(button);
		}else if( 'submitBtn' == button.itemId){
			me.doSubmit(button);
		}else if( 'deleteBtn' == button.itemId){
			me.doDelete(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转新增页面
	doAdd:function(button){
		var win =	Ext.create('app.view.credit.TbExamFileInfoEdit');
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
		if(mds.data.IS_UPLOAD == '10041001'){
			Ext.Msg.alert('系统提示','该考核档案已经提交,不能修改！');
			return false;
		}
		var win =	Ext.create('app.view.credit.TbExamFileInfoEdit');
		win.show();
		win.loadData(mds);
	},
	//跳转查看页面
	doView:function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.credit.TbExamFileInfoEdit');
		win.show();
		win.loadData(mds);
		win.down('#saveBtn').hide();
	},
	//跳转修改页面
	doZP:function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.credit.TbExamFileInfoZiPing');
		win.show();
		win.loadData(mds);
	},
	doAttach:function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.credit.TbExamFileInfoAttach',{fileBillId:mds.data.FILE_ID});
		win.show();
		win.down('#fileUploadGrid').reload();
	},
	doPrint:function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var page = window.open("client/credit/tbexamfileinfo/report?FILE_ID=" + mds.data.FILE_ID + "&EXAM_TYPE=" + mds.data.EXAM_TYPE ,"_blank");
		page.document.title = "上海市机动车维修企业质量信誉考核申请表";
	},
	doSubmit:function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		if(mds.data.IS_UPLOAD == '10041001'){
			Ext.Msg.alert('系统提示','该考核档案已经提交！');
			return false;
		}
		Ext.MessageBox.confirm('系统提示','确认提交吗？',function(flag){
			if(flag=='yes'){
				var url = 'client/credit/tbexamfileinfo/submit';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{FILE_ID:mds.data.FILE_ID},function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
						Ext.Msg.alert('系统提示','提交成功！');
					}
				});
			}
		});
	},
	doSave : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		var grid = win.down('grid');
		var array = [];
		var records = grid.getStore().data.items;
		for(var i =0 ; i<records.length;i++){
			var record = records[i];
			array.push(record.data);
		}
		var params = {
			data : Ext.JSON.encode(data),
			list : Ext.JSON.encode(array)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'client/credit/tbexamfileinfo/save';
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
	doSaveZiPing : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var params = form.getFieldValues();
		var grids = win.down('tabpanel').items.items;
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
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'client/credit/tbexamfileinfo/saveZiPing';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
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
			if(record.data.IS_UPLOAD == '10041001'){
				Ext.Msg.alert('系统提示','该考核档案已经提交,不能删除！');
				return false;
			}
			if(i == 0){
				ids = record.data.FILE_ID;
			}else{
				ids = ids + "," + record.data.FILE_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'client/credit/tbexamfileinfo/delete';
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
