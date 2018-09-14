Ext.define('app.controller.trans.vehicle.VehicleBaseCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'trans.vehicle.VehicleBaseMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=trans.vehicle.VehicleBaseMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=trans.vehicle.VehicleBaseMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=trans.vehicle.VehicleBaseMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=trans.vehicle.VehicleBaseMngPanel]': {
		//		afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'window[itemId=trans.vehicle.VehicleBaseEdit]': {
	//			afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=trans.vehicle.VehicleBaseMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=trans.vehicle.VehicleBaseMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=trans.vehicle.VehicleBaseMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'window[itemId=trans.vehicle.VehicleBaseView] button[itemId=printBtn]': {
				click: this.doPrint
			},	
			'window[itemId=trans.vehicle.VehicleBaseEdit] button[itemId=saveBtn]': {
				click: this.doSave
			},
			'window[itemId=trans.vehicle.VehicleBaseEdit] button[itemId=save_item]': {
				click: this.doSave_Item
			},
			'window[itemId=trans.vehicle.VehicleBaseEdit] button[itemId=save_paramBtn]': {
				click: this.doSave_Param
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
		}else if( 'deleteBtn' == button.itemId){
			me.doDelete(button);
		}else if('viewBtn' == button.itemId){
			me.doView(button);
		}else if('printBtn' == button.itemId){
			me.doPrint(button);				
		}else if( 'exportBtn' == button.itemId){
			me.doExport(button);
		}else if('caseBtn' == button.itemId){
		}else if('toCased' == button.itemId){
			me.toCased(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转新增页面
	doAdd:function(button){ 
		var win =	Ext.create('app.view.trans.vehicle.VehicleBaseEdit',{title:'添加车辆'});
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
		var win =	Ext.create('app.view.trans.vehicle.VehicleBaseEdit',{title:'修改车辆'});
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
		var win =	Ext.create('app.view.trans.vehicle.VehicleBaseView',{title:'查看车辆档案'});
		win.show();
		win.loadData(mds);
	},
	toCased:function(button){
		var me = this;
		var form = button.up('form');
		if(!form.isValid()){
			return ;
		}
		var data = form.getValues();
		var url = 'trans/vehicle/vehiclebase/updateCase';
		app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,data,form,"正在关联中...",function(ret){
			if( ret.success ){
				form.getForm().reset();
				me.getGridPanel().getStore().reload();
				Ext.Msg.alert('系统提示','关联成功！');
			}
		});
	},
	doSave : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form');
		var data = form.getValues();
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'trans/vehicle/vehiclebase/save';
				app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,form,"正在保存中...",function(ret){
					if( ret.success ){
						me.getGridPanel().getStore().reload();
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
		var ids = [];
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			ids.push(record.get("VEHICLE_ID"));
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'trans/vehicle/vehiclebase/delete';
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
		var url = "trans/vehicle/vehiclebase/doExport";
		app.utils.CommonUtil.exportStandardSubmit(form,url,null);
	},
	doPrint: function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var params = {
			record_no: mds.data.RECORD_NO,
			data : Ext.JSON.encode(mds.data)
		};

		app.utils.AjaxCallbackUtil.ajaxCallbackAll('trans/vehicle/vehiclebase/doPrint',params,function(ret){
			if( ret.success ){
				//console.log(ret.data);
				InitOcx();
				var status = plugin.CallOcx("print",ret.data); 
				FreeOcx();
      		}
		});
	},	
	doSave_Item : function(btn) {
	 	   //先判断车辆ID不能为空：VEHICLE_ID
			var itemName = btn.itemName;	//子项名
			var itemPanel = itemName+'Panel'; //子项panelId
			var win  = btn.up('window');
			var form = win.down('form').getForm();
			var data = form.getValues();
			
			if(Ext.isEmpty(data.VEHICLE_ID)){
	           Ext.Msg.alert('错误','请先保存车辆基本情况');
		       return false;
			}
				 
	 	    var win = btn.up('window');
          	//var pgrid = win.down('grid[itemId=changePanel]');
          	var pgrid = win.down('grid[itemId='+itemPanel+']');
			var parray = [];
			var pgrid_Store = pgrid.getStore();
			var precords = pgrid.getStore().data.items;
			 
			if(precords.length==0){
		      Ext.Msg.alert('错误','明细不能为空！');
		      return false;
			}							
			for(var i =0 ; i<precords.length;i++){
			  var precord = precords[i];
//			  if(Ext.isEmpty(precord.data.CHANGE_DATE)){
//				  Ext.Msg.alert('错误','更换日期不能为空');
//				  return false;
//				 }
			  parray.push(precord.data);
			}
			var params = {
				vehicle_id:data.VEHICLE_ID,
				parray: Ext.JSON.encode(parray)
			};
			//console.log(parray);
			Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
				if(flag=='yes'){
					//var url = "manage/vehicle/vehiclebase/save_change";
					var url = "trans/vehicle/vehiclebase/save_"+itemName;
	    			app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,win,"正在保存中...",function(ret){
	    				if( ret.success ){
	    					pgrid_Store.reload();
			        		Ext.Msg.alert('系统提示','保存成功！');
		          		}
	    			});
	    		}
			});	

			
     },
     doSave_Param : function(btn) {
	 	   //先判断车辆ID不能为空：VEHICLE_ID
			var win  = btn.up('window');
			var form = win.down('form').getForm();
			var data = form.getValues();
			
			if(Ext.isEmpty(data.VEHICLE_ID)){
	           Ext.Msg.alert('错误','请先保存车辆基本情况');
		       return false;
			}
          	var paramForm = win.down('#paramPanel');
          	var paramData = paramForm.getForm().getValues();
			var params = {
				vehicle_id:data.VEHICLE_ID,
				parray: Ext.JSON.encode(paramData)
			};
			//console.log(parray);
			Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
				if(flag=='yes'){
					var url = "trans/vehicle/vehiclebase/save_param";
	    			app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,paramForm,"正在保存中...",function(ret){
	    				if( ret.success ){
	    					ret.data.PRODUCTION_DATE=ret.data.PRODUCTION_DATE.substring(0,10);
	    					paramForm.getForm().setValues(ret.data);
			        		Ext.Msg.alert('系统提示','保存成功！');
		          		}
	    			});
	    		}
			});	
     }
});
