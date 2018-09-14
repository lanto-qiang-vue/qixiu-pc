Ext.define('app.view.report.RepairReportMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.report.RepairReportMngPanel',
	itemId: 'report.RepairReportMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [ /*me.getSearchPanel(),*/
					{
						xtype:'panel',
						itemId:'cpanel',
						region:'center',
						layout:{
							type:'hbox',
							pack : 'start',
							align:'stretch'
						},
						items:[me.transRepairChart(), me.repairChart()]
					}]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
		/*var form = me.down('form').getForm();
		var START_DATE = form.findField('ADD_DATE_gte');
		var END_DATE = form.findField('ADD_DATE_lte');
		var year = Ext.Date.format(new Date(),'Y');
		START_DATE.setValue(Ext.Date.parse(year + '-01-01','Y-m-d'));
		END_DATE.setValue(new Date());*/
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
	transRepairChart : function(){
		return {
			xtype:'panel',
			itemId:'stpanel',
			//region:'center',
			//margin:5,
			title:'运输车辆维修统计',
			flex:1.5,
			layout:'fit',
			items:[{
				xtype : 'component',
				margin:'20 0 0 0',
				itemId:'info',
				html:'<div style="margin-top:150px;text-align:center;color:#9e9e9e;">无运输车辆维修数据</div>'
			},{
				xtype : "chart",
				itemId : 'transRepairChart',
				store : Ext.create('Ext.data.Store',{
					fields:['CORP_NAME','REPAIR_NUM']
				}),
				animate : true,
				height : 300,
				width : 300,
				/*legend : {
					position : 'bottom'
				},*/
				series : [{
					type : "pie",
					field : "REPAIR_NUM",
					donut : true,
					showInLegend : true,
					label : {
						field:'CORP_NAME',
						display : "rotate",
						contrast : true
					},
					tips : {
						trackMouse : true,
						renderer : function(storeItem, item) {
							var total = 0;
							storeItem.store.each(function(record) {
								total += record.get('REPAIR_NUM');
							});
							//this.setTitle(storeItem.get("CORP_NAME"));
							this.update(Math.round(storeItem.get('REPAIR_NUM') / total * 100) + '%');
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
	repairChart : function(){
		return {
			xtype:'panel',
			itemId:'typanel',
			//region:'center',
			margin:'0 0 0 5',
			title:'普通车辆维修统计',
			flex:2,
			layout:'fit',
			items:[{
				xtype : 'component',
				margin:'20 0 0 0',
				itemId:'vehicleInfo',
				html:'<div style="margin-top:150px;text-align:center;color:#9e9e9e;">无普通车辆维修数据</div>'
			},{
				xtype : "chart",
				itemId : 'repairChart',
				store : Ext.create('Ext.data.Store',{
					fields:['MONTH','REPAIR_NUM']
				}),
				animate : true,
				//height : 300,
				flex : 1,
				legend : {
					position : 'top'
				},
				axes: [{
	                type: 'Numeric',
	                position: 'left',
	                fields: ['REPAIR_NUM'],
	                minimum: 0,
	                label: {
	                    renderer: Ext.util.Format.numberRenderer('0,0')
	                },
	                grid: true,
	                title: '维修数量'
	            }, {
	                type: 'Category',
	                position: 'bottom',
	                fields: ['MONTH'],
	                label: {
		                rotate: {
		                    //degrees: 45
		                }
		            }
	                //title: '月份'
	            }],
				series : [{
					title:['维修数量'],
	                type: 'column',
	                axis: 'left',
	                highlight: true,
	                tips: {
	                  trackMouse: true,
	                  width: 140,
	                  renderer: function(storeItem, item) {
	                    this.setTitle(storeItem.get('MONTH'));
	                    this.update('维修数量:' +  storeItem.get('REPAIR_NUM'));
	                  }
	                },
	                xField: 'MONTH',
	                yField: ['REPAIR_NUM']
	            }]
			}]
		}
	}
});
