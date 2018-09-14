Ext.define('app.model.corp.TbCorpVideoModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'ID' , type:'int', label:'ID'},
        {name: 'CORP_ID', type: 'int', label: '维修企业ID',query:'eq'},
        {name: 'CORP_NAME', type: 'string', label: '企业名称'},
        {name: 'VIDEO_NUM', type: 'int', label: '通道' ,req:true},		
		{name:'VIDEO_NAME' , type:'string', label:'通道名称'},
		{name:'HLS_URL_HD' , type:'string', label:'高清地址',req:true},
		{name:'HLS_URL_FAST' , type:'string', label:'流畅地址',req:true},
		{name:'DEVICE_SN' , type:'string', label:'序列号',req:true},
		{name:'DEVICE_VERIFY_CODE' , type:'string', label:'验证码'},
		{name:'STATUS' , type:'string', label:'状态',val:'dict|dict.1044'}
	]
});