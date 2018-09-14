/**
 * 全局BizStore
 * Created by holysky5 on 14-1-3.
 */
Ext.define('app.store.FuncButton', {
    extend: 'Ext.data.Store',
    fields: ['ID','CODE','NAME'],
    proxy: {
    	actionMethods:{read:'POST'},
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data'
        },
        url: 'client/sys/common/getFuncButtons'
    },
    autoLoad: false,
    autoSync:true
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.FuncButton', { storeId: 'sys_funcButton'});
Ext.getStore("sys_funcButton").load();//为解决自动加载请求两次