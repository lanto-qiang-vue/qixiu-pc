Ext.define('app.view.trans.vehicle.VehiclePlanMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.trans.vehicle.VehiclePlanMngPanel',
	itemId: 'trans.vehicle.VehiclePlanMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer','app.ux.CascadeCombo'],
	autoShow : true,
	closable : true,
	layout : 'border',
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [ me.getSearchPanel(), me.getGridPanel()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
	},
	getSearchPanel : function(){
		return {
		xtype : 'form',
		itemId : 'spanel',
		region : 'north',
		bodyPadding: 5,
		title : '查询',
		split : true,
		collapsible:true,
		items :[{
			xtype:'jsf.ModelContainer',
			model : 'app.model.trans.VehiclePlanModel',
			layout:'column',
			columns:4,
			labelWidth: 70,
			showType : 'search',
			items: [
					'PLATE_NUM',
					'PLATE_COLOR',
					{
						xtype: 'container',
						layout:{
							type: 'hbox',
							pack : 'end'
						},
						items:[{
							xtype: 'button',
							iconCls: 'search_button',
							text : '查询',
							itemId: 'searchBtn',
							margin:'0 5 0 0'
						},{
							xtype : 'button',
							text : '重置',
							itemId: 'resetBtn',
							iconCls: 'reset_button',
							handler:function(btn){
								btn.up('form').getForm().reset();
							}
						}]
					}
				]
			}]
		};
	},
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.trans.VehiclePlanModel',
			url : 'trans/vehicle/vehicleplan/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'PLATE_NUM',flex:2},
				{fname:'PLATE_COLOR',flex:2},
				{fname:'VEHICLE_TYPE',flex:2},
				{fname:'VENDER_',flex:2},
				{fname:'BRAND_',flex:2},
				{fname:'XM_',flex:2},
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
				{fname:'DJ_STATUS',flex:2}
			],
			btns : [{
				xtype : 'button',
				text : '添加计划',
				itemId : 'addBtn',
				iconCls:'add_button'
			},
			'-',{
				xtype : 'button',
				iconCls:'icon-reply bigger-120 blue',
				text : '提交上报',
				itemId : 'commitBtn'
			},
//			'-',{
//				xtype : 'button',
//				iconCls:'delete_button',
//				text : '删除',
//				itemId : 'deleteBtn'
//			},
			'-',{
				xtype : 'button',
				iconCls:'export_button',
				text : 'Excel导出',
				itemId : 'exportBtn'
			}]
		};
	},
	loadData : function(plateNum){
		var me=this;
		var grid=me.down('grid');
		var st = grid.getStore();
		if(plateNum){
			me.down('form').getForm().setValues({PLATE_NUM_lk:plateNum});
		}else{
			me.down('form').getForm().setValues({PLATE_NUM_lk:''});
		}
		st.loadPage(1);//预加载
	}
});
