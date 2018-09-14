Ext.define('app.controller.manage.publicservice.QuestionsCtrl',{
	extend:'Ext.app.Controller',
	config:{QUES_ID:null,SUBJECT_ID:null},	//问卷调查ID
	views: [
		'manage.publicservice.QuestionsMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.publicservice.QuestionsMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.publicservice.QuestionsMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.publicservice.QuestionsMngPanel] panel[itemId=gpanel]'
	},{
		ref : 'subPanel',
		selector : 'panel[itemId=manage.publicservice.QuestionsEditSub] panel[itemId=subgpanel]'
	},{
		ref : 'optionPanel',
		selector : 'panel[itemId=manage.publicservice.QuestionsEditSub] panel[itemId=optiongpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.publicservice.QuestionsMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.publicservice.QuestionsMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=manage.publicservice.QuestionsEditSub] grid[itemId=subgpanel]': {
				viewready : this.initSubGrid
			},
			'panel[itemId=manage.publicservice.QuestionsEditSub] grid[itemId=optiongpanel]': {
				viewready : this.initOptionGrid
			},
			'panel[itemId=manage.publicservice.QuestionsView] grid[itemId=subgpanel]': {
				viewready : this.initViewSubGrid
			},
			'panel[itemId=manage.publicservice.QuestionsMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=manage.publicservice.QuestionsMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'panel[itemId=manage.publicservice.QuestionsEdit] button[itemId=saveBtn]':{
				click: this.doSave
			},
			'panel[itemId=manage.publicservice.QuestionsPublish] button[itemId=saveBtn]':{
				click: this.doSave
			},
			'panel[itemId=manage.publicservice.QuestionsEditSub] button[itemId=addBtn]':{
				click: this.doSubAdd
			},
			'panel[itemId=manage.publicservice.QuestionsEditSub] button[itemId=deleteBtn]':{
				click: this.doSubDelete
			},
			'panel[itemId=manage.publicservice.QuestionsEditSub] button[itemId=addOptionBtn]':{
				click: this.doOptionAdd
			},
			'panel[itemId=manage.publicservice.QuestionsEditSub] button[itemId=deleteOptionBtn]':{
				click: this.doOptionDelete
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
			store.proxy.extraParams=params;
		});
		st.loadPage(1);
	},
	//去掉分页栏后需手动加载问题表格
	initSubGrid : function(grid, opts){
		var me = this;
		var params = {QUES_ID_eq:me.config.QUES_ID};
		var store=grid.getStore();
		store.proxy.extraParams=params;
		store.load();
		//表格编辑事件
		grid.on('edit',function(editor, e){
			var str=e.field;
            var record = e.record;
            var data = record.data;
            delete data.id;
            data.QUES_ID=me.config.QUES_ID;		//传入父记录的QUES_ID
            var params = {
				data : Ext.JSON.encode(data)
			};
			if(record.isModified(str)){
				var url='manage/publicservice/subquestions/save';
				app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,grid,'保存中...',function(ret){
    				if( ret.success ){
		        		Ext.Msg.alert('系统提示','保存成功！');
	          		}
    			});
            }
		});
		grid.on('cellclick',function(table,td,index,record){
			var data = record.data;
			delete data.id;
			var params = {SUBJECT_ID_eq:data.SUBJECT_ID};
			me.config.SUBJECT_ID=data.SUBJECT_ID;
			var optGrid = me.getOptionPanel();
			var store=optGrid.getStore();
			store.proxy.extraParams=params;
			store.load();
		});
	},
	//去掉分页栏后需手动加载选项表格
	initOptionGrid : function(grid, opts){
		var me = this;
		//表格编辑事件
		grid.on('edit',function(editor, e){
			var str=e.field;
            var record = e.record;
            var data = record.data;
            delete data.id;
            data.SUBJECT_ID=me.config.SUBJECT_ID;		//传入父记录的QUES_ID
            var params = {
				data : Ext.JSON.encode(data)
			};
			if(record.isModified(str)){
				var url='manage/publicservice/subquestionsitem/save';
				app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,grid,'保存中...',function(ret){
    				if( ret.success ){
		        		Ext.Msg.alert('系统提示','保存成功！');
	          		}
    			});
            }
		});
	},
	//手动加载查看窗口的问题表格
	initViewSubGrid : function(grid,opts){
		var me = this;
		var params = {QUES_ID_eq:me.config.QUES_ID};
		var store=grid.getStore();
		store.proxy.extraParams=params;
		store.load();
		grid.on('itemclick',function(table,record){
			var data = record.data;
			var params = {SUBJECT_ID_eq:data.SUBJECT_ID};
			var chart=table.up('window').down('chart');
			var info=table.up('window').down('#info');
			var url = 'manage/publicservice/subquestionsitem/list';
			app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
				if( ret.success ){
					info.hide();
					var chstore = chart.getStore();
					chstore.removeAll();
					chstore.add(ret.data);
				}
			});
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
		}else if( 'editSubBtn'==button.itemId ){
			me.doEditSub(button);
		}else if( 'viewBtn'==button.itemId ){
			me.doView(button);
		}else if( 'publishBtn'==button.itemId ){
			me.doPublish(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	// 工具栏添加按钮
	doAdd : function(button){
		var win =	Ext.create('app.view.manage.publicservice.QuestionsEdit',{title:'<i class="' + button.iconCls + '"></i> 调查问卷编辑'});
		win.show();
	},
	// 工具栏问题选项按钮
	doEditSub : function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		me.config.QUES_ID=mds.get('QUES_ID');
		var url = 'manage/publicservice/subquestions/list';
		var win =	Ext.create('app.view.manage.publicservice.QuestionsEditSub',{title:'<i class="' + button.iconCls + '"></i> 问题选项'});
		win.show();
		//me.getQuesPanel();
		//win.loadData(mds);
	},
	//工具栏删除按钮
	doDelete : function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.mutChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var ids = [];
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			ids.push(record.get("QUES_ID"));
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/publicservice/questions/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids.join(',')},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
	},
	//问题选项页面问题表格新增按钮
	doSubAdd : function(button){
		var me=this;
		var grid=me.getSubPanel();
		var store=grid.getStore();
		store.add({});
	},
	//问题选项页面问题表格删除按钮
	doSubDelete : function(button){
		var me=this;
		var grid=me.getSubPanel();
		var ret = app.utils.FunUtils.mutChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var ids = [];
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			ids.push(record.get("SUBJECT_ID"));
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/publicservice/subquestions/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids.join(',')},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
	},
	//问题选项页面选项表格新增按钮
	doOptionAdd : function(button){
		var me=this;
		var grid=me.getOptionPanel();
		var store=grid.getStore();
		var itemTag=String.fromCharCode(64 + parseInt(store.getCount()+1));
		store.add({ITEM_TAG:itemTag});
	},
	//问题选项页面选项表格删除按钮
	doOptionDelete : function(button){
		var me=this;
		var grid=me.getOptionPanel();
		var ret = app.utils.FunUtils.mutChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var ids = [];
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			ids.push(record.get("ITEM_ID"));
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/publicservice/subquestionsitem/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids.join(',')},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
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
		var win =	Ext.create('app.view.manage.publicservice.QuestionsEdit',{title:'<i class="' + button.iconCls + '"></i> 修改'});
		win.show();
		win.loadData(mds);
	},
	//跳转发布页面
	doPublish:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.publicservice.QuestionsPublish',{title:'<i class="' + button.iconCls + '"></i> 发布'});
		win.show();
		win.loadData(mds);
	},
	//跳转查看窗口
	doView : function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		me.config.QUES_ID=mds.data.QUES_ID;
		var win =	Ext.create('app.view.manage.publicservice.QuestionsView',{title:'<i class="' + button.iconCls + '"></i> 查看问卷调查'});
		win.show();
		win.loadData(mds);
	},
	//编辑页面保存按钮
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
				var url = 'manage/publicservice/questions/save';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
						win.close();
						Ext.Msg.alert('系统提示','保存成功！');
					}
				});
			}
		});
	}
});
