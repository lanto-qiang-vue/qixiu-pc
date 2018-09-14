Ext.define('app.view.corp.TbCorpQualificationLogWin', {
    extend: 'Ext.window.Window',
    alias:'widget.corp.TbCorpQualificationLogWin',
    itemId : 'corp.TbCorpQualificationLogWin',
    height: 570,
    width: 800,
    title:'资质历史记录查询',
    autoShow : true,
    modal : true,
    layout : 'border',
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
          			bodyPadding: 5,
          			split : true,
                    items: [
                        {
                            xtype: 'jsf.ModelContainer',
                            model: 'app.model.corp.TbCorpQualificationLogModel',
                            layout:'column',
                            columns:4,
                            labelWidth: 70,
                            showType: 'search',
                            items: [ 
										{fname:'OPE_OBJECT',blankItem:true},
							            {fname:'OPE_TYPE',blankItem:true},
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

                        }
                    ]
                },
                {
                    xtype: 'jsf.ModelGrid',
                    itemId : 'detailgrid',
                    rowSelType:false,
                    region : 'center',
                    title: '列表',
                    model: 'app.model.corp.TbCorpQualificationLogModel',
                    url: 'client/corp/tbcorpinfo/logList', 
                    columns: [
                        {xtype: 'rownumberer', text:'序号'},
                        'OPE_TYPE',
                        'OPE_OBJECT',
                        'CORP_NUM',
                        {fname:'CORP_NAME',width:200},
                        {fname:'CORP_TYPE',width:200},
						{fname:'CORP_AREA',renderer: app.utils.FunUtils.findAreaByCode},
						{fname:'OPE_CAUSE',width:250},
                        {fname:'OPE_TIME',width:150}
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
                st.proxy.extraParams = fm.getValues(false, true);
            });    
//            store.loadPage(1);
          //为查询按钮添加响应函数
            me.down('form button[itemId=searchBtn]').on({ click: function (btn) {
                store.loadPage(1);
            } });
            
        } catch (err) {
            if(console)    console.error(err);
        }
    },
    loadData : function(record){
    	var me = this;
    	me.down('grid').getStore().loadPage(1);
    }
});
