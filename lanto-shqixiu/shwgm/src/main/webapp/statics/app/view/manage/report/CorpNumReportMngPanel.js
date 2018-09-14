Ext.define('app.view.manage.report.CorpNumReportMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.report.CorpNumReportMngPanel',
	itemId: 'manage.report.CorpNumReportMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		me.items = [{
			xtype:'panel',
			layout : 'border',
			region:'center',
			border:false,
			items:[me.getGridPanel(),{
				xtype:'panel',
				itemId:'infoPanel',
				region:'center',
				//layout:'fit',
				autoScroll:true,
				layout : {
					type:'hbox',
					pack:'start',
					align:'stretch'
				},
				bodyPadding:'5 5 5 0',
				title:'企业数量统计柱状图',
				flex:3,
				items:[me.getChart('repairChart','REPAIR_CORP_NUM')]
			}]
		}];
		me.callParent(arguments);
	},
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'west',
			rowSelType : 'MULTI',
			flex:2,
			collapsible:true,
			split:true,
			header:{
				hidden:true
			},
			border:false,
			bodyPadding:'5 5 5 0',
			model : 'app.model.report.CorpNumReport',
			url : 'manage/report/corpnumreport/list',
			columns : [
				{text:'序号',xtype:'rownumberer',renderer:function(v,c,r,i){
					return  i + 1;
				}},
				{fname:'AREA_NAME',flex:1,align:'center'},
				{fname:'REPAIR_CORP_NUM',flex:1,align:'center'},
				{fname:'TRANS_CORP_NUM',flex:1,align:'center'},
				{fname:'DETECT_CORP_NUM',flex:1,align:'center'}
			]
		};
	},
	getChart : function(id_,filed_){
		return {
			xtype : "chart",
			itemId : id_,
			store : Ext.create('Ext.data.Store',{
				fields:['AREA_NAME','REPAIR_CORP_NUM','TRANS_CORP_NUM','DETECT_CORP_NUM']
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
                fields: ['REPAIR_CORP_NUM', 'TRANS_CORP_NUM', 'DETECT_CORP_NUM'],
                minimum: 0,
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                grid: true,
                title: '企业数量'
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['AREA_NAME'],
                label: {
	                rotate: {
	                    degrees: 45
	                }
	            },
                title: '所属辖区'
            }],
			series : [{
				title:['维修企业','运输企业','检测站'],
                type: 'column',
                axis: 'left',
                highlight: true,
                tips: {
                  trackMouse: true,
                  width: 140,
                  renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('AREA_NAME'));
                    this.update('维修企业数量:' +  storeItem.get('REPAIR_CORP_NUM')  + '<br/>' +
                    			'运输企业数量:' + storeItem.get('TRANS_CORP_NUM')  + '<br/>' +
                    			'检测站数量:' + storeItem.get('DETECT_CORP_NUM'));
                  }
                },
                xField: 'AREA_NAME',
                yField: ['REPAIR_CORP_NUM', 'TRANS_CORP_NUM', 'DETECT_CORP_NUM']
            }]
		}
	}
});
