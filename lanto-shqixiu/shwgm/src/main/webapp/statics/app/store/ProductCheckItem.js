/**
 * 安全生产检测中的选择项
 * 
 */
Ext.define('app.store.ProductCheckItem', {
    extend: 'Ext.data.Store',
    fields: ['ITEM_ID','PITEM_ID','ITEM_NAME','ITEM_DETAIL','ITEM_BZ','ITEM_TYPE','CHECK_TYPE'],
    proxy: {
    	actionMethods:{read:'POST'},
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data'
        },
        url: 'manage/daily/checkproduct/getCheckItem'
    },
    autoLoad: false
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.ProductCheckItem', { storeId: 'sys_product_check_item'});
Ext.getStore("sys_product_check_item").load();//为解决自动加载请求两次