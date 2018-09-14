/**
 * 全局BizStore
 * Created by holysky5 on 14-1-3.
 */
Ext.define('app.store.PlateColor', {
    extend: 'Ext.data.SimpleStore',
    fields: ['code','name'],

    data: [
	            ['蓝', '蓝'],  
	            ['黄', '黄'],
	            ['白', '白'],
	            ['黑', '黑']
	        ]  
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.PlateColor', { storeId: 'sys_plateColor'});