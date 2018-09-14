/**
 * 全局BizStore
 * Created by holysky5 on 14-1-3.
 */
Ext.define('app.store.HomeChartLine', {
    extend: 'Ext.data.Store',
    fields: ['NAME','TOTAL_NUM'],
    proxy: {
    	actionMethods:{read:'POST'},
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data'
        },
        url: 'manage/sys/homepage/getChartLine'
    },
    autoLoad: false
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.HomeChartLine', { storeId: 'home_chart_line'});
