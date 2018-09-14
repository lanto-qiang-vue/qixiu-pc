Ext.define('app.view.manage.credit.TbBdExamItemMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.credit.TbBdExamItemMngPanel',
	itemId: 'manage.credit.TbBdExamItemMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer','app.ux.YearComboBox'],
	autoShow : true,
	closable : true,
	layout : 'border',
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [me.getSearchPanel(),
					me.getCenter()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
		var tree = me.down('treepanel');
		var form = me.down('form').getForm();
		if(form.isValid()){
			app.utils.AjaxCallbackUtil.ajaxCallbackAll("manage/credit/tbbdexamitem/getTree",form.getValues(),function(ret){
				if( ret.success ){
//					ret.data.icon = 'images/read.png';
					tree.setRootNode(ret.data);
					tree.expandNode(tree.getRootNode());
	//				tree.getSelectionModel().select(0);
				}
			});
		}
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
			model : 'app.model.credit.TbBdExamItemModel',
			layout: {
        		type: 'table',
        		columns: 3
    		},
			labelWidth: 80,
			showType : 'search',
			items: [
					{   xtype: 'yearcombobox',  
			    	   	fieldLabel: '考核年度',  
			    	   	name: 'VERSION_NO',  
			    	   	editable:false,
			    	   	minYear : 2010,//设置最小年度,此参数不设置时，默认最小年份为2000年
			    	   	nowAfter : 0,//设置当前年度向后推的年度数（例：当前年度为2014年，则下拉列表中显示的最大年度为2016年），此参数不设置时默认为0
			    	   	orderType : 'desc',// 排序方式：desc表示降序，asc表示升序，默认为asc
	  				    defaultValue : ((new Date).getFullYear() - 1),//默认选择年份
	//  					    	   	selectedThisYear : true,//选择当前年度
	//  					    	   	selectedFirst : true,//当未设置默认年份时：selectedFirst为true表示默认选择下拉列表中的第一条，为false时不选择
			    	   	emptyText : '考核年度',
			    	   	allowBlank:false,
			    	   	blankItem:false,//是否有空白选项
			    	   	vtype:'notEmpty',
			    	   	labelAlign:'right',
			    	   	mode: 'local'
			    	  },
			    	  {fname:'EXAM_TYPE',value:'10381001',width:400},
			    	  {
						xtype: 'button',
						iconCls: 'icon-search bigger-120 white',
						text : '加载配置',
						itemId: 'searchBtn',
						margin:5
					}
				]
			}]
		};
	},
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			title:'考核小类',
			region : 'center',
			rowSelType : 'MULTI',
			features: [{ftype:'grouping'}],
                listeners:{
		            afterrender:function(cmp){
		                cmp.getStore().group('TYPE_NAME','ASC');
		            }
		        },
			model : 'app.model.credit.TbBdExamItemModel',
			url : 'manage/credit/tbbdexamitem/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'TYPE_NAME',flex:2,hidden:true},
				{fname:'ITEM_NAME',flex:2},
				{fname:'ITEM_SCORE',flex:1},
				{fname:'ITEM_DETAIL',flex:6,
					renderer :function(value, meta, record) {
                             return '<div style="overflow:visible;white-space:normal;line-height:25px;">' + value + '</div>';    
                 }},
				{fname:'ORDER_ID',flex:1}
			],
			btns : [{
				xtype : 'button',
				text : '新增',
				itemId : 'addBtn',
				iconCls:'add_button'
			},'-',{
				xtype : 'button',
				text : '修改',
				itemId : 'editBtn',
				iconCls:'edit_button'
			},'-',{
				xtype : 'button',
				iconCls:'delete_button',
				text : '删除',
				itemId : 'deleteBtn'
			}]
		};
	},
	getCenter : function(){
		var me = this;
		return {
			xtype:'panel',
			layout:'border',
			region : 'center',
			items:[{
                	xtype : 'treepanel',
          			itemId : 'dpanel',
          			rootVisible : true,
					useArrows : false,
					title:'考核大类',
					frame : true,
					multiSelect: false,
          			region : 'west',
          			width : 230,
          			bodyPadding: '10 0 0 0',
          			split : true,
          			collapsible:true,
          			tbar:[{
						xtype : 'button',
						text : '新增',
						itemId : 'addTypeBtn',
						iconCls:'add_button'
					},'-',{
						xtype : 'button',
						text : '修改',
						itemId : 'editTypeBtn',
						iconCls:'edit_button'
					},'-',{
						xtype : 'button',
						iconCls:'delete_button',
						text : '删除',
						itemId : 'deleteTypeBtn'
					}]
                },me.getGridPanel()]
		};
	}
});
