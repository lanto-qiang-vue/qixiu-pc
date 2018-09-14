Ext.define('app.view.manage.publicservice.CommentManageMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.publicservice.CommentManageMngPanel',
	itemId: 'manage.publicservice.CommentManageMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [ me.getSearchPanel(), me.getGridPanel()]
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
			model : 'app.model.manage.publicservice.CommentManage',
			layout:'column',
			columns:5,
			labelWidth: 70,
			showType : 'search',
			items: [
					'CORP_NAME',
					'MAGOR_BRANDS',
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
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.manage.publicservice.CommentManage',
			url : 'manage/publicservice/commentmanage/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'CORP_NAME',flex:3},
				{fname:'MAGOR_BRANDS',flex:2},
				{fname:'COMMENT_COUNT',flex:1,align:'center'},
				{fname:'AVG_STAR',flex:1,align:'center',renderer:function(v){
					var score=parseInt(v)/2;
					return score;
				}},
				{fname:'AVG_STAR',text:'服务星级',width:130,align:'center',renderer:function(v){
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
			}]
		};
	}
});
