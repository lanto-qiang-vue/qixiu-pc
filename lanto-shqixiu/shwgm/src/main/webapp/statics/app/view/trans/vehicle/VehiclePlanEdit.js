Ext.define('app.view.trans.vehicle.VehiclePlanEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.trans.vehicle.VehiclePlanEdit',
	itemId: 'trans.vehicle.VehiclePlanEdit',
	title: '添加维护计划',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 840,
	height:550,
	autoScroll:true,
	modal : true,
	initComponent : function() {
		var me = this;
		me.tbar = [{
			xtype:'textfield',
			name:'plateNum',
			itemId:'plateNum',
			width:300,
			emptyText:'输入车牌号码查询...'
		},
		{
			xtype:'button',
			iconCls:'icon-search blue',
			handler:function(bt){
				me.down('grid').getStore().reload();
			}
		}];
		me.items = [{
			xtype : 'jsf.ModelGrid',
			itemId : 'toplangrid',
			region : 'center',
			rowSelType : 'MULTI',
			editType:Ext.create(
				"Ext.grid.plugin.RowEditing", {
					clicksToEdit : 1,
					saveBtnText:'添加维护计划',
					cancelBtnText:'取消',
					errorsText:'错误信息'
			}),
			paging:false,
			model : 'app.model.trans.VehiclePlanModel',
			url : 'trans/vehicle/vehicleplan/toPlanList',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'PLATE_NUM',flex:2},
				{fname:'PLATE_COLOR',flex:2},
				{fname:'VEHICLE_TYPE',flex:2},
				{fname:'REPAIR_CYCLE',flex:2,editor:{
					xtype:'numberfield',
					minValue:1,
					maxValue:12,
					allowBlank:false
				},text:'<i class="icon-edit blue"></i> 维护周期'},
				{fname:'REPAIR_MILEAGE',flex:2,editor:{
					xtype:'numberfield',
					minValue:0,
					maxValue:999999999,
					allowBlank:false
				},text:'<i class="icon-edit blue"></i> 维护里程'},
				{fname:'VENDER_',flex:2},
				{fname:'BRAND_',flex:2},
				{fname:'XM_',flex:2}
			],
			btns : []
		}],
		me.dockedItems = [{
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : ['->',
					 {
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'close_button',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
				} ]
			}];
		me.callParent(arguments);
		var grid = me.down('grid');
		grid.on('edit', function(editor, e) {
        	var str=e.field;
            var record = e.record;
            var data = record.data;
            var params = {
				data : Ext.JSON.encode(data)
			};
	        var url = 'trans/vehicle/vehicleplan/save';
			app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,grid,"正在添加中...",function(ret){
				if( ret.success ){
					grid.getStore().remove(record);
					if(me.mainGrid){
						me.mainGrid.getStore().reload();
					}
				}
			});
        });
        var st = grid.getStore();
		st.on('beforeload', function (store, options) {
			var params = {plateNum:me.down('#plateNum').getValue()};
			store.proxy.extraParams=params;
		});
		//st.load();
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(){
		var me = this;
		var store = me.down('grid').getStore();
		store.load();
	}
});
