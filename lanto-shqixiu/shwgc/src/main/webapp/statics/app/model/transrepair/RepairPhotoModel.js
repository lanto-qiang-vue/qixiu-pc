Ext.define('app.model.transrepair.RepairPhotoModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'RECORD_ID' , type:'int', label:'ID',isShowGrid:false},
		{name:'IMAGE_PATH' , type:'string', label:'照片路径',isShowGrid:true},
		{name:'IMAGE_INFO' , type:'string', label:'照片说明',isShowGrid:true,req:true},
		{name:'TAKE_TIME' , type:'date', label:'拍照时间',isShowGrid:true}
	]
});