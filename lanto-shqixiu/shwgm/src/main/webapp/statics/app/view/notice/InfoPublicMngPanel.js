Ext.define('app.view.notice.InfoPublicMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.notice.InfoPublicMngPanel',
	itemId: 'notice.InfoPublicMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	bodyPadding : 5,
	listeners:{
		afterrender:app.utils.CommonUtil.setPanelFuncPower
	},
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
		var me = this;
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
			model : 'app.model.notice.InfoPublic',
			layout:'column',
			columns:5,
			labelWidth: 70,
			showType : 'search',
			items: [
					'TITLE',
					'CREATOR',
					'DATA_FROM',
					'PUBLISH_STATUS',
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
							margin: '0 5 0 5',
							handler:function(button){
								if( me.down('form').getForm().isValid() ){
									me.down('grid').getStore().loadPage(1);
								}
							}
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
		var me = this;
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.notice.InfoPublic',
			url : 'manage/notice/infopublic/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'INFO_TYPE',flex:1},
				{fname:'TITLE',flex:3},
				{fname:'CREATOR',flex:1},
				{fname:'DATA_FROM',flex:1},
				{fname:'CREATE_TIME',flex:1.3,format:'Y-m-d H:i:s'},
				{fname:'UPDATE_TIME',flex:1.3,format:'Y-m-d H:i:s'},
				{fname:'PUBLISH_STATUS',flex:1},
				{fname:'PUBLISH_TIME',flex:1.3,format:'Y-m-d H:i:s'}
			],
			btns : [{
				xtype : 'button',
				text : '新增',
				itemId : 'addBtn',
				iconCls:'icon-plus-sign-alt blue font-bold',
				handler:function(button){
					var win =	Ext.create('app.view.notice.InfoPublicEdit',{parentPanel:me,title:'<i class="' + button.iconCls + '"></i> '+me.infoName+'信息添加'});
					win.show();
				}
			},'-',{
				xtype : 'button',
				text : '修改',
				itemId : 'editBtn',
				iconCls:'font-bold icon-edit blue',
				handler:function(button){
					var grid = me.down('grid');
					var ret = app.utils.FunUtils.singleChecks(grid);
					if(!ret.success){
						return false;
					}
					var mds = ret.result;
					var win =	Ext.create('app.view.notice.InfoPublicEdit',{parentPanel:me,title:'<i class="' + button.iconCls + '"></i> '+me.infoName+'信息修改'});
					win.show();
					win.loadData(mds);
				}
			},'-',{
				xtype : 'button',
				iconCls:'icon-remove-sign red font-bold',
				text : '删除',
				itemId : 'deleteBtn',
				handler:function(button){
					var grid = me.down('grid');
					var ret = app.utils.FunUtils.mutChecks(grid);
					if(!ret.success){
						return false;
					}
					var mds = ret.result;
					var ids = [];
					for(var i=0;i<mds.length;i++){
						var record = mds[i];
						ids.push(record.get("INFO_ID"));
					}
					Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
						if(flag=='yes'){
							var store = grid.getStore();
							var url = 'manage/notice/infopublic/delete';
							app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids.join(',')},function(ret){
								if( ret.success ){
									store.remove(mds);
									Ext.Msg.alert('系统提示','删除成功！');
								}
							});
						}
					});
				}
			},'-',{
				xtype : 'button',
				text : '预览',
				itemId : 'yulanBtn',
				iconCls:'font-bold icon-fullscreen blue',
				handler:function(button){
					var grid = me.down('grid');
					var ret = app.utils.FunUtils.singleChecks(grid);
					if(!ret.success){
						return false;
					}
					var mds = ret.result;
					var win =	Ext.create('app.view.notice.InfoPublicView',{parentPanel:me,title:mds.data.TITLE});
					win.show();
					win.loadData(mds);
				}
			},'-',{
				xtype : 'button',
				text : '发布',
				itemId : 'publishBtn',
				iconCls:'font-bold icon-edit blue',
				handler:function(button){ 
					var grid = me.down('grid');
					var ret = app.utils.FunUtils.singleChecks(grid);
					if(!ret.success){
						return false;
					}
					var mds = ret.result;
					var win =	Ext.create('app.view.notice.InfoPublicPublish',{parentPanel:me,title:'<i class="' + button.iconCls + '"></i> '+me.infoName+'信息发布'});
					win.show();
					win.loadData(mds);
				}
			}],
			listeners:{
				beforerender:function(grid){
					if(me.funcId == '10030101'){
						me.infoType = '10281001';
						me.infoName='法律法规';
					}else if(me.funcId == '10030102'){
						me.infoType = '10281002';
						me.infoName='管理规范';
					}else if(me.funcId == '10030103'){
						me.infoType = '10281003';
						me.infoName='行业政策';
					}else if(me.funcId == '10030104'){
						me.infoType = '10281004';
						me.infoName='技术标准';
					}else if(me.funcId == '10030105'){
						me.infoType = '10281005';
						me.infoName='办事指南';
					}else if(me.funcId == '10030106'){
						me.infoType = '10281006';
						me.infoName='管理职责';
					}else if(me.funcId == '10030107'){
						me.infoType = '10281007';
						me.infoName='行业概况';
					}else if(me.funcId == '10030108'){
						me.infoType = '10281008';
						me.infoName='行业能手';
					}else if(me.funcId == '10030109'){
						me.infoType = '10281009';
						me.infoName='优质企业';
					}else if(me.funcId == '10030110'){
						me.infoType = '10281010';
						me.infoName='文明建设';
					}else if(me.funcId == '10030208'){
						me.infoType = '10281012';
						me.infoName='文件下载';
					}else if(me.funcId == '10030303'){
						me.infoType = '10281013';
						me.infoName='工作动态';
					}else if(me.funcId == '10030304'){
						me.infoType = '10281014';
						me.infoName='行业风采';
					}else if(me.funcId == '10030305'){
						me.infoType = '10281015';
						me.infoName='行业党建';
					}else if(me.funcId == '10030306'){
						me.infoType = '10281016';
						me.infoName='信誉考核信息';
					}else if(me.funcId == '10030307'){
						me.infoType = '10281017';
						me.infoName='违法违规';
					}else if(me.funcId == '10030308'){
						me.infoType = '10281018';
						me.infoName='政务公开';
					}
					var st = grid.getStore();
					st.on('beforeload', function (store, options) {
						var fm = me.down('form').getForm();
						var params = fm.getValues();
						//过滤公共信息类型
						params.INFO_TYPE_eq = me.infoType;
						store.proxy.extraParams=params;
					});
					st.loadPage(1);//预加载
				}
			}
		};
	}
});
