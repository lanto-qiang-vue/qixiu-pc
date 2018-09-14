Ext.define('app.view.common.DetectCorpSelWin', {
    extend: 'Ext.window.Window',
    alias:'widget.common.DetectCorpSelWin',
    itemId : 'common.DetectCorpSelWin',
    height: 500,
    width: 800,
    title:'检测企业选择',
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
                            model: 'app.model.corp.TbCorpDetectInfo',
                            layout:'column',
                            columns:3,
                            labelWidth: 70,
                            showType: 'search',
                            items: [ 
										'STATION_NAME',
										{	
											xtype:'combo',
											name:'STATION_AREA',
											fieldLabel : '所属辖区',
							                editable:false,
							                store:Ext.getStore("sys_belong_area"),
							                displayField: 'NAME',  
							                valueField: 'CODE',
							               // value:window.GL.userArea,
							                queryMode: 'local'
							            },
							            //{fname:'STATUS',blankItem:true},
							            {
											xtype: 'container',
											layout:{
												type: 'hbox',
												pack : 'center'
											},
											items:[{
												xtype: 'button',
												iconCls: 'icon-search bigger-120 blue',
												text : '查询',
												itemId: 'searchBtn',
												margin:'0 0 0 10'
											},{
												xtype : 'button',
												text : '重置',
												itemId: 'resetBtn',
												iconCls: 'icon-reply bigger-120 blue',
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
                    model: 'app.model.corp.TbCorpDetectInfo',
                    url: 'manage/sys/common/getDetectCorpBySel', 
                    columns: [{
						text : '序号',
						xtype : 'rownumberer'
					}, {fname : 'STATION_ID',hidden:true}, {
						fname : 'STATION_NAME',
						width : 200
					}, {
						fname : 'STATION_NAME_JC',
						width : 200
					}, {
						fname : 'STATION_AREA',
						renderer : app.utils.FunUtils.findAreaByCode
					}],
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
											Ext.Msg.alert('信息提示', '未选择企业!');
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
            
            var form = me.down('form').getForm();
		 //   form.findField('STATUS').setValue('10221001');
		
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
            	Ext.mytip.msg("提示","<font color='red'>双击可以快速选择企业！</font>");
            });
        } catch (err) {
            if(console)    console.error(err);
        }
    }
});
