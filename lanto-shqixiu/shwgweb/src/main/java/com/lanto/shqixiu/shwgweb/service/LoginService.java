package com.lanto.shqixiu.shwgweb.service;

import java.util.Date;

import javax.annotation.Resource;

import com.lanto.shqixiu.shwgweb.model.po.TmSysUser;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import sun.misc.BASE64Encoder;

import com.lanto.shqixiu.shwgweb.model.po.TgSysUser;
import com.lanto.shqixiu.shwgweb.model.po.TpSysUser;
import com.lanto.shqixiu.shwgweb.util.MD5;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */
@Service
public class LoginService {
	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private CreateNumberService createNumberService;
	
	public TgSysUser updateGeneLogin(String telphone,String userPass){
		TgSysUser user = new TgSysUser();
		user.setTelphone(telphone);
		user.setPassword(getEncodePass(telphone , userPass));
		return swdb.getModelByPo(user);
	}
	
	public TpSysUser updateCompanyLogin(String telphone,String userPass){
		TpSysUser user = new TpSysUser();
		user.setTelphone(telphone);
		return swdb.getModelByPo(user);
	}

	public TmSysUser updateAdminLogin(String telphone, String userPass){
		TmSysUser user = new TmSysUser();
		user.setTelphone(telphone);
		return swdb.getModelByPo(user);
	}

	public TpSysUser updateLogin(String telphone,String userPass){
		TpSysUser user = new TpSysUser();
		user.setUserCode(telphone);
		user.setPassword(getEncodePass(telphone , userPass));
		return swdb.getModelByPo(user);
	}
	
	public String updateRegister(TgSysUser user) throws Exception{
		TgSysUser con = new TgSysUser();
		con.setTelphone(user.getTelphone());
		con = swdb.getModelByPo(con);
		if(con != null){
			return "该手机用户已经存在,请重新输入！";
		}
		user.setPassword(getEncodePass(user.getTelphone() , user.getPassword()));
		user.setCreateTime(new Date());
		user.setUserSex("10031001");
		user.setDeviceType("网站端");
		user.setUserName(createNumberService.createNumber("registerNo"));
		Integer id = swdb.savePojoRtPkId(user, "USER_ID");
		user.setUserId(id);
		return null;
	}
	
	public TgSysUser getUserByTelphone(String telphone){
		TgSysUser con = new TgSysUser();
		con.setTelphone(telphone);
		con = swdb.getModelByPo(con);
		return con;
	}
	
	public TpSysUser getExpertUserByUserCode(String telphone){
		TpSysUser con = new TpSysUser();
		con.setUserCode(telphone);
		con = swdb.getModelByPo(con);
		return con;
	}
	
	
	private String getEncodePass(String userCode,String pass){
		MD5 md5 = new MD5();
		String psswod = userCode + pass;
		String base64 =  new BASE64Encoder().encode(psswod.getBytes());
		return md5.getMD5ofStr(base64);
	}
	
	public void submitForget(String telphone,String password){
		TgSysUser con = new TgSysUser();
		con.setTelphone(telphone);
		con.setPassword(getEncodePass(telphone , password));
		swdb.updatePojo(con, "TELPHONE");
	}
	
}
