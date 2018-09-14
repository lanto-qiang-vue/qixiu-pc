package com.lanto.shqixiu.shwgc.service.sys;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import sun.misc.BASE64Encoder;

import com.lanto.shqixiu.shwgc.model.po.TqSysUser;
import com.lanto.shqixiu.shwgc.util.MD5;

@Service
public class LoginService  {
	
	@Resource
	private SwdbFactory service;
	
	public boolean login(String userid, String userpw) {
		String userpwd = userid+userpw;
		String base64 =  new BASE64Encoder().encode(userpwd.getBytes());
		MD5 md5 = new MD5();
		String jpql="select * from TQ_SYS_USER where USER_CODE=? and password=?";
		List<?> list = service.findAll(jpql, new Object[]{userid,md5.getMD5ofStr(base64)});
		if (list.size()>0){
			return true;
		}
		return false;
	}
	
	public boolean gzjrLogin(String userCode, String userpw){
		TqSysUser user = new TqSysUser();
		user.setUserCode(userCode);
		user.setPassword(userpw);
		user = service.getModelByPo(user);
		if(user != null){
			return true;
		}else{
			return false;
		}
	}
	
	public String getPassword(String userId){
		String userpwd = userId+"123456";
		String base64 =  new BASE64Encoder().encode(userpwd.getBytes());
		MD5 md5 = new MD5();
		return md5.getMD5ofStr(base64);
	}
	
	public Map getLoginUserInfo(String userId){
		String jpql = "select A.CORP_ID,A.CORP_NAME,B.USER_CODE,B.ROLE_ID,B.USER_NAME,B.USER_ID,A.CORP_AREA,b.IS_VALID,"
				+ "(select (select count(notice_id) from tb_notice a where (a.CLIENT_ACTOR=CAST(B.CORP_ID AS SIGNED) or a.CLIENT_ACTOR='all'))-"+
				"(select count(id) from tb_notice_see where actor_id=B.CORP_ID and corp_type='10491001')) NO_SEE_NOTICE_NUM,"
				+ "(select count(notice_id) from tb_notice a where (a.CLIENT_ACTOR=CAST(B.CORP_ID AS SIGNED) or a.CLIENT_ACTOR='all')) NOTICE_NUM FROM TQ_SYS_USER B"
				+ " LEFT JOIN TB_CORP_INFO A ON B.CORP_ID=A.CORP_ID WHERE B.USER_CODE=?";
		List list = service.findAll(jpql, new Object[]{userId});
		if(list != null && list.size() > 0){
			return (Map)list.get(0);
		}
		return null;
	}
	
	public Map getLoginUserInfo(Integer userId){
		String jpql = "select A.CORP_ID,A.CORP_NAME,B.USER_CODE,A.CORP_TYPE,A.CORP_AREA,B.ROLE_ID,B.USER_NAME,B.USER_ID,"
				+ "(select (select count(notice_id) from tb_notice a where (a.CLIENT_ACTOR=CAST(B.CORP_ID AS SIGNED) or a.CLIENT_ACTOR='all'))-"+
				"(select count(id) from tb_notice_see where actor_id=B.CORP_ID and corp_type='10491001')) NO_SEE_NOTICE_NUM,"
				+ "(select count(notice_id) from tb_notice a where (a.CLIENT_ACTOR=CAST(B.CORP_ID AS SIGNED) or a.CLIENT_ACTOR='all')) NOTICE_NUM"
				+ " FROM TQ_SYS_USER B LEFT JOIN TB_CORP_INFO A ON B.CORP_ID=A.CORP_ID WHERE B.USER_ID=?";
		List list = service.findAll(jpql, new Object[]{userId});
		if(list != null && list.size() > 0){
			return (Map)list.get(0);
		}
		return null;
	}
	public Map getLoginUserByCorpID(String corpId){
		String jpql = "SELECT USER_CODE,IS_VALID FROM TB_CORP_INFO A LEFT JOIN TQ_SYS_USER B ON A.BUSINESS_NUM=B.USER_CODE WHERE A.CORP_ID=?";
		List list = service.findAll(jpql, new Object[]{corpId});
		if(list != null && list.size() > 0){
			return (Map)list.get(0);
		}
		return null;
	}	
}
