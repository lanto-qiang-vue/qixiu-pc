Ext.define('app.controller.manage.corp.TransCorpInfoCtrl',{
	extend:'Ext.app.Controller',
//	stores : ['app.store.CorpQualification'],
	views: [
		'manage.corp.TransCorpInfoMngPanel',
		'manage.corp.TransCorpInfoEdit'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.corp.TransCorpInfoMngPanel]'
	},{
		ref : 'quatoMngPanel',
		selector : 'panel[itemId=manage.corp.TbTransCorpQuatoMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.corp.TransCorpInfoMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.corp.TransCorpInfoMngPanel] panel[itemId=gpanel]'
	},{
		ref : 'quatoGrid',
		selector : 'panel[itemId=manage.corp.TbTransCorpQuatoMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.corp.TransCorpInfoMngPanel]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.corp.TransCorpInfoEdit]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.corp.TransCorpInfoMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=manage.corp.TbTransCorpQuatoMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.quatoGridBtnsHandler
			},
			'panel[itemId=manage.corp.TransCorpInfoMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=manage.corp.TransCorpInfoMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'panel[itemId=manage.corp.TransCorpInfoMngPanel] button[itemId=printBtn] menuitem':{
				click: this.doItemClick
			},
			'window[itemId=manage.corp.TransCorpInfoEdit] button[itemId=saveBtn]': {
				click: this.doSave
			},
			'window[itemId=manage.corp.TbTransQuatoEdit] button[itemId=saveBtn]': {
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
		}else if( 'addBtn' == button.itemId){
			me.doAdd(button);
		}else if( 'editBtn' == button.itemId){
			me.doEdit(button);
		}else if( 'quatoBtn' == button.itemId){
			me.quatoManage(button);			
		}else if( 'exportBtn' == button.itemId){
			me.doExport(button);
		}
		/*
		 else if( 'editCorpNumBtn' == button.itemId){
			me.doEditCorpNum(button);			
		}else if( 'viewPanelBtn' == button.itemId){
			me.doPanelView(button);
		}
		else if( 'corpMapBtn' == button.itemId){
			me.doCorpMap(button);
		}
		else if( 'historyBtn' == button.itemId){
			me.doHistory(button);
		}*/
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
		var win =	Ext.create('app.view.manage.corp.TransCorpInfoEdit');
		win.show();
		win.loadData(mds);
		win.down('button[itemId=saveBtn]').setDisabled(true);
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
		var win =	Ext.create('app.view.manage.corp.TransCorpInfoEdit');
		win.show();
		win.loadData(mds);
	},
	doAdd:function(button){
		var win = Ext.create('app.view.manage.corp.TransCorpInfoEdit');
		win.show();
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
		var win =	Ext.create('app.view.manage.corp.TbTransCorpQuatoMngPanel');
		win.show();
		win.loadData(mds);
		win.loadQuato();
	},
	doSave : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		/*var exam = win.down('grid').getStore().data.items;
        if (form.findField('VALID_START_DATE').getValue() > form.findField('VALID_END_DATE').getValue()){
           Ext.Msg.alert('系统提示','商事信息：有效开始日期不能大于有效结束日期，请重新输入！');
           return false;
        }
 
		var exams = [];
		for(var i=0;i<exam.length;i++){
			exams.push(exam[i].data);
		}*/
		var data = form.getFieldValues();
		//console.log(data);
		if(data.CORP_TYPE == '10141004' || data.CORP_TYPE == '10141005'){
			data.REPAIR_TYPES = data.REPAIR_TYPES_;
		}
		var params = {
			data : Ext.JSON.encode(data)
			//exams : Ext.JSON.encode(exams)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/transcorp/tccorpinfo/save';
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
		var url = "manage/transcorp/tccorpinfo/doExport";
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
				var url = 'manage/corp/transcorpquato/save';
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
		var win =	Ext.create('app.view.manage.corp.TbTransQuatoEdit');
		win.show();
		win.loadAddData(corpId);
	}
	/*
	doPanelView:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.corp.TransCorpInfoMap',{title:'企业电子地图 [ <font color="red">' + mds.data.CORP_NAME + '</font> ] '});
		win.show();
		win.loadData(mds);
	},
	doCorpMap:function(button){ 
		var win =	Ext.create('app.view.manage.corp.TcCorpAllMap',{title:'企业分布电子地图 '});
		win.show();
		win.loadData();
	},
	//修改企业编号
	doEditCorpNum:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var corp_id = ret.result.data.CORP_ID;//获取企业ID		
		var corp_num = ret.result.data.CORP_NUM;//获取企业编号

		if(Ext.isEmpty(button.setPanel)){
			button.setPanel =	Ext.create('Ext.form.Panel',{
				title:'修改企业编号',
				floating:true,
				x:button.getX(),
				y:button.getY()+28,
				items:[
				       {xtype:'textfield',itemId:'corp_id',name:'corp_id',readOnly:true,allowBlank:false,fieldLabel:'企业ID',margin:10},				       
				       {xtype:'textfield',itemId:'corp_num',name:'corp_num',readOnly:true,allowBlank:false,fieldLabel:'旧企业编号',margin:10},				       
				       {xtype:'textfield',itemId:'new_corp_num',name:'new_corp_num',allowBlank:false,fieldLabel:'新企业编号',margin:10}
				      ],
				bbar:['->',{
						xtype : 'button',
						itemId : 'saveBtn',
						iconCls : 'save_button',
						text : '保 存',
						handler:function(btn){
					      if(!Ext.isEmpty(button.setPanel.down('#new_corp_num').getValue())){
					      	  //判断是否 新企业编号是否重复
							   var url = "manage/transcorp/tccorpinfo/getCorpNum";
							   app.utils.AjaxCallbackUtil.ajaxTitleCallback(url, {new_corp_num:button.setPanel.down('#new_corp_num').getValue()},button.setPanel,'保存中...', function(ret){
							   	if (ret.data=='1') {
								    Ext.MessageBox.alert('警告', '该企业编号已经存在，不能重复保存!');
								  } else {
            						   var url = "manage/corp/tccorpinfo/saveCorpNum";
							           app.utils.AjaxCallbackUtil.ajaxTitleCallback(url, {corp_id:button.setPanel.down('#corp_id').getValue(),new_corp_num:button.setPanel.down('#new_corp_num').getValue()},button.setPanel,'保存中...', function(ret){
								       Ext.MessageBox.alert('信息', '修改企业编号成功，请刷新数据!');
								       button.setPanel.hide();
							             });									  	
								  }
							   });					      						      	     					
					    	  
					      } else {
							   Ext.MessageBox.alert('警告', '新企业编号不能为空!');
				           }
						}
					},'-', {
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'close_button',
						text : '关 闭',
						handler : function(btn) {
							button.setPanel.hide();
						}
				}]
			});
			
			button.setPanel.show();
			button.setPanel.down('#corp_id').setValue(corp_id);			
			button.setPanel.down('#corp_num').setValue(corp_num);

		}else{
			button.setPanel.down('#corp_id').setValue(corp_id);			
			button.setPanel.down('#corp_num').setValue(corp_num);
			button.setPanel.down('#new_corp_num').setValue('');			
			button.setPanel.show();
			
		}
	},	
	
	doItemClick: function(a,b){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var params = {
			type: a.type,
			data : Ext.JSON.encode(mds.data)
		};
		app.utils.AjaxCallbackUtil.ajaxCallbackAll('manage/transcorp/tccorpinfo/doPrint',params,function(ret){
			if( ret.success ){
				InitOcx();
				var status = plugin.CallOcx("print",ret.data); 
				FreeOcx();
      		}
		});
	},
	doHistory:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var mds = grid.getSelectionModel().getSelection();
		var record = [];
		if(!Ext.isEmpty(mds)){
			record = mds[0];
			record.data.CORP_NUM_lk = record.data.CORP_NUM;
			record.data.CORP_AREA = '';
		}
		console.log(record);
		var win =	Ext.create('app.view.manage.corp.CorpHistoryWin');
		win.show();
		win.loadData(record.data);
	}
	*/
});
