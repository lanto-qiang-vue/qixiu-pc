Ext.define('app.view.manage.credit.TbBdExamTypeEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.credit.TbBdExamTypeEdit',
	itemId: 'manage.credit.TbBdExamTypeEdit',
	title: '编辑大类',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 800,
	height:500,
	autoScroll:true,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			region:'north',
			itemId:'npanel',
			bodyPadding : 5,
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.credit.TbBdExamItemModel',
				defaults: {msgTarget:'side'},
				layout:'column',
				columns:2,
				btns:[],
				items: [
					{fname:'TYPE_ID',hidden:true},
					'TYPE_NAME',
					'TYPE_SCORE',
					{fname:'EXAM_TYPE',readOnly:true},
					{   xtype: 'yearcombobox',  
			    	   	fieldLabel: '考核年度',  
			    	   	name: 'VERSION_NO',  
			    	   	editable:false,
			    	   	readOnly:true,
			    	   	minYear : 2010,//设置最小年度,此参数不设置时，默认最小年份为2000年
			    	   	nowAfter : 0,//设置当前年度向后推的年度数（例：当前年度为2014年，则下拉列表中显示的最大年度为2016年），此参数不设置时默认为0
			    	   	orderType : 'desc',// 排序方式：desc表示降序，asc表示升序，默认为asc
	  				    defaultValue : ((new Date).getFullYear() - 1),//默认选择年份
	//  				selectedThisYear : true,//选择当前年度
	//  				selectedFirst : true,//当未设置默认年份时：selectedFirst为true表示默认选择下拉列表中的第一条，为false时不选择
			    	   	emptyText : '考核年度',
			    	   	allowBlank:false,
			    	   	blankItem:false,//是否有空白选项
			    	   	vtype:'notEmpty',
			    	   	labelAlign:'right',
			    	   	mode: 'local'
			    	  },
			    	  {fname:'ORDER_ID'}
				]
			}]
		}],
		me.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : ['->',
					{
						xtype : 'button',
						itemId : 'saveBtn',
						iconCls : 'save_button',
						text : '保 存'
					},'-', {
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'close_button',
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
		me.down('form').loadRecord(record);
	},
	loadAddData : function(data){
		var me = this;
		me.down('form').getForm().setValues(data);
	}
});
