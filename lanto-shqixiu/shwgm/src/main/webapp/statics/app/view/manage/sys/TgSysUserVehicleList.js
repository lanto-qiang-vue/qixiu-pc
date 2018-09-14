Ext.define('app.view.manage.sys.TgSysUserVehicleList',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.sys.TgSysUserVehicleList',
	itemId: 'manage.sys.TgSysUserVehicleList',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 900,
	border:false,
	height:450,
	title:'已绑定车辆',
//	autoScroll:true,
	modal : true,
	maximizable : true,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [me.getGridPanel()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
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
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		var store=me.down('#gpanel').getStore();
		store.loadPage(1);
	},
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.privehicle.PrivateVehicle',
			url : 'manage/privehicle/privatevehicle/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'PLATE_NUM',flex:1.3},
				{fname:'VEHICLE_BRAND',flex:1},
				{fname:'VEHICLE_TYPE',flex:1},
				{fname:'VEHICLE_CAPACITY',flex:0.7},
				{fname:'PRODUCTION_YEAR',flex:1},
				{fname:'BUY_TIME',flex:1},
				{fname:'VIN',flex:1.5},
				{fname:'ENGINE_NO',flex:1.5},
				{fname:'OWNER_NAME',flex:1},
				{fname:'OWNER_PHONE',flex:1},
				{fname:'CREATE_TIME',flex:1}
			],
			btns : [/*{
				xtype : 'button',
				text : '查看',
				itemId : 'viewBtn',
				iconCls:'font-bold cd_button blue'
			},{
				xtype : 'button',
				text : '维修信息',
				itemId : 'repairBtn',
				iconCls:'font-bold cd_button blue'
			},{
				xtype : 'button',
				text : '解除绑定',
				itemId : 'deleteBtn',
				iconCls:'icon-remove-sign red font-bold'
			}*/]
		};
	}
});
