/**
 * 全局BizStore
 * Created by holysky5 on 14-1-3.
 */
Ext.define('app.store.AppraiseBzSelect', {
    extend: 'Ext.data.Store',
	fields:['BZ_NAME','BZ_SCORE'],
	data:[{BZ_NAME:'',BZ_SCORE:0}],
	autoLoad:false
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.AppraiseBzSelect', { storeId: 'sys_appraise_bz'}); 