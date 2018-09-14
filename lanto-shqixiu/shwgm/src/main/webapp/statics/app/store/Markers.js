/**
 * 全局BizStore
 * Created by holysky5 on 14-1-3.
 */
Ext.define('app.store.Markers', {
    extend: 'Ext.data.SimpleStore',
    fields: ['code','name','mark','info'],

    data: [
	        ]  
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.Markers', { storeId: 'markers'});