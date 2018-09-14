/**
 * 全局BizStore
 * Created by holysky5 on 14-1-3.
 */
Ext.define('app.store.PlateNumB', {
    extend: 'Ext.data.Store',
    fields: ['CODE','NAME'],
	proxy: {
    	actionMethods:{read:'POST'},
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data'
        },
        url: 'client/sys/common/getPlateNumB'
    },
    autoLoad: false,
    autoSync:true
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.PlateNumB', { storeId: 'sys_plateNumB'});
Ext.getStore("sys_plateNumB").load();//为解决自动加载请求两次