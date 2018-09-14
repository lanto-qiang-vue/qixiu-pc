Ext.define('app.model.common.Dict', {
	extend: 'jsf.data.PO',

	fields: [
		{
			name:'group',
			type:'string',
			label:'类别',
			value:'1-50',
			query:'like'
		},		
		{
			name:'name',
			type:'string',
			label:'变量名',
			value:'1-50',
			query:'like'
		},		
		{
			name:'code',
			type:'string',
			label:'变量代码',
			value:'1-50',
			query:'like',
			convert: function (newValue, model) {
	               return String(newValue);
	        }
		},		
		{
			name:'order',
			type:'int',
			label:'序号',
			value:'1-9999'
		}	
	]
});
