Ext.define('app.view.sys.SendTotalMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.sys.SendTotalMngPanel',
	itemId: 'sys.SendTotalMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer','app.ux.MonthField'],
	autoShow : true,
	closable : true,
	bodyPadding : 5,
	autoScroll:true,
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
		var d = new Date();
		var lted = new Date(d.getTime() - 180*24*60*60*1000);
		form.findField('MONTH_YEAR_lte').setValue(d);
		form.findField('MONTH_YEAR_gte').setValue(lted);
		
		form.findField('SEND_TIME_gte').setValue(Ext.Date.format(new Date(), 'Y-m') + '-01');
		form.findField('SEND_TIME_lte').setValue(new Date());
		
		me.down('[itemId=qushigroup]').on('change',function( g, newValue, oldValue, eOpts){
			if(newValue.qushi == '1'){
				me.down('[itemId=MONTH_YEAR_]').hide();
				me.down('[itemId=SEND_TIME_]').show();
			}else{
				me.down('[itemId=MONTH_YEAR_]').show();
				me.down('[itemId=SEND_TIME_]').hide();
			}
		});
		var store = me.down('grid').getStore();
		me.add(me.getChartPanel(store));
	},
	getSearchPanel : function(){
		var  me = this;
		return {
		xtype : 'form',
		itemId : 'spanel',
		region : 'north',
		bodyPadding: 5,
		title : '查询',
		items :[{
			xtype:'jsf.ModelContainer',
			model : 'app.model.sys.SendQuery',
			layout:'column',
			columns:3,
			labelWidth: 70,
			showType : 'search',
			items: [
					{
						xtype : "fieldcontainer",
						fieldLabel : '年月',
						hidden:true,
						itemId:'MONTH_YEAR_',
						layout : {
							type : "hbox",
							align : "stretch"
						},
						items : [{xtype:'monthfield',name:'MONTH_YEAR_gte',format:'Y-m',flex:1}, {
									xtype : "label",
									text : "_",
									margin : "0 3 0 3"
								}, {xtype:'monthfield',name:'MONTH_YEAR_lte',format:'Y-m',flex:1}]
					},
					{
						xtype : "fieldcontainer",
						fieldLabel : '日期',
						itemId:'SEND_TIME_',
						layout : {
							type : "hbox",
							align : "stretch"
						},
						items : [{xtype:'datefield',name:'SEND_TIME_gte',format:'Y-m-d',flex:1}, {
									xtype : "label",
									text : "_",
									margin : "0 3 0 3"
								}, {xtype:'datefield',name:'SEND_TIME_lte',format:'Y-m-d',flex:1}]
					},
					{
			            xtype: 'radiogroup',
			            itemId:'qushigroup',
			            columns: 4,
			            columnWidth:60,
			            items: [
			                {boxLabel: '日趋势', name: 'qushi', inputValue: 1,checked: true},
			                {boxLabel: '月趋势', name: 'qushi', inputValue: 2}
			            ]
			        },
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
							margin:'0 0 0 10'
						},{
							xtype : 'button',
							text : '重置',
							itemId: 'resetBtn',
							iconCls: 'icon-reply bigger-120 blue',
							margin:'0 0 0 10',
							handler:function(btn){
								btn.up('form').getForm().reset();
								var form = me.down('form').getForm();
								var d = new Date();
								var lted = new Date(d.getTime() - 180*24*60*60*1000);
								form.findField('MONTH_YEAR_lte').setValue(d);
								form.findField('MONTH_YEAR_gte').setValue(lted);
								
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
			paging:false,
			height:300,
			rowSelType : false,
			model : 'app.model.sys.SendTotal',
			url : 'manage/sys/sendtotal/list',
			features: [{
		           ftype: 'summary'
		    }],				
			columns : [
				{text:'序号',xtype:'rownumberer'},
				//{fname:'SEND_ITEM',flex:1},
				{fname:'SEND_ITEM',flex:1,summaryType: 'count',locked: true,width:200,format:'Y-m-d H:i:s',

	                summaryRenderer: function(value, summaryData, dataIndex) {
	                    return '合计：';
	                }
				} ,					
				{fname:'TOTAL_SEND',flex:1,summaryType: 'sum'},
				{fname:'PTWX_SEND',flex:1,summaryType: 'sum'},
				{fname:'PQWR_SEND',flex:1,summaryType: 'sum'},
				{fname:'EJWF_SEND',flex:1,summaryType: 'sum'},
				{fname:'APP_SEND',flex:1,summaryType: 'sum'}
			],
			btns : [{
				xtype : 'button',
				iconCls:'icon-download-alt bigger-120 blue',
				text : 'Excel导出',
				itemId : 'exportBtn'
			}]
		};
	},
	getChartPanel:function(areaStore){
		var me = this;
		return {
			xtype:'panel',
			title:'趋势图',
			layout:'fit',
			height:270,
			items:[{
	            	xtype:'chart',
	            	animate: true,
	            	itemId:'chart_area_line',
	            	store: areaStore,
				    axes: [{
				        type: "Numeric",
				        minimum: 0,
				        position: "left",
				        fields: ["TOTAL_SEND"],
							        title: '发送数量（条）',
				        grid: true,
				        label: {
				            renderer: Ext.util.Format.numberRenderer("0,0"),
				            font: "10px Arial"
				        }
				    }, {
				        type: "Category",
				        position: "bottom",
				        fields: ["SEND_ITEM"],
							        title: '日期/年月',
				        label: {
			                rotate: {
			                    degrees: 45
			                }
			            }
				    }],
				    series: [{
				        type: "line",
				        highlight: true,
				        axis: "left",
				        label: {
		                  	display: 'insideEnd',
		                  	'text-anchor': 'middle',
		                    field: 'TOTAL_SEND',
		                    orientation: 'horizontal',
		                    fill: '#ffffff',
		                    font: '17px Arial'
		                },
				        xField: "SEND_ITEM",
				        yField: "TOTAL_SEND",
				        tips: {
				            trackMouse: true,
				            width: 80,
				            height: 40,
				            renderer: function(A, B) {
				                this.setTitle(A.get("SEND_ITEM"));
				                this.update(A.get("TOTAL_SEND") + ' 条')
				            }
				        },
				        style: {
				            fill: "#38B8BF",
				            stroke: "#38B8BF",
				            "stroke-width": 3
				        },
				        markerConfig: {
				            type: "circle",
				            size: 4,
				            radius: 4,
				            "stroke-width": 0,
				            fill: "#38B8BF",
				            stroke: "#38B8BF"
				        }
				    }]
	        }]
		};
	}
});
