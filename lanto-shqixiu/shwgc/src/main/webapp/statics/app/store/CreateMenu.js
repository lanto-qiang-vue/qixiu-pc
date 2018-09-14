/**
 * 全局BizStore
 * Created by holysky5 on 14-1-3.
 */
Ext.define('app.store.CreateMenu', {
    extend: 'Ext.data.Store',
    fields: ['text','leaf','children','icon','funcName','funcId','funcCode','iconCls','funcType','topLevel','noCtrl'],
    proxy: {
    	actionMethods:{read:'POST'},
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data'
        },
        url: 'client/sys/common/getMenus'
    },
    autoLoad: true
});