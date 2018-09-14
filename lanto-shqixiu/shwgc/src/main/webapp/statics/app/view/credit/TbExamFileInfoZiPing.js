Ext.define('app.view.credit.TbExamFileInfoZiPing',{
	extend:'Ext.window.Window',
	alias: 'widget.credit.TbExamFileInfoZiPing',
	itemId: 'credit.TbExamFileInfoZiPing',
	title: '质量信誉考核自评',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	width : 835,
	height:600,
	layout:'fit',
	autoScroll:true,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			layout:'fit',
			width:800,
			itemId:'npanel',
			items:[{xtype:'hidden',name:'FILE_ID'},{
				xtype:'tabpanel',
				items:[]
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
	loadAddData : function(){
		var me = this;
	},
	//加载数据
	loadData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
		var tabpanel = me.down('tabpanel');
		app.utils.AjaxCallbackUtil.ajaxCallbackAll("client/credit/tbexamfileinfo/getAllType",record.data, function (Obj) {
			var records = Obj.data;
			for(var i = 0;i<records.length;i++){
				var data = records[i];
				var grid = Ext.create('widget.jsf.ModelGrid',{
					title:data.TYPE_NAME,
					region : 'center',
					paging:false,
					rowSelType : false,
					model : 'app.model.credit.TbBdExamItemModel',
					url : 'client/credit/tbexamfileinfo/zPList',
					columns : [
						{text:'序号',xtype:'rownumberer'},
						{fname:'TYPE_NAME',flex:2,hidden:true},
						{fname:'ITEM_NAME',flex:2},
						{fname:'ITEM_SCORE',flex:1},
						{fname:'ITEM_DETAIL',flex:5,
							renderer :function(value, meta, record) {
                            	 return '<div style="overflow:visible;white-space:normal;line-height:25px;">' + value + '</div>';    
             			}},
             			{fname:'SELF_SCORE',flex:1,editor:true,text:'<font color="green"><b>自评分</b></font>',
							renderer :function(value, meta, record) {
			                             return '<font color="green"><b>' + value + '</b></font>';    
			             }}
					],
					btns : []
				});
				tabpanel.add(grid);
				grid.getStore().proxy.extraParams={TYPE_ID:data.TYPE_ID,FILE_ID:record.data.FILE_ID};
				grid.getStore().loadPage(1);
				if(i == 0){
					tabpanel.setActiveTab(grid);
					me.createTip(grid);
				}
			}
		});
		me.down('tabpanel').on('tabchange',function(tabPanel, newCard, oldCard, eOpts){
           me.createTip(newCard);
        });
	},
	createTip : function(grid){
		var view = grid.getView();
        var tip = Ext.create('Ext.tip.ToolTip', {
		    target: view.el,
		    delegate: view.itemSelector,
		    trackMouse: true,
		    autoHide:false,
		    anchor: 'top',
		    renderTo: Ext.getBody(),
		    listeners: {
		        beforeshow: function updateTipBody(tip) {
		            tip.update("<font color='blue'>" + view.getRecord(tip.triggerElement).get('ITEM_DETAIL') + "</font>");
		        }
		    }
		});
	}
});
