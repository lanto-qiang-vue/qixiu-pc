/**
 * 全局BizStore
 * Created by lys on 17-5-7.
 */
Ext.define('app.store.BdStation', {
    extend: 'Ext.data.Store',
    fields: [{name:'STATION_ID',type:'string'},'STATION_CODE','STATION_NAME','CHANNEL_CODE1','CHANNEL_CODE2'],
    proxy: {
    	actionMethods:{read:'POST'},
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data'
        },
        url: 'check/sys/common/getBdStation'
    },
    listeners:{
    	load:function( st, records, successful, eOpts ){
    		//st.insert(0,{STATION_ID:'',STATION_CODE:'',STATION_NAME:'\u00a0',CHANNEL_CODE1:'',CHANNEL_CODE2:''});
    	}
    },
    autoLoad: false
});
//创建一个全局store 可以通过storeId来进行引用.不要通过create来创建
Ext.create('app.store.BdStation', { storeId: 'sys_bd_station'});
Ext.getStore("sys_bd_station").load();//为解决自动加载请求两次