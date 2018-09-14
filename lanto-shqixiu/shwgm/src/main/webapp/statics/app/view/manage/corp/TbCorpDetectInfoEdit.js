Ext.define('app.view.manage.corp.TbCorpDetectInfoEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.corp.TbCorpDetectInfoEdit',
	itemId: 'manage.corp.TbCorpDetectInfoEdit',
	title: '编辑页面',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	width : 600,
	height:350,
	autoScroll:true,
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
				model : 'app.model.corp.TbCorpDetectInfo',
				defaults: {msgTarget:'side',width:250},
				layout: {
            		type: 'table',
            		columns: 2
        		},
        		labelWidth: 100,
				btns:[],
				items: [
					{fname:'STATION_ID',hidden:true},
					{fname:'STATION_NAME'},
					{fname:'STATION_NAME_JC'},
					{fname:'STATION_TEL'},
					{fname:'STATION_FAL'},
					{fname:'STATION_ADDRESS'},
					{	
						xtype:'combo',
						name:'STATION_AREA',
						fieldLabel : '所属辖区',
		                editable:false,
		                store:Ext.getStore("sys_belong_area"),
		                displayField: 'NAME',  
		                valueField: 'CODE',
		                queryMode: 'local'
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
	}
});
