Ext.define('app.view.manage.credit.TbBdExamItemEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.credit.TbBdExamItemEdit',
	itemId: 'manage.credit.TbBdExamItemEdit',
	title: '编辑小项',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 800,
	height:500,
	autoScroll:true,
	modal : true,
	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			itemId:'npanel',
			bodyPadding : 5,
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.credit.TbBdExamItemModel',
				defaults: {msgTarget:'side',width:250},
				layout: {
	        		type: 'table',
	        		columns: 2
	    		},
				btns:[],
				items: [
					{fname:'ITEM_ID',hidden:true},
					{fname:'TYPE_ID',hidden:true},
					{fname:'TYPE_NAME',width:500,readOnly:true,colspan:2},
					{fname:'ITEM_NAME',width:500,allowBlank:false,colspan:2},
					{fname:'ITEM_SCORE',allowBlank:false},
					'ORDER_ID',
					{xtype:'textarea',anchor: '100%',height:200,fieldLabel:'项目明细',name:'ITEM_DETAIL',colspan:2,width:500
					}
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
	},
	loadAddData : function(typeId,typeName){
		var me = this;
		me.down('form').getForm().findField('TYPE_ID').setValue(typeId);
		me.down('form').getForm().findField('TYPE_NAME').setValue(typeName);
	}
});
