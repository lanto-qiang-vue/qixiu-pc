/**
 * 全局BizStore
 * Created by holysky5 on 14-1-3.
 */
Ext.define('app.store.DailyCheckUnit', {
    extend: 'Ext.data.Store',
    fields: ['CHECK_UNIT','AREA_CODE'],
    proxy: {
    	actionMethods:{read:'POST'},
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data'
        },
        url: 'manage/sys/tbdailycheckunit/getUnits'
    },
    autoLoad: false
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.DailyCheckUnit', { storeId: 'daily_check_unit'});
Ext.getStore("daily_check_unit").load();//为解决自动加载请求两次