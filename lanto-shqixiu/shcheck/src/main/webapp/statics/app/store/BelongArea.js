/**
 * 全局BizStore
 * Created by holysky5 on 14-1-3.
 */
Ext.define('app.store.BelongArea', {
    extend: 'Ext.data.Store',
    fields: ['ID','CODE','NAME'],
    proxy: {
    	actionMethods:{read:'POST'},
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data'
        },
        url: 'check/sys/common/getBelongArea'
    },
    listeners:{
    	load:function( st, records, successful, eOpts ){
    		st.insert(0,{ID:'',CODE:'',NAME:'\u00a0'});
    	}
    },
    autoLoad: false
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.BelongArea', { storeId: 'sys_belong_area'});
Ext.getStore("sys_belong_area").load();//为解决自动加载请求两次