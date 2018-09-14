/**
 * 全局BizStore
 * Created by holysky5 on 14-1-3.
 */
Ext.define('app.store.DictType', {
    extend: 'Ext.data.Store',
    fields: ['CODE','NAME','TYPE_NAME'],
    proxy: {
    	actionMethods:{read:'POST'},
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data'
        },
        url: 'manage/sys/common/getDictType'
    },
    listeners:{
    	load:function( st, records, successful, eOpts ){
    		st.insert(0,{CODE:'',NAME:'\u00a0',TYPE_NAME:'\u00a0'});
    	}
    },
    autoLoad: false
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.DictType', { storeId: 'sys_dict_type'});
Ext.getStore("sys_dict_type").load();//为解决自动加载请求两次