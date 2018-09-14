/**
 * 全局BizStore
 * Created by holysky5 on 14-1-3.
 */
Ext.define('app.store.GetEmployee', {
    extend: 'Ext.data.Store',
    fields: ['EMPLOYEE_ID','NAME'],
    proxy: {
    	actionMethods:{read:'POST'},
        type: 'ajax',
        extraParams:{tag:'1'},
        reader: {
            type: 'json',
            root: 'data'
        },
        url: 'client/repair/gene/getEmployee'
    },
    autoLoad: false
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.GetEmployee', { storeId: 'get_employee'});
Ext.getStore("get_employee").load();//为解决自动加载请求两次