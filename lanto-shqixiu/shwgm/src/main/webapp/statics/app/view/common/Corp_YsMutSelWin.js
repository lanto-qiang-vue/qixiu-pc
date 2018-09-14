Ext.define('app.view.common.Corp_YsMutSelWin', {
    extend: 'Ext.window.Window',
    alias:'widget.common.Corp_YsMutSelWin',
    itemId : 'common.Corp_YsMutSelWin',
    height: 570,
    width: 960,
    title:'运输企业选择',
    autoShow : true,
    modal : true,
    layout : 'border',
    rowSelType : 'SINGLE', // SINGLE || MULTI
    requires : [ 'jsf.container.ModelContainer' ],
    initComponent: function () {
        var me = this;
       me.items= [
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
                            model: 'app.model.common.Corp',
                            layout:'column',
                            columns:3,
                            labelWidth: 70,
                            showType: 'search',
                            items: [ 
                                     	'CORP_NUM',
										'CORP_NAME',
										{	
											xtype:'combo',
											name:'CORP_AREA',
											fieldLabel : '所属辖区',
							                editable:false,
							                store:Ext.getStore("sys_belong_area"),
							                displayField: 'NAME',  
							                valueField: 'CODE',
							                queryMode: 'local'
							            },
							            {fname:'CORP_TYPE',blankItem:true},
							            {fname:'STATUS',blankItem:true},
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
                	xtype:'panel',
                	region : 'center',
                	layout: {
		                type: 'hbox',
		                padding:'1',
		                align:'stretch'
		            },
		            items:[
		            	{
		                    xtype: 'jsf.ModelGrid',
		                    itemId : 'selgrid',
		                    rowSelType : 'MULTI',
		                    width : 600,
		                    model: 'app.model.common.Corp',
		                    url: 'manage/sys/common/getCorpBySel_Ys', 
		                    columns: [{
								text : '序号',
								xtype : 'rownumberer'
							}, 'CORP_NUM', {
								fname : 'CORP_NAME',
								width : 200
							}, {
								fname : 'CORP_TYPE',
								width : 200
							}, {
								fname : 'CORP_AREA',
								renderer : app.utils.FunUtils.findAreaByCode
							},'STATUS'],
		          			btns : []
		                },{
		                    xtype: 'jsf.ModelGrid',
		                    itemId : 'detailgrid',
		                    rowSelType : 'MULTI',
		                    paging:false,
		                    width : 350,
		                    model: 'app.model.common.Corp',
		                    url: 'manage/sys/common/getCorpBySel_Ys', 
		                    columns: [{
								text : '序号',
								xtype : 'rownumberer'
							}, {
								fname : 'CORP_NAME',
								text:'已选择的企业',
								flex : 1
							}],
		          			btns : [],
		          				dockedItems : [ {
								xtype : 'toolbar',
								dock : 'left',
								layout : {
									pack : 'end',
									type : 'vbox'
								},
								items : [
										{
											xtype : 'button',
											text : '选择',
											iconCls:'icon-double-angle-right blue',
											itemId : 'selBtn',
											handler : function(btn) {
												var win = btn.up('window');
												var mds = win.down('grid[itemId=selgrid]')
														.getSelectionModel().getSelection();
												if (mds != null && !Ext.isEmpty(mds)) {
													var dgrid = win.down('grid[itemId=detailgrid]');
													for(var i =0;i<mds.length;i++){
														var record = mds[i];
														var re = dgrid.getStore().findRecord('CORP_ID',record.get('CORP_ID'));
										            	if(Ext.isEmpty(re)){
										            		dgrid.getStore().add(record);
										            	}
													}
													dgrid.getStore().sort({
									                    property: 'CORP_ID',
									                    direction: 'ASC'
									                });
												}
											}
										},'-',
										 {
											xtype : 'button',
											itemId : 'removeBtn',
											iconCls:'icon-double-angle-left blue',
											text : '移除',
											handler : function(btn) {
												var win = btn.up('window');
												var dgrid = win.down('grid[itemId=detailgrid]');
												var mds = dgrid.getSelectionModel().getSelection();
												if (mds != null && !Ext.isEmpty(mds)) {
													dgrid.getStore().remove(mds);
													dgrid.getStore().sort({
									                    property: 'CORP_ID',
									                    direction: 'ASC'
									                });
												}
											}
									},
										{
											xtype : 'button',
											text : '确定',
											iconCls : 'accept_button',
											margin:'150 0 20 0',
											itemId : 'sureBtn',
											handler : function(btn) {
												var mds = btn.up('window').down('grid[itemId=detailgrid]').getStore().data.items;
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
                }
            ];
        me.callParent(arguments); //需要初始化
        try {
            var grid= me.down('grid[itemId=selgrid]');
            var dgrid= me.down('grid[itemId=detailgrid]');
            var store = grid.getStore();
            store.on('beforeload', function (st, options) {
                //beforeload之前附加查询参数
                var fm = me.down('form').getForm();
                st.proxy.extraParams = fm.getValues(false, false);
            });    
//            store.loadPage(1);
            grid.on('itemdblclick',function(gd, record, item, index, e, eOpts){
            	var re = dgrid.getStore().findRecord('CORP_ID',record.get('CORP_ID'));
            	if(Ext.isEmpty(re)){
            		dgrid.getStore().add(record);
					 dgrid.getStore().sort({
	                    property: 'CORP_ID',
	                    direction: 'ASC'
	                });
            	}
            });
            dgrid.on('itemdblclick',function(gd, record, item, index, e, eOpts){
				dgrid.getStore().remove(record);
				 dgrid.getStore().sort({
                    property: 'CORP_ID',
                    direction: 'ASC'
                });
            });
          //为查询按钮添加响应函数
            me.down('form button[itemId=searchBtn]').on({ click: function (btn) {
                store.loadPage(1);
            } });
            me.on('show',function(){
            	Ext.mytip.msg("提示","<font color='red'>双击可以快速选择和移除企业！</font>");
            });
        } catch (err) {
            if(console)    console.error(err);
        }
    },
    loadData:function(idstr,namestr){
    	var me = this;
    	if(Ext.isEmpty(idstr) || Ext.isEmpty(namestr)){
    		return;
    	}
    	var ids = idstr.split(',');
    	var names = namestr.split(',');
    	var records = [];
    	for(var i = 0 ;i < ids.length;i++){
    		var params = {};
    		params.CORP_ID = ids[i];
    		params.CORP_NAME = names[i];
    		records.push(params);
    	}
    	me.down('grid[itemId=selgrid]').getStore().loadPage(1);
    	var dgrid= me.down('grid[itemId=detailgrid]');
    	dgrid.getStore().add(records);
    	dgrid.getStore().sort({
                    property: 'CORP_ID',
                    direction: 'ASC'
                });
    }
});
