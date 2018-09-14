Ext.define('app.controller.corp.TbCorpPositionCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'corp.TbCorpPositionMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=corp.TbCorpPositionMngPanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=corp.TbCorpPositionMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
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
		//st.loadPage(1);//预加载
	},
	onclick:function(a,b,c){
		var me = this;
		if(Ext.isEmpty(b.data.LONGITUDE) || Ext.isEmpty(b.data.LATITUDE)){
			Ext.Msg.alert('系统提示','该企业未添加位置！');
			return false;
		}
		bmapFrame.window.stopAnimaMarker();
		var point = new bmapFrame.window.BMap.Point(b.data.LONGITUDE, b.data.LATITUDE);
		bmapFrame.window.map.panTo(point);
		var store =  Ext.getStore("markers");
		var rec = store.findRecord('code',b.data.CORP_ID);
		var marker = rec.data.mark;
		marker.setAnimation(bmapFrame.window.BMAP_ANIMATION_BOUNCE); // 跳动的动画
		marker.setIcon(bmapFrame.window.icon_blue); 
		marker.openInfoWindow(rec.data.info);
		bmapFrame.window.animaMarker.push(marker);
	}
});
