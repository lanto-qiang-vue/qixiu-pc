Ext.define('app.view.manage.publicservice.RepairQuestionsMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.publicservice.RepairQuestionsMngPanel',
	itemId: 'manage.publicservice.RepairQuestionsMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		me.items = [{
				xtype:'panel',
				region:'north',
				border:false,
				items:[me.getSearchPanel()]
			},{
			xtype:'panel',
			/*layout : {
				type:'hbox',
				pack:'start',
				align:'stretch'
			},*/
			layout:'border',
			region:'center',
			border:true,
			items:[me.getGridPanel(),{
				xtype:'panel',
				itemId:'infoPanel',
				region:'center',
				autoScroll : true,
				title:'问答详情',
				flex:1,
				tpl:['<table class="table_" width="100%" height="100%">',
					  '<tr>',
					    '<td width="16%">用户名</td>',
					    '<td width="16%">{USER_CODE}</td>',
					    '<td width="16%">用户姓名</td>',
					    '<td width="16%">{USER_NAME}</td>',
					    '<td width="16%">浏览次数</td>',
					    '<td width="16%">{VIEW_NUMBER}</td>',
					  '</tr>',
					  '<tr>',
					    '<td>提问时间</td>',
					    '<td>{CREATE_TIME}</td>',
					    '<td>汽车品牌</td>',
					    '<td>{VEHICLE_BRAND}</td>',
					    '<td>车系</td>',
					    '<td>{VEHICLE_TYPE}</td>',
					  '</tr>',
					  '<tr>',
					    '<td>类型</td>',
					    '<td>{TYPE:this.renderer}</td>',
					    '<td>指定专家</td>',
					    '<td>{EXPERT_NAME}</td>',
					    '<td>状态</td>',
					    '<td>{STATUS:this.renderer}</td>',
					  '</tr>',
					  '<tr height="90">',
					    '<td>问题</td>',
					    '<td colspan="5">{CONTENT}</td>',
					  '</tr>',
					  '<tr>',
					    '<td>专家姓名</td>',
					    '<td>{ANSWER_EXPERT_NAME}</td>',
					    '<td>回答时间</td>',
					    '<td colspan="3">{ANSWER_TIME}</td>',
					  '</tr>',
					  '<tr height="90">',
					    '<td>专家回答</td>',
					    '<td colspan="5">{ANSWER_CONTENT}</td>',
					  '</tr>',
					'</table>',{
						renderer:function(v){
							return funutils.renderer(v);
						}
					}]
			}]
		}];
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
			model : 'app.model.manage.publicservice.RepairQuestions',
			layout:'column',
			columns:5,
			labelWidth: 70,
			showType : 'search',
			items: [
					'TYPE',
					'STATUS',
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
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'west',
			rowSelType : 'MULTI',
			flex:1.2,
			split : true,
			collapsible:true,
			title:'问答列表',
			model : 'app.model.manage.publicservice.RepairQuestions',
			url : 'manage/publicservice/repairquestions/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'TYPE',flex:1},
				{fname:'CONTENT',flex:4},
				{fname:'VIEW_NUMBER',flex:1},
				{fname:'STATUS',flex:1},
				{fname:'CREATE_TIME',flex:2,format:'Y-m-d H:i:s'}
			],
			btns : [{
				xtype : 'button',
				iconCls:'icon-remove-sign red font-bold',
				text : '删除',
				itemId : 'deleteBtn'
			}]
		};
	}
});
