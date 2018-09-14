Ext.define('app.model.employee.TbEmployeeCertModel',{
	extend:'jsf.data.VO',
	fields:[	
		{name:'CERT_ID' , type:'int', label:'证件ID'},
		{name:'ID_NUM' , type:'string', label:'身份证号码'},
		{name:'CERT_NUM' , type:'string', label:'从业资格证号码'},
		{name:'CERT_NAME' , type:'string', label:'从业资格证类型',val:'dict|dict.1037'},
		{name:'SEND_DATE' , type:'date', label:'领证日期',dateFormat:'Y-m-d H:i:s'},
		{name:'END_DATE' , type:'date', label:'有效期至',dateFormat:'Y-m-d H:i:s'}
	]
});