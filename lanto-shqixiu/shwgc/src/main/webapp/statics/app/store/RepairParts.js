/**
 * 全局BizStore
 * Created by lys on 17-5-7.
 */
Ext.define('app.store.RepairParts', {
    extend: 'Ext.data.Store',
    fields: [{name:'PART_ID',type:'string'},'PART_NAME','PART_TYPE','PART_PRICE','PART_BRAND','IS_OWNER_PROVIDE'],
    proxy: {
    	actionMethods:{read:'POST'},
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data'
        },
        url: 'client/sys/common/getRepairParts'
    },
    listeners:{
    	load:function( st, records, successful, eOpts ){
    		//st.insert(0,{STATION_ID:'',STATION_CODE:'',STATION_NAME:'\u00a0',CHANNEL_CODE1:'',CHANNEL_CODE2:''});
    	}
    },
    autoLoad: false
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.RepairParts', { storeId: 'repair_parts'});
Ext.getStore("repair_parts").load();//为解决自动加载请求两次