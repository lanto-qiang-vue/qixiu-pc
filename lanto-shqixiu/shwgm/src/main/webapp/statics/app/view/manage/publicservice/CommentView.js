Ext.define('app.view.manage.publicservice.CommentView',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.publicservice.CommentView',
	itemId: 'manage.publicservice.CommentView',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 510,
	border:false,
	height:450,
//	autoScroll:true,
	modal : true,
	maximizable : true,
	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			layout : 'fit',
			itemId:'npanel',
			bodyPadding : 15,
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.manage.publicservice.Comment',
				layout: {
            		type: 'table',
            		columns: 1
        		},
        		//labelWidth: 100,
				btns:[],
				items: [
					{fname:'COMMENT_ID',hidden:true},
					{fname:'USER_NAME',width:438},
					{fname:'CORP_NAME',width:438},
					{fname:'PLATE_NUM',width:438},
					{fname:'STAR',width:438},
					{xtype:'fieldcontainer',fieldLabel:'服务星级',
						items:[{
							xtype:'component',
							itemId:'staritemid',
							data:{
								star:0
							},
							tpl:['{star:this.formatStar}',{
								formatStar:function(v){
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
								}
							}]
						}]
					},
					{fname:'INSERT_DATE',width:438},
					{
						xtype     : 'textareafield',
				        height:150,
				        width:438,
				        name      : 'CONTENT',
				        fieldLabel: '投诉内容',
				        anchor    : '100%'
					}
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
		me.down('form').loadRecord(record);
		me.down('#staritemid').update({star:record.get('STAR')});
		me.down('form').getForm().findField('STAR').setValue(record.get('STAR')/2);
	}
});
