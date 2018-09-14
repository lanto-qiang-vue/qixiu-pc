/**
 * 全局BizStore
 * Created by holysky5 on 14-1-3.
 */
Ext.define('app.store.Menus', {
    extend: 'Ext.data.Store',
    fields:[
    		{name:'funcId' , type:'string'},
    		{name:'funcCode' , type:'string'},
    		{name:'funcName' , type:'string'},
    		{name:'funcType' , type:'string'},
    		{name:'icon' , type:'string'},
    		{name:'iconFont' , type:'string'},
    		{name:'leaf' , type:'string'},
    		{name:'parFuncId' , type:'string'},
    		{name:'sortOrder',type:'int'}
    	],
    data: []
});