Ext.define('app.view.notice.TbNoticeReceiveMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.notice.TbNoticeReceiveMngPanel',
	itemId: 'notice.TbNoticeReceiveMngPanel',
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
	},
	getSearchPanel : function(){
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
			model : 'app.model.notice.TbNoticeModel',
			layout:'column',
			columns:4,
			labelWidth: 80,
			showType : 'search',
			items: [
					'NOTICE_TITLE',
					'SEND_DATE',
					'SEND_BY',
					'DATA_FROM',
					'IS_RESULT',
					'STATUS',
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
		};
	},
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.notice.TbNoticeModel',
			url : 'check/notice/tbnoticereceive/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'NOTICE_TITLE',flex:2},
				{fname:'SEND_DATE',flex:1,format:'Y-m-d H:i:s'},
				{fname:'SEND_BY',flex:1},
				{fname:'DATA_FROM',flex:1},
				{dataIndex : "IS_SEE",text : "查看状态",flex:0.6,renderer:function(value, meta, record){
					var yes = "<font color='blue'>已查看</font>";
					var no = "<font color='red'>未查看</font>";
					if(value == '10041001'){
						return yes;
					}else{
						return no;
					}
	    			return no;
				}},
				{fname:'SEE_DATE',flex:1,format:'Y-m-d H:i:s'},
				{dataIndex:'IS_RESULT',text:'是否需回执',flex:0.6,renderer:function(value, meta, record){
					var IS_RESULT = record.data.IS_RESULT;
					var yes = "<font color='red'>是</font>";
					var no = "<font color='blue'>否</font>";
					if(value == '10041001'){
						return yes;
					}else{
						return no;
					}
	    			return no;
				}},
				{dataIndex:'IS_ALREAD_RESULT',text:'回执状态',flex:0.6,renderer:function(value, meta, record){
					var IS_RESULT = record.data.IS_RESULT;
					var yes = "<font color='blue'>已回执</font>";
					var no = "<font color='red'>未回执</font>";
					if(IS_RESULT == '10041002'){
						return "———";
					}else{
						if(value == '10041001'){
							return yes;
						}else{
							return no;
						}
					}
	    			return no;
				}}
			],
			btns : [{
				xtype : 'button',
				text : '查看',
				itemId : 'viewBtn',
				iconCls:'cd_button'
			}]
		};
	}
});
