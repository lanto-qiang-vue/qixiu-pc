Ext.define('app.view.sys.TqVehicleCardEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.view.sys.TqVehicleCardEdit',
	itemId: 'sys.TqVehicleCardEdit',
	title: '编辑页面',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout:'border',
	width : 900,
	height:550,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			region:'north',
			itemId:'npanel',
			bodyPadding : 5,
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.repair.RepairGeneManageModel',
				defaults: {msgTarget:'side',width:250},
				layout: {
            		type: 'table',
            		columns: 2
        		},
        		labelWidth: 100,
				btns:[],
				items: [
				 //   {fname:'VEHICLE_ID'},
					{fname:'PLATE_NUMB'},
					{fname:'PLATE_COLOR'},					
					{fname:'VEHICLE_TYPE'},	
					{fname:'VEHICLE_NATURE'}						
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
						iconCls : 'save_button',
						text : '保 存'
					},'-', {
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'close_button',
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
		if(!Ext.isEmpty(record.get('PHOTO'))){
			me.down('image').setSrc("/attach/" + record.get('PHOTO'));
		}
		
	}
	
	
});
