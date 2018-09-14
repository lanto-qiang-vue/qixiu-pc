Ext.define('app.view.corp.TbTransEmployeeWin',{
	extend:'Ext.window.Window',
	alias: 'widget.corp.TbTransEmployeeWin',
	itemId: 'employee.TbTransEmployeeWin',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	title:'企业从业人员资料',
	layout : 'border',
	width : 800,
	height:600,
	autoScroll:true,
	modal : true,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [me.getSearchPanel(), me.getGridPanel(),me.getCard()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
		var form = me.down('form').getForm();
		var store = me.down('grid[itemId=gpanel]').getStore();
		store.on('beforeload', function (st, options) {
			st.proxy.extraParams=form.getValues();
		});
		me.down('grid[itemId=gpanel]').on('select',function(cob, record, index, e, eOpts){
			var sto = me.down('grid[itemId=certgrid]').getStore();
			sto.proxy.extraParams = record.data;
			sto.loadPage(1);
		});
		store.on('datachanged', function (st, options) {
			me.down('grid[itemId=certgrid]').getStore().removeAll();
			me.down('grid[itemId=gpanel]').getSelectionModel().select(0);
		});
		me.down('button[itemId=searchBtn]').on('click',function(btn){
			store.loadPage(1);
		});
	},
	getSearchPanel : function(){
		return {
		xtype : 'form',
		itemId : 'spanel',
		region : 'north',
		split : true,
		items :[{
			xtype:'jsf.ModelContainer',
			model : 'app.model.employee.TbEmployeeModel',
			layout:'column',
			layout: {
        		type: 'table',
        		columns: 3
    		},
    		defaults: {anchor: '33%'},
			labelWidth: 80,
			showType : 'search',
			items: [
					'NAME',
					'ID_NUM',
					{
						xtype: 'container',
						width:250,
						layout:{
							type: 'hbox',
							pack : 'center'
						},
						items:[{ xtype:'checkbox',boxLabel: '持证', name: 'IS_CERT', inputValue: '10041001',padding:'0 0 0 5',checked:true},
							{
							xtype: 'button',
							iconCls: 'icon-search bigger-120 blue',
							text : '查 询',
							itemId: 'searchBtn',
							margin:'0 0 0 10'
						},{
							xtype : 'button',
							text : '重 置',
							itemId: 'resetBtn',
							iconCls: 'icon-reply bigger-120 blue',
							margin:'0 0 0 10',
							handler:function(btn){
								btn.up('form').getForm().reset();
							}
						},{
							xtype : 'button',
							text : '关 闭',
							itemId: 'closeBtn',
							iconCls: 'close_button',
							margin:'0 0 0 10',
							handler:function(btn){
								btn.up('window').close();
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
			model : 'app.model.employee.TbEmployeeModel',
			url : 'client/employee/tbemployee/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},				
				'EMPLOYEE_ID',
				'NAME',
				'ID_NUM',
				'SEX',
				'CORP_NUM',
				'CORP_NAME',
				'BIRTH_DATE',
				'POST',
				'TELPHONE',
				'ADDRESS'
			],
			btns : []
		};
	},
	getCard:function(){
		var me = this;
		return {
			xtype:'jsf.ModelGrid',
			title:'证件详细资料',
			rowSelType : false,
			emptyText:'',
			region : 'south',
			itemId:'certgrid',
			height:150,
			paging:false,
			model:'app.model.employee.TbEmployeeCertModel',
			url:'client/employee/tbemployee/certList',
			columns:[
				{text:'序号',xtype:'rownumberer'},
				{fname:'CERT_NUM',flex:1},
				{fname:'CERT_NAME',flex:2},
				{fname:'SEND_DATE',flex:1},
				{fname:'END_DATE',flex:1}
			],
			 btns:[]
		};
	},
	loadData:function(data){
		var store = this.down('grid[itemId=gpanel]').getStore();
		store.loadPage(1);
	}
});
