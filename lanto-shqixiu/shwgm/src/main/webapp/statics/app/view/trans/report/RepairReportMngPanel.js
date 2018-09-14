Ext.define('app.view.trans.report.RepairReportMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.trans.report.RepairReportMngPanel',
	itemId: 'trans.report.RepairReportMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [me.getChart()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
	},
	/*getSearchPanel : function(){
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
			model : 'app.model.repair.PartsModel',
			layout:'column',
			columns:5,
			labelWidth: 70,
			showType : 'search',
			items: [
					'PART_CODE',
					'PART_NAME',
					'PART_TYPE',
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
	},*/
	getChart : function(){
		return {
			xtype:'panel',
			itemId:'stpanel',
			region:'center',
			//margin:5,
			//title:'投诉状态统计',
			//flex:2,
			layout:'fit',
			items:[{
				xtype : "chart",
				itemId : 'repairChart',
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
							//this.setTitle(storeItem.get("ITEM_NAME"));
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
