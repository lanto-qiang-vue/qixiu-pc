package com.lanto.shqixiu.shwgm.service.manage.sys;

import java.util.List;
import java.util.Map;

import org.softbase.service.SwdbFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sun.misc.BASE64Encoder;

import com.lanto.shqixiu.shwgm.util.MD5;

@Service
public class LoginService  {
	
	@Autowired
	private SwdbFactory service;
	
	public boolean login(String userid, String userpw) {
		String userpwd = userid+userpw;
		String base64 =  new BASE64Encoder().encode(userpwd.getBytes());
		MD5 md5 = new MD5();
		String jpql="select * from TM_SYS_USER where USER_CODE=? and password=?";
		List<?> list = service.findAll(jpql, new Object[]{userid,md5.getMD5ofStr(base64)});
		if (list.size()>0){
			return true;
		}
		return false;
	}
	
	public String getPassword(String userId){
		String userpwd = userId+"123456";
		String base64 =  new BASE64Encoder().encode(userpwd.getBytes());
		MD5 md5 = new MD5();
		return md5.getMD5ofStr(base64);
	}
	
	public Map getLoginUserInfo(String userId){
		String jpql = "select B.USER_ID,B.USER_CODE,B.USER_TYPE,B.ROLE_ID,B.USER_NAME,B.BLONG_AREA,b.IS_VALID,"+
				"(select (select count(CASE WHEN FIND_IN_SET(?,manage_actor)=0 THEN NULL ELSE 1 END) from tb_notice)-"+
						"(select count(id) from tb_notice_see where actor_id=B.USER_CODE)) NO_SEE_NOTICE_NUM,"+
						"(select count(CASE WHEN FIND_IN_SET(?,manage_actor)=0 THEN NULL ELSE 1 END) from tb_notice) NOTICE_NUM"
				+ " FROM TM_SYS_USER B WHERE B.USER_CODE=?";
		List list = service.findAll(jpql, new Object[]{userId,userId,userId});
		if(list != null && list.size() > 0){
			return (Map)list.get(0);
		}
		return null;
	}
}
