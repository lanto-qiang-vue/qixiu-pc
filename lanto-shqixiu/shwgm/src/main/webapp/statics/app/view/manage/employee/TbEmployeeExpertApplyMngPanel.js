Ext.define('app.view.manage.employee.TbEmployeeExpertApplyMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.employee.TbEmployeeExpertApplyMngPanel',
	itemId: 'manage.employee.TbEmployeeExpertApplyMngPanel',
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
			model : 'app.model.employee.TbEmployeeExpertApplyModel',
			layout:'column',
    		columns: 4,
    		defaults: {anchor: '33%'},
			labelWidth: 80,
			showType : 'search',
			items: [
					'NAME',
					'EMP_UNIT',
					'GOOD_AT',
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
					}]
			}]
		};
	},
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.employee.TbEmployeeExpertApplyModel',
			url : 'manage/employee/tbemployeeexpertapply/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},				
				{fname:'NAME',flex:1},
				{fname:'SEX',flex:1},
				{fname:'BIRTH_DATE',flex:2},
				{fname:'ID_NUM',flex:2},
				{fname:'EMP_UNIT',	flex:3},			
				{fname:'DEGREE',flex:1},
				{fname:'PROFESSOR',flex:2},
				{fname:'GOOD_AT',flex:3},
				{fname:'TELPHONE',flex:2},
				{fname:'STATUS',flex:2}
			],
			btns : [{
				xtype : 'button',
				text : '审核',
				itemId : 'checkBtn',
				iconCls:'icon-check blue'
			},'-',{
				xtype : 'button',
				text : '查 看',
				itemId : 'viewBtn',
				iconCls:'read_button'
			}]
		};
	}
});
