Ext.define('app.view.manage.publicservice.QuestionsView',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.publicservice.QuestionsView',
	itemId: 'manage.publicservice.QuestionsView',
	title: '查看问卷调查',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	width : 850,
	border:false,
	height:550,
//	autoScroll:true,
	modal : true,
	maximizable : true,
	initComponent : function() {
		var me = this;
		me.items = [{
				xtype:'panel',
				itemId:'infoPanel',
				region:'north',
				border:false
				//title:'问卷调查信息'
			},{
				xtype:'panel',
				layout : {
					type:'hbox',
					pack:'start',
					align:'stretch'
				},
				region:'center',
				border:true,
				title:'问卷调查结果',
				items:[me.getSubGridPanel(),{
					xtype:'panel',
					itemId:'chartPanel',
					region:'center',
					margin:5,
					title:'问卷调查图表',
					flex:2,
					layout:'fit',
					items:[{
							xtype : 'component',
							itemId:'info',
							html:'<div style="margin-top:130px;text-align:center;color:#9e9e9e;">请点击左边表格中的记录查看</div>'
						},{
						xtype : "chart",
						itemId : 'quesChart',
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
				}]
			}];
		me.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : ['->', {
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'icon-off red',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
				} ]
			} ];
		me.callParent(arguments);
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		var infoPanel=me.down('#infoPanel');
		infoPanel.setLoading("正在加载内容...");
		me.loadHtml(record);
		infoPanel.setLoading(false);
	},
	loadHtml : function(record){
		var me = this;
		var infoPanel=me.down('#infoPanel');
		var html = "<div class='zw_title' align='center'>" + record.data.TITLE + "</div>";
		html = html + "<div style='margin:10px 10px 5px 10px;width:98%;align:center;height:1px;background-image:url( images/zwgk_xxian03a.gif );' align='center'></div>";
		html = html + '<table width="96%" border="0" cellspacing="0" cellpadding="0" align="center" style="margin-bottom:10px;">' +
          '<tbody>' +
          	'<tr>' +
            '<td align="center" class="Gray12" style="white-space:nowrap;"> 发布人：' + record.data.CREATOR + 
            ' &nbsp;&nbsp;|&nbsp;&nbsp; 发布时间：' + Ext.Date.format(record.data.CREATE_TIME, 'Y-m-d H:i:s') +
         ' </tr>' +
        '</tbody></table>';
        html = html + "<div style='width:98%;padding-left:15px;'><b>调查描述：</b>" + record.data.CONTENT + "</div>";
        html = html + "<div style='margin:10px;width:98%;align:center;height:1px;background-image:url( images/zwgk_xxian03a.gif );' align='center'></div>";
		infoPanel.update(html);
	},
	getSubGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'subgpanel',
			margin:5,
			paging:false,
			flex:1,
			title:'题目',
			//rowSelType : 'MULTI',
			model : 'app.model.manage.publicservice.SubQuestions',
			url : 'manage/publicservice/subquestions/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'SUB_TITLE',flex:1},
				{fname:'QUES_ID',hidden:true},
				{fname:'SUBJECT_ID',hidden:true}
			]
		};
	}
});
