/**
 * 全局CorpQualification
 * Created by holysky5 on 14-1-3.
 */
Ext.define('app.store.CorpQualification', {
    extend: 'Ext.data.Store',
    fields: ['code','val','name'],

    data: [
    			{code:'IS_SEC_MAINTAIN', val:'true',name:'二级维护定点厂'},  
    			{code:'IS_LPG', val:'true',name:'LPG定点维修厂'},
    			{code:'IS_WYCL', val:'true',name:'危运车辆维修'},
    			{code:'IS_TAX', val:'true',name:'出租车定点维护厂'},
    			{code:'IS_DZXHC', val:'true',name:'大中型货车'},
    			{code:'IS_DZXKC', val:'true',name:'大中型客车'},
    			{code:'IS_XXC', val:'true',name:'小型车'},
    			{code:'IS_WQC', val:'true',name:'尾气资质'},
    			{code:'IS_JLC', val:'true',name:'教练车维护'},
    			{code:'IS_S4', val:'true',name:'是否4S店'},
    			{code:'IS_CHAIN', val:'true',name:'连锁经营'},
    			{code:'IS_HONEST', val:'true',name:'诚信优质企业'},
    			{code:'IS_DETECT', val:'true',name:'是否竣工检验资质'}    			
	        ]  
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.CorpQualification', { storeId: 'corp_qualification'});