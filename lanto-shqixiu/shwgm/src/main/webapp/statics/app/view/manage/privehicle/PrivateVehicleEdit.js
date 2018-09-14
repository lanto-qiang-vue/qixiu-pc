Ext.define('app.view.manage.privehicle.PrivateVehicleEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.privehicle.PrivateVehicleEdit',
	itemId: 'manage.privehicle.PrivateVehicleEdit',
	title: '添加普通车辆',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 530,
	border:false,
	height:270,
//	autoScroll:true,
	modal : true,
	maximizable : true,
	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			layout : 'fit',
			itemId:'npanel',
			bodyPadding : 15,
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.privehicle.PrivateVehicle',
				layout: {
            		type: 'table',
            		columns: 2
        		},
        		labelWidth: 70,
				btns:[],
				items: [
					{fname:'VEHICLE_ID',hidden:true},
					{fname:'PLATE_NUM'},
					{fname:'VEHICLE_BRAND'},
					{fname:'VEHICLE_TYPE'},
					{fname:'VEHICLE_CAPACITY'},
					{fname:'PRODUCTION_YEAR'},
					{fname:'BUY_TIME'},
					{fname:'VIN'},
					{fname:'ENGINE_NO'},
					{fname:'OWNER_NAME'},
					{fname:'OWNER_PHONE',allowBlank:false,vtype:'TELphone',msgTarget:'under'}
				]
			}]
		}],
		me.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : ['->',
					{
						xtype : 'button',
						itemId : 'saveBtn',
						iconCls : 'icon-save blue',
						text : '保 存'
					},'-', {
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
		me.down('form').loadRecord(record);
	}
});
