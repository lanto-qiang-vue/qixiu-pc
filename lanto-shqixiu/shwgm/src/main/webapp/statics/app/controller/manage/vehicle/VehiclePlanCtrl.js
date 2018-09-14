Ext.define('app.controller.manage.vehicle.VehiclePlanCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.vehicle.VehiclePlanMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.vehicle.VehiclePlanMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.vehicle.VehiclePlanMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.vehicle.VehiclePlanMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.vehicle.VehiclePlanMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'window[itemId=manage.vehicle.VehiclePlanEdit]': {
	//			afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.vehicle.VehiclePlanMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=manage.vehicle.VehiclePlanMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=manage.vehicle.VehiclePlanMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			}
		});
	},
	//查询panel中点击查询
	doSearch: function(button){
		if( this.getSearchPanel().getForm().isValid() ){
			this.getMngPanel().plateNum = null;
			this.getGridPanel().getStore().loadPage(1);
		}
	},
	//组件初始化时store上挂接查询form.
	initGridSearchCondition : function(grid, opts){
		var me=this;
		var view = me.getMngPanel();
		if(view.plateNum){
			view.down('form').getForm().setValues({PLATE_NUM_lk:view.plateNum});
		}
		var st = grid.getStore();
		st.on('beforeload', function (store, options) {
			var fm = me.getSearchPanel().getForm();
			store.proxy.extraParams=fm.getValues(false,true);
		});
		st.on('load',function(store,records){
			if(view.plateNum){
				if(!records || records.length < 1){
					Ext.Msg.alert('系统提示','该车辆【' + view.plateNum + '】还未添加维护计划！');
				}
			}
		})
		st.loadPage(1);//预加载
		grid.on('edit', function(editor, e) {
        	var str=e.field;
            var record = e.record;
            var data = record.data;
            var params = {
				data : Ext.JSON.encode(data)
			};
			if(record.isModified(str)){
				var url = 'manage/vehicle/vehicleplan/save';
				app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,grid,"正在保存中...",function(ret){
					if( ret.success ){
						record.commit();
					}
				});
			}
        });
		
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
		}else if('viewBtn' == button.itemId){
			me.doView(button);
		}else if( 'exportBtn' == button.itemId){
			me.doExport(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转新增页面
	doAdd:function(button){ 
		var me = this;
		var win =	Ext.create('app.view.manage.vehicle.VehiclePlanEdit',{mainGrid:me.getGridPanel(),title:'点击车辆添加该车辆维护计划'});
		win.show();
		win.loadData();
	},
	
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
			ids.push(record.get("PLAN_ID"));
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/vehicle/vehicleplan/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids.join(',')},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
	},
	doExport : function(button){
		var form =  this.getSearchPanel().getForm();
		if(!form.isValid()){return;}
		var url = "manage/vehicle/vehicleplan/doExport";
		app.utils.CommonUtil.exportStandardSubmit(form,url,null);
	}
});
