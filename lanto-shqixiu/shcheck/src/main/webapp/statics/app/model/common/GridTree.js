Ext.define('app.model.common.GridTree', {
	extend: 'Ext.data.Model',

	fields: [  
            {name: 'funcName',  type: 'string'},  
            {name: 'funcId',   type: 'int'},
            {name: 'parFuncId',   type: 'int'},
            {name: 'funcType',   type: 'int'},
            {name: 'sortOrder',   type: 'int'},
            {name: 'funcCode',   type: 'String'},
            {name: 'funcImage',   type: 'String'},
            {name: 'isCheck',   type: 'String'}
        ] 
});
