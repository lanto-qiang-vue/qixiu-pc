Ext.define('app.view.common.VehicleSelWin', {
    extend: 'Ext.window.Window',
    alias:'widget.common.VehicleSelWin',
    itemId : 'common.VehicleSelWin',
    height: 570,
    width: 800,
    title:'车辆选择',
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
                            model: 'app.model.vehicle.TbVehicleBaseInfoModel',
                            layout:'column',
                            columns:3,
                            labelWidth: 70,
                            showType: 'search',
                            items: [ 
                                     	'VECHILE_NUM',
										{	
											xtype:'combo',
											name:'AREA_NAME',
											fieldLabel : '所属辖区',
							                editable:false,
							                store:Ext.getStore("sys_belong_area"),
							                displayField: 'NAME',  
							                valueField: 'CODE',
							                queryMode: 'local'
							            },
										'BRAND',
										'MODEL'
                                     ]

                        },
                        {
                            xtype: 'container', layout: { type: 'hbox',pack:'end'},
                            items: [
                                { xtype: 'button',iconCls: 'icon-search bigger-120 blue', text: '查询', itemId: 'searchBtn', margin: 10 },
                                {
					  				xtype:'button',
					  				text: ' 重 置 ',
					  				iconCls: 'icon-reply bigger-120 blue',
					  				margin: 10,
					  				handler:function(btn){
					  					btn.up('form').getForm().reset();
					  				}
					  			}
                            ]
                        }
                    ]
                },
                {
                    xtype: 'jsf.ModelGrid',
                    itemId : 'detailgrid',
                    rowSelType : me.rowSelType,
                    region : 'center',
                    model: 'app.model.vehicle.TbVehicleBaseInfoModel',
                    url: 'client/vehicle/tbvehiclebaseinfo/list', 
                    columns: [{text:'序号',xtype:'rownumberer'},
								'VECHILE_NUM',
								'VECHILE_COLOR',
								'OPERATING_UNIT',
								'OPERATING_LICENCE',
								'OPERATING_LICENCE_DATE',
								'AREA_NAME',
								'VIN',
								'ENGINE_NUMBER',
								'FUEL_TYPE',
								'BRAND',
								'MODEL',
								'BUY_DATE',
								'DRIVE_DATE',
								'VECHILE_LEVEL',
								'STATUS'],
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
										if (mds != null && !Ext.isEmpty(mds)
												&& mds.length == 1) {
											btn.up('window').callback(mds);
											btn.up('window').close();
										} else {
											Ext.Msg.alert('信息提示', '未选择车辆!');
										}
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
            store.on('beforeload', function (st, options) {
                //beforeload之前附加查询参数
                var fm = me.down('form').getForm();
                st.proxy.extraParams = fm.getValues(false, false);
            });    
//            store.loadPage(1);
            grid.on('itemdblclick',function(gd, record, item, index, e, eOpts){
            	var records = [];
            	records.push(record);
            	me.callback(records);
				me.close();
            });
          //为查询按钮添加响应函数
            me.down('form button[itemId=searchBtn]').on({ click: function (btn) {
                store.loadPage(1);
            } });
            me.on('show',function(){
            	Ext.mytip.msg("提示","<font color='red'>双击可以快速选择车辆！</font>");
            });
        } catch (err) {
            if(console)    console.error(err);
        }
    }
});
