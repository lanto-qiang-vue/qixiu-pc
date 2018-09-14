/**
 * 全局BizStore
 * Created by holysky5 on 14-1-3.
 */
Ext.define('app.store.CasecadeCode', {
    extend: 'Ext.data.Store',
    fields: [{name:'ID_',type:'string'}, 'CODE', 'NAME', {name:'PID',type:'string'}, 'TYPE'],
    proxy: {
    	actionMethods:{read:'POST'},
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data'
        },
        url: 'client/sys/common/getCasecadeCode'
    },
    autoLoad: false
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.CasecadeCode', { storeId: 'sys_casecade_code'});
Ext.getStore("sys_casecade_code").load();//为解决自动加载请求两次