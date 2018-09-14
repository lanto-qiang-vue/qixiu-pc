Ext.define('app.controller.trans.notice.InfoPublicCtrl',{
	extend:'Ext.app.Controller',
	views: ['trans.notice.InfoPublicMngPanel'],
	refs: [],
	init: function(ctrl) {
		this.control({
			'panel[itemId=notice.TbNoticeReceiveMngPanel]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=notice.TbNoticeReceiveEdit]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			}
		});
	}
});
