Ext.define('app.view.transrepair.TransVehicleFile',{
	extend:'Ext.window.Window',
	alias: 'widget.transrepair.TransVehicleFile',
	itemId: 'transrepair.TransVehicleFile',
	title: '电子健康档案',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 900,
	border:false,
	height:500,
//	autoScroll:true,
	modal : true,
	maximizable : true,
	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			layout : {
				type:'vbox',
				pack:'start',
				align:'stretch'
			},
			itemId:'npanel',
			bodyPadding : 10,
			items:[{
				xtype: 'fieldset',
	            title: '基本资料',
	            padding:5,
	            items:{
					xtype : 'jsf.ModelContainer',
					model : 'app.model.VehicleBaseModel',
					layout: {
	            		type: 'table',
	            		columns: 4
	        		},
	        		labelWidth: 70,
					btns:[],
					items: [
						{fname:'VEHICLE_ID',hidden:true},
						{fname:'PLATE_NUM'},
						{fname:'CORP_NAME'},
						{fname:'VENDER_'},
						{fname:'BRAND_'},
						{fname:'XM_'},
						{fname:'VEHICLE_TYPE'},
						{fname:'CHASSIS_NUM'},
						{fname:'ENGINE_NUM'},
						{fname:'OWNER_PHONE',allowBlank:false,vtype:'TELphone',msgTarget:'under'}
					]
	            }
			},{
				xtype:'panel',
	    		title:'维修记录',
	    		layout:'fit',
	    		flex:1,
	    		items:[me.getGridPanel()]
			}]
		}],
		me.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : ['->', {
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'icon-off red',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
				} ]
			} ];
		me.callParent(arguments);
	},
	//维修记录表格
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.transrepair.RepairRecordModel',
			url : 'transrepair/repairrecords/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'REPAIR_CORP_NAME',flex:2.5},
				{fname:'REPAIR_TYPE',flex:1},
				{fname:'REPAIR_DATE',flex:2,format:'Y-m-d H:i:s'},
				{fname:'START_REPAIR_TIME',flex:2,format:'Y-m-d H:i:s'},
				{fname:'END_REPAIR_TIME',flex:2,format:'Y-m-d H:i:s'},
				{fname:'REPAIR_MILE',flex:1},
				{fname:'STATION_NAME',flex:1}
			],
			btns : [{
				xtype : 'button',
				text : '查看',
				itemId : 'viewBtn',
				iconCls:'font-bold icon-edit blue',
				handler:function(btn){
					var grid = btn.up('window').down('#gpanel');
					var ret = app.utils.FunUtils.singleChecks(grid);
					if(!ret.success){
						return false;
					}
					var mds = ret.result;
					var win =	Ext.create('app.view.transrepair.RepairRecordsView',{title:'<i class="' + btn.iconCls + '"></i> 维修记录查看'});
					win.show();
					win.loadData(mds);
				}
			}]
		};
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
		var store=me.down('form').down('#gpanel').getStore();
		var vehicleId=me.down('form').getValues().VEHICLE_ID;
		var params={VEHICLE_ID_eq:vehicleId,STATUS_eq:'10161004'};
		store.proxy.extraParams=params;
		store.loadPage(1);
		var form = me.down('form').getForm();		
		var url = 'vehicle/transvehicle/getInfo';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{VEHICLE_ID:vehicleId},function(ret){
			if( ret.success ){
				console.log(ret.data);
				var mod = Ext.create('app.model.VehicleBaseModel');
				mod.set(ret.data[0]);
				form.setValues(mod.data);
			}
		});
	}
});
