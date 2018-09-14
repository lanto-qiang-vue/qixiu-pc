Ext.define('app.controller.check.CheckRecordsCtrl',{
	extend:'Ext.app.Controller',
	stores:['BdStation','RepairItems','RepairParts'],
	requires:['js.jquery','js.HKVideo.webVideoCtrl'],
	views: [
		'check.CheckRecordsMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=check.CheckRecordsMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=check.CheckRecordsMngPanel] panel[itemId=spanel]'
	},{
		ref : 'picsPanel',
		selector : 'panel[itemId=check.CheckRecordsEdit] panel[itemId=picsPanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=check.CheckRecordsMngPanel] panel[itemId=gpanel]'
	},{
		ref : 'workPics',
		selector : 'panel[itemId=check.CheckRecordsEdit] dataview[itemId=checkphoto]'
	},{
		ref : 'itemsGrid',
		selector : 'panel[itemId=check.CheckRecordsEdit] panel[itemId=itemsGrid]'
	},{
		ref : 'partsGrid',
		selector : 'panel[itemId=check.CheckRecordsEdit] panel[itemId=partsGrid]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=check.CheckRecordsMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=check.CheckRecordsMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
        	'panel[itemId=check.CheckRecordsMngPanel] button[itemId=searchBtn]': {
            	click: this.doSearch 
            },
			'panel[itemId=check.CheckRecordsMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=check.CheckRecordsEdit] button[itemId=saveBtn]':{
				click: this.doSave
			},
			'panel[itemId=check.CheckRecordsEdit] button[itemId=uploadPhotoBtn]': {
				click: this.uploadPhoto
			},
			'panel[itemId=check.CheckRecordsEdit] button[itemId=getPicBtn]': {
				click: this.clickCapturePic
			},
			'panel[itemId=check.CheckRecordsEdit] button[itemId=startBtn]': {
				click: this.startCheck
			},
			'panel[itemId=check.CheckRecordsEdit] button[itemId=endBtn]': {
				click: this.endCheck
			},
			'panel[itemId=check.CheckRecordsEdit] button[itemId=uploadBtn]':{
				click: this.workPhoto
			},
			'panel[itemId=check.CheckPhotoUpload] button[itemId=saveBtn]': {
				click: this.saveWorkPhoto
			},
			'panel[itemId=check.CheckPhotoUpload] button[itemId=deletePhotoBtn]': {
				click: this.deleteRepairPhoto
			}
		});
	},
	/********************************************************
	 * 主页面控制
	 ********************************************************/
	// grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'addBtn'==button.itemId ){
			me.doAdd(button);
		}else if( 'deleteBtn'==button.itemId ){
			me.doDelete(button);
		}else if( 'editBtn'==button.itemId ){
			me.doEdit(button);
		}else if( 'workBtn'==button.itemId ){
			me.doWork(button);
		}else if( 'submitBtn'==button.itemId ){
			me.doSubmit(button);
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
	// 工具栏添加按钮
	doAdd : function(button){
		var me=this;
		var win =	Ext.create('app.view.check.CheckRecordsEdit');
		win.show();
		win.loadVideo(false);
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
		var win =	Ext.create('app.view.check.CheckRecordsEdit');
		win.loadData(mds);
		win.show();
	},
	//跳转施工管理页面
	doWork:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.transrepair.RepairWorkManage',{title:'<i class="' + button.iconCls + '"></i> 施工管理'});
		win.show();
		win.loadData(mds);
	},
	//组件初始化时store上挂接查询form.
	initGridSearchCondition : function(grid, opts){
		var me = this;
		var st = grid.getStore();
		st.on('beforeload', function (store, options) {
			var fm = me.getSearchPanel().getForm();
			var params = fm.getValues();
			params.STATION_ID_eq=window.GL.corpId;
			store.proxy.extraParams=params;
		});
		st.loadPage(1);
	},
	
	//删除工单按钮
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
			if(record.data.STATUS=='10191002'){
				Ext.Msg.alert('系统提示','已提交状态的工单不能删除！');
				return false;
			}
			if(i == 0){
				ids = record.data.CHECK_ID;
			}else{
				ids = ids + "," + record.data.CHECK_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'check/checkrecord/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
	},
	//提交工单按钮
	doSubmit : function(btn){
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
			if(record.data.CHECK_END_TIME==''){
				Ext.Msg.alert('系统提示','所选记录需为检测结束状态！');
				return false;
			}
			if(i == 0){
				ids = record.data.CHECK_ID;
			}else{
				ids = ids + "," + record.data.CHECK_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认提交吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'check/checkrecord/submit';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids},function(ret){
					if( ret.success ){
						store.reload();
						Ext.Msg.alert('系统提示','提交成功！');
					}
				});
			}
		});
	},
	/********************************************************
	 * 新增编辑页控制
	 ********************************************************/
	//保存按钮
	doSave : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		data.STATION_ID=window.GL.corpId;
		delete data.PLATE_NUM;
		delete data.TRANS_CORP_NAME;
		var params = {
			data : Ext.JSON.encode(data)
		};
		if(confirm('确认保存吗？')){
			var url = 'check/checkrecord/save';
			app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
				if( ret.success ){
					//获取记录保存后生成的ID
					form.findField('CHECK_ID').setValue(ret.data);
					me.getGridPanel().getStore().reload();
					alert('保存成功！');
					win.down('#startBtn').setDisabled(false);
					win.down('#uploadBtn').setDisabled(false);
				}
			});
		}
	},
	//维修历史按钮
	viewHistory : function(btn){
		var me = this;
		var form=btn.up('window').down('form');
		var params=form.getRecord();
		var win =	Ext.create('app.view.transrepair.SendSms',{title:'<i class="' + btn.iconCls + '"></i> 车主身份验证'});
		win.loadData(params);
		win.show();
	},
	
	/********************************************************
	 * 维修照片标签页控制
	 ********************************************************/
	//打开上传维修照片窗口
	uploadPhoto : function(btn){
		var data=btn.up('window').down('form').getValues();
		var params = {RECORD_ID : data.RECORD_ID};
		var win = Ext.create('app.view.transrepair.RepairPhotoUpload');
		win.loadData(params);
	},
	//上传维修照片保存按钮
	saveRepairPhoto : function(btn){
		var me = this;
		var win  = btn.up('window');
		var data=btn.up('window').down('form').getValues();
		if(data.IMAGE_PATH==''){
			Ext.Msg.alert('系统提示','请先上传图片！');
			return false;
		}
		var params = {
			data : Ext.JSON.encode(data)
		};
		var url='transrepair/repairphoto/save';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
			if( ret.success ){
				var store=me.getPicsPanel().down('#repairphoto').getStore();
				store.proxy.extraParams.RECORD_ID=data.RECORD_ID;
        		store.reload();
				Ext.Msg.alert('系统提示','保存成功！');
				win.close();
      		}
		});
	},
	//删除维修照片按钮
	deleteRepairPhoto : function(btn){
		var me = this;
		var records = me.getPicsPanel().down('#repairphoto').getSelectionModel().getSelection();
		var ids = [];
		for(var i=0;i<records.length;i++){
			var record = records[i];
			ids.push(record.get("IMAGE_ID"));
		}
		if(records && records.length > 0){
			Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
				if(flag=='yes'){
					var store=me.getPicsPanel().down('#repairphoto').getStore();
					var url = 'transrepair/repairphoto/delete';
					app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids},function(ret){
						if( ret.success ){
							store.remove(records);
							Ext.Msg.alert('系统提示','删除成功！');
						}
					});
				}
			});
		}
	},
	/********************************************************
	 * 施工管理页面控制
	 ********************************************************/
	//开始检测按钮
	startCheck : function(btn){
		var me = this;
		var win  = btn.up('window');
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		data.CHECK_START_TIME=new Date();
		delete data.CHECK_END_TIME;
		delete data.PLATE_NUM;
		delete data.TRANS_CORP_NAME;
		var params = {
			data : Ext.JSON.encode(data)
		};
		if(confirm('确认开始检测吗？')){
			var url = 'check/checkrecord/save';
			app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
				if( ret.success ){
					alert('开始检测成功！');
					win.down('#endBtn').setDisabled(false);
					form.findField('CHECK_START_TIME').setValue(data.CHECK_START_TIME);
				}
			});
		}
	},
	//结束检测按钮
	endCheck : function(btn){
		var me = this;
		var win  = btn.up('window');
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		data.CHECK_END_TIME=new Date();
		delete data.CHECK_START_TIME;
		delete data.PLATE_NUM;
		delete data.TRANS_CORP_NAME;
		var params = {
			data : Ext.JSON.encode(data)
		};
		if(confirm('确认结束检测吗？')){
			var url = 'check/checkrecord/save';
			app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
				if( ret.success ){
					alert('结束检测成功！');
					form.findField('CHECK_END_TIME').setValue(data.CHECK_END_TIME);
				}
			});
		}
	},
	// 抓图
	clickCapturePic : function(btn){
		var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
			szInfo = "";
		var xmlDoc = WebVideoCtrl.I_GetLocalCfg();
		var filePath=$(xmlDoc).find("CapturePath").eq(0).text();
		if (oWndInfo != null) {
			var szChannelID = '1',
				szPicName = oWndInfo.szIP + "_" + szChannelID + "_" + new Date().getTime(),
				iRet = WebVideoCtrl.I_CapturePic(szPicName);
			if (0 == iRet) {
				alert("抓图成功，图片保存在"+filePath+"\\"+szPicName+"，请自行上传！");
			} else {
				alert("抓图失败！");
			}
			//showOPInfo(oWndInfo.szIP + " " + szInfo);
		}
	},
	//打开上传抓拍照片窗口
	workPhoto : function(btn){
		var data=btn.up('window').down('form').getValues();
		var params = {CHECK_ID : data.CHECK_ID};
		var win = Ext.create('app.view.check.CheckPhotoUpload');
		win.setPosition(0,0);
		win.loadData(params);
	},
	//上传抓拍照片保存按钮
	saveWorkPhoto : function(btn){
		var me = this;
		var win  = btn.up('window');
		var data=btn.up('window').down('form').getValues();
		if(data.IMAGE_PATH==''){
			Ext.Msg.alert('系统提示','请先上传图片！');
			return false;
		}
		var params = {
			data : Ext.JSON.encode(data)
		};
		var url='check/checkphoto/save';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
			if( ret.success ){
				var store=me.getWorkPics().getStore();
				store.proxy.extraParams.CHECK_ID=data.CHECK_ID;
        		store.reload();
				alert('保存成功！');
				win.close();
      		}
		});
	}
});
