/**
 * 未回执的通知
 * Created by holysky5 on 14-1-3.
 */
Ext.define('app.store.UnReNotice', {
    extend: 'Ext.data.Store',
    fields: ['NOTICE_ID','NOTICE_TITLE','IS_RESULT','SEND_BY','SEND_DATE','DATA_FROM'],
    proxy: {
    	actionMethods:{read:'POST'},
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data'
        },
        url: 'manage/sys/homepage/getUnReNotice'
    },
    listeners:{
    	datachanged:function(st,opts){
    		if(st.getTotalCount() > 0){
    			var is = Ext.ComponentQuery.query('window[itemId=notice.UnReNoticeReceiveEdit]')[0];
    			if(Ext.isEmpty(is)){
    				var win = Ext.create('app.view.notice.UnReNoticeReceiveEdit');
					win.show();
					win.initData();
    			}
    		}
    	}
    },
    autoLoad: false
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.UnReNotice', { storeId: 'sys_unre_notice'});
