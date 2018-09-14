Ext.define('app.model.corp.TbCorpVideoSetModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'CORP_ID' , type:'string', label:'企业ID'},
		{name:'IP' , type:'string', label:'外网IP地址'},
		{name:'PORT' , type:'string', label:'端口',req:true},
		{name:'SERVER_IP' , type:'string', label:'视频服务IP地址'},
		{name:'SERVER_PORT' , type:'string', label:'视频服务端口'},		
		{name:'VIDEO_NUM' , type:'string', label:'通道',req:true},		
		{name:'USER_NAME' , type:'string', label:'用户'},
		{name:'PSW' , type:'string', label:'密码'},
		{name:'UPDATE_TIME' , type:'string', label:'修改时间'},
		{name:'LOCAL_IP' , type:'string', label:'内网IP地址',req:true},
		{name:'USE_TYPE' , type:'string', label:'网络类型',val:'dict|dict.1015'}	,
		{name:'SERVER_INTERVAL' , type:'int', label:'拍照间隔(分钟)'}
	]
});