Ext.define('app.view.manage.report.CommentReportMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.report.CommentReportMngPanel',
	itemId: 'manage.report.CommentReportMngPanel',
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
						layout:'fit',
						items:[me.getChart(),me.getScoreChart()]
						//items:[me.getScoreChart()]
					}]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
	},
	getChart : function(){
		return {
			xtype : "chart",
			itemId : 'cchart',
			store : Ext.create('Ext.data.Store',{
				fields:['AREA_NAME','SMALL_STAR2','STAR2','STAR3','BIG_STAR4']
			}),
			animate : true,
			//height : 300,
			flex : 1,
			legend : {
				position : 'top'
			},
			axes: [{
                type: 'Numeric',
                decimals:0,
                position: 'left',
                fields: ['SMALL_STAR2','STAR2','STAR3','BIG_STAR4'],
                minimum: 0,
                minorTickSteps: 1,
                label: {
                    renderer: Ext.util.Format.numberRenderer('0.0')
                },
                grid: true,
                title: '企业数量'
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['AREA_NAME'],
                label: {
	                rotate: {
	                    //degrees: 45
	                }
	            },
                title: '所属辖区'
            }],
			series : [{
				title:['二星以下','二星级','三星级','四星级以上'],
                type: 'column',
                axis: 'left',
                highlight: true,
                tips: {
                  trackMouse: true,
                  width: 140,
                  renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('AREA_NAME'));
                    this.update('二星以下:' +  storeItem.get('SMALL_STAR2')  + '<br/>' +
                    			'二星级:' + storeItem.get('STAR2')  + '<br/>' +
                    			'三星级:' + storeItem.get('STAR3')  + '<br/>' +
                    			'四星以上:' + storeItem.get('BIG_STAR4'));
                  }
                },
                xField: 'AREA_NAME',
                yField: ['SMALL_STAR2','STAR2','STAR3','BIG_STAR4']
            }]
		}
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
					Ext.create('Ext.form.ComboBox', {
					    fieldLabel: '选择图表',
					    name:'typeCombo',
					    store: Ext.create('Ext.data.Store', {
						    fields: ['value', 'name'],
						    data : [
						        {"value":1, "name":"辖区星级企业统计"},
						        {"value":2, "name":"服务评价走势曲线"}
						    ]
						}),
					    queryMode: 'local',
					    displayField: 'name',
					    valueField: 'value',
					    listeners: {
					       afterRender: function(combo) {
						        　  　//var firstValue = combo.getStore().reader.jsonData[0].text;
						        　  　combo.setValue(1);
					       }  
					    }
					}),{
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
	//服务评价折线图
	getScoreChart : function(){
		return {  
            xtype: 'chart',
            animate: true,  
            shadow: true,  
            itemId:'schart',
            store: Ext.create('Ext.data.JsonStore', {  
        		fields: ['name', 'score']
        	}),  
            /*legend: {  
               position: 'right'
            },*/  
            axes: [{  
                type: 'Numeric',  
                position: 'left',  
                fields: ['score'],  
                title: '平均评价分',  
                label: {
		            renderer: Ext.util.Format.numberRenderer("0.##"),
		            font: "10px Arial"
		        },
                maximum: 5,
                grid: {  
                    odd: {  
                        opacity: 1,  
                        fill: '#ddd',  
                        stroke: '#bbb',  
                        'stroke-width': 0.5  
                    }  
                }  
            }, {  
                type: 'Category',  
                position: 'bottom',  
                fields: 'name',  
                title: '服务评价曲线图'  
            }],  
             series: [
            	{
		        type: "line",
		        highlight: true,
		        axis: "left",
		        label: {
                  	display: 'over',
                  	'text-anchor': 'middle',
                    field: 'score',
                    format:'0.##',
                    orientation: 'horizontal',
                    fill: '#ffffff',
                    font: '17px Arial',
                    renderer: function(v) {
		                return Ext.util.Format.number(v,"0.##");
		            }
                },
		        xField: "name",
		        yField: "score",
		        tips: {
		            trackMouse: true,
		            width: 80,
		            height: 40,
		            renderer: function(A, B) {
		                this.setTitle(A.get("name"));
		                this.update(Ext.util.Format.number(A.get("score"),"0.##"))
		            }
		        },
		        style: {
		            fill: "#157FCC",
		            stroke: "#157FCC",
		            "stroke-width": 3
		        },
		        markerConfig: {
		            type: "circle",
		            size: 4,
		            radius: 4,
		            "stroke-width": 0,
		            fill: "#f00",
		            stroke: "#157FCC"
		        }
		    }]
		}
	}
});
