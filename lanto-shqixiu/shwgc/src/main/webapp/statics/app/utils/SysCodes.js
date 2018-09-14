//字典常量
Ext.define('app.utils.SysCodes', {
	singleton:true,
	
	STATUS:1001, //状态：有效、无效
	USER_TYPE : 1002, //用户类型
	SEX : 1003, //性别
	YESNO:1004, //系统逻辑判断:是、否
	ROLETYPE:1005, //角色类别
	PLATECOLOR:1006,//车牌颜色
	VEHTYPE:1034,//普通维修车辆类型
	VEHNATURE:1008,//车辆性质
	SUBMITSTATUS:1009,//提交状态
	PRINTSTATUS:1010, //打印状态
	REPAIRTYPE:1011,//维修类别
	REPAIRITEM:1012,//维修项目
	PARAMS_UNIT:1013,//参数单位
	DB_JYFW:1014,//经营范围
	DB_JIYFW:1015,//兼营范围
	DB_REPAIR_TYPES:1016,//维修项目种类
	ECONOMIC_NATURE:1017,//经济性质
	ACCOUNT_TYPE:1018,//核算形式
	OPE_OBJECT : 1019,//资质操作对象
	OPE_TYPE:1020 ,//资质操作类型
	BUSINESS_STATUS: 1021, //业务办理状态:待提交、待受理、受理失败、待审核、审核失败、审核通过
	CORP_STATUS : 1022, //企业营业状态
	DATA_FROM : 1023, //数据来源
	DAILY_STATUS : 1024 ,//日常检查
	TRANS_STATUS : 1025, //上传状态
	RECORD_STATUS : 1026, //记录状态
	TRAFFIC_UNIT : 1055 //所属交管所	
});