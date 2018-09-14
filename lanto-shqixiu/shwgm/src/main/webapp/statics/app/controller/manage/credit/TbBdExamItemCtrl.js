Ext.define('app.controller.manage.credit.TbBdExamItemCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.credit.TbBdExamItemMngPanel',
		'manage.credit.TbBdExamItemEdit'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.credit.TbBdExamItemMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.credit.TbBdExamItemMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.credit.TbBdExamItemMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.credit.TbBdExamItemMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.credit.TbBdExamItemMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=manage.credit.TbBdExamItemMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=manage.credit.TbBdExamItemMngPanel] treepanel':{
				select: this.treeSelectHandler
			},
			'panel[itemId=manage.credit.TbBdExamItemMngPanel] treepanel toolbar[dock=top] button':{
				click: this.treeBtnsHandler
			},
			'panel[itemId=manage.credit.TbBdExamItemMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'window[itemId=manage.credit.TbBdExamItemEdit] button[itemId=saveBtn]': {
				click: this.doSave
			},
			'window[itemId=manage.credit.TbBdExamTypeEdit] button[itemId=saveBtn]': {
				click: this.doSaveType
			}
		});
	},
	//查询panel中点击查询
	doSearch: function(button){
		if( this.getSearchPanel().getForm().isValid() ){
			this.reloadTree();
//			this.getGridPanel().getStore().loadPage(1);
		}
	},
	reloadTree : function(){
		var me = this;
		var form = me.getSearchPanel().getForm();
		var tree = me.getMngPanel().down('treepanel');
		tree.setLoading("读取中...");
		app.utils.AjaxCallbackUtil.ajaxCallbackAll("manage/credit/tbbdexamitem/getTree",form.getValues(),function(ret){
			if( ret.success ){
				tree.setLoading(false);
//				ret.data.icon = 'images/read.png';
				tree.setRootNode(ret.data);
				tree.expandNode(tree.getRootNode());
				tree.getSelectionModel().select(0);
			}
		});
	},
	treeSelect : function(){
		var me = this;
		var tree = me.getMngPanel().down('treepanel');
		var mds = tree.getSelectionModel().getSelection();
		var record;
		if(!Ext.isEmpty(mds)) {
            record = mds[0];
        } else {
            Ext.MessageBox.alert('警告', '请选择大类');
            return false;
        }
        return record;
	},
	treeSelectHandler: function(cob, record, index, e, eOpts){
		var me = this;
		var store = me.getGridPanel().getStore();
		store.loadPage(1);
	},
	//组件初始化时store上挂接查询form.
	initGridSearchCondition : function(grid, opts){
		var me = this;
		var st = grid.getStore();
		st.on('beforeload', function (store, options) {
			var fm = me.getSearchPanel().getForm();
			var tree = me.getMngPanel().down('treepanel');
			var mds = tree.getSelectionModel().getSelection();
			var params = fm.getValues();
			if(!Ext.isEmpty(mds)){
				params.TYPE_ID = mds[0].raw.typeId;
			}
			store.proxy.extraParams = params;
		});
		//st.loadPage(1);//预加载
	},
	//grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'addBtn'==button.itemId ){
			me.doAdd(button);
		}else if( 'editBtn' == button.itemId){
			me.doEdit(button);
		}else if( 'deleteBtn' == button.itemId){
			me.doDelete(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	treeBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'addTypeBtn'==button.itemId ){
			me.doAddType(button);
		}else if( 'editTypeBtn' == button.itemId){
			me.doEditType(button);
		}else if( 'deleteTypeBtn' == button.itemId){
			me.doDeleteType(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转新增页面
	doAdd:function(button){ 
		var me =this;
		var record = me.treeSelect();
		if(record == false){
			return false;
		}
		if(Ext.isEmpty(record.raw.typeId)){
			Ext.Msg.alert('系统提示','请选择大类！');
			return false;
		}
		var win =	Ext.create('app.view.manage.credit.TbBdExamItemEdit');
		win.show();
		win.loadAddData(record.raw.typeId,record.raw.typeName);
	},
	doAddType:function(button){
		var form = this.getSearchPanel().getForm();
		var win =	Ext.create('app.view.manage.credit.TbBdExamTypeEdit');
		win.show();
		win.loadAddData(form.getValues());
	},
	doEditType:function(button){ 
		var me = this;
		var record = me.treeSelect();
		if(record == false){
			return false;
		}
		var data = {
			TYPE_ID : record.raw.typeId,
			TYPE_NAME : record.raw.typeName,
			TYPE_SCORE : record.raw.typeScore,
			EXAM_TYPE : record.raw.examType,
			VERSION_NO : record.raw.versionNo,
			ORDER_ID : record.raw.orderId
		};
		if(Ext.isEmpty(data.TYPE_ID)){
			Ext.Msg.alert('系统提示','请选择大类！');
			return false;
		}
		var win =	Ext.create('app.view.manage.credit.TbBdExamTypeEdit');
		win.show();
		win.loadAddData(data);
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
		var win =	Ext.create('app.view.manage.credit.TbBdExamItemEdit');
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
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/credit/tbbdexamitem/save';
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
	doSaveType : function(btn){
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
				var url = 'manage/credit/tbbdexamitem/saveType';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						me.reloadTree();
						win.close();
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
			if(i == 0){
				ids = record.data.ITEM_ID;
			}else{
				ids = ids + "," + record.data.ITEM_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/credit/tbbdexamitem/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
	},
	doDeleteType : function(button){
		var me = this;
		var record = me.treeSelect();
		if(record == false){
			return false;
		}
		var data = {
			typeId : record.raw.typeId
		};
		if(Ext.isEmpty(data.typeId)){
			Ext.Msg.alert('系统提示','请选择大类！');
			return false;
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/credit/tbbdexamitem/deleteType';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,data,function(ret){
					if( ret.success ){
						me.reloadTree();
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
	}
});
