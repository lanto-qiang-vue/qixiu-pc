
Ext.define('app.store.CorpAreaTotal', {
    extend: 'Ext.data.Store',
    model: 'app.model.total.CorpInfoTotal',
    proxy: {
    	actionMethods:{read:'POST'},
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data'
        },
        url: 'manage/total/corpinfototal/getAreaTotal'
    },
    autoLoad: false
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.CorpAreaTotal', { storeId: 'corp_area_total'});
