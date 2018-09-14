Ext.define('app.view.sys.SendQueryMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.sys.SendQueryMngPanel',
	itemId: 'sys.SendQueryMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [ me.getSearchPanel(), me.getGridPanel()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
		var form = me.down('form').getForm();
		form.findField('SEND_TIME_gte').setValue(Ext.Date.format(new Date(), 'Y-m') + '-01');
		form.findField('SEND_TIME_lte').setValue(new Date());
	},
	getSearchPanel : function(){
		var me = this;
		return {
		xtype : 'form',
		itemId : 'spanel',
		region : 'north',
		bodyPadding: 5,
		title : '查询',
		split : true,
		collapsible:true,
		items :[{
			xtype:'jsf.ModelContainer',
			model : 'app.model.sys.SendQuery',
			layout:'column',
			columns:4,
			labelWidth: 70,
			showType : 'search',
			items: [
					'SEND_TIME',
					'CERT_NUM',
					{fname:'REPAIR_TYPE',blankItem:true},
					{
						xtype: 'container',
						layout:{
							type: 'hbox',
							pack : 'start'
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
								var form = me.down('form').getForm();
								form.findField('SEND_TIME_gte').setValue(Ext.Date.format(new Date(), 'Y-m') + '-01');
								form.findField('SEND_TIME_lte').setValue(new Date());
							}
						}]
					}]
			}]
		};
	},
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			rowSelType : false,
			model : 'app.model.sys.SendQuery',
			url : 'manage/sys/sendquery/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'SEND_TIME',width:120,format:'Y-m-d H:i:s'},
				{fname:'CERT_NUM',width:100},
				{fname:'VEHICLE_NUM',width:100},
				{fname:'OPERATING_UNIT_TEL',width:100},
				{fname:'STATUS',width:100},
				{fname:'REPAIR_TYPE',width:100},
				{fname:'SEND_CONTENT',width:600}
			],
			plugins: [{
	            ptype: 'rowexpander',
	            rowBodyTpl : new Ext.XTemplate(
	                '<div>',
	                '<div style="line-height:20px;"><b>发送内容： </b></div>' ,
	                '<div class="orange font-bold" style="padding:10px;line-height:20px;">{SEND_CONTENT}</div>',
	                '</div>'
	            )
	        }],
			btns : [{
				xtype : 'button',
				iconCls:'icon-download-alt bigger-120 blue',
				text : 'Excel导出',
				itemId : 'exportBtn'
			}]
		};
	}
});
