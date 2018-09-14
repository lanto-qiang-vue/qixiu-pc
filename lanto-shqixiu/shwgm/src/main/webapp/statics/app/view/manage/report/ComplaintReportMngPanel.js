Ext.define('app.view.manage.report.ComplaintReportMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.report.ComplaintReportMngPanel',
	itemId: 'manage.report.ComplaintReportMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [ me.getSearchPanel(),
					{
						xtype:'panel',
						itemId:'cpanel',
						region:'center',
						layout:{
							type:'hbox',
							pack : 'start',
							align:'stretch'
						},
						items:[me.getStatusChart(), me.getTypeChart()]
					}]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
		var form = me.down('form').getForm();
		var START_DATE = form.findField('ADD_DATE_gte');
		var END_DATE = form.findField('ADD_DATE_lte');
		var year = Ext.Date.format(new Date(),'Y');
		START_DATE.setValue(Ext.Date.parse(year + '-01-01','Y-m-d'));
		END_DATE.setValue(new Date());
	},
	getSearchPanel : function(){
		return {
		xtype : 'form',
		itemId : 'spanel',
		region : 'north',
		bodyPadding: 5,
		title : '统计条件',
		split : true,
		collapsible:true,
		items :[{
			xtype:'jsf.ModelContainer',
			model : 'app.model.manage.publicservice.Complaint',
			layout:'column',
			columns:3,
			labelWidth: 70,
			showType : 'search',
			items: [
					'ADD_DATE',
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
							margin: '0 5 0 5'
						},{
							xtype : 'button',
							text : '重置',
							itemId: 'resetBtn',
							iconCls: 'icon-reply bigger-120 white',
							margin: '0 5 0 5',
							handler:function(btn){
								btn.up('form').getForm().reset();
							}
						}]
					}
				]
			}]
		};
	},
	getStatusChart : function(){
		return {
			xtype:'panel',
			itemId:'stpanel',
			//region:'center',
			//margin:5,
			title:'投诉状态统计',
			flex:2,
			layout:'fit',
			items:[{
				xtype : "chart",
				itemId : 'statusChart',
				store : Ext.create('Ext.data.Store',{
					fields:['ITEM_NAME','ITEM_SCORE']
				}),
				animate : true,
				height : 300,
				width : 300,
				legend : {
					position : 'right'
				},
				series : [{
					type : "pie",
					field : "ITEM_SCORE",
					donut : true,
					showInLegend : true,
					label : {
						field:'ITEM_NAME',
						display : "rotate",
						contrast : true
					},
					tips : {
						trackMouse : true,
						renderer : function(storeItem, item) {
							var total = 0;
							storeItem.store.each(function(record) {
								total += record.get('ITEM_SCORE');
							});
							this.setTitle(storeItem.get("ITEM_NAME"));
							this.update(Math.round(storeItem.get('ITEM_SCORE') / total * 100) + '%');
						}
					},
					highlight : {
						segment : {
							margin : 20
						}
					},
					listeners : {
						itemclick : function(o) {
							//var rec = store.getAt(o.index);
							//alert(record.get("ITEM_SCORE"));
						}
					}

				}]
			}]
		}
	},
	getTypeChart : function(){
		return {
			xtype:'panel',
			itemId:'typanel',
			//region:'center',
			margin:'0 0 0 5',
			title:'投诉类型统计',
			flex:2,
			layout:'fit',
			items:[{
				xtype : "chart",
				itemId : 'typeChart',
				store : Ext.create('Ext.data.Store',{
					fields:['ITEM_NAME','ITEM_SCORE']
				}),
				animate : true,
				height : 300,
				width : 300,
				legend : {
					position : 'right'
				},
				series : [{
					type : "pie",
					field : "ITEM_SCORE",
					donut : true,
					showInLegend : true,
					label : {
						field:'ITEM_NAME',
						display : "rotate",
						contrast : true
					},
					tips : {
						trackMouse : true,
						renderer : function(storeItem, item) {
							var total = 0;
							storeItem.store.each(function(record) {
								total += record.get('ITEM_SCORE');
							});
							this.setTitle(storeItem.get("ITEM_NAME"));
							this.update(Math.round(storeItem.get('ITEM_SCORE') / total * 100) + '%');
						}
					},
					highlight : {
						segment : {
							margin : 20
						}
					},
					listeners : {
						itemclick : function(o) {
							//var rec = store.getAt(o.index);
							//alert(record.get("ITEM_SCORE"));
						}
					}

				}]
			}]
		}
	}
});
