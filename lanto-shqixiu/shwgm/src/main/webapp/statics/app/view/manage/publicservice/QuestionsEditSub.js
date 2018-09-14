Ext.define('app.view.manage.publicservice.QuestionsEditSub',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.publicservice.QuestionsEditSub',
	itemId: 'manage.publicservice.QuestionsEditSub',
	title: '问题选项',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : {
		type:'hbox',
		pack:'start',
		align:'stretch'
	},
	width : 900,
	border:false,
	height:500,
//	autoScroll:true,
	modal : true,
	maximizable : true,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [me.getSubGridPanel(),me.getOptionGridPanel()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
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
		//me.down('form').loadRecord(record);
	},
	getSubGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'subgpanel',
			margin:5,
			flex:1,
			title:'题目<span style="color:#EAE12B;">　(双击进行编辑)</span>',
			rowSelType : 'MULTI',
			paging:false,
			model : 'app.model.manage.publicservice.SubQuestions',
			url : 'manage/publicservice/subquestions/list',
			editType:new Ext.grid.plugin.CellEditing({
	            clicksToEdit: 2
	        }),
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'SUB_TITLE',flex:1,editor:true},
				{fname:'QUES_ID',hidden:true},
				{fname:'SUBJECT_ID',hidden:true}
			],
			btns : [{
				xtype : 'button',
				text : '新增',
				itemId : 'addBtn',
				iconCls:'font-bold cd_button blue'
			},{
				xtype : 'button',
				text : '删除',
				itemId : 'deleteBtn',
				iconCls:'icon-remove-sign red font-bold'
			}]
		};
	},
	getOptionGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'optiongpanel',
			title:'选项',
			margin:5,
			flex:1,
			rowSelType : 'MULTI',
			paging:false,
			model : 'app.model.manage.publicservice.SubQuestionsItem',
			url : 'manage/publicservice/subquestionsitem/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'ITEM_TAG',flex:1,align:'center'},
				{fname:'ITEM_NAME',flex:3,editor:true}
			],
			btns : [{
				xtype : 'button',
				text : '新增',
				itemId : 'addOptionBtn',
				iconCls:'font-bold cd_button blue'
			},{
				xtype : 'button',
				text : '删除',
				itemId : 'deleteOptionBtn',
				iconCls:'icon-remove-sign red font-bold'
			}]
		};
	}
});
