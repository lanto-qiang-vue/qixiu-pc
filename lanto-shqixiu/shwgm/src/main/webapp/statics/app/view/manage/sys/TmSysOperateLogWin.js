Ext.define('app.view.sys.TmSysOperateLogWin',{
	extend:'Ext.window.Window',
	alias: 'widget.sys.TmSysOperateLogWin',
	itemId: 'sys.TmSysOperateLogWin',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	title:'当前用户操作日志',
	autoShow : true,
	closable : true,
	isEdit:false,
	fileBillId:'',
	layout:'border',
	width : 900,
	height:550,
	modal : true,
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
			model : 'app.model.sys.TmSysOperateLogModel',
			layout:'column',
			columns:3,
			labelWidth: 80,
			showType : 'search',
			items: [
					{xtype:'hidden',name:'type',value:'win'},
					'MODULE_NAME',
					'OPERATE_TIMERG',
					{
						xtype: 'container',
						layout:{
							type: 'hbox',
							pack : 'start'
						},
						items:[{
							xtype: 'button',
							iconCls: 'icon-search bigger-120 blue',
							text : '查询',
							itemId: 'searchBtn',
							margin:'0 0 0 10',
							handler:function(btn){
								var win = btn.up('window');
								win.down('grid').getStore().loadPage(1);
							}
						},{
							xtype : 'button',
							text : '重置',
							itemId: 'resetBtn',
							iconCls: 'icon-reply bigger-120 blue',
							margin:'0 0 0 10',
							handler:function(btn){
								btn.up('form').getForm().reset();
							}
						},{
							xtype : 'button',
							itemId : 'closeBtn',
							iconCls : 'close_button',
							text : '关 闭',
							margin:'0 0 0 10',
							handler : function(btn) {
								btn.up('window').close();
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
			model : 'app.model.sys.TmSysOperateLogModel',
			url : 'manage/sys/tmsysoperatelog/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				'OPERATOR_ID',
				{fname:'MACHINE_ID',width:150},
				{fname:'MODULE_NAME',width:200},
				{fname:'OPERATE_TIME',width:140},
				{fname:'OPERATE_CONTENT',width:450}
			],
			btns : []
		};
	},
	loadData:function(){
		var me = this;
		var st = me.down('grid').getStore();
		st.on('beforeload', function (store, options) {
			var fm = me.down('form').getForm();
			store.proxy.extraParams=fm.getValues();
		});
		st.loadPage(1);
	}
});
