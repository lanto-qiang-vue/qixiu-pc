/**
 * 全局BizStore
 * Created by holysky5 on 14-1-3.
 */
Ext.define('app.store.FuncPower', {
    extend: 'Ext.data.Store',
    fields: ['FUNC_ID','PAR_FUNC_ID','FUNC_CODE','FUNC_NAME','FUNC_POWER','FUNC_BUTTON'],
    proxy: {
    	actionMethods:{read:'POST'},
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data'
        },
        url: 'manage/sys/common/getFuncPower'
    },
    autoLoad: false,
    autoSync:true
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.FuncPower', { storeId: 'sys_funcPower'});
Ext.getStore("sys_funcPower").load();//为解决自动加载请求两次