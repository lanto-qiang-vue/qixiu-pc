Ext.define('app.controller.transrepair.RepairRecordsCtrl',{
	extend:'Ext.app.Controller',
	stores:['BdStation','RepairItems','RepairParts'],
	requires:['js.jquery','js.HKVideo.webVideoCtrl'],
	views: [
		'transrepair.RepairRecordsMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=transrepair.RepairRecordsMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=transrepair.RepairRecordsMngPanel] panel[itemId=spanel]'
	},{
		ref : 'picsPanel',
		selector : 'panel[itemId=transrepair.RepairRecordsEdit] panel[itemId=picsPanel]'
	},{
		ref : 'workPics',
		selector : 'panel[itemId=transrepair.RepairWorkManage] dataview[itemId=repairphoto]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=transrepair.RepairRecordsMngPanel] panel[itemId=gpanel]'
	},{
		ref : 'itemsGrid',
		selector : 'panel[itemId=transrepair.RepairRecordsEdit] panel[itemId=itemsGrid]'
	},{
		ref : 'partsGrid',
		selector : 'panel[itemId=transrepair.RepairRecordsEdit] panel[itemId=partsGrid]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=transrepair.RepairRecordsMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=transrepair.RepairRecordsMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=transrepair.RepairRecordsEdit] grid[itemId=itemsGrid]': {
				beforerender : this.initItemsGrid
			},
			'panel[itemId=transrepair.RepairRecordsEdit] grid[itemId=partsGrid]': {
				beforerender : this.initPartsGrid
			},
        	'panel[itemId=transrepair.RepairRecordsMngPanel] button[itemId=searchBtn]': {
            	click: this.doSearch 
            },
			'panel[itemId=transrepair.RepairRecordsMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=transrepair.RepairRecordsEdit] button[itemId=saveBtn]':{
				click: this.doSave
			},
			'panel[itemId=transrepair.RepairRecordsEdit] button[itemId=historyBtn]':{
				click: this.viewHistory
			},
			'panel[itemId=transrepair.RepairWorkManage] button[itemId=startBtn]':{
				click: this.doStart
			},
			'panel[itemId=transrepair.RepairWorkManage] button[itemId=endBtn]':{
				click: this.doEnd
			},
			'panel[itemId=transrepair.RepairWorkManage] button[itemId=uploadBtn]':{
				click: this.workPhoto
			},
			'panel[itemId=transrepair.WorkPhotoUpload] button[itemId=saveBtn]': {
				click: this.saveWorkPhoto
			},
			'panel[itemId=transrepair.RepairWorkManage] button[itemId=getPicBtn]':{
				click: this.clickCapturePic
			},
			'panel[itemId=transrepair.RepairRecordsEdit] button[itemId=addItemsBtn]':{
				click: this.addItems
			},
			'panel[itemId=transrepair.RepairRecordsEdit] button[itemId=deleteItemsBtn]': {
				click: this.deleteItems
			},
			'panel[itemId=transrepair.RepairRecordsEdit] button[itemId=addPartsBtn]': {
				click: this.addParts
			},
			'panel[itemId=transrepair.RepairRecordsEdit] button[itemId=deletePartsBtn]': {
				click: this.deleteParts
			},
			'panel[itemId=transrepair.PartPhotoUpload] button[itemId=saveBtn]': {
				click: this.savePartPhoto
			},
			'panel[itemId=transrepair.RepairRecordsEdit] button[itemId=uploadPhotoBtn]': {
				click: this.uploadPhoto
			},
			'panel[itemId=transrepair.RepairPhotoUpload] button[itemId=saveBtn]': {
				click: this.saveRepairPhoto
			},
			'panel[itemId=transrepair.RepairRecordsEdit] button[itemId=deletePhotoBtn]': {
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
		var win =	Ext.create('app.view.transrepair.RepairRecordsEdit',{title:'<i class="' + button.iconCls + '"></i> 维修记录编辑'});
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
		var win =	Ext.create('app.view.transrepair.RepairRecordsEdit',{title:'<i class="' + button.iconCls + '"></i> 维修记录编辑'});
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
			params.REPAIR_CORP_ID_eq=window.GL.corpId;
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
			if(record.data.STATUS=='10161004'){
				Ext.Msg.alert('系统提示','已提交状态的工单不能删除！');
				return false;
			}
			if(i == 0){
				ids = record.data.RECORD_ID;
			}else{
				ids = ids + "," + record.data.RECORD_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'transrepair/repairrecords/delete';
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
			if(record.data.STATUS!='10161003'){
				Ext.Msg.alert('系统提示','所选记录需为已完工状态！');
				return false;
			}
			if(i == 0){
				ids = record.data.RECORD_ID;
			}else{
				ids = ids + "," + record.data.RECORD_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认提交吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'transrepair/repairrecords/submit';
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
		data.REPAIR_CORP_ID=window.GL.corpId;
		delete data.START_REPAIR_TIME;
		delete data.OWNER_PHONE;
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'transrepair/repairrecords/save';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						//获取记录保存后生成的ID
						form.findField('RECORD_ID').setValue(ret.data);
						me.getGridPanel().getStore().reload();
						Ext.Msg.alert('系统提示','保存成功！');
						win.down('#addItemsBtn').setDisabled(false);
						win.down('#deleteItemsBtn').setDisabled(false);
						win.down('#addPartsBtn').setDisabled(false);
						win.down('#deletePartsBtn').setDisabled(false);
						win.down('#uploadPhotoBtn').setDisabled(false);
						win.down('#deletePhotoBtn').setDisabled(false);
					}
				});
			}
		});
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
	 * 维修项目标签页控制
	 ********************************************************/
	//初始化维修项目表格
	initItemsGrid : function(grid, opts){
		var me = this;
		var st = grid.getStore();
		//表格编辑事件
		grid.on('edit',function(editor, e){
			var str=e.field;
            var record = e.record;
            var data = record.data;
            data.RECORD_ID=grid.up('window').down('form').getValues().RECORD_ID;
            var params = {
				data : Ext.JSON.encode(data)
			};
			if(record.isModified(str)){
				var url='transrepair/repairitemslist/save';
				app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,grid,'保存中...',function(ret){
    				if( ret.success ){
		        		e.record.data.LIST_ID=ret.data;
    					//st.proxy.extraParams=params;
    					//st.reload();
	          		}
    			});
            }
		});
	},
	//新增维修项目按钮
	addItems : function(btn){
		var me=this;
		var grid=me.getItemsGrid();
		var store=grid.getStore();
		store.add({});
	},
	//删除维修项目按钮
	deleteItems : function(btn){
		var me = this;
		var grid = me.getItemsGrid();
		var ret = app.utils.FunUtils.mutChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var ids = [];
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			ids.push(record.get("LIST_ID"));
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'transrepair/repairitemslist/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids.join(',')},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
	},
	/********************************************************
	 * 配件标签页控制
	 ********************************************************/
	//初始化配件表格
	initPartsGrid : function(grid, opts){
		var me = this;
		var st = grid.getStore();
		//表格编辑事件
		grid.on('edit',function(editor, e){
			var str=e.field;
            var record = e.record;
            var data = record.data;
            data.RECORD_ID=grid.up('window').down('form').getValues().RECORD_ID;
            var params = {
				data : Ext.JSON.encode(data)
			};
			if(record.isModified(str)){
				var url='transrepair/partslist/save';
				app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,grid,'保存中...',function(ret){
    				if( ret.success ){
		        		e.record.data.LIST_ID=ret.data;
	          		}
    			});
            }
		});
	},
	//新增配件按钮
	addParts : function(btn){
		var me=this;
		var grid=me.getPartsGrid();
		var store=grid.getStore();
		store.add({});
	},
	//删除配件按钮
	deleteParts : function(btn){
		var me = this;
		var grid = me.getPartsGrid();
		var ret = app.utils.FunUtils.mutChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var ids = [];
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			ids.push(record.get("LIST_ID"));
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'transrepair/partslist/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids.join(',')},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
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
	//施工管理页面开工按钮
	doStart : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		console.log(data);
		data.STATUS='10161002';
		data.START_REPAIR_TIME=new Date();
		delete data.END_REPAIR_TIME;
		var params = {
			data : Ext.JSON.encode(data)
		};
		if(confirm('确认开工吗？')){
			
			var url = 'transrepair/repairrecords/save';
			app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
				if( ret.success ){
					me.getGridPanel().getStore().reload();
					alert('开工成功！');
					win.close();
				}
			});
		}
	},
	//施工管理页面完工按钮
	doEnd : function(btn){
		var me = this;
		var win  = btn.up('window');
		/*if(!win.isValid()){
			return false;
		}*/
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		data.STATUS='10161003';
		data.END_REPAIR_TIME=new Date();
		delete data.START_REPAIR_TIME;
		var params = {
			data : Ext.JSON.encode(data)
		};
		if(confirm('确认完工吗？')){
			var url = 'transrepair/repairrecords/save';
			app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
				if( ret.success ){
					me.getGridPanel().getStore().reload();
					alert('完工成功！');
					win.close();
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
		var params = {RECORD_ID : data.RECORD_ID};
		var win = Ext.create('app.view.transrepair.WorkPhotoUpload');
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
		var url='transrepair/repairphoto/save';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
			if( ret.success ){
				var store=me.getWorkPics().getStore();
				store.proxy.extraParams.RECORD_ID=data.RECORD_ID;
        		store.reload();
				alert('保存成功！');
				win.close();
      		}
		});
	},
	/********************************************************
	 * 配件照片上传控制
	 ********************************************************/
	savePartPhoto : function(btn){
		var me = this;
		var win  = btn.up('window');
		var data=btn.up('window').down('form').getValues();
		if(data.PART_PHOTO==''){
			Ext.Msg.alert('系统提示','请先上传图片！');
			return false;
		}
		var params = {
			data : Ext.JSON.encode(data)
		};
		var url='transrepair/partslist/save';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
			if( ret.success ){
				var store=me.getPartsGrid().getStore();
				store.proxy.extraParams.RECORD_ID_eq=data.RECORD_ID;
        		store.reload();
				Ext.Msg.alert('系统提示','保存成功！');
				win.close();
      		}
		});
	}
});
