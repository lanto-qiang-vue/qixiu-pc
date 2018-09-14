Ext.define('app.view.common.TransVehicleSelWin', {
    extend: 'Ext.window.Window',
    alias:'widget.common.TransVehicleSelWin',
    itemId : 'common.TransVehicleSelWin',
    height: 450,
    width: 600,
    title:'运输车辆选择',
    autoShow : true,
    modal : true,
    layout : 'border',
    rowSelType : 'SINGLE', // SINGLE || MULTI
    requires : [ 'jsf.container.ModelContainer' ],
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                	xtype : 'form',
          			itemId : 'dpanel',
          			region : 'north',
          			width : 100,
          			bodyPadding: 2,
          			split : true,
                    items: [
                        {
                            xtype: 'jsf.ModelContainer',
                            model: 'app.model.VehicleBaseModel',
                            layout:'column',
                            columns:4,
                            labelWidth: 70,
                            showType: 'search',
                            items: [ 
										'PLATE_NUM',
							            {
											xtype: 'container',
											layout:{
												type: 'hbox',
												pack : 'center'
											},
											items:[{
												xtype: 'button',
												iconCls: 'icon-search bigger-120 white',
												text : '查询',
												itemId: 'searchBtn',
												margin:'0 0 0 10'
											},{
												xtype : 'button',
												text : '重置',
												itemId: 'resetBtn',
												iconCls: 'icon-reply bigger-120 white',
												margin:'0 0 0 10',
												handler:function(btn){
													btn.up('form').getForm().reset();
												}
											}]
										}
                                     ]
                        }]
                },
                {
                    xtype: 'jsf.ModelGrid',
                    itemId : 'detailgrid',
                    rowSelType : me.rowSelType,
                    region : 'center',
                    model: 'app.model.VehicleBaseModel',
                    url: 'vehicle/transvehicle/list', 
                    columns: [{
						text : '序号',
						xtype : 'rownumberer'
					}, 
					{fname : 'VEHICLE_ID',hidden:true}, 
					{fname : 'CORP_ID',hidden:true},
					{fname : 'CORP_NAME',flex:2},
					{fname : 'PLATE_NUM',flex:1.3},
					{fname : 'PLATE_COLOR',flex:1},
					{fname : 'VEHICLE_TYPE',flex:1},
					{fname : 'CHASSIS_NUM',flex:2}
					],
          			btns : [],
          			dockedItems : [ {
						xtype : 'toolbar',
						dock : 'bottom',
						layout : {
							pack : 'end',
							type : 'hbox'
						},
						items : ['->',
								{
									xtype : 'button',
									text : '选择',
									iconCls : 'accept_button',
									itemId : 'selBtn',
									handler : function(btn) {
										var mds = btn.up('window').down('grid')
												.getSelectionModel().getSelection();
										if (mds != null && !Ext.isEmpty(mds)) {
											btn.up('window').callback(mds);
											btn.up('window').close();
										} else {
											Ext.Msg.alert('信息提示', '未选择车辆!');
										}
									}
								},'-',{
									xtype : 'button',
									text : '新增车辆',
									iconCls : 'accept_button',
									itemId : 'addVehicleBtn',
									handler : function(btn) {
										var win =	Ext.create('app.view.common.TransVehicleAdd',{
											title:'<i class="' + btn.iconCls + '"></i> 添加普通车辆',
											callback:function(records){
												btn.up('window').down('grid').getStore().loadPage(1);
											}
										});
										win.show();
									}
								},'-',
								 {
									xtype : 'button',
									itemId : 'closeBtn',
									iconCls : 'close_button',
									text : '关 闭',
									handler : function(btn) {
										btn.up('window').close();
									}
							} ]
						} ]
                }
            ]
        });
        me.callParent(arguments); //需要初始化
        try {
            var grid= me.down('grid');
            var store = grid.getStore();
            
            var form = me.down('form').getForm();
            store.on('beforeload', function (st, options) {
                //beforeload之前附加查询参数
                var fm = me.down('form').getForm();
                st.proxy.extraParams = fm.getValues();
            }); 
            store.loadPage(1);
            grid.on('itemdblclick',function(gd, record, item, index, e, eOpts){
            	var records = [];
            	records.push(record);
            	me.callback(records);
				me.close();
            });
          //为查询按钮添加响应函数
            me.down('form button[itemId=searchBtn]').on({ click: function (btn) {
                if( form.isValid() ){
					store.loadPage(1);
				}
            } });
            me.on('show',function(){
            	Ext.mytip.msg("提示","<font color='red'>双击可以快速选择车辆！</font>");
            });
        } catch (err) {
            if(console)    console.error(err);
        }
    }
});
