package com.lanto.shqixiu.shwgc.util;


/**
 * 常量文件
 * @user : liuxin
 * @date : 2014-10-14
 */
public class Constant {

	//企业端COOKIES
	public static final String CLINET_LOGIN_USER_COOKIE_VALUE = "clinet_login_user_cookie_value";   //userId
	public static final String CLINET_LOGIN_USERCODE_COOKIE_VALUE = "clinet_login_userCode_cookie_value";   //userCode
	public final static String CLINET_LOGIN_USERNAME_COOKIE_VALUE = "clinet_login_userName_cookie_value";   //userName
	public static final String CLINET_LOGIN_CORPID_COOKIE_VALUE = "clinet_login_corpid_cookie_value";   //corpId
	public static final String CLINET_LOGIN_CORPNAME_COOKIE_VALUE = "clinet_login_corpname_cookie_value";   //corpName
	public final static String CLINET_LOGIN_AREA_COOKIE_VALUE = "clinet_login_area_cookie_value";   //area
	public final static String CLINET_LOGIN_NOTICENUM_COOKIE_VALUE = "clinet_login_noticenum_cookie_value";   //noticeNum

	//政府端COOKIES
	public static final String MANAGE_LOGIN_USER_COOKIE_VALUE = "manage_login_user_cookie_value";   //userId
	public static final String MANAGE_LOGIN_USERCODE_COOKIE_VALUE = "manage_login_userCode_cookie_value";   //userCode
	public final static String MANAGE_LOGIN_USERNAME_COOKIE_VALUE = "manage_login_userName_cookie_value";   //userName
	public final static String MANAGE_LOGIN_AREA_COOKIE_VALUE = "manage_login_area_cookie_value";   //area
	
	//运输企业端
	public final static String TRANS_LOGIN_USER_COOKIE_VALUE = "trans_login_user_cookie_value";   //userId
	public final static String TRANS_LOGIN_USERCODE_COOKIE_VALUE = "trans_login_userCode_cookie_value";   //userId
	public final static String TRANS_LOGIN_USERNAME_COOKIE_VALUE = "trans_login_userName_cookie_value";   //userName
	public final static String TRANS_LOGIN_AREA_COOKIE_VALUE = "trans_login_area_cookie_value";   //area
	public final static String TRANS_LOGIN_CORPID_COOKIE_VALUE = "trans_login_corpid_cookie_value";   //corpId

	//企业端SESSION
	public static final String CLIENT_LOGIN_USER_SESSION_VALUE = "client_login_user_session_value";   //
	//政府端SESSION
	public static final String MANAGE_LOGIN_USER_SESSION_VALUE = "manage_login_user_session_value";   //
	
	//运输企业端
	public static final String TRANS_LOGIN_USER_SESSION_VALUE = "trans_login_user_session_value";
	
	//前端网站
	public static final String WEBSITE_LOGIN_USER_SESSION_VALUE = "WEBSITE_login_user_session_value";
	
	//附件上传保存目录
//	public static final String ATTACH_FILE_UPLOAD_PATH = "D:\\fileUpload\\attach\\";
//	public static final String ATTACH_FILE_UPLOAD_PATH = "\\\\10.194.102.7\\fileShare\\fileUpload\\attach\\";
	
	//员工照片保存目录
//	public static final String PHOTO_FILE_UPLOAD_PATH = "D:\\fileUpload\\photo\\";
//	public static final String PHOTO_FILE_UPLOAD_PATH = "\\\\10.194.102.7\\fileShare\\fileUpload\\photo\\";
	//获取维修记录图片地址
	public static final String REPAIR_PHOTO_SERVER_URL = "http://192.168.2.24:10080/CzMonitorService/repairPicture";
	public static final String REPAIR_PHOTO_PIC_URL = "http://219.137.166.188/JrFileSystemServer2/servlet/FileSystemServlet?fileId=";	
	//附件上传保存项目名称
	public static final String ATTACH_FILE_UPLOAD_PROJECT= "shwgc/";
	public static final String ATTACH_FILE_UPLOAD_CHECK_IMANGE = "shwgc/check/";
	public static final String ATTACH_FILE_UPLOAD_REPAIR_IMANGE = "shwgc/repair/";	
	public static final String XPDF_PATH = "D:\\xpdf";
	
	//打印REPORTID
	public static final String REPORT_ID_CORP_INFO_ZB = "4401000010001";
	public static final String REPORT_ID_CORP_INFO_FB = "4401000030001";
	public static final String REPORT_ID_GENE_REPAIR = 	"4401000020001";
	public static final String REPORT_ID_SLM_RECORD = 	"4401000040001";
	
	public static final String REPORT_ID_REPAIR_INFO_ZB = "4310000010001";
	public static final String REPORT_ID_REPAIR_INFO_FB = "4310000030001";	
	public static final String REPORT_ID_REPAIR_VEHICLE = "4310000030002";	
	// 状态
	public static final String STATUS = "1001"; // 状态类型

	public static final String STATUS_ENABLE = "10011001"; // 有效

	public static final String STATUS_DISABLE = "10011002"; // 无效
	

	// 性别
	public static final String GENDER_TYPE = "1003";

	public static final String MAN = "10031001";

	public static final String WOMEN = "10031002";

	public static final String NONO = "10031003";

	// 公共-是否
	public static final String IF_TYPE = "1004";

	public static final String IF_TYPE_YES = "10041001"; // 是

	public static final String IF_TYPE_NO = "10041002"; // 否 
	
	// 提交状态
	public static final String SUBMIT_STATUS = "1009";
	public static final String SUBMIT_STATUS_01 = "10091001"; // 未提交
	public static final String SUBMIT_STATUS_02 = "10091002"; // 已提交
	public static final String SUBMIT_STATUS_03 = "10091003"; // 已作废 
	
	// 打印状态
	public static final String PRINT_STATUS = "1010";
	public static final String PRINT_STATUS_01 = "10101001"; // 未打印
	public static final String PRINT_STATUS_02 = "10101002"; // 已打印
	
	//资质操作对象
	public static final String QUALIFICATION_OPE_OBJECT = "1019";
	public static final String QUALIFICATION_OPE_OBJECT_01 = "10191001";//二级维护资质
	public static final String QUALIFICATION_OPE_OBJECT_02 = "10191002";//危运车维修资质
	public static final String QUALIFICATION_OPE_OBJECT_03 = "10191003";//LPG维修资质
	public static final String QUALIFICATION_OPE_OBJECT_04 = "10191004";//出租车维修资质
	public static final String QUALIFICATION_OPE_OBJECT_05 = "10191005";//大中型货车
	public static final String QUALIFICATION_OPE_OBJECT_06 = "10191006";//大中型客车
	public static final String QUALIFICATION_OPE_OBJECT_07 = "10191007";//小型车
	public static final String QUALIFICATION_OPE_OBJECT_08 = "10191008";//尾气资质
	public static final String QUALIFICATION_OPE_OBJECT_09 = "10191009";//教练车维护
	
	//业务办理状态
	public static final String BUSINESS_STATUS = "1021";
	public static final String BUSINESS_STATUS_01 = "10211001";//待提交
	public static final String BUSINESS_STATUS_02 = "10211002";//待受理
	public static final String BUSINESS_STATUS_03 = "10211003";//受理失败
	public static final String BUSINESS_STATUS_04 = "10211004";//待审核
	public static final String BUSINESS_STATUS_05 = "10211005";//审核失败
	public static final String BUSINESS_STATUS_06 = "10211006";//待办结
	public static final String BUSINESS_STATUS_07 = "10211007";//办结不通过
	public static final String BUSINESS_STATUS_08 = "10211008";//办结通过
	
	//企业经营状态
	public static final String CORP_STATUS = "1022";
	public static final String CORP_STATUS_01 = "10221001";//营业
	public static final String CORP_STATUS_02 = "10221002";//待变更
	public static final String CORP_STATUS_03 = "10221003";//待补办
	public static final String CORP_STATUS_04 = "10221004";//待续期
	public static final String CORP_STATUS_05 = "10221005";//待停业
	public static final String CORP_STATUS_06 = "10221006";//待复业
	public static final String CORP_STATUS_07 = "10221007";//待迁移
	public static final String CORP_STATUS_08 = "10221008";//待注销
	public static final String CORP_STATUS_09 = "10221009";//已停业
	public static final String CORP_STATUS_10 = "10221010";//已注销
	
	//日常检查状态
	public static final String DAILY_STATUS = "1024";
	public static final String DAILY_STATUS_01 = "10241001";//待整改
	public static final String DAILY_STATUS_02 = "10241002";//待审核
	public static final String DAILY_STATUS_03 = "10241003";//合格
	
	//上传状态
	public static final String TRANS_STATUS = "1025";
	public static final String TRANS_STATUS_01 = "10251001";//已开单
	public static final String TRANS_STATUS_02 = "10251002";//已开工
	public static final String TRANS_STATUS_03 = "10251003";//已完工
	public static final String TRANS_STATUS_04 = "10251004";//已上传
	
	
	//记录状态
	public static final String RECORD_STATUS = "1026";
	public static final String RECORD_STATUS_01 = "10261001";// 已维护
	public static final String RECORD_STATUS_02 = "10261002";//已检测
	public static final String RECORD_STATUS_03 = "10261003";//已备案
}
