Ext.define('app.controller.trans.corp.TbCorpVideoCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'trans.corp.TbCorpVideoMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=trans.corp.TbCorpVideoMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=trans.corp.TbCorpVideoMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=trans.corp.TbCorpVideoMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=trans.corp.TbCorpVideoMngPanel]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=trans.corp.TbCorpVideoEdit]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=trans.corp.TbCorpVideoMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition,
				select:this.onclick
			},
			'panel[itemId=trans.corp.TbCorpVideoMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			}
		});
	},
	//查询panel中点击查询
	doSearch: function(button){
		if( this.getSearchPanel().getForm().isValid() ){
			this.getGridPanel().getStore().loadPage(1);
		}
	},
	//组件初始化时store上挂接查询form.
	initGridSearchCondition : function(grid, opts){
		var me = this;
		var st = grid.getStore();
		st.on('beforeload', function (store, options) {
			var fm = me.getSearchPanel().getForm();
			store.proxy.extraParams=fm.getValues();
		});
//		st.on('load', function (store, options) {
//			grid.getSelectionModel().select(0);
//		});
		//st.loadPage(1);//预加载
	},
	onclick:function(a,b,c){
		console.log(b);
		//PLATE_COLOR: "10061001"
        //PLATE_NUM: "湘LA4050"
		var me = this;
		var panel = me.getMngPanel();
		panel.down('panel[itemId=videoPanel]').setTitle('视频查看：【 ' + b.data.PLATE_NUM + ' 】');
		corpVideoFrame.window.ConnectVideoSrv(b.get('IP'),b.get('PORT'),b.get('USER_NAME'),b.get('PSW'));
		corpVideoFrame.window.StartVideoPreviewExt(b.get('VIDEO_NUM'));
	}
});
