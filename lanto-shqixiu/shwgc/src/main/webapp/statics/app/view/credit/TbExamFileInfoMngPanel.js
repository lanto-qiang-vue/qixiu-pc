Ext.define('app.view.credit.TbExamFileInfoMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.credit.TbExamFileInfoMngPanel',
	itemId: 'credit.TbExamFileInfoMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer','app.ux.YearComboBox'],
	autoShow : true,
	closable : true,
	layout : 'border',
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [me.getSearchPanel(),me.getGridPanel()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
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
			model : 'app.model.credit.TbExamFileInfoModel',
			layout:'column',
			columns:4,
			labelWidth: 80,
			showType : 'search',
			items: [
					'FILE_ID',
					{   xtype: 'yearcombobox',  
			    	   	fieldLabel: '考核年度',  
			    	   	name: 'EXAM_YEAR',  
			    	   	editable:false,
			    	   	minYear : 2010,//设置最小年度,此参数不设置时，默认最小年份为2000年
			    	   	nowAfter : 0,//设置当前年度向后推的年度数（例：当前年度为2014年，则下拉列表中显示的最大年度为2016年），此参数不设置时默认为0
			    	   	orderType : 'desc',// 排序方式：desc表示降序，asc表示升序，默认为asc
	  				 //   defaultValue : ((new Date).getFullYear() - 1),//默认选择年份
	//  					    	   	selectedThisYear : true,//选择当前年度
	//  					    	   	selectedFirst : true,//当未设置默认年份时：selectedFirst为true表示默认选择下拉列表中的第一条，为false时不选择
			    	   	emptyText : '考核年度',
			    	   	blankItem:true,//是否有空白选项
			    	   	labelAlign:'right',
			    	   	mode: 'local'
			    	  },
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
							margin:'0 0 0 10'
						},{
							xtype : 'button',
							text : '重置',
							itemId: 'resetBtn',
							iconCls: 'icon-reply bigger-120 white',
							margin:'0 0 0 10',
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
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.credit.TbExamFileInfoModel',
			url : 'client/credit/tbexamfileinfo/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				'FILE_ID',
				'EXAM_YEAR',
				'EXAM_TYPE',
				'CORP_NUM',
				'CORP_NAME',
				'CORP_ADD',
				'LEGAL_PERSON',
				'CORP_TEL',
				'SERVICE_HOTLINE',
				'CORP_TYPE',
				'IS_UPLOAD',
				'IS_ZJ_EXAM',
				'ZJ_EXAM_LEVEL',
				'JZ_DATE',
				'IS_FIRST_EXAM',
				'FIRST_EXAM_LEVEL',
				'FIRST_DATE',
				'IS_SEC_EXAM',
				'SEC_EXAM_LEVEL',
				'SEC_DATE',
				'SEC_OPER'
			],
			btns : [{
				xtype : 'button',
				text : '档案填写',
				itemId : 'addDocBtn',
				iconCls:'add_button'
			},'-',{
				xtype : 'button',
				text : '档案查看',
				itemId : 'viewBtn',
				iconCls:'edit_button'
			},'-',{
				xtype : 'button',
				text : '档案修改',
				itemId : 'editBtn',
				iconCls:'edit_button'
			},'-',{
				xtype : 'button',
				text : '企业自评',
				itemId : 'zpBtn',
				iconCls:'read_button'
			},'-',{
				xtype : 'button',
				text : '上传附件',
				itemId : 'attachUpBtn',
				iconCls:'heditAttachIcon'
			},'-',{
				xtype : 'button',
				text : '提交申请表',
				itemId : 'submitBtn',
				iconCls:'accept_button'
			},'-',{
				xtype : 'button',
				text : '打印申请表',
				itemId : 'printBtn',
				iconCls:'print_button'
			},'-',{
				xtype : 'button',
				iconCls:'delete_button',
				text : '删除',
				itemId : 'deleteBtn'
			}]
		};
	}
});
