Ext.define('app.controller.vehicle.IcCardCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'vehicle.IcCardMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=vehicle.IcCardMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=vehicle.IcCardMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=vehicle.IcCardMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=vehicle.IcCardMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'window[itemId=vehicle.IcCardEdit]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=vehicle.IcCardMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=vehicle.IcCardMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=vehicle.IcCardMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'window[itemId=vehicle.IcCardEdit] button[itemId=saveBtn]': {
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
			store.proxy.extraParams=fm.getValues(false,true);
		});
		st.loadPage(1);//预加载
	},
	//grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'addBtn'==button.itemId ){
			me.doAdd(button);
		}else if( 'editBtn' == button.itemId){
			me.doEdit(button);
		}else if( 'readBtn' == button.itemId){
			me.doRead(button);
		}else if( 'exportBtn' == button.itemId){
			me.doExport(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转新增页面
	doAdd:function(button){ 
		var win =	Ext.create('app.view.vehicle.IcCardEdit');
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
		var win =	Ext.create('app.view.vehicle.IcCardEdit',{title:'车辆补卡',isAdd:'edit'});
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
		var data = form.getValues();
		var macId = iccardutil.getIcCardSn();
		if(macId == 0){
			Ext.Msg.alert('系统提示','获取物理ID失败!');
			return;
		}
		macId = macId.substr(2);
		data.MAC_ID = macId;
		Ext.MessageBox.confirm('系统提示','确认要写卡吗？',function(flag){
			if(flag=='yes'){
				var icParams = "1|" + data.VEHICLE_ID + "|" + data.PLATE_NUM + "|" + data.RECORD_NO + "|"
					 + "0|" + data.PLATE_COLOR + "|0|0";
				var re = iccardutil.writeIcCard(icParams);
				if(re != 1){
					return;
				}
				var params = {
					data : Ext.JSON.encode(data)
				};
				var url = 'client/vehicle/iccard/save';
				app.utils.AjaxCallbackUtil.ajaxSaveCallback(url,params,win,function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
						win.close();
						Ext.Msg.alert('系统提示','保存成功！');
					}
				});
			}
		});
	},
	doRead : function(button){
		var me = this;
		var win =	Ext.create('app.view.vehicle.IcCardEdit',{title:'读取IC卡资料',isAdd:'read'});
		win.show();
		win.loadReadData();
	},
	doExport : function(button){
		var form =  this.getSearchPanel().getForm();
		if(!form.isValid()){return;}
		var url = "client/vehicle/iccard/doExport";
		app.utils.CommonUtil.exportStandardSubmit(form,url,null);
	}
});
