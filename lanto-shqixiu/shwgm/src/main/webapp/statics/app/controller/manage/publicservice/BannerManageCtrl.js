Ext.define('app.controller.manage.publicservice.BannerManageCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.publicservice.BannerManageMngPanel'
		],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.publicservice.BannerManageMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.publicservice.BannerManageMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.publicservice.BannerManageMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.publicservice.BannerManageMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.publicservice.BannerManageMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=manage.publicservice.BannerManageMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			}
		});
	},
	//查询panel中点击查询
	doSearch: function(button){
		this.getGridPanel().getStore().reload();
	},
	//组件初始化时store上挂接查询form.
	initGridSearchCondition : function(grid, opts){
		var me = this;
		var st = grid.getStore();
		st.on('load', function (store, records) {
			if(records && records.length > 0){
				grid.getSelectionModel().select(0);
			}
		});
		grid.on('edit',function(editor, e){
			var field=e.field;
            var record = e.record;
            var data = record.data;
            delete data.id;
            if(record.isModified(field)){
            	app.utils.AjaxCallbackUtil.ajaxTitleCallback("manage/publicservice/bannermanage/update",{data:Ext.JSON.encode(data)},grid, '保存中...',function(ret){
					if( ret.success ){
						record.commit();
					}
				});
            }
		});
		grid.on('select',function(gd, record, index, eOpts ){
			var panel = me.getMngPanel().down("#imagePanel");
			var width = panel.getWidth();
			var height = panel.getHeight();
			panel.update({img:'/attach/' + record.get('LINK_IMAGE'),maxWidth:width-10,maxHeight:height-10});
		});
		st.loadPage(1);//预加载
	},
	//grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'addBtn'==button.itemId ){
		}else if( 'deleteBtn' == button.itemId){
			me.doDelete(button);
		}else if( 'refershBtn' == button.itemId){
			me.doSearch(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	doDelete : function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.mutChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var ids = [];
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			ids.push(record.get("BANNER_ID"));
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/publicservice/bannermanage/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids.join(',')},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
						store.loadPage(1);
					}
				});
			}
		});
	},
});
