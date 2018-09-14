/**
 * 全局BizStore
 * Created by holysky5 on 14-1-3.
 */
Ext.define('app.store.AllRole', {
    extend: 'Ext.data.Store',
    fields: ['ROLE_ID','ROLE_NAME'],
    proxy: {
    	actionMethods:{read:'POST'},
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data'
        },
        url: 'manage/sys/common/getAllRole'
    },
    autoLoad: false
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.AllRole', { storeId: 'sys_all_role'});
Ext.getStore("sys_all_role").load();//为解决自动加载请求两次