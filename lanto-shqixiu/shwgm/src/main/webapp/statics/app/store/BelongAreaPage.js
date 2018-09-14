/**
 * 全局BelongAreaPage
 * Created by liuxin.
 */
Ext.define('app.store.BelongAreaPage', {
    extend: 'Ext.data.Store',
    fields: ['ID','CODE','NAME'],
    proxy: {
    	actionMethods:{read:'POST'},
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data'
        },
        url: 'manage/sys/common/getBelongByPage'
    },
    listeners:{
    	load:function( st, records, successful, eOpts ){
    		st.insert(0,{ID:'',CODE:'',NAME:'\u00a0'}); //第一条数据加入空白选项，不要可以去掉
    	}
    },
    autoLoad: false
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.BelongAreaPage', { storeId: 'sys_belong_area_page'});
Ext.getStore("sys_belong_area_page").load();//为解决自动加载请求两次