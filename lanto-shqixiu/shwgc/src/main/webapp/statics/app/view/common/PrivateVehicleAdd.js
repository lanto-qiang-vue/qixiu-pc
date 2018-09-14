Ext.define('app.view.common.PrivateVehicleAdd',{
	extend:'Ext.window.Window',
	alias: 'widget.common.PrivateVehicleAdd',
	itemId: 'common.PrivateVehicleAdd',
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
				model : 'app.model.vehicle.PrivateVehicle',
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
						text : '保 存',
						handler : function(btn){
							var win  = btn.up('window');
							if(!win.isValid()){
								return false;
							}
							var form = win.down('form').getForm();
							var data = form.getFieldValues();
							var params = {
								data : Ext.JSON.encode(data)
							};
							Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
								if(flag=='yes'){
									var url = 'vehicle/privatevehicle/save';
									app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
										if( ret.success ){
											//me.getGridPanel().getStore().reload();
											win.callback();
											win.close();
											Ext.Msg.alert('系统提示','保存成功！');
										}
									});
								}
							});
						}
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
