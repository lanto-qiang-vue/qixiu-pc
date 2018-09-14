Ext.define('app.controller.trans.vehicle.VehiclePlanCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'trans.vehicle.VehiclePlanMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=trans.vehicle.VehiclePlanMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=trans.vehicle.VehiclePlanMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=trans.vehicle.VehiclePlanMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=trans.vehicle.VehiclePlanMngPanel]': {
		//		afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'window[itemId=trans.vehicle.VehiclePlanEdit]': {
	//			afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=trans.vehicle.VehiclePlanMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=trans.vehicle.VehiclePlanMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=trans.vehicle.VehiclePlanMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
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
				var url = 'trans/vehicle/vehicleplan/save';
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
		}else if('commitBtn' ==button.itemId){
			me.doCommit(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转新增页面
	doAdd:function(button){ 
		var me = this;
		var win =	Ext.create('app.view.trans.vehicle.VehiclePlanEdit',{mainGrid:me.getGridPanel(),title:'点击车辆添加该车辆维护计划'});
		win.show();
		win.loadData();
	},
	doCommit:function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		if(mds.data.DJ_STATUS=='10191002'){
			Ext.Msg.alert('系统提示','该维护计划已经提交过了');
			return false;
		}
		var id = mds.data.PLAN_ID;
		Ext.MessageBox.confirm('系统提示','确认提交计划吗？提交后不能再修改',function(flag){
			if(flag=='yes'){
				var url = 'trans/vehicle/vehicleplan/commitPlan';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{id:id},function(ret){
					if( ret.success ){
						Ext.Msg.alert('系统提示','提交计划成功！');
						mds.set('DJ_STATUS','10191002');
						mds.commit();
						//store.load(ret.data);
						//var record = form.getRecord();
						//record.set(ret.data);
						//record.commit()
						//this.getGridPanel().getStore().loadPage(1);
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
		var ids = [];
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			ids.push(record.get("PLAN_ID"));
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'trans/vehicle/vehicleplan/delete';
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
		var url = "trans/vehicle/vehicleplan/doExport";
		app.utils.CommonUtil.exportStandardSubmit(form,url,null);
	}
});
