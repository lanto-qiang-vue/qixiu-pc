Ext.define('app.view.manage.publicservice.CommentManageView',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.publicservice.CommentManageView',
	itemId: 'manage.publicservice.CommentManageView',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 850,
	border:false,
	height:450,
//	autoScroll:true,
	modal : true,
	maximizable : true,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [me.getGridPanel()]
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
		/*var me = this;
		var st=me.down('#gpanel').getStore();
		st.proxy.extraParams={CORP_ID_eq:record.data.CORP_ID};
		st.loadPage(1);*/
	},
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.manage.publicservice.Comment',
			url : 'manage/publicservice/comment/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'USER_NAME',flex:1},
				{fname:'CORP_NAME',flex:3},
				{fname:'PLATE_NUM',flex:1.5},
				{fname:'CONTENT',flex:3},
				{fname:'INSERT_DATE',flex:2.5},
				{fname:'STAR',flex:1,align:'center',renderer:function(v){
					var score=parseInt(v)/2;
					return score;
				}},
				{fname:'STAR',text:'服务星级',width:110,align:'center',renderer:function(v){
					var star=parseInt(v);
					var text='';
					var full='<i class="icon-star bigger-150 orange"></i>';
					var half='<i class="icon-star-half-empty bigger-150 orange"></i>';
					var empty='<i class="icon-star-empty bigger-150 orange"></i>';
					if(star==0){
						text=empty+empty+empty+empty+empty;
					}else if(star==1){
						text=half+empty+empty+empty+empty;
					}else if(star==2){
						text=full+empty+empty+empty+empty;
					}else if(star==3){
						text=full+half+empty+empty+empty;
					}else if(star==4){
						text=full+full+empty+empty+empty;
					}else if(star==5){
						text=full+full+half+empty+empty;
					}else if(star==6){
						text=full+full+full+empty+empty;
					}else if(star==7){
						text=full+full+full+half+empty;
					}else if(star==8){
						text=full+full+full+full+empty;
					}else if(star==9){
						text=full+full+full+full+half;
					}else if(star==10){
						text=full+full+full+full+full;
					}
					return text;
				}}
			],
			btns : [{
				xtype : 'button',
				text : '查看',
				itemId : 'viewBtn',
				iconCls:'font-bold cd_button blue'
			},{
				xtype : 'button',
				text : '维修信息',
				itemId : 'repairBtn',
				iconCls:'font-bold cd_button blue'
			},{
				xtype : 'button',
				text : '删除',
				itemId : 'deleteBtn',
				iconCls:'icon-remove-sign red font-bold'
			}]
		};
	}
});
